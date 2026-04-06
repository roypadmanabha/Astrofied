import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Security & Content Protection for Mobile/Tablet
if (window.innerWidth <= 1024) {
  // Block Right click (Context Menu)
  document.addEventListener('contextmenu', (e) => e.preventDefault());

  // Block Keyboard Shortcuts (Copy, Print, Save)
  document.addEventListener('keydown', (e) => {
    if (
      (e.ctrlKey || e.metaKey) && 
      (e.key === 'c' || e.key === 'p' || e.key === 's' || e.key === 'u')
    ) {
      e.preventDefault();
      return false;
    }
  });

  // Block Image Dragging
  document.addEventListener('dragstart', (e) => {
    if (e.target.nodeName === 'IMG') e.preventDefault();
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
