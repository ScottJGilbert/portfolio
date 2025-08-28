import {
  fetchExperienceIDs,
  fetchExperience,
  fetchExpertiseAreas,
} from "@/lib/db";
import EditExperience from "./edit-experience";
import { Suspense } from "react";
import { Experience } from "@/lib/definitions";

export default async function EditAllExperience() {
  const ids = await fetchExperienceIDs();
  const blankStrings: string[] = [""];
  const expertiseAreas = await fetchExpertiseAreas(blankStrings);

  const blank: Experience = {
    experience_id: -1,
    title: "",
    organization: "",
    start_date: new Date(0),
    end_date: null,
    markdown: "",
    expertise: [],
    self_employed: false,
    volunteer: false,
  };

  return (
    <div>
      <h1>Edit</h1>
      <hr></hr>
      {ids.map(async (id) => {
        const experience = await fetchExperience(id);
        return (
          <div key={id + "experience"}>
            <Suspense>
              <EditExperience
                initialData={experience}
                expertiseAreas={expertiseAreas}
              />
            </Suspense>
          </div>
        );
      })}
      <div>
        <div>
          <h1>New</h1>
          <hr></hr>
          <EditExperience initialData={blank} expertiseAreas={expertiseAreas} />
        </div>
      </div>
    </div>
  );
}
