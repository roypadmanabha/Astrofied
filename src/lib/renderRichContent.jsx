import React from 'react';
import { marked } from 'marked';

// Configure marked options
marked.setOptions({
  gfm: true,
  breaks: true,
});

/**
 * Parses markdown + inline HTML into sanitized safe HTML string
 */
export function parseRichContentToHtml(content) {
  if (!content) return '';
  try {
    return marked.parse(content);
  } catch (err) {
    console.error('Error parsing rich content:', err);
    return content;
  }
}

/**
 * Strips HTML and markdown for short snippet / line-clamp display
 */
export function stripRichFormatting(content) {
  if (!content) return '';
  return content
    .replace(/<[^>]*>/g, '') // strip HTML tags
    .replace(/^[#]{1,6}\s+/gm, '') // strip headers
    .replace(/[*_~`]/g, '') // strip markdown bold/italic/code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // replace markdown links with text
    .replace(/^[-*+]\s+/gm, '') // strip list bullets
    .trim();
}

/**
 * RichContent Component for rendering formatted newsfied updates
 */
export default function RichContent({ content, isDarkMode = false, className = '' }) {
  if (!content) return null;
  const html = parseRichContentToHtml(content);

  return (
    <div
      className={`newsfied-rich-content ${isDarkMode ? 'dark-mode' : 'light-mode'} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
