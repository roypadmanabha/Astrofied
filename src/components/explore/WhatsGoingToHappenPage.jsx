import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Clock, 
  Eye, 
  ArrowRight 
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import ExploreHeader from './ExploreHeader';
import { formatAstrofiedText } from './formatAstrofiedText';
import { 
  getInitialForecastsDataSync, 
  getForecastsData, 
  FORECASTS_SYNC_EVENT, 
  FORECASTS_STORAGE_KEY 
} from '../../lib/forecastsStorage';

/**
 * Transforms rich HTML content inside cards of THIS PAGE:
 * In dark mode, all #A30000 / rgb(163,0,0) texts automatically adapt to dark-mode yellow (#f0fe4f).
 */
function renderForecastCardHtml(content, isDarkMode) {
  if (!content) return '';
  if (typeof content !== 'string') return content;
  
  let processed = content;
  if (isDarkMode) {
    processed = processed
      .replace(/#a30000/gi, '#f0fe4f')
      .replace(/rgb\(\s*163\s*,\s*0\s*,\s*0\s*\)/gi, '#f0fe4f');
  }
  return processed;
}

export default function WhatsGoingToHappenPage({ onBackToHome, onBackToExplore }) {
  const { isDarkMode } = useTheme();
  const [forecastsData, setForecastsData] = useState(getInitialForecastsDataSync);

  // Sync data with admin updates and localStorage
  useEffect(() => {
    getForecastsData().then((data) => {
      if (data && Array.isArray(data.upcomingForecasts)) {
        setForecastsData(data);
      }
    });

    const handleSync = (e) => {
      if (e.detail && Array.isArray(e.detail.upcomingForecasts)) {
        setForecastsData(e.detail);
      }
    };

    const handleStorage = (e) => {
      if (e.key === FORECASTS_STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (parsed && Array.isArray(parsed.upcomingForecasts)) {
            setForecastsData(parsed);
          }
        } catch {}
      }
    };

    window.addEventListener(FORECASTS_SYNC_EVENT, handleSync);
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener(FORECASTS_SYNC_EVENT, handleSync);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const upcomingForecasts = forecastsData.upcomingForecasts || [];

  return (
    <div className={`min-h-screen pb-24 ${isDarkMode ? '' : 'bg-white text-black'}`}>
      {/* Auto Dark Mode Style Override for THIS PAGE ONLY:
          Any text inside .whats-going-card styled with #A30000 automatically turns yellow (#f0fe4f) */}
      <style>{`
        .dark .whats-going-card [style*="#A30000" i],
        .dark .whats-going-card [style*="#a30000" i],
        .dark .whats-going-card [style*="rgb(163, 0, 0)"],
        .dark .whats-going-card [style*="rgb(163,0,0)"],
        .dark .whats-going-card [data-color-light="#a30000" i],
        .dark .whats-going-card [data-color-light="#A30000" i] {
          color: #f0fe4f !important;
        }
      `}</style>
      <ExploreHeader
        title="What’s Going to Happen"
        subtitle="Forecasts for India over the next 3–4 months, highlighting major upcoming astrological trends and key indicators."
        currentSection="What's Going to Happen"
        onBackToHome={onBackToHome}
        onBackToExplore={onBackToExplore}
      />

      <div className="container mx-auto px-3 sm:px-6 max-w-7xl mt-4 sm:mt-6">
        {/* Upcoming Forecast Cards Grid (Next 3–4 Months) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8"
        >
          {upcomingForecasts.map((fc, idx) => (
            <motion.div
              key={fc.id || idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className={`whats-going-card rounded-2xl sm:rounded-[30px] p-4 sm:p-8 border-[0.5px] flex flex-col justify-between shadow-sm transition-all duration-300 relative overflow-hidden ${
                isDarkMode
                  ? 'bg-[#17202a] border-white hover:border-purple-500/40 text-white'
                  : 'bg-[#f5f5dd] border-[#A30000] hover:border-purple-600/40 text-black'
              }`}
              style={{
                border: isDarkMode ? '0.5px solid #ffffff' : '0.5px solid #A30000'
              }}
            >
              <div>
                {/* Meta Bar */}
                <div className="flex items-center justify-between gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap">
                  <span
                    className={`px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider border ${
                      isDarkMode ? 'bg-white/5 border-white/10 text-gray-300' : 'bg-white border-black/10 text-gray-800'
                    }`}
                  >
                    {fc.category}
                  </span>

                  <span className={`px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider border ${fc.badgeColor || 'bg-purple-500/10 text-purple-400 border-purple-500/30'}`}>
                    {fc.urgency}
                  </span>
                </div>

                {/* Timeframe pill */}
                <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold font-nunito text-gold dark:text-[#f0fe4f] mb-1.5 sm:mb-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{fc.timeframe}</span>
                </div>

                {/* Title - Auto Yellow (#f0fe4f) in Dark Mode */}
                <h3
                  className={`text-base sm:text-2xl font-mulish tracking-tight mb-2 sm:mb-3 leading-snug font-medium ${
                    isDarkMode ? 'text-[#f0fe4f]' : 'text-[#A30000]'
                  }`}
                  style={{ fontFamily: '"Mulish", sans-serif', fontWeight: 500 }}
                  dangerouslySetInnerHTML={{
                    __html: renderForecastCardHtml(fc.title, isDarkMode)
                  }}
                />

                {/* Summary with Rich HTML & Color Control */}
                <div
                  className="text-xs sm:text-sm leading-relaxed opacity-85 font-mulish mb-4 text-left sm:text-justify forecast-card-text"
                  dangerouslySetInnerHTML={{
                    __html: renderForecastCardHtml(fc.summary, isDarkMode)
                  }}
                />

                {/* Planetary Drivers */}
                {fc.planetaryDrivers && (
                  <div
                    className={`p-2.5 sm:p-3.5 rounded-xl border text-[11px] sm:text-xs font-mulish mb-4 ${
                      isDarkMode ? 'bg-white/[0.02] border-white/5' : 'bg-white border-black/10'
                    }`}
                  >
                    <strong className="block text-gold dark:text-[#f0fe4f] mb-0.5">Planetary Trigger:</strong>
                    <span
                      className="opacity-80"
                      dangerouslySetInnerHTML={{
                        __html: renderForecastCardHtml(fc.planetaryDrivers, isDarkMode)
                      }}
                    />
                  </div>
                )}

                {/* Key Signals */}
                {(fc.keySignals || []).length > 0 && (
                  <div className="flex flex-col gap-1.5 mb-2">
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider opacity-60">
                      Indicators to Watch:
                    </span>
                    {fc.keySignals.map((signal, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mulish opacity-85">
                        <span className="text-purple-500 font-bold">•</span>
                        <span>{signal}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
