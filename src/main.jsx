import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Security & Content Protection for All Screen Sizes (exempts input fields, textareas & admin panel)
const isInputOrAdmin = (target) => {
  if (typeof window !== 'undefined') {
    const hash = window.location.hash.toLowerCase();
    const path = window.location.pathname.toLowerCase();
    if (hash.includes('admin') || path.includes('admin')) return true;
  }
  if (!target) return false;
  const tag = target.tagName ? target.tagName.toLowerCase() : '';
  return (
    tag === 'input' ||
    tag === 'textarea' ||
    target.isContentEditable ||
    Boolean(target.closest && target.closest('input, textarea, [contenteditable="true"]'))
  );
};

// 1. Context Menu
document.addEventListener('contextmenu', (e) => {
  if (isInputOrAdmin(e.target)) return;
  e.preventDefault();
});

// 2. Keyboard Shortcuts (Ctrl/Cmd+V, C, X allowed in input fields & admin)
document.addEventListener('keydown', (e) => {
  if (isInputOrAdmin(e.target)) return;

  const key = e.key.toLowerCase();
  const isCtrlOrMeta = e.ctrlKey || e.metaKey;

  if (
    // Copy, Paste, Cut, Print, Save, View Source
    (isCtrlOrMeta && ['c', 'v', 'x', 'p', 's', 'u'].includes(key)) ||
    // Developer Tools shortcuts (Ctrl+Shift+I, J, C)
    (isCtrlOrMeta && e.shiftKey && ['i', 'j', 'c'].includes(key)) ||
    // F12 key
    e.key === 'F12'
  ) {
    e.preventDefault();
    return false;
  }
});

// 3. Dragging & Dropping
document.addEventListener('dragstart', (e) => {
  if (isInputOrAdmin(e.target)) return;
  e.preventDefault();
});
document.addEventListener('drop', (e) => {
  if (isInputOrAdmin(e.target)) return;
  e.preventDefault();
});

// 4. Copy, Cut, Paste Events (allowed in input fields & admin)
document.addEventListener('copy', (e) => {
  if (isInputOrAdmin(e.target)) return;
  e.preventDefault();
});
document.addEventListener('cut', (e) => {
  if (isInputOrAdmin(e.target)) return;
  e.preventDefault();
});
document.addEventListener('paste', (e) => {
  if (isInputOrAdmin(e.target)) return;
  e.preventDefault();
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

 
 
