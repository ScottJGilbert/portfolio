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
      <div>
        {awards.map((award) => {
          return (
            <div
              className="mb-8 p-4 border-[var(--border)] border-1 bg-[var(--background-secondary)] rounded-3xl"
              key={award.name + "award"}
            >
              <h2>{award.name}</h2>
              <p className="my-2">
                <i>{award.issuer + " | " + award.date}</i>
              </p>
              <hr></hr>
              <p className="mt-2">{award.description}</p>
            </div>
          );
        })}
      </div>{" "}
    </div>
  );
}
