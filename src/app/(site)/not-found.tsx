import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-24 sm:py-32">
      <section className="relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-white/80 p-10 text-center shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70 sm:p-14">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-zinc-200/60 blur-3xl dark:bg-zinc-700/30" />
        <p className="relative text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
          404
        </p>
        <h1 className="relative mt-3 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
          Page not found
        </h1>
        <p className="relative mx-auto mt-4 max-w-xl text-zinc-600 dark:text-zinc-300">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <div className="relative mt-8 flex items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            Go back home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-md border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            Contact
          </Link>
        </div>
      </section>
    </main>
  );
}
