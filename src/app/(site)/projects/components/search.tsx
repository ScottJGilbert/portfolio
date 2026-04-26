// import { Card } from "@/components/ui/card";
// import { projectsPageData } from "../content";

// export default function Search() {
//   return (
//     <Card variant="surface" padding="lg" className="space-y-4">
//       <div className="grid gap-4 md:grid-cols-3">
//         <label className="space-y-2 text-xs uppercase tracking-[0.14em] text-muted">
//           Search
//           <input
//             type="text"
//             placeholder="Search projects (coming soon)"
//             disabled
//             className="w-full rounded-md border border-outline-ghost bg-surface-alt px-3 py-2 text-sm text-muted"
//           />
//         </label>

//         <label className="space-y-2 text-xs uppercase tracking-[0.14em] text-muted">
//           Category
//           <select
//             disabled
//             defaultValue={projectsPageData.filterOptions.categories[0]}
//             className="w-full rounded-md border border-outline-ghost bg-surface-alt px-3 py-2 text-sm text-muted"
//           >
//             {projectsPageData.filterOptions.categories.map((option) => (
//               <option key={option} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>
//         </label>

//         <label className="space-y-2 text-xs uppercase tracking-[0.14em] text-muted">
//           Sort
//           <select
//             disabled
//             defaultValue={projectsPageContent.filterOptions.sort[0]}
//             className="w-full rounded-md border border-outline-ghost bg-surface-alt px-3 py-2 text-sm text-muted"
//           >
//             {projectsPageContent.filterOptions.sort.map((option) => (
//               <option key={option} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>
//         </label>
//       </div>
//       <p className="text-xs uppercase tracking-[0.14em] text-muted">
//         Filtering controls are staged for a future interactive release.
//       </p>
//     </Card>
//   );
// }
