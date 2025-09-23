import { fetchSkills } from "@/lib/db";
import { Skill } from "@/lib/definitions";
import { capitalizeFirstLetter, filterInPlace } from "@/lib/methods";
import { SkillGroup } from "@/lib/definitions";
import Image from "next/image";
import SkillBox from "../ui/skill-box";
import CategoryToggle from "./components/category-toggle";

export const revalidate = 1200; // Revalidate every twenty minutes

const categoryNames = ["software", "hardware", "technical", "soft"];

export default async function skillsPage() {
  const skills = await fetchSkills([]);

  const categorySortedSkills: Skill[][] = [[], [], [], []];

  for (let i = 0; i < categoryNames.length; i++) {
    categorySortedSkills[i] = skills.filter((skill) => {
      return skill.category === categoryNames[i];
    });
  }

  const fullySortedCategories: sortedCategory[] = categorySortedSkills.map(
    (categoryOfSkills) => {
      return groupWithinCategory(categoryOfSkills);
    }
  );

  return (
    <div>
      <h1 className="mt-4 text-center">Skill Areas</h1>
      <div>
        <div>
          <CategoryToggle categories={categoryNames}>
            {fullySortedCategories.map((fullySortedCategory, index) => {
              return (
                <div key={categoryNames[index]}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Groups */}
                    {fullySortedCategory.groups.map((group) => {
                      return (
                        <div
                          key={group.parent.name}
                          className="relative p-4 rounded-2xl bg-[var(--background-secondary)] border-solid border-1 border-[var(--border)]"
                        >
                          <div className="mb-4 relative flex flex-col md:flex-row gap-2">
                            <span className="relative h-full w-auto">
                              <Image
                                src={
                                  group.parent.image_url || "/profileIcon.svg"
                                }
                                alt={group.parent.name}
                                width={16}
                                height={16}
                                className="w-12 h-12"
                              />
                            </span>
                            <h2>{capitalizeFirstLetter(group.parent.name)}</h2>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {group.childGroups.map((childgroup) => {
                              return (
                                <div
                                  key={
                                    group.parent.name +
                                    childgroup[0].subcategory
                                  }
                                  className="relative p-4 rounded-2xl bg-[var(--background-tertiary)] border-solid border-1 border-[var(--border)]"
                                >
                                  <h3 className="mb-2">
                                    {capitalizeFirstLetter(
                                      childgroup[0].subcategory
                                    )}
                                  </h3>
                                  <div className="flex flex-wrap gap-2">
                                    {childgroup.map((child) => {
                                      return (
                                        <span key={child.name}>
                                          <SkillBox area={child} />
                                        </span>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            })}
                            {group.unGroupedChildren.length > 0 && (
                              <div className="relative p-4 rounded-2xl bg-[var(--background-tertiary)] border-solid border-1 border-[var(--border)]">
                                <h3 className="mb-2">Misc.</h3>

                                <div className="flex flex-wrap gap-2">
                                  {group.unGroupedChildren.map((child) => {
                                    return (
                                      <span key={child.name}>
                                        <SkillBox area={child} />
                                      </span>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {fullySortedCategory.subcategoryGroups.map((group) => {
                      return (
                        <div
                          key={group[0].name + "subcategory"}
                          className="relative p-4 rounded-2xl bg-[var(--background-tertiary)] border-solid border-1 border-[var(--border)]"
                        >
                          <h2 className="mb-4">
                            {capitalizeFirstLetter(group[0].subcategory)}
                          </h2>
                          <div className="flex flex-wrap gap-2">
                            {group.map((skill) => {
                              return (
                                <span key={skill.name}>
                                  <SkillBox area={skill} />
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                    {fullySortedCategory.unGroupedSkills.length > 0 && (
                      <div className="relative p-4 rounded-2xl bg-[var(--background-tertiary)] border-solid border-1 border-[var(--border)]">
                        <h2 className="mb-4">Misc.</h2>

                        <div className="flex flex-wrap gap-2">
                          {fullySortedCategory.unGroupedSkills.map((skill) => {
                            return (
                              <span key={skill.name}>
                                <SkillBox area={skill} />
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </CategoryToggle>
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
  //Last array is for Misc. skills
  const groups: SkillGroup[] = [];

  const skillsWithParents = filterInPlace(unsortedCategorySkills, (skill) => {
    return skill.parent_skill_id !== null;
  });

  for (let i = 0; i < unsortedCategorySkills.length; i++) {
    const singleSkill = unsortedCategorySkills[i];

    const children = filterInPlace(skillsWithParents, (skill) => {
      return singleSkill.skill_id === skill.parent_skill_id;
    });

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

    const sameSubcategory = filterInPlace(skills, (skill) => {
      return skill.subcategory === singleSkill.subcategory;
    });

    if (sameSubcategory.length > 0) {
      sameSubcategory.unshift(singleSkill);
      subcategoryGroups.push(sameSubcategory);
    } else {
      loneSkills.push(singleSkill);
      i--;
    }
  }

  return [subcategoryGroups, loneSkills];
}
