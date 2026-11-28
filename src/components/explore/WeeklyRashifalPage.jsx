import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock,
  Flame,
  Droplets,
  Wind,
  Mountain
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import ExploreHeader from './ExploreHeader';
import { formatAstrofiedText } from './formatAstrofiedText';
import { getWeeklyRashifal, getInitialWeeklyRashifalSync, subscribeToWeeklyRashifal } from '../../lib/weeklyRashifalStorage';

export default function WeeklyRashifalPage({ onBackToHome, onBackToExplore }) {
  const { isDarkMode } = useTheme();
  const [data, setData] = useState(getInitialWeeklyRashifalSync);
  const [activeSignFilter, setActiveSignFilter] = useState('all');

  useEffect(() => {
    let mounted = true;
    getWeeklyRashifal().then((res) => {
      if (mounted && res) setData(res);
    });

    const unsubscribe = subscribeToWeeklyRashifal((updated) => {
      if (mounted && updated) setData(updated);
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  const rashis = data?.rashis || [];

  const displayedRashis = activeSignFilter === 'all'
    ? rashis
    : rashis.filter(r => r.id === activeSignFilter);

  const getElementBadge = (element) => {
    switch (element?.toLowerCase()) {
      case 'fire':
        return { color: 'text-amber-500 bg-amber-500/10 border-amber-500/20', icon: Flame };
      case 'water':
        return { color: 'text-blue-500 bg-blue-500/10 border-blue-500/20', icon: Droplets };
      case 'air':
        return { color: 'text-teal-500 bg-teal-500/10 border-teal-500/20', icon: Wind };
      case 'earth':
      default:
        return { color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20', icon: Mountain };
    }
  };

  const getRashiPoints = (item) => {
    if (Array.isArray(item?.points) && item.points.length > 0) {
      return item.points;
    }
    if (typeof item?.pointsText === 'string' && item.pointsText.trim()) {
      return item.pointsText
        .split('\n')
        .map(l => l.replace(/^(\d+[\.\)]|[-*•])\s*/, '').trim())
        .filter(Boolean);
    }
    // Backward compatibility with legacy fields
    const legacy = [item?.forecast, item?.career, item?.finance, item?.love, item?.health].filter(Boolean);
    return legacy.length > 0 ? legacy : ["Weekly predictions in progress."];
  };

  return (
    <div className={`min-h-screen pb-24 ${isDarkMode ? '' : 'bg-white text-black'}`}>
      <ExploreHeader
        title={data?.weekTitle || "Weekly Rashifal (Horoscope)"}
        subtitle={data?.overview || "Weekly Vedic horoscope for all 12 Rashis from Aries to Pisces covering career, wealth, emotional bonds, and authentic remedies."}
        currentSection="Weekly Rashifal"
        onBackToHome={onBackToHome}
        onBackToExplore={onBackToExplore}
      />

      <div className="container mx-auto px-3 sm:px-6 max-w-7xl">
        {/* Week Date Range Banner */}
        <div
          className={`p-3.5 sm:p-6 rounded-2xl sm:rounded-[24px] border-[0.5px] mb-5 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 shadow-sm ${
            isDarkMode
              ? 'bg-[#17202a] border-white'
              : 'bg-[#f5f5dd] border-[#A30000]'
          }`}
          style={{
            border: isDarkMode ? '0.5px solid #ffffff' : '0.5px solid #A30000'
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl flex items-center justify-center font-bold text-base sm:text-lg shadow-sm ${
                isDarkMode ? 'bg-[#f0fe4f] text-black' : 'bg-[#A30000] text-white'
              }`}
            >
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <span className="text-[9px] sm:text-xs font-bold uppercase tracking-widest opacity-60">
                ACTIVE FORECAST PERIOD
              </span>
              <h3 
                className="text-sm sm:text-xl font-mulish leading-tight font-medium"
                style={{ fontFamily: '"Mulish", sans-serif', fontWeight: 500 }}
              >
                {data?.dateRange || "Current Active Week"}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold opacity-75 font-mulish">
            <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Updated: {data?.lastUpdated || "Weekly"}</span>
          </div>
        </div>

        {/* 12 Rashi Quick Jump / Filter Pills */}
        <div className="mb-6 sm:mb-10">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider opacity-70 font-mulish">
              Quick Filter By Zodiac Sign:
            </span>
            {activeSignFilter !== 'all' && (
              <button
                onClick={() => setActiveSignFilter('all')}
                className="text-[11px] sm:text-xs font-bold text-gold dark:text-[#f0fe4f] hover:underline"
              >
                Show All 12 Rashis
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setActiveSignFilter('all')}
              className={`px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold whitespace-nowrap transition-all border-[0.5px] ${
                activeSignFilter === 'all'
                  ? isDarkMode
                    ? 'bg-white text-black shadow-md border-white'
                    : 'bg-[#A30000] text-white shadow-md border-[#A30000]'
                  : isDarkMode
                  ? 'bg-white/5 hover:bg-white/10 text-gray-300 border-[#d3d3d3]'
                  : 'bg-[#f5f5dd] hover:bg-[#eaeac8] text-gray-800 border-black/10'
              }`}
              style={{
                fontFamily: '"Nunito", sans-serif',
                border: isDarkMode 
                  ? (activeSignFilter === 'all' ? '0.5px solid #ffffff' : '0.5px solid lightgrey')
                  : undefined
              }}
            >
              All 12 Rashis
            </button>

            {rashis.map((r) => (
              <button
                key={r.id}
                onClick={() => setActiveSignFilter(r.id)}
                className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold whitespace-nowrap flex items-center gap-1 transition-all border-[0.5px] ${
                  activeSignFilter === r.id
                    ? isDarkMode
                      ? 'bg-white text-black shadow-md border-white'
                      : 'bg-[#A30000] text-white shadow-md border-[#A30000]'
                    : isDarkMode
                    ? 'bg-white/5 hover:bg-white/10 text-gray-300 border-[#d3d3d3]'
                    : 'bg-[#f5f5dd] hover:bg-[#eaeac8] text-gray-800 border-black/10'
                }`}
                style={{
                  fontFamily: '"Nunito", sans-serif',
                  border: isDarkMode 
                    ? (activeSignFilter === r.id ? '0.5px solid #ffffff' : '0.5px solid lightgrey')
                    : undefined
                }}
              >
                <span>{r.symbol}</span>
                <span>{r.rashi.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Rashis Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {displayedRashis.map((item, idx) => {
            const elementInfo = getElementBadge(item.element);
            const ElementIcon = elementInfo.icon;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={`rounded-2xl sm:rounded-[30px] p-4 sm:p-7 border-[0.5px] flex flex-col justify-between shadow-sm transition-all duration-300 relative overflow-hidden ${
                  isDarkMode
                    ? 'bg-[#17202a] border-white'
                    : 'bg-[#f5f5dd] border-[#A30000]'
                }`}
                style={{
                  border: isDarkMode ? '0.5px solid #ffffff' : '0.5px solid #A30000'
                }}
              >
                <div>
                  {/* Top Header: Symbol + Name + Element */}
                  <div className="flex items-center justify-between gap-2.5 mb-3.5 sm:mb-5">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-black shadow-sm ${
                          isDarkMode
                            ? 'bg-black/60 border border-white/20 text-[#f0fe4f]'
                            : 'bg-white border border-black/10 text-[#A30000]'
                        }`}
                      >
                        {item.symbol}
                      </div>
                      <div>
                        <h3
                          className="text-base sm:text-xl font-mulish tracking-tight leading-tight font-medium"
                          style={{ fontFamily: '"Mulish", sans-serif', fontWeight: 500 }}
                        >
                          {item.rashi}
                        </h3>
                        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs opacity-70 font-mulish">
                          <span className="font-bold">{item.hindiName}</span>
                          <span>•</span>
                          <span>Ruler: {item.ruler}</span>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider border flex items-center gap-1 ${elementInfo.color}`}
                    >
                      <ElementIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      <span>{item.element}</span>
                    </div>
                  </div>

                  {/* Numbered Bullet Points */}
                  <div className="flex flex-col gap-2 sm:gap-3 my-2 flex-1">
                    {getRashiPoints(item).map((point, pIdx) => (
                      <div
                        key={pIdx}
                        className={`p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border text-xs sm:text-sm font-mulish leading-relaxed flex items-start gap-2.5 transition-colors ${
                          isDarkMode
                            ? 'bg-white/[0.03] border-white/10 hover:border-white/20 text-gray-200'
                            : 'bg-white border-orange-200/80 hover:border-[#A30000]/40 text-stone-900 shadow-sm'
                        }`}
                      >
                        <span
                          className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full shrink-0 flex items-center justify-center text-[10px] sm:text-xs font-black font-nunito shadow-sm ${
                            isDarkMode
                              ? 'bg-[#f0fe4f] text-black'
                              : 'bg-[#A30000] text-white'
                          }`}
                        >
                          {pIdx + 1}
                        </span>
                        <p className="flex-1 text-[11px] sm:text-sm text-left sm:text-justify pt-0.5">
                          {formatAstrofiedText(point, isDarkMode)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
