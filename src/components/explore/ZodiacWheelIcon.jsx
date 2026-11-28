import React from 'react';

export default function ZodiacWheelIcon({ className = "w-7 h-7 sm:w-8 sm:h-8", ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label="Zodiac Wheel Icon"
      {...props}
    >
      {/* Outer wheel boundary */}
      <circle cx="12" cy="12" r="10" strokeWidth="1.6" />
      
      {/* Inner house ring */}
      <circle cx="12" cy="12" r="5.8" strokeWidth="1.2" />
      
      {/* Center celestial hub */}
      <circle cx="12" cy="12" r="2.2" strokeWidth="1.2" fill="currentColor" fillOpacity="0.2" />
      <circle cx="12" cy="12" r="0.8" fill="currentColor" />

      {/* 12 Zodiac Houses / Spokes dividing the wheel */}
      {/* Cardinal 0°, 90°, 180°, 270° */}
      <line x1="17.8" y1="12" x2="22" y2="12" strokeWidth="1.4" />
      <line x1="12" y1="17.8" x2="12" y2="22" strokeWidth="1.4" />
      <line x1="2" y1="12" x2="6.2" y2="12" strokeWidth="1.4" />
      <line x1="12" y1="2" x2="12" y2="6.2" strokeWidth="1.4" />

      {/* 30°, 60° */}
      <line x1="17.02" y1="14.9" x2="20.66" y2="17" strokeWidth="1.2" />
      <line x1="14.9" y1="17.02" x2="17" y2="20.66" strokeWidth="1.2" />

      {/* 120°, 150° */}
      <line x1="9.1" y1="17.02" x2="7" y2="20.66" strokeWidth="1.2" />
      <line x1="6.98" y1="14.9" x2="3.34" y2="17" strokeWidth="1.2" />

      {/* 210°, 240° */}
      <line x1="6.98" y1="9.1" x2="3.34" y2="7" strokeWidth="1.2" />
      <line x1="9.1" y1="6.98" x2="7" y2="3.34" strokeWidth="1.2" />

      {/* 300°, 330° */}
      <line x1="14.9" y1="6.98" x2="17" y2="3.34" strokeWidth="1.2" />
      <line x1="17.02" y1="9.1" x2="20.66" y2="7" strokeWidth="1.2" />

      {/* 4 subtle center rays connecting hub */}
      <line x1="12" y1="9.8" x2="12" y2="6.2" strokeWidth="1" strokeDasharray="1 1" opacity="0.6" />
      <line x1="12" y1="14.2" x2="12" y2="17.8" strokeWidth="1" strokeDasharray="1 1" opacity="0.6" />
      <line x1="9.8" y1="12" x2="6.2" y2="12" strokeWidth="1" strokeDasharray="1 1" opacity="0.6" />
      <line x1="14.2" y1="12" x2="17.8" y2="12" strokeWidth="1" strokeDasharray="1 1" opacity="0.6" />
    </svg>
  );
}
