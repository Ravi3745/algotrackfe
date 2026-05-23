import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      className="
        min-h-screen
        flex flex-col
        items-center
        justify-center
        bg-gray-100
        px-4
      "
    >
      <h1
        className="
          text-7xl
          font-bold
          mb-4
        "
      >
        404
      </h1>

      <p
        className="
          text-gray-600
          text-lg
          mb-6
        "
      >
        Page not found
      </p>

      <Link
        to="/dashboard"
        className="
          bg-black
          text-white
          px-6 py-3
          rounded-xl
        "
      >
        Go to Dashboard
      </Link>
    </div>
  );
}

export default NotFound;
