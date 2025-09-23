import { FaFrown } from "react-icons/fa";

export default function MaintenancePage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-4 text-center">
      <h1>
        Sorry! <FaFrown className="inline -translate-y-0.5" />
      </h1>
      <h3>
        The website is currently under maintenance. Please check back later!
      </h3>
    </div>
  );
}
