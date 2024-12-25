interface SkillBadgeProps {
  skill: string;
  onRemove: () => void;
}

export function SkillBadge({ skill, onRemove }: SkillBadgeProps) {
  return (
    <div className="group relative inline-flex items-center">
      <img
        src={`https://img.shields.io/badge/${skill}-6495ed?style=for-the-badge`}
        alt={skill}
        className="h-7"
      />
      <button
        onClick={onRemove}
        className="absolute -right-2 -top-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    </div>
  );
}