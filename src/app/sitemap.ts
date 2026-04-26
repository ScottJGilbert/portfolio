import { promises as fs } from 'node:fs';
import path from 'node:path';
import type { MetadataRoute } from 'next';

const PAGE_FILE_REGEX = /^page\.(js|jsx|ts|tsx|md|mdx)$/i;

function getBaseUrl(): string {
	const raw =
		process.env.NEXT_PUBLIC_SITE_URL ??
		process.env.SITE_URL ??
		(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

	return /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
}

async function findAppDir(): Promise<string | null> {
	const candidates = [
		path.join(process.cwd(), 'src', 'app'),
		path.join(process.cwd(), 'app'),
	];

	for (const candidate of candidates) {
		try {
			const stat = await fs.stat(candidate);
			if (stat.isDirectory()) return candidate;
		} catch {
			// continue
		}
	}

	return null;
}

function isRouteGroup(segment: string): boolean {
	return segment.startsWith('(') && segment.endsWith(')');
}

function isParallelRoute(segment: string): boolean {
	return segment.startsWith('@');
}

function isPrivateRoute(segment: string): boolean {
	return segment.startsWith('_');
}

function isDynamicSegment(segment: string): boolean {
	return segment.startsWith('[') && segment.endsWith(']');
}

function toRoutePath(segments: string[]): string | null {
	if (segments.some(isDynamicSegment)) return null;

	const cleaned = segments.filter(
		(segment) =>
			!isRouteGroup(segment) &&
			!isParallelRoute(segment) &&
			!isPrivateRoute(segment),
	);

	return cleaned.length === 0 ? '/' : `/${cleaned.join('/')}`;
}

type RouteEntry = { path: string; lastModified: Date };

async function collectRoutes(
	dir: string,
	segments: string[] = [],
): Promise<RouteEntry[]> {
	const entries = await fs.readdir(dir, { withFileTypes: true });
	const routes: RouteEntry[] = [];

	const pageFile = entries.find(
		(entry) => entry.isFile() && PAGE_FILE_REGEX.test(entry.name),
	);

	if (pageFile) {
		const routePath = toRoutePath(segments);
		if (routePath) {
			const pagePath = path.join(dir, pageFile.name);
			const stat = await fs.stat(pagePath);
			routes.push({ path: routePath, lastModified: stat.mtime });
		}
	}

	for (const entry of entries) {
		if (!entry.isDirectory()) continue;
		if (entry.name.startsWith('.')) continue;

		const childDir = path.join(dir, entry.name);
		routes.push(...(await collectRoutes(childDir, [...segments, entry.name])));
	}

	return routes;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = getBaseUrl();
	const appDir = await findAppDir();

	if (!appDir) {
		return [{ url: new URL('/', baseUrl).toString(), lastModified: new Date() }];
	}

	const routes = await collectRoutes(appDir);

	const deduped = new Map<string, Date>();
	for (const route of routes) {
		const prev = deduped.get(route.path);
		if (!prev || route.lastModified > prev) deduped.set(route.path, route.lastModified);
	}

	return [...deduped.entries()]
		.sort(([a], [b]) => a.localeCompare(b))
		.map(([routePath, lastModified]) => ({
			url: new URL(routePath, baseUrl).toString(),
			lastModified,
		}));
}
