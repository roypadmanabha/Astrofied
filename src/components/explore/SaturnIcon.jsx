import React from 'react';

/**
 * Saturn with its Ring Icon
 * Responsive SVG vector showing Saturn planet sphere and tilted orbital rings.
 */
export default function SaturnIcon({ className = "w-7 h-7 sm:w-8 sm:h-8", ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label="Saturn with Rings Icon"
      {...props}
    >
      <g transform="rotate(-25 12 12)">
        {/* Back portions of the rings (visible outside the sphere on top left & top right) */}
        {/* Outer Ring Back - Left */}
        <path
          d="M 1.5 12 A 10.5 3.3 0 0 1 7.2 9.4"
          strokeWidth="1.6"
        />
        {/* Outer Ring Back - Right */}
        <path
          d="M 16.8 9.4 A 10.5 3.3 0 0 1 22.5 12"
          strokeWidth="1.6"
        />

        {/* Inner Ring Back - Left */}
        <path
          d="M 3.8 12 A 8.2 2.4 0 0 1 7.5 10.2"
          strokeWidth="1.1"
          strokeOpacity="0.75"
        />
        {/* Inner Ring Back - Right */}
        <path
          d="M 16.5 10.2 A 8.2 2.4 0 0 1 20.2 12"
          strokeWidth="1.1"
          strokeOpacity="0.75"
        />

        {/* Planet Sphere */}
        <circle
          cx="12"
          cy="12"
          r="5.5"
          strokeWidth="1.6"
          fill="currentColor"
          fillOpacity="0.12"
        />

        {/* Planetary Latitude Bands */}
        <path
          d="M 7.2 10.2 Q 12 11.2 16.8 10.2"
          strokeWidth="1"
          strokeOpacity="0.4"
        />
        <path
          d="M 6.8 13.8 Q 12 14.8 17.2 13.8"
          strokeWidth="1"
          strokeOpacity="0.4"
        />

        {/* Front Ring Arcs (sweeping across the front of the sphere) */}
        {/* Main Outer Front Ring */}
        <path
          d="M 1.5 12 A 10.5 3.3 0 0 0 22.5 12"
          strokeWidth="1.6"
        />
        {/* Inner Front Ring (Cassini division depth) */}
        <path
          d="M 3.8 12 A 8.2 2.4 0 0 0 20.2 12"
          strokeWidth="1.1"
          strokeOpacity="0.75"
        />
      </g>
    </svg>
  );
}
