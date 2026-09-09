import { Card } from "@/components/ui/card";

export default function Search() {
  return (
    <Card variant="surface" padding="lg" className="space-y-4">
      <div>
        <label className="space-y-2 text-xs uppercase tracking-[0.14em] text-muted">
          Search
          <input
            type="text"
            placeholder="Search projects (coming soon)"
            disabled
            className="w-full rounded-md border border-outline-ghost bg-surface-alt px-3 py-2 text-sm text-muted"
          />
        </label>
        <div className="mt-2 grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-xs uppercase tracking-[0.14em] text-muted">
            Category
            <select
              disabled
              defaultValue="all"
              className="mt-1 w-full rounded-md border border-outline-ghost bg-surface-alt px-3 py-2 text-sm text-muted"
            >
              <option value="all">All categories</option>
            </select>
          </label>

          <label className="space-y-2 text-xs uppercase tracking-[0.14em] text-muted">
            Sort
            <select
              disabled
              defaultValue="newest"
              className="mt-1 w-full rounded-md border border-outline-ghost bg-surface-alt px-3 py-2 text-sm text-muted"
            >
              <option value="newest">Newest first</option>
            </select>
          </label>
        </div>
      </div>
      <p className="text-xs uppercase tracking-[0.14em] text-muted">
        Filtering controls are staged for a future interactive release.
      </p>
    </Card>
  );
}
