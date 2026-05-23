import { DIFFICULTY_STYLES } 
from "../constants/difficulty";

function DifficultyBadge({ difficulty }) {
  return (
    <span
      className={`
        px-3 py-1 rounded-full
        text-sm font-medium
        ${DIFFICULTY_STYLES[difficulty]}
      `}
    >
      {difficulty}
    </span>
  );
}

export default DifficultyBadge;