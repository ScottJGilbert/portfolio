//Get this to somehow show the date of beginning at that organization and then sort latest to earliest top to bottom
import { fetchExperienceIDs, fetchExperience } from "@/lib/db";
import { Experience } from "@/lib/definitions";
import ExperienceDisplay from "./experience-display";

async function pullData(
  ids: number[]
): Promise<[Experience[][], Date[], (Date | null)[]]> {
  const experiences: Experience[][] = [];
  const startDates: Date[] = [];
  const endDates: (Date | null)[] = [];
  const orgIndexMap = new Map<string, number>();

  for (const id of ids) {
    const exp = await fetchExperience(id);
    const org = exp.organization;

    if (orgIndexMap.has(org)) {
      const idx = orgIndexMap.get(org)!;
      experiences[idx].push(exp);
      if (exp.start_date < startDates[idx]) startDates[idx] = exp.start_date;

      const currentEnd = endDates[idx];
      if (!currentEnd || !exp.end_date || exp.end_date > currentEnd) {
        endDates[idx] = exp.end_date;
      }
    } else {
      const idx = experiences.length;
      orgIndexMap.set(org, idx);
      experiences.push([exp]);
      startDates.push(exp.start_date);
      endDates.push(exp.end_date);
    }
  }

  return [experiences, startDates, endDates];
}

function sortData(
  unSortedExperiences: Experience[][],
  unSortedStartDates: Date[],
  unSortedEndDates: (Date | null)[]
) {
  const combined = unSortedStartDates.map((startDate, index) => ({
    startDate,
    experiences: unSortedExperiences[index],
    endDate: unSortedEndDates[index],
  }));

  // Step 2: Sort by date descending
  combined.sort((a, b) => b.startDate.getTime() - a.startDate.getTime());

  return combined;
}

export default async function AllExperience() {
  const ids = await fetchExperienceIDs();
  const [unSortedExperiences, unSortedStartDates, unSortedEndDates] =
    await pullData(ids);
  const combined = sortData(
    unSortedExperiences as Experience[][],
    unSortedStartDates as Date[],
    unSortedEndDates as Date[]
  );

  return (
    <div className="flex flex-col gap-4">
      {combined.map((entry, index) => {
        return (
          <ExperienceDisplay
            key={entry.experiences[0].organization + "entry"}
            data={entry}
          />
        );
      })}
    </div>
  );
}
