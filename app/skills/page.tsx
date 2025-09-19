import { fetchSkills } from "@/lib/db";
import { Skill } from "@/lib/definitions";
import { capitalizeFirstLetter, filterInPlace } from "@/lib/methods";
import { SkillGroup } from "@/lib/definitions";
import Image from "next/image";

export const revalidate = 1200; // Revalidate every twenty minutes

const categoryNames = ["software", "hardware", "technical", "soft"];

export default async function skillsPage() {
  const skills = await fetchSkills([]);

  const categorySortedSkills: Skill[][] = [[], [], [], []];
  categorySortedSkills[0] = skills.filter((skill) => {
    return skill.category === "software";
  });
  categorySortedSkills[1] = skills.filter((skill) => {
    return skill.category === "hardware";
  });
  categorySortedSkills[2] = skills.filter((skill) => {
    return skill.category === "technical";
  });
  categorySortedSkills[3] = skills.filter((skill) => {
    return skill.category === "soft";
  });

  const fullySortedCategories: sortedCategory[] = categorySortedSkills.map(
    (categoryOfSkills) => {
      return groupWithinCategory(categoryOfSkills);
    }
  );

  return (
    <div>
      <h1 className="mt-4">Skill Areas</h1>
      <div>
        <div>{/* Selector for four pages */}</div>
        <div>
          {fullySortedCategories.map((fullySortedCategory, index) => {
            //To be continued
            return (
              <div key={categoryNames[index]}>
                <div className="grid">
                  {/* Groups */}
                  {fullySortedCategory.groups.map((group) => {
                    return (
                      <div key={group.parent.name}>
                        <span className="relative">
                          <Image
                            src={group.parent.image_url}
                            alt={group.parent.name}
                            fill={true}
                          />
                        </span>
                        <h2>{capitalizeFirstLetter(group.parent.name)}</h2>
                        <div className="grid">
                          {group.childGroups.map((childgroup) => {
                            return (
                              <div
                                key={group.parent.name + childgroup[0].category}
                              >
                                <h3>{childgroup[0].category}</h3>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

type sortedCategory = {
  groups: SkillGroup[];
  subcategoryGroups: Skill[][];
  unGroupedSkills: Skill[];
};

function groupWithinCategory(unsortedCategorySkills: Skill[]): sortedCategory {
  //Last array is for miscellaneous skills
  const groups: SkillGroup[] = [];

  const skillsWithParents = filterInPlace(
    unsortedCategorySkills,
    (skill) => skill.parent_skill_id !== undefined
  );

  for (let i = 0; i < unsortedCategorySkills.length; i++) {
    const singleSkill = unsortedCategorySkills[i];

    const children = filterInPlace(
      skillsWithParents,
      (skill) => singleSkill.skill_id === skill.parent_skill_id
    );

    if (children.length > 0) {
      unsortedCategorySkills.splice(i, 1);
      i--;

      const [childrenSubcategoryGroups, childenLoneSkills] =
        sortBySubcategories(children);

      groups.push({
        parent: singleSkill,
        childGroups: childrenSubcategoryGroups,
        unGroupedChildren: childenLoneSkills,
      });
    }
  }

  //Handle skills with no parents
  const [subcategoryGroups, loneSkills] = sortBySubcategories(
    unsortedCategorySkills
  );

  return {
    groups,
    subcategoryGroups,
    unGroupedSkills: loneSkills,
  };
}

function sortBySubcategories(skills: Skill[]): [Skill[][], Skill[]] {
  const subcategoryGroups: Skill[][] = [];
  const loneSkills: Skill[] = [];

  for (let i = 0; i < skills.length; i++) {
    const singleSkill = skills.shift();

    if (!singleSkill) break;

    const sameSubcategory = filterInPlace(
      skills,
      (skill) => skill.subcategory === singleSkill.subcategory
    );

    if (sameSubcategory.length > 0) {
      sameSubcategory.unshift(singleSkill);
      subcategoryGroups.push(sameSubcategory);
    } else {
      loneSkills.push(singleSkill);
    }
  }

  return [subcategoryGroups, loneSkills];
}
