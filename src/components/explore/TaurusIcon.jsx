import React from 'react';

/**
 * Taurus Bull Head Icon
 * Crafted manually from user reference image depicting the majestic
 * golden bull head with sculpted curved horns, ears, facial plates,
 * nose ridges, and muzzle with nostrils.
 */
export default function TaurusIcon({ className = "w-7 h-7 sm:w-8 sm:h-8", ...props }) {
  return (
    <svg
      viewBox="17 17 66 64"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      aria-label="Taurus Bull Head Icon"
      {...props}
    >
      {/* --- Left Horn --- */}
      <path d="M 38 31 C 32 34, 23 34, 23 27 C 23 22, 30 19, 44 19 C 39 21, 35 25, 38 31 Z" />

      {/* --- Right Horn --- */}
      <path d="M 62 31 C 68 34, 77 34, 77 27 C 77 22, 70 19, 56 19 C 61 21, 65 25, 62 31 Z" />

      {/* --- Forehead Crown Plate --- */}
      <path d="M 50 29 C 55 29, 58 30, 60 32 L 62 41 C 58 41, 54 42, 50 44 C 46 42, 42 41, 38 41 L 40 32 C 42 30, 45 29, 50 29 Z" />

      {/* --- Left Ear --- */}
      <path d="M 35 41 L 19 44 C 23 47, 26 48, 27 48 C 29 46, 32 45, 34 45 Z" />

      {/* --- Right Ear --- */}
      <path d="M 65 41 L 81 44 C 77 47, 74 48, 73 48 C 71 46, 68 45, 66 45 Z" />

      {/* --- Left Eye / Brow Plate --- */}
      <path d="M 34 47 C 38 46, 44 47, 47 52 C 44 55, 38 56, 34 52 C 33 50, 33 48, 34 47 Z" />

      {/* --- Right Eye / Brow Plate --- */}
      <path d="M 66 47 C 62 46, 56 47, 53 52 C 56 55, 62 56, 66 52 C 67 50, 67 48, 66 47 Z" />

      {/* --- Left Cheek Plate --- */}
      <path d="M 34 53 C 33 58, 37 64, 42 67 C 44 65, 45 61, 46 56 C 41 54, 36 53, 34 53 Z" />

      {/* --- Right Cheek Plate --- */}
      <path d="M 66 53 C 67 58, 63 64, 58 67 C 56 65, 55 61, 54 56 C 59 54, 64 53, 66 53 Z" />

      {/* --- Nose Bridge Ridges (Horizontal Plates) --- */}
      <rect x="46.5" y="56" width="7" height="2.2" rx="0.8" />
      <rect x="46" y="59.5" width="8" height="2.2" rx="0.8" />
      <rect x="45.5" y="63" width="9" height="2.2" rx="0.8" />

      {/* --- Muzzle / Snout with Nostril Cutouts --- */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M 45 67 C 42 67, 39 69, 39 72 C 39 76, 43 79, 47 79 L 53 79 C 57 79, 61 76, 61 72 C 61 69, 58 67, 55 67 L 45 67 Z M 44 73.5 C 45.1 73.5, 46 72.6, 46 71.5 C 46 70.4, 45.1 69.5, 44 69.5 C 42.9 69.5, 42 70.4, 42 71.5 C 42 72.6, 42.9 73.5, 44 73.5 Z M 56 73.5 C 57.1 73.5, 58 72.6, 58 71.5 C 58 70.4, 57.1 69.5, 56 69.5 C 54.9 69.5, 54 70.4, 54 71.5 C 54 72.6, 54.9 73.5, 56 73.5 Z"
      />
    </svg>
  );
}
