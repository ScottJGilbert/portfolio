import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1>Projects</h1>
      <hr className="mt-1 mb-3"></hr>
      <Link href="/new" className="p-4 rounded-2xl bg-slate-800">
        + New
      </Link>
    </div>
  );
}
