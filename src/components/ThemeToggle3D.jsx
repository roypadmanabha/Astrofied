import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle3D() {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <motion.button
            onClick={toggleTheme}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className={`fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-xl border-2 transition-all duration-500 overflow-hidden ${
                isDarkMode 
                    ? 'bg-black/40 border-gold/40 text-gold shadow-gold/20' 
                    : 'bg-white/60 border-purple-600/20 text-[#4B0082] shadow-purple-600/10'
            }`}
            aria-label="Toggle Theme"
        >
            <div className="relative w-full h-full flex items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={isDarkMode ? 'dark' : 'light'}
                        initial={{ y: 20, opacity: 0, rotate: -45 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        exit={{ y: -20, opacity: 0, rotate: 45 }}
                        transition={{ duration: 0.3, ease: "backOut" }}
                    >
                        {isDarkMode ? (
                            <Moon className="w-6 h-6 md:w-7 md:h-7 fill-gold" />
                        ) : (
                            <Sun className="w-6 h-6 md:w-7 md:h-7 fill-current" />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
            
            {/* Dynamic Glow Effect */}
            <div className={`absolute inset-0 opacity-20 -z-10 blur-xl transition-colors duration-500 ${
                isDarkMode ? 'bg-gold' : 'bg-purple-600'
            }`} />
        </motion.button>
    );
}
