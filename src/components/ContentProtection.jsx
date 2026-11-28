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

    const handleContextMenu = (e) => {
      if (isInputOrAdmin(e.target)) return;
      e.preventDefault();
      triggerToast();
    };

    const handleCopyCut = (e) => {
      if (isInputOrAdmin(e.target)) return;
      e.preventDefault();
      triggerToast();
    };

    const handleDragDrop = (e) => {
      if (isInputOrAdmin(e.target)) return;
      e.preventDefault();
      triggerToast();
    };

    const handleKeyDown = (e) => {
      if (isInputOrAdmin(e.target)) return;
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
        <div className="fixed top-20 sm:top-24 left-0 right-0 z-[9999] flex justify-center px-4 pointer-events-none select-none">
          <motion.div
            initial={{ opacity: 0, y: -14, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto flex items-center justify-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 bg-[#8B0000]/95 backdrop-blur-md text-white shadow-xl shadow-black/30 rounded-full max-w-[90vw] sm:max-w-max border border-white/20 whitespace-nowrap"
          >
            <CircleAlert className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ffd700] shrink-0" />
            <span className="text-xs sm:text-[13px] font-semibold font-['Mulish'] tracking-wide">
              Not allowed. Content protection enabled.
            </span>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
