import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  // description: "",
};

export default function Page() {
  return (
    <div>
      <h1>Resume</h1>
      <div className="w-full h-screen p-6 rounded-2xl bg-green-950 border-1 border-gray-50">
        <iframe
          src="/resume.pdf"
          className="w-full h-full rounded-2xl border-1 border-gray-50"
        />
      </div>
    </div>
  );
}
