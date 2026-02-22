import * as React from "react";

/**
 * LeetCode logo as an SVG (uses currentColor).
 * Usage: <LeetcodeIcon className="w-5 h-5 text-[#FFA116]" />
 */
export function LeetcodeIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 256 256"
      role="img"
      aria-label="LeetCode"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* simplified official mark */}
      <path
        fill="currentColor"
        d="M204.3 122.7c5.2 5.2 5.2 13.6 0 18.8l-60.8 60.8c-5.2 5.2-13.6 5.2-18.8 0-5.2-5.2-5.2-13.6 0-18.8l51.4-51.4-51.4-51.4c-5.2-5.2-5.2-13.6 0-18.8 5.2-5.2 13.6-5.2 18.8 0l60.8 60.8z"
      />
      <path
        fill="currentColor"
        d="M118.9 214.1c-4.5 4.5-11.5 5.1-16.7 1.7-15.6-10.3-28.9-23.6-39.2-39.2-19.9-30.2-27.1-65.8-20.1-99.8 6.8-33.1 26.4-62 54.5-80.5 5.9-3.9 13.9-2.3 17.8 3.6 3.9 5.9 2.3 13.9-3.6 17.8-22.4 14.7-38 37.7-43.5 64.1-5.6 27.5.2 56.3 16.4 80.9 8.5 12.9 19.4 24 32.3 32.5 5.7 3.8 7.3 11.6 3.5 17.3-.5.8-1.1 1.5-1.7 2.1z"
      />
      <path
        fill="currentColor"
        d="M164 92H104c-7.4 0-13.3-6-13.3-13.3S96.6 65.4 104 65.4h60c7.4 0 13.3 6 13.3 13.3S171.4 92 164 92z"
      />
    </svg>
  );
}
