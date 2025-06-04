import Image from "next/image";
import Awards from "../ui/about/awards";
// import Certifications from "../ui/about/certifications";
// import References from "../ui/about/references";

export default function Page() {
  return (
    <div>
      <h1>Biography</h1>
      <hr className="mt-1 mb-3"></hr>
      <div className="flex space-between mb-8">
        <Image
          src="/portrait.jpg"
          alt="portrait"
          height={375}
          width={300}
        ></Image>
        <div>
          <p>
            Hello! I&apos;m Scott, an undergraduate computer engineering student
            at the University of Illinois at Urbana-Champaign and a graduate of
            James B. Conant High School in Hoffman Estates, Illinois.
          </p>
        </div>
      </div>
      <div>
        <Awards />
      </div>
      <div>{/*<Certifications />*/}</div>
      <div>{/* <References /> */}</div>
      <p className="h-100">HI MOM</p>
      <p className="h-100">HI MOM</p>
    </div>
  );
}
