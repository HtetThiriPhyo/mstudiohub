import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="grid min-h-[60vh] place-items-center text-center">
      <div>
        <h1 className="text-5xl font-extrabold text-teal">404</h1>
        <p className="mt-2 text-muted">This page could not be found.</p>
        <Link to="/" className="mt-4 inline-block font-bold text-teal">
          Go home
        </Link>
      </div>
    </div>
  );
}
