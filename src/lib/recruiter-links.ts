import type { RecruiterCategory } from "./projects/content";

/**
 * Recruiter-tracking link configuration. Each key is a short code used in a
 * `/r/<code>` URL (handed out via QR codes, resume links, etc. — see
 * src/app/r/[code]/route.ts). Visiting the link sets a cookie recording the
 * listed categories, which src/lib/projects/select-featured.ts then uses to
 * reorder which projects are shown first.
 *
 * Adding a new link is a one-line entry here. `code` is matched
 * case-insensitively by the route handler.
 */
export const recruiterLinks: Record<string, RecruiterCategory[]> = {
  // Generic, role-shaped codes (print on a resume/business card when you
  // don't have a company-specific code yet).
  embedded: ["embedded", "hardware"],
  hardware: ["hardware", "embedded"],
  software: ["software"],
  swe: ["software"],
  cloud: ["cloud-devops"],
  devops: ["cloud-devops"],
  general: ["software", "hardware", "embedded", "cloud-devops", "quantum"],

  // Company/role-specific codes.
  // "firmware" isn't its own category (see RecruiterCategory in
  // src/lib/projects/content.ts) — it's folded into "embedded", which is
  // what it means in practice for every project here.
  "spacex-swe-intern": ["software", "embedded"],
  "ibm-quantum-intern": ["quantum", "embedded", "software"],
  // Role name is "IBM Cloud", so cloud-devops is added on top of the
  // "software" you listed — drop it back to just ["software"] if that's
  // too broad for what this recruiter cares about.
  "ibm-cloud-intern": ["software", "cloud-devops"],
  "arm-hardware": ["hardware", "embedded"],
};

export const RECRUITER_COOKIE_NAME = "recruiter_categories";
export const RECRUITER_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 90;

const KNOWN_CATEGORIES: readonly RecruiterCategory[] = [
  "embedded",
  "hardware",
  "software",
  "cloud-devops",
  "quantum",
];

export function isRecruiterCategory(
  value: string,
): value is RecruiterCategory {
  return (KNOWN_CATEGORIES as readonly string[]).includes(value);
}

/** Parses and validates a raw cookie value, dropping anything unrecognized. */
export function parseRecruiterCategories(
  rawValue: string | undefined,
): RecruiterCategory[] | null {
  if (!rawValue) {
    return null;
  }

  const categories = rawValue
    .split(",")
    .map((value) => value.trim())
    .filter(isRecruiterCategory);

  return categories.length > 0 ? categories : null;
}
