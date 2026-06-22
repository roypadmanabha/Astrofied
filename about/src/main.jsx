import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Security & Content Protection for All Screen Sizes
// 1. Block Right Click (Context Menu)
document.addEventListener('contextmenu', (e) => e.preventDefault());

// 2. Block Keyboard Shortcuts (Copy, Paste, Cut, Print, Save, View Source, Developer Tools)
document.addEventListener('keydown', (e) => {
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

// 3. Block Dragging & Dropping
document.addEventListener('dragstart', (e) => e.preventDefault());
document.addEventListener('drop', (e) => e.preventDefault());

// 4. Block Copy, Cut, Paste Events
document.addEventListener('copy', (e) => e.preventDefault());
document.addEventListener('cut', (e) => e.preventDefault());
document.addEventListener('paste', (e) => e.preventDefault());

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
