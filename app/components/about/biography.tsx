import Image from "next/image";

export default function Biography() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex space-between mb-8 gap-4">
        <Image
          src="/portrait.jpg"
          alt="portrait"
          height={375}
          width={300}
          className="rounded-2xl border-gray-50 border-1"
        />
        <div>
          <p>
            Hello! I&apos;m Scott, an undergraduate computer engineering student
            at the University of Illinois at Urbana-Champaign and a graduate of
            James B. Conant High School in Hoffman Estates, Illinois.
          </p>
        </div>
      </div>
    </div>
  );
}
