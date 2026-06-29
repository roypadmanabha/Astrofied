import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CircleAlert } from 'lucide-react';

export default function ContentProtection() {
  const [showToast, setShowToast] = useState(false);
  const toastTimeoutRef = useRef(null);

  const triggerToast = () => {
    // Clear any existing timeout
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    // Show toast
    setShowToast(true);
    // Hide after 2.5 seconds
    toastTimeoutRef.current = setTimeout(() => {
      setShowToast(false);
    }, 2500);
  };

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
      triggerToast();
    };

    const handleCopyCut = (e) => {
      e.preventDefault();
      triggerToast();
    };

    const handleDragDrop = (e) => {
      e.preventDefault();
      triggerToast();
    };

    const handleKeyDown = (e) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      // Detect Ctrl+P / Cmd+P (Print)
      // Detect Ctrl+C / Cmd+C (Copy)
      // Detect Ctrl+X / Cmd+X (Cut)
      // Detect Ctrl+U / Cmd+U (View Source)
      // Detect Ctrl+S / Cmd+S (Save)
      // Detect F12 / Inspect / Developer Tools shortcuts
      if (
        (e.key === 'p' && cmdOrCtrl) ||
        (e.key === 'c' && cmdOrCtrl) ||
        (e.key === 'x' && cmdOrCtrl) ||
        (e.key === 'u' && cmdOrCtrl) ||
        (e.key === 's' && cmdOrCtrl) ||
        e.key === 'F12' ||
        (e.shiftKey && cmdOrCtrl && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c'))
      ) {
        e.preventDefault();
        triggerToast();
      }
    };

    // Add event listeners globally
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopyCut);
    document.addEventListener('cut', handleCopyCut);
    document.addEventListener('dragstart', handleDragDrop);
    document.addEventListener('drop', handleDragDrop);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      // Clean up event listeners
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopyCut);
      document.removeEventListener('cut', handleCopyCut);
      document.removeEventListener('dragstart', handleDragDrop);
      document.removeEventListener('drop', handleDragDrop);
      window.removeEventListener('keydown', handleKeyDown);
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  return (
    <AnimatePresence>
      {showToast && (
        <div className="fixed top-28 left-0 right-0 z-[9999] flex justify-center px-4 pointer-events-none select-none">
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="pointer-events-auto flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-[#A30000] text-white shadow-2xl rounded-full max-w-[90vw] md:max-w-md border border-white/10"
          >
            <CircleAlert className="w-4 h-4 sm:w-5 sm:h-5 text-white shrink-0" />
            <span className="text-xs sm:text-sm md:text-base font-bold font-['Mulish'] tracking-wide">
              Not allowed. Content protection enabled.
            </span>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
