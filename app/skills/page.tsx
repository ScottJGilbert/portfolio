import { fetchSkills } from "@/lib/db";
import { Skill } from "@/lib/definitions";
import { capitalizeFirstLetter, filterInPlace } from "@/lib/methods";
import { SkillGroup } from "@/lib/definitions";
import SkillBox from "../ui/skill-box";
import CategoryToggle from "./components/category-toggle";
import Title from "./components/title";

export const revalidate = 60; // Revalidate every twenty minutes

const categoryNames = ["software", "hardware", "technical", "soft"];

type sortedCategory = {
  groups: SkillGroup[];
  subcategoryGroups: Skill[][];
  unGroupedSkills: Skill[];
};

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

  for (const fullySortedCategory of fullySortedCategories) {
    fullySortedCategory.groups = orderByNumChildren(fullySortedCategory.groups);
  }

  return (
    <div className="flex flex-col items-center min-h-screen mt-4 md:px-4">
      <div className="w-full max-w-6xlflex flex-col gap-2">
        <h1 className="text-4xl font-bold text-center mb-6 text-zinc-900 dark:text-zinc-100">
          Skill Areas
        </h1>
        <div>
          <CategoryToggle categories={categoryNames}>
            {fullySortedCategories.map((fullySortedCategory, index) => (
              <div
                key={categoryNames[index]}
                className="mb-10 bg-[var(--background-tertiary)] rounded-3xl shadow-xl p-4 sm:p-8 border border-[var(--border-secondary)]"
              >
                {/* Category Title */}
                <h2 className="text-2xl font-semibold mb-6 text-center">
                  {capitalizeFirstLetter(categoryNames[index])}
                </h2>
                {/* Groups */}
                {fullySortedCategory.groups.length > 0 && (
                  <div className="flex flex-col gap-6 mb-8 sm:flex-row sm:flex-wrap">
                    {fullySortedCategory.groups.map((group) => {
                      // Calculate total children (grouped + ungrouped)
                      const numChildren =
                        group.childGroups.reduce(
                          (sum, g) => sum + g.length,
                          0
                        ) + group.unGroupedChildren.length;

                      // Decide flex-basis and flex-grow based on number of children
                      let flexBasis = "min-w-[220px]";
                      let flexGrow = "flex-1";
                      if (numChildren >= 10) {
                        flexBasis = "sm:basis-[66%] sm:min-w-[480px]";
                        flexGrow = "sm:flex-[2_2_0%]";
                      } else if (numChildren >= 6) {
                        flexBasis = "sm:basis-[48%] sm:min-w-[380px]";
                        flexGrow = "sm:flex-[1.5_1.5_0%]";
                      }

                      return (
                        <div
                          key={group.parent.name}
                          className={`w-full ${flexGrow} ${flexBasis} bg-[var(--background-secondary)] border border-[var(--border-secondary)] rounded-2xl shadow-md p-4 sm:p-6`}
                        >
                          <div className="mb-4 flex gap-4 items-center">
                            <Title group={group} />
                          </div>
                          <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap">
                            {group.childGroups.map((childgroup) => (
                              <div
                                key={
                                  group.parent.name + childgroup[0].subcategory
                                }
                                className="min-w-[140px] sm:min-w-[180px]"
                              >
                                <h3 className="mb-2 text-lg font-semibold text-zinc-700 dark:text-zinc-200">
                                  {capitalizeFirstLetter(
                                    childgroup[0].subcategory
                                  )}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                  {childgroup.map((child) => (
                                    <SkillBox key={child.name} area={child} />
                                  ))}
                                </div>
                              </div>
                            ))}
                            {group.unGroupedChildren.length > 0 && (
                              <div className="min-w-[140px] sm:min-w-[180px]">
                                <h3 className="mb-2 text-lg font-semibold text-zinc-700 dark:text-zinc-200">
                                  Misc.
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                  {group.unGroupedChildren.map((child) => (
                                    <SkillBox key={child.name} area={child} />
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                {/* Subcategories and Misc */}
                <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap">
                  {fullySortedCategory.subcategoryGroups.map((group) => (
                    <div
                      key={group[0].name + "subcategory"}
                      className="flex-1 min-w-[160px] sm:min-w-[220px] bg-[var(--background-secondary)] border border-[var(--border-secondary)] rounded-2xl shadow p-4 sm:p-6 pt-2"
                    >
                      <h2 className="mb-4 text-lg font-semibold">
                        {capitalizeFirstLetter(group[0].subcategory)}
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {group.map((skill) => (
                          <SkillBox key={skill.name} area={skill} />
                        ))}
                      </div>
                    </div>
                  ))}
                  {fullySortedCategory.unGroupedSkills.length > 0 && (
                    <div className="flex-1 min-w-[160px] sm:min-w-[220px] bg-[var(--background-secondary)] border border-[var(--border-secondary)] rounded-2xl shadow p-4 sm:p-6 pt-2">
                      <h2 className="mb-4 text-lg font-semibold text-zinc-700 dark:text-zinc-200">
                        Misc.
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {fullySortedCategory.unGroupedSkills.map((skill) => (
                          <SkillBox key={skill.name} area={skill} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CategoryToggle>
        </div>
      </div>
    </div>
  );
}

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

  while (skills.length > 0) {
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
    }
  }

  return [subcategoryGroups, loneSkills];
}

function orderByNumChildren(unsortedSkillGroups: SkillGroup[]): SkillGroup[] {
  return unsortedSkillGroups.sort((a, b) => {
    const aChildrenCount =
      a.childGroups.reduce((sum, group) => sum + group.length, 0) +
      a.unGroupedChildren.length;
    const bChildrenCount =
      b.childGroups.reduce((sum, group) => sum + group.length, 0) +
      b.unGroupedChildren.length;
    return bChildrenCount - aChildrenCount;
  });
}
