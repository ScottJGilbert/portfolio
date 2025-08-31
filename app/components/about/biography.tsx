import Image from "next/image";

export default function Biography() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row md:space-between mb-8 gap-4">
        <Image
          src="/portrait.jpg"
          alt="portrait"
          height={375}
          width={300}
          className="rounded-2xl border-gray-50 border-1"
        />
        <div className="[&>*]:mb-4 text-lg">
          <p>
            Hello! I&apos;m Scott, an undergraduate computer engineering student
            at the University of Illinois at Urbana-Champaign and a graduate of
            James B. Conant High School in Hoffman Estates, Illinois.
          </p>
          <p>
            I am a hard-working full-stack developer, problem-solver, and
            computer engineer who is dedicated to deploying information
            technology, computing, and electrical engineering solutions to both
            solve complex problems and make a difference in peoples&apos; lives.
          </p>
        </div>
      </div>
    </div>
  );
}
