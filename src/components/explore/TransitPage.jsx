import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar, 
  Sparkles, 
  ArrowRight,
  Compass
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import ExploreHeader from './ExploreHeader';
import { 
  transitCategoriesConfig, 
  getTransitsForCategory,
  getAvailableYears
} from '../../data/transitData';

// 9 Planet Visual Assets from 'planets img'
import sunImg from '../../assets/planets/sun.png';
import moonImg from '../../assets/planets/moon.png';
import marsImg from '../../assets/planets/mars.png';
import mercuryImg from '../../assets/planets/mercury.png';
import jupiterImg from '../../assets/planets/jupiter.png';
import venusImg from '../../assets/planets/venus.png';
import saturnImg from '../../assets/planets/saturn.png';
import rahuImg from '../../assets/planets/rahu.png';
import ketuImg from '../../assets/planets/ketu.png';

// Non-planet categories
import eclipseImg from '../../assets/solar-system.png';
import nakshatraImg from '../../assets/planets/nakshatra.png';
import festivalsImg from '../../assets/planets/festivals.png';

const categoryImages = {
  sun: sunImg,
  moon: moonImg,
  mars: marsImg,
  mercury: mercuryImg,
  jupiter: jupiterImg,
  venus: venusImg,
  saturn: saturnImg,
  rahu: rahuImg,
  ketu: ketuImg,
  eclipse: eclipseImg,
  nakshatra: nakshatraImg,
  festivals: festivalsImg,
};

export default function TransitPage({ onBackToHome, onBackToExplore }) {
  const { isDarkMode } = useTheme();

  // Multi-year ephemeris: automatically defaults to the active calendar year (2026, 2027, etc.)
  const availableYears = getAvailableYears();
  const [selectedYear, setSelectedYear] = useState(() => {
    const sysYear = new Date().getFullYear();
    return sysYear >= 2026 ? sysYear : 2026;
  });
  const currentYear = selectedYear;

  // Selected Category ID (null = show all 12 cards grid; string = show detailed list)
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);


  // Find active category config
  const activeCategory = transitCategoriesConfig.find(c => c.id === selectedCategoryId);
  const activeTransits = selectedCategoryId ? getTransitsForCategory(selectedCategoryId, currentYear) : [];

  return (
    <div className={`min-h-screen pb-24 ${isDarkMode ? 'bg-[#0a0a0a] text-white' : 'bg-white text-black'}`}>
      <ExploreHeader
        title={
          selectedCategoryId && activeCategory
            ? `${activeCategory.name} Transits ${currentYear}`
            : `Planetary Transits (Gochara) ${currentYear}`
        }
        subtitle={
          selectedCategoryId && activeCategory
            ? `${activeCategory.name} transit sign change date and time from 1 Jan ${currentYear} to 31 Dec ${currentYear}.`
            : `Annual Gochara calendar detailing planetary sign shifts, direct and retrograde motions, and comprehensive impacts across all zodiac rashis.`
        }
        currentSection="Planetary Transits"
        onBackToHome={onBackToHome}
        onBackToExplore={onBackToExplore}
      />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <AnimatePresence mode="wait">
          {!selectedCategoryId ? (
            /* VIEW 1: THE 12 IMAGE CARDS GRID */
            <motion.div
              key="overview-grid"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >

              {/* Year Selector Toolbar */}
              <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider font-mulish opacity-70 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> Year:
                  </span>
                  <div className={`p-1 rounded-xl border flex items-center gap-1 shadow-sm ${
                    isDarkMode ? 'bg-[#151515] border-white/10' : 'bg-[#f5f5dd] border-orange-200/80'
                  }`}>
                    {availableYears.map(yr => (
                      <button
                        key={yr}
                        type="button"
                        onClick={() => setSelectedYear(yr)}
                        className={`px-3 py-1 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer font-nunito ${
                          selectedYear === yr
                            ? isDarkMode
                              ? 'bg-[#f0fe4f] text-black shadow-sm font-black'
                              : 'bg-[#A30000] text-white shadow-sm font-black'
                            : isDarkMode
                              ? 'text-gray-300 hover:text-white hover:bg-white/5'
                              : 'text-stone-700 hover:text-[#A30000] hover:bg-white/60'
                        }`}
                      >
                        {yr}
                      </button>
                    ))}
                  </div>
                </div>

                <span className="text-[11px] sm:text-xs font-mulish opacity-60">
                  Ephemeris synced with Drik Panchang ({selectedYear})
                </span>
              </div>

              {/* 12 Image Cards Grid (2 cards per row on mobile screen, 3 on tablet, 4 on desktop) */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                {transitCategoriesConfig.map((cat, idx) => {
                  const cardImg = categoryImages[cat.imageKey] || sunImg;
                  const count = getTransitsForCategory(cat.id, currentYear).length;

                  return (
                    <motion.div
                      key={cat.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: idx * 0.04 }}
                      className={`group rounded-[18px] sm:rounded-[24px] border overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300 ${
                        isDarkMode
                          ? 'bg-[#141414] border-white/10 hover:border-gold/40'
                          : 'bg-[#f5f5dd] border-orange-300/40 hover:border-orange-400/60 shadow-[0_6px_20px_rgba(249,115,22,0.08)]'
                      }`}
                    >
                      {/* Card Cover Image */}
                      <div
                        className={`relative h-28 sm:h-38 md:h-44 lg:h-48 w-full overflow-hidden flex items-center justify-center p-2 sm:p-3 transition-colors ${
                          isDarkMode
                            ? 'bg-gradient-to-b from-[#181d29] via-[#0f131c] to-[#07090e]'
                            : 'bg-gradient-to-b from-[#ffedd5]/50 via-[#fff7ed]/70 to-[#f5f5dd]'
                        }`}
                      >
                        {/* Subtle Radial Glow */}
                        <div
                          className={`absolute inset-0 pointer-events-none ${
                            isDarkMode
                              ? 'bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)]'
                              : 'bg-[radial-gradient(circle_at_center,rgba(251,146,60,0.18)_0%,rgba(245,245,221,0)_70%)]'
                          }`}
                        />

                        <img
                          src={cardImg}
                          alt={cat.name}
                          className={`max-h-20 sm:max-h-28 md:max-h-36 lg:max-h-40 max-w-full object-contain group-hover:scale-110 transition-transform duration-500 ease-out z-0 ${
                            isDarkMode
                              ? 'drop-shadow-[0_8px_18px_rgba(0,0,0,0.65)]'
                              : 'drop-shadow-[0_8px_18px_rgba(249,115,22,0.22)]'
                          }`}
                        />

                        {/* Top Badges */}
                        <div className="absolute top-2 left-2 right-2 sm:top-3 sm:left-3 sm:right-3 flex items-center justify-between pointer-events-none z-10">
                          <span
                            className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full backdrop-blur-md text-xs sm:text-sm font-bold flex items-center justify-center shadow-md border ${
                              isDarkMode
                                ? 'bg-black/60 border-white/20 text-white'
                                : 'bg-white/85 border-orange-200/80 text-stone-900 shadow-sm'
                            }`}
                          >
                            {cat.symbol}
                          </span>
                          <span
                            className={`text-[8px] sm:text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full backdrop-blur-md shadow-md border ${
                              isDarkMode
                                ? 'bg-black/60 border-white/20 text-amber-300'
                                : 'bg-white/85 border-orange-200/80 text-[#A30000] shadow-sm'
                            }`}
                          >
                            {currentYear}
                          </span>
                        </div>

                        {/* Bottom Sanskrit / Bengali Name Overlay */}
                        <div className="absolute bottom-1.5 left-2 right-2 sm:bottom-2 sm:left-3 sm:right-3 pointer-events-none z-10">
                          <span
                            className={`text-[10px] sm:text-xs font-bold font-mulish truncate block ${
                              isDarkMode ? 'text-amber-300 drop-shadow-md' : 'text-[#A30000]'
                            }`}
                          >
                            {cat.sanskritName}
                          </span>
                        </div>
                      </div>

                      {/* Card Info Body */}
                      <div className="p-2.5 sm:p-4 md:p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <h3
                            className={`text-xs sm:text-base md:text-lg lg:text-xl font-medium font-mulish tracking-tight leading-snug line-clamp-1 sm:line-clamp-none ${
                              isDarkMode ? 'text-white group-hover:text-gold' : 'text-[#A30000]'
                            }`}
                            style={{ fontFamily: '"Mulish", sans-serif', fontWeight: 500 }}
                          >
                            {cat.name}
                          </h3>
                        </div>

                        {/* Footer Action */}
                        <div className="mt-2.5 sm:mt-4 pt-2 sm:pt-3 border-t border-orange-200/60 dark:border-white/10 flex items-center justify-between gap-1">
                          <span className="text-[9px] sm:text-[11px] font-extrabold font-mulish opacity-70 uppercase tracking-wide">
                            {count} {count === 1 ? 'Event' : 'Events'}
                          </span>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedCategoryId(cat.id);
                              window.scrollTo({ top: 120, behavior: 'smooth' });
                            }}
                            className={`text-[10px] sm:text-xs font-bold font-nunito flex items-center gap-0.5 sm:gap-1 cursor-pointer transition-all hover:translate-x-0.5 focus:outline-none group/btn ${
                              isDarkMode ? 'text-[#f0fe4f] hover:text-white' : 'text-[#A30000] hover:text-orange-700'
                            }`}
                          >
                            <span className="group-hover/btn:underline underline-offset-4 decoration-current">View Transits</span>
                            <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            /* VIEW 2: CATEGORY DRILLDOWN LIST (MATCHING USER DEMO IMAGE) */
            <motion.div
              key="category-detail"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {/* Navigation Bar: Back Button + Quick Switcher */}
              <div className="mb-6 flex flex-col gap-4">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <button
                    onClick={() => setSelectedCategoryId(null)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold font-nunito transition-all shadow-sm ${
                      isDarkMode
                        ? 'bg-white/10 hover:bg-white/20 text-white'
                        : 'bg-[#f5f5dd] hover:bg-[#eaeac8] text-black border border-black/10'
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to All 12 Categories
                  </button>

                  <div className="flex items-center gap-2 flex-wrap">
                    <div className={`p-1 rounded-xl border flex items-center gap-1 shadow-sm ${
                      isDarkMode ? 'bg-[#151515] border-white/10' : 'bg-[#f5f5dd] border-orange-200/80'
                    }`}>
                      {availableYears.map(yr => (
                        <button
                          key={yr}
                          type="button"
                          onClick={() => setSelectedYear(yr)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer font-nunito ${
                            selectedYear === yr
                              ? isDarkMode
                                ? 'bg-[#f0fe4f] text-black shadow-sm font-black'
                                : 'bg-[#A30000] text-white shadow-sm font-black'
                              : isDarkMode
                                ? 'text-gray-300 hover:text-white'
                                : 'text-stone-700 hover:text-[#A30000]'
                          }`}
                        >
                          {yr}
                        </button>
                      ))}
                    </div>

                    <span className="text-xs font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-mulish">
                      Total: {activeTransits.length} Events ({currentYear})
                    </span>
                  </div>
                </div>

                {/* Quick Planet / Category Switcher Pills */}
                <div
                  className={`p-3 rounded-2xl border flex items-center gap-1.5 overflow-x-auto scrollbar-none shadow-sm ${
                    isDarkMode ? 'bg-[#151515] border-white/10' : 'bg-[#f5f5dd] border-black/10'
                  }`}
                >
                  <span className="text-xs font-bold uppercase tracking-wider opacity-60 shrink-0 ml-1 mr-1 font-mulish">
                    Select Planet:
                  </span>
                  {transitCategoriesConfig.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategoryId(cat.id);
                        window.scrollTo({ top: 140, behavior: 'smooth' });
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all font-nunito ${
                        selectedCategoryId === cat.id
                          ? isDarkMode
                            ? 'bg-[#f0fe4f] text-black shadow-md'
                            : 'bg-[#A30000] text-white shadow-md'
                          : isDarkMode
                          ? 'bg-white/5 hover:bg-white/10 text-gray-300'
                          : 'bg-white hover:bg-gray-100 text-gray-800 border border-black/10'
                      }`}
                    >
                      {cat.symbol} {cat.name.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title & Description of Current Category */}
              <div
                className={`p-5 sm:p-6 rounded-[24px] border mb-6 sm:mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm ${
                  isDarkMode ? 'bg-[#141414] border-white/10' : 'bg-[#f5f5dd] border-black/10'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl overflow-hidden shrink-0 border border-black/10 dark:border-white/10 shadow-md flex items-center justify-center p-1.5 ${
                    isDarkMode ? 'bg-[#0f131c]' : 'bg-[#f5f5dd]'
                  }`}>
                    <img
                      src={categoryImages[activeCategory?.imageKey] || sunImg}
                      alt={activeCategory?.name}
                      className="w-full h-full object-contain drop-shadow-md"
                    />
                  </div>
                  <div>
                    <h2
                      className={`text-xl sm:text-2xl font-bold font-nunito ${
                        isDarkMode ? 'text-white' : 'text-[#A30000]'
                      }`}
                      style={{ fontFamily: '"Nunito", sans-serif' }}
                    >
                      {activeCategory?.name} Transit Schedule ({currentYear})
                    </h2>
                    <p className="text-xs sm:text-sm opacity-75 font-mulish mt-0.5">
                      {activeCategory?.sanskritName} • 1 January {currentYear} to 31 December {currentYear}
                    </p>
                  </div>
                </div>

                <div className="text-xs sm:text-sm font-mulish font-bold opacity-80 bg-white/60 dark:bg-black/40 px-3.5 py-2 rounded-xl border border-black/10 dark:border-white/10">
                  {activeCategory?.tagline}
                </div>
              </div>

              {/* 2-Column Numbered List View (Exact match to demo image) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 lg:gap-5">
                {activeTransits.map(item => (
                  <div
                    key={`${selectedCategoryId}-${item.number}`}
                    className={`rounded-xl sm:rounded-2xl p-4 sm:p-4.5 border relative shadow-sm transition-all duration-200 ${
                      isDarkMode
                        ? 'bg-[#281a10]/85 border-amber-900/40 text-stone-200 hover:border-amber-700/60'
                        : 'bg-[#fae2c5] border-[#e5be90] text-stone-900 hover:border-[#d4a068]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Olive-Green Number Badge (matching demo image) */}
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#7a832e] text-white font-black text-xs sm:text-sm flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                        {item.number}
                      </div>

                      {/* Content Area */}
                      <div className="flex-1 min-w-0">
                        {/* Sign Name + Zodiac Symbol */}
                        <div
                          className="text-[#b52815] dark:text-[#f87171] font-bold text-base sm:text-lg tracking-tight font-nunito flex items-center gap-1.5 flex-wrap"
                          style={{ fontFamily: '"Nunito", sans-serif' }}
                        >
                          <span>{item.signName}</span>
                          {item.bengali && (
                            <span className="text-sm font-semibold opacity-90 text-stone-700 dark:text-stone-300 font-mulish">
                              ({item.bengali})
                            </span>
                          )}
                          <span className="text-lg">{item.symbol}</span>
                          {item.english && item.signName !== item.english && (
                            <span className="text-xs font-normal opacity-60 ml-0.5">
                              • {item.english}
                            </span>
                          )}
                        </div>

                        {/* Full Date, Day, and Time IST */}
                        <div className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 font-medium font-mulish mt-1">
                          {item.fullDate}
                        </div>

                        {/* Optional Transit Note / Festival Info */}
                        {item.note && (
                          <div className="mt-2 pt-1.5 border-t border-amber-900/10 dark:border-amber-100/10 text-[11px] font-semibold text-amber-900 dark:text-amber-200 font-mulish">
                            • {item.note}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Quick-Back Button */}
              <div className="mt-12 text-center">
                <button
                  onClick={() => {
                    setSelectedCategoryId(null);
                    window.scrollTo({ top: 100, behavior: 'smooth' });
                  }}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold font-nunito shadow-md transition-all ${
                    isDarkMode
                      ? 'bg-white/10 hover:bg-white/20 text-white'
                      : 'bg-[#A30000] hover:bg-[#850000] text-white'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to All 12 Transit Categories
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
