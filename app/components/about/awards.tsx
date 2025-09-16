//Import from database?
const awards = [
  {
    name: "National Merit $2500 Scholarship Winner",
    issuer: "National Merit Scholarship Corporation",
    date: "5/7/2025",
    description:
      "For demonstrating one of the strongest combinations of accomplishments, skills, and potential for success in rigorous college studies.",
  },
  {
    name: "AP Scholar with Distinction",
    issuer: "College Board",
    date: "7/9/2025",
    description:
      "For earning an average score of at least 3.5 on all AP Exams taken, and scores of 3 or higher on five or more of these exams.",
  },
  {
    name: "Illinois State Seal of Biliteracy (Mandarin)",
    issuer: "Illinois State Board of Education",
    date: "5/1/2024",
    description:
      "For demonstrating proficiency in English and Mandarin Chinese, as well as intercultural competence.",
  },
  {
    name: "Eagle Scout",
    issuer: "Scouting America",
    date: "2/26/2023",
    description:
      "For demonstrating leadership, service, and outdoor skills through the completion of a community service project and earning at least 21 merit badges.",
  },
  {
    name: "President's Volunteer Service Award - Gold Medal",
    issuer: "AmeriCorps",
    date: "1/15/2021",
    description:
      "For completing over 100 hours of volunteer service in a 12-month period, demonstrating a strong commitment to community service and civic engagement.",
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
