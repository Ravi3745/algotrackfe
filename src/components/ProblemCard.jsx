import DifficultyBadge from "./DifficultyBadge";

function ProblemCard({ problem, onToggleProgress }) {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        p-6
        shadow-sm
      "
    >
      {/* Top Section */}
      <div
        className="
          flex justify-between
          items-start mb-5
        "
      >
        <div>
          <h2
            className="
              text-xl
              font-semibold
              mb-2
            "
          >
            {problem.title}
          </h2>

          <DifficultyBadge difficulty={problem.difficulty} />
        </div>

        {/* Checkbox */}
        <label
          className="
            flex items-center
            gap-2 cursor-pointer
          "
        >
          <input
            type="checkbox"
            checked={problem.completed}
            onChange={() => onToggleProgress(problem._id)}
            className="w-5 h-5"
          />

          <span
            className="
              text-sm
              font-medium
            "
          >
            Completed
          </span>
        </label>
      </div>

      {/* Links */}
      <div
        className="
          flex flex-wrap
          gap-4
        "
      >
        {/* YouTube */}
        <a
          href={problem.youtubeLink}
          target="_blank"
          rel="noreferrer"
          className="
            bg-red-100
            text-red-700
            px-4 py-2
            rounded-lg
            text-sm
            font-medium
          "
        >
          YouTube Tutorial
        </a>

        {/* LeetCode */}
        <a
          href={problem.leetcodeLink}
          target="_blank"
          rel="noreferrer"
          className="
            bg-yellow-100
            text-yellow-700
            px-4 py-2
            rounded-lg
            text-sm
            font-medium
          "
        >
          LeetCode Problem
        </a>

        {/* Article */}
        <a
          href={problem.articleLink}
          target="_blank"
          rel="noreferrer"
          className="
            bg-blue-100
            text-blue-700
            px-4 py-2
            rounded-lg
            text-sm
            font-medium
          "
        >
          Theory Article
        </a>
      </div>
    </div>
  );
}

export default ProblemCard;
