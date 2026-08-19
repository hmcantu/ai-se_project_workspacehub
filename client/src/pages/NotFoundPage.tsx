import { Link } from "react-router-dom";
import { StatusPanel } from "../components/StatusPanel";

export const NotFoundPage = () => {
  return (
    <div className="mx-auto max-w-xl py-20">
      <StatusPanel
        title="Page not found"
        message="The route you requested does not exist."
      />
      <div className="mt-4 text-center">
        <Link
          className="font-medium text-brand transition hover:underline active:opacity-70"
          to="/"
        >
          Return to dashboard
        </Link>
      </div>
    </div>
  );
};
