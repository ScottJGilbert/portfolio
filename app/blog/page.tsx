import GridDisplay from "../ui/grid/grid-display";

export default function Page() {
  return (
    <div>
      <h1>Blog</h1>
      <hr className="mt-1 mb-3"></hr>
      <GridDisplay type="blog" />
    </div>
  );
}
