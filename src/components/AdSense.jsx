import React, { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const AdSense = ({ slot, format = 'auto' }) => {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    try {
      // Ensure Google Ads script is loaded and then push the ad
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, [slot]);

  return (
    <div className={`container mx-auto px-6 my-12 flex flex-col items-center justify-center overflow-hidden`}>
      {/* Label for development/preview */}
      <span className={`text-[10px] uppercase tracking-widest opacity-30 mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
        Advertisement
      </span>
      
      <div className={`w-full max-w-5xl min-h-[100px] rounded-2xl flex items-center justify-center border border-dashed transition-colors ${
        isDarkMode ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
      }`}>
        <ins className="adsbygoogle"
             style={{ display: 'block', width: '100%' }}
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot={slot}
             data-ad-format={format}
             data-full-width-responsive="true"></ins>
      </div>
    </div>
  );
};

export default AdSense;
