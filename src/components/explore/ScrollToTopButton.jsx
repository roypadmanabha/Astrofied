import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 280) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('hashchange', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 1.1, immediate: false });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-20 right-4 sm:bottom-22 sm:right-5 md:bottom-24 md:right-6 z-50 flex items-center justify-center">
          {/* Desktop Hover Tooltip */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, x: 8, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className={`absolute right-13 md:right-15 top-1/2 -translate-y-1/2 font-mulish font-semibold text-[11px] md:text-xs px-2.5 py-1 rounded-md shadow-lg pointer-events-none whitespace-nowrap tracking-wide select-none hidden md:block border ${
                  isDarkMode
                    ? 'bg-[#18181b] text-[#f0fe4f] border-[#f0fe4f]/30 shadow-black/60'
                    : 'bg-white text-stone-800 border-amber-500/25 shadow-stone-800/10'
                }`}
              >
                Scroll to top
                {/* Arrow */}
                <div
                  className={`absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 border-r border-t ${
                    isDarkMode
                      ? 'bg-[#18181b] border-[#f0fe4f]/30'
                      : 'bg-white border-amber-500/25'
                  }`}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Responsive Size Adjusted Button */}
          <motion.button
            onClick={scrollToTop}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
            aria-label="Scroll to top of page"
            title="Scroll to top"
            initial={{ opacity: 0, scale: 0.7, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 12 }}
            whileHover={{ scale: 1.12, y: -2 }}
            whileTap={{ scale: 0.92 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className={`w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isDarkMode
                ? 'bg-[#141416]/90 backdrop-blur-md text-[#f0fe4f] border border-[#f0fe4f]/40 shadow-lg shadow-black/50 hover:bg-[#1f1f24] hover:border-[#f0fe4f] focus:ring-[#f0fe4f] focus:ring-offset-[#0a0a0a]'
                : 'bg-white/95 backdrop-blur-md text-amber-700 border border-amber-500/35 shadow-lg shadow-amber-900/10 hover:bg-amber-50/90 hover:border-amber-600 focus:ring-amber-500 focus:ring-offset-white'
            }`}
          >
            <ChevronUp className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 stroke-[2.5]" />
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );
}
