import React from 'react';

/**
 * Manually crafted vector icon representing the upcoming time/forecast clock
 * with clockwise cycle arrow and clock hands, matching user's reference image.
 */
export default function UpcomingClockIcon({ className = "w-7 h-7 sm:w-8 sm:h-8", ...props }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      aria-label="Upcoming Incidents Clock Icon"
      {...props}
    >
      {/* Light / faded sector of the circular track (behind arrowhead to ~2 o'clock) */}
      <path
        d="M 44 14 A 39 39 0 0 1 83.8 30.5"
        stroke="currentColor"
        strokeWidth="11"
        strokeOpacity="0.28"
      />

      {/* Main solid circular track (from ~2 o'clock clockwise to arrowhead base) */}
      <path
        d="M 83.8 30.5 A 39 39 0 1 1 44 14"
        stroke="currentColor"
        strokeWidth="11"
      />

      {/* Clockwise Arrowhead at the top pointing right */}
      <polygon
        points="44,2 63,14 44,26"
        fill="currentColor"
      />

      {/* Center Clock Hands (pointing at ~1:15 and ~4:30) */}
      {/* Minute Hand (longer, angled upwards right) */}
      <line
        x1="50"
        y1="50"
        x2="63"
        y2="27"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
      />

      {/* Hour Hand (shorter, angled downwards right) */}
      <line
        x1="50"
        y1="50"
        x2="64"
        y2="64"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
      />

      {/* Center Hub with contrasting core dot */}
      <circle cx="50" cy="50" r="6.5" fill="currentColor" />
      <circle cx="50" cy="50" r="3.2" fill="currentColor" fillOpacity="0.3" />
    </svg>
  );
}
