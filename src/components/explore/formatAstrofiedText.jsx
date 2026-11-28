import React from 'react';

/**
 * Formats any occurrence of the word "Astrofied" with the official brand gradient:
 * - Light mode: gradient from black to official red (#A30000)
 * - Dark mode: gradient from Red (#dc2626) to darkmode Yellow (#f0fe4f)
 * The word "Astrofied" alone is ALWAYS styled in Nunito Rounded 650 font weight to match the brand logo.
 */
export function formatAstrofiedText(content, isDarkMode, options = {}) {
  if (content === null || content === undefined) return content;
  if (typeof content !== 'string') return content;
  if (!content.includes('Astrofied')) return content;

  const parts = content.split(/(Astrofied)/g);
  return parts.map((part, index) => {
    if (part === 'Astrofied') {
      return (
        <span
          key={index}
          className={`astrofied-brand-gradient astrofied-word-brand bg-clip-text text-transparent bg-gradient-to-r ${
            isDarkMode
              ? 'from-red-600 to-[#f0fe4f]'
              : 'from-black to-[#A30000]'
          } inline-block`}
          style={{
            backgroundImage: isDarkMode
              ? 'linear-gradient(to right, #dc2626, #f0fe4f)'
              : 'linear-gradient(to right, #000000, #A30000)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block',
            fontFamily: '"Nunito", "Nunito Rounded", sans-serif',
            fontWeight: 650,
            fontVariationSettings: "'wght' 650"
          }}
        >
          Astrofied
        </span>
      );
    }
    return part;
  });
}

export default formatAstrofiedText;
