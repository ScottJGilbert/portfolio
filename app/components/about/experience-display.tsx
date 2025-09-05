import { Experience } from "@/lib/definitions";
import MDXExperience from "../mdx/mdx-experience";
import ExpertiseBox from "@/app/ui/expertise";
import clsx from "clsx";

export default function ExperienceDisplay({
  data,
}: {
  data: {
    startDate: Date;
    experiences: Experience[];
    endDate: Date | null;
  };
}) {
  data.experiences.sort(
    (a, b) => b.start_date.getTime() - a.start_date.getTime()
  );

  return (
    <div className="mb-2 p-4 bg-green-950 rounded-4xl border-gray-50 border-1">
      <div className="flex-1 mb-4">
        <h2>{data.experiences[0].organization}</h2>
        <h4>
          {data.experiences[
            data.experiences.length - 1
          ].start_date.toDateString() +
            " - " +
            (data.experiences[0].end_date === null
              ? "ongoing"
              : data.experiences[0].end_date?.toDateString())}
        </h4>
      </div>
      <div className="flex gap-4">
        {data.experiences.map((experience, index) => {
          return (
            <div key={experience.title + "experience"} className="flex gap-4">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 40 40"
                  fill="none"
                  className="w-8 translate-y-1 z-20 absolute"
                >
                  {/* Timeline circle that goes in the middle */}
                  <circle
                    cx={20}
                    cy={20}
                    r={15}
                    stroke="gold"
                    strokeWidth={10}
                    className="z-20 fill-green-950"
                  />
                </svg>
                <svg
                  preserveAspectRatio="none"
                  className={clsx("translate-y-4 h-full w-8 z-0", {
                    invisible: index === data.experiences.length - 1,
                    visible: index !== data.experiences.length - 1,
                  })}
                  viewBox="0 -5 40 45"
                >
                  {/* Line that goes beneath circle and connects to the next one - hidden if this is this last entry */}
                  <line
                    x1={20}
                    x2={20}
                    y1={-5}
                    y2={45}
                    stroke="gold"
                    strokeWidth={10}
                    className="z-0"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3>{experience.title}</h3>
                <h4>
                  {(experience.self_employed ? "(Self Employed)" : "") +
                    (experience.self_employed && experience.volunteer
                      ? " | "
                      : "") +
                    (experience.volunteer ? "(Volunteer)" : "")}
                </h4>
                <MDXExperience markdown={experience.markdown} />
                <div className="flex flex-wrap gap-2 mt-4 mb-4">
                  {experience.expertise.map((expertise) => {
                    return (
                      <ExpertiseBox
                        key={expertise.name + "area"}
                        area={expertise}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
