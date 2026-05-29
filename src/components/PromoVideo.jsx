import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';
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
    <section className={`py-12 md:py-20 relative flex justify-center items-center overflow-hidden px-6 ${isDarkMode ? 'bg-[#05010d]' : 'bg-[#FAF9F6]'}`}>
      <div className="container mx-auto max-w-[1200px] flex justify-center">
        <motion.div 
          className="relative w-full max-w-4xl cursor-pointer rounded-[15px] shadow-2xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onClick={togglePlay}
        >
          {/* Video Element */}
          <video
            ref={videoRef}
            src={promoVideo}
            className="w-full h-auto object-cover rounded-[15px]"
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
                className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] rounded-[15px]"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gold/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.4)] transform transition-transform hover:scale-110">
                  <Play className="text-black ml-1 md:ml-2" size={32} strokeWidth={2.5} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default PromoVideo;
