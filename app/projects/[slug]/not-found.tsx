import Link from "next/link";
import { FaceFrownIcon } from "@heroicons/react/24/outline";

export default function NotFound() {
  return (
    <main className="my-auto flex h-full flex-col items-center justify-center gap-4">
      <div className="flex gap-2">
        <FaceFrownIcon className="w-10 text-gray-400" />
        <h2 className="my-auto text-xl font-semibold">404</h2>
      </div>
      <p>
        The requested project could not be found on this server. Maybe there was
        a misspelling?
      </p>
      <Link
        href="/projects"
        className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700"
      >
        ← Go Back
      </Link>
    </main>
  );
}
