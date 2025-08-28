import parsePhoneNumber from "libphonenumber-js";

//Also import from database?
const references = [
  {
    name: "Scott",
    position: "Computer Engineer",
    institution: "Your business",
    address: "None of your business",
    phone: "+16303346598",
    email: "scott7gilbert@gmail.com",
    relation: "I worked with Scott because he is me. End of story.",
  },
];

export default function References() {
  return (
    <div>
      <h1>References</h1>
      <hr className="mt-1 mb-3"></hr>
      {references.map((reference) => {
        const phoneNumber = parsePhoneNumber(reference.phone);
        return (
          <div key={reference.name + "reference"}>
            <h3>{reference.name}</h3>
            <p>
              {reference.position} at {reference.institution}
            </p>
            <p>{reference.address}</p>
            <div>
              <span>
                <a href={phoneNumber?.getURI.toString()}>
                  {phoneNumber?.formatInternational()}
                </a>
              </span>
              <span> | </span>
              <span>
                <a href={"mailto:" + reference.email}>{reference.email}</a>
              </span>
            </div>
            <p>{reference.relation}</p>
          </div>
        );
      })}
    </div>
  );
}
