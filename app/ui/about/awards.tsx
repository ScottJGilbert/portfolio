//Import from database?
const awards = [
  {
    name: "National Merit $2500 Scholarship Winner",
    issuer: "National Merit Scholarship Corporation",
    date: "5/7/2025",
    description:
      "For demonstrating one of the strongest combinations of accomplishments, skills, and potential for success in rigorous college studies",
  },
];

export default function Awards() {
  return (
    <div>
      <h1>Awards</h1>
      <hr className="mt-1 mb-3"></hr>
      <div>
        {awards.map((award) => {
          return (
            <div className="mb-6 mt-2" key={award.name + "award"}>
              <h2>{award.name}</h2>
              <p>
                <i>{award.issuer + " | " + award.date}</i>
              </p>
              <hr></hr>
              <p>{award.description}</p>
            </div>
          );
        })}
      </div>{" "}
    </div>
  );
}
