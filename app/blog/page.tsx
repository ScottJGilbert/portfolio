import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1>Blog</h1>
      <Link href="/new" className="p-4 rounded-2xl bg-slate-800">
        + New
      </Link>
    </div>
  );
}
