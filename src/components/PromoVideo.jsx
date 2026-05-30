import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CirclePlay } from 'lucide-react';
import promoVideo from '../assets/astrofied_promo.mp4';
import { useTheme } from '../context/ThemeContext';

const PromoVideo = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { isDarkMode } = useTheme();

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  return (
    <section className={`py-12 md:py-20 relative flex justify-center items-center overflow-hidden px-6 ${isDarkMode ? 'bg-transparent' : 'bg-white'}`}>
      <div className="container mx-auto max-w-[1200px] flex justify-center">
        <motion.div 
          className={`relative w-full max-w-4xl cursor-pointer rounded-[5px] border-[3px] transition-colors duration-500 ${isDarkMode ? 'border-gold shadow-[0_10px_40px_rgba(212,175,55,0.2)]' : 'border-[#4B0082] shadow-[0_10px_40px_rgba(75,0,130,0.2)]'}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.01 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onClick={togglePlay}
        >
          {/* Video Element */}
          <video
            ref={videoRef}
            src={promoVideo}
            className="w-full h-auto object-cover rounded-none"
            playsInline
            onEnded={handleVideoEnded}
            onPause={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
          />

          {/* Custom Play Button Overlay */}
          <AnimatePresence>
            {!isPlaying && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center transition-colors hover:bg-black/10"
              >
                <CirclePlay 
                  className="text-[#9d00ff] rounded-full transition-transform hover:scale-110" 
                  size={80} 
                  strokeWidth={1.5} 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default PromoVideo;
