import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Zap, 
  Globe2, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  Compass, 
  CheckCircle2, 
  Flame,
  Home
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import ExploreHeader from './ExploreHeader';
import IndiaMapIcon from './IndiaMapIcon';
import TaurusIcon from './TaurusIcon';
import UpcomingClockIcon from './UpcomingClockIcon';
import SaturnIcon from './SaturnIcon';
import { formatAstrofiedText } from './formatAstrofiedText';

export default function ExploreAstrofied({
  onSelectSection,
  onBackToHome
}) {
  const { isDarkMode } = useTheme();

  const cards = [
    {
      id: 'political',
      title: 'Political Analysis',
      description: 'Find all Indian Political predictions here.',
      badge: 'Indian Politics',
      badgeColor: 'bg-red-500/10 text-red-500 border-red-500/30',
      icon: IndiaMapIcon,
      gradient: isDarkMode
        ? 'from-red-950/40 via-red-900/20 to-black'
        : 'from-red-50 via-rose-50/60 to-white',
      accentColor: '#A30000',
      actionText: 'View Political Predictions',
      stats: '100% Documented',
      highlights: ['State Assembly Elections', 'Loksabha Election']
    },
    {
      id: 'rashifal',
      title: 'Weekly Rashifal',
      description: 'Explore the weekly changes of your life via Astrofied Weekly Rashifal.',
      badge: "How's the week",
      badgeColor: 'bg-amber-500/10 text-amber-500 border-amber-500/30',
      icon: TaurusIcon,
      gradient: isDarkMode
        ? 'from-amber-950/40 via-yellow-900/20 to-black'
        : 'from-amber-50 via-yellow-50/50 to-white',
      accentColor: '#D4AF37',
      actionText: 'Explore 12 Rashis',
      stats: '12 Signs Weekly',
      highlights: ['Moon Sign Results', 'Aries to Pisces']
    },
    {
      id: 'forecasts',
      title: 'What’s Going to Happen',
      description: 'Upcoming incidents predicted by our astrologer.',
      badge: "What's Upcoming",
      badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      icon: UpcomingClockIcon,
      gradient: isDarkMode
        ? 'from-purple-950/40 via-indigo-900/20 to-black'
        : 'from-purple-50 via-indigo-50/50 to-white',
      accentColor: '#9333EA',
      actionText: 'Read Upcoming Forecasts',
      stats: '3–4 Month Horizon',
      highlights: ['Future Predictions', 'What will happen']
    },
    {
      id: 'transits',
      title: 'Planetary Transits',
      description: 'You can feel a live panjika here.',
      badge: 'Sign Change',
      badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      icon: SaturnIcon,
      gradient: isDarkMode
        ? 'from-blue-950/40 via-sky-900/20 to-black'
        : 'from-blue-50 via-sky-50/50 to-white',
      accentColor: '#2563EB',
      actionText: 'Explore Annual Transits',
      stats: 'Full Year Coverage',
      highlights: ['Sign Changes and Retrograde', 'Major Impact']
    }
  ];

  const handleCardClick = (cardId) => {
    if (cardId === 'rashifal' || cardId === 'forecasts') {
      alert("This section is currently in progress. We will announce once it's live on the website. Thank you for your patience and understanding.");
      return;
    }
    onSelectSection(cardId);
  };

  return (
    <div className={`min-h-screen pb-24 ${isDarkMode ? '' : 'bg-white text-black'}`}>
      <ExploreHeader
        title="Explore Astrofied"
        subtitle="Experience Tripura’s most trusted astrology platform, delivering excellent accuracy, proven forecasts, and life-changing guidance."
        onBackToHome={onBackToHome}
        showBackToExplore={false}
      />

      <div className="container mx-auto px-4 sm:px-6">
        {/* 4 Big Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {cards.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className={`group relative rounded-[28px] sm:rounded-[32px] p-5 sm:p-7 md:p-8 border transition-all duration-500 flex flex-col justify-between overflow-hidden ${
                  isDarkMode
                    ? 'bg-[#121212] border-white/10 hover:border-gold/50 shadow-2xl hover:shadow-[0_20px_60px_rgba(212,175,55,0.15)]'
                    : 'backdrop-blur-xl border-orange-400/30 hover:border-orange-500/60 shadow-[0_12px_36px_rgba(249,115,22,0.12)] hover:shadow-[0_22px_50px_rgba(249,115,22,0.22)]'
                }`}
                style={
                  !isDarkMode
                    ? {
                        backgroundColor: 'rgba(245, 245, 221, 0.88)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)'
                      }
                    : undefined
                }
              >
                {/* Background Ambient Glow - Dark Mode Only */}
                {isDarkMode && (
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-40 group-hover:opacity-75 transition-opacity duration-700 pointer-events-none`}
                  />
                )}

                {/* Decorative radial blur in top corner - Dark Mode Only */}
                {isDarkMode && (
                  <div
                    className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none transition-all group-hover:scale-125"
                    style={{ backgroundColor: card.accentColor }}
                  />
                )}

                {/* Light Mode Glassmorphism Surface: #f5f5dd and orange blend */}
                {!isDarkMode && (
                  <>
                    <div
                      className="absolute inset-0 rounded-[inherit] pointer-events-none transition-all duration-500"
                      style={{
                        background: 'linear-gradient(145deg, rgba(245, 245, 221, 0.95) 0%, rgba(245, 245, 221, 0.70) 50%, rgba(251, 146, 60, 0.18) 100%)',
                        boxShadow: 'inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.9), inset 0 -1.5px 2px 0 rgba(249, 115, 22, 0.15)'
                      }}
                    />
                    <div
                      className="absolute -bottom-10 -right-10 w-52 h-52 rounded-full blur-3xl opacity-25 bg-gradient-to-br from-orange-400 to-amber-500 pointer-events-none transition-all duration-500 group-hover:opacity-45 group-hover:scale-110"
                    />
                    <div
                      className="absolute -top-10 -left-10 w-44 h-44 rounded-full blur-2xl opacity-15 bg-amber-300 pointer-events-none"
                    />
                  </>
                )}

                <div className="relative z-10 flex-1 flex flex-col">
                  {/* Top Bar: Icon + Badge + Stat */}
                  <div className="flex items-center justify-between gap-3 mb-5 sm:mb-6 flex-wrap">
                    <div
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-lg ${
                        isDarkMode
                          ? 'bg-black/60 border border-white/20 text-white'
                          : 'bg-white border border-orange-200/80 text-black'
                      }`}
                      style={{ color: isDarkMode ? '#f0fe4f' : '#A30000' }}
                    >
                      <IconComponent className="w-7 h-7 sm:w-8 sm:h-8" />
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-extrabold uppercase tracking-widest border transition-colors ${
                          isDarkMode
                            ? card.badgeColor
                            : 'bg-white border-orange-200/80 shadow-sm'
                        }`}
                      >
                        <span
                          className={
                            isDarkMode
                              ? ''
                              : 'bg-clip-text text-transparent bg-gradient-to-r from-stone-900 to-[#A30000] inline-block font-extrabold'
                          }
                          style={
                            isDarkMode
                              ? undefined
                              : {
                                  backgroundImage: 'linear-gradient(to right, #1c1917, #A30000)',
                                  WebkitBackgroundClip: 'text',
                                  WebkitTextFillColor: 'transparent',
                                  display: 'inline-block'
                                }
                          }
                        >
                          {card.badge}
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Big Card Title */}
                  <h2
                    className={`text-2xl sm:text-3xl lg:text-4xl font-nunito tracking-tight mb-2 sm:mb-2.5 transition-colors explore-heading ${
                      isDarkMode
                        ? 'text-white'
                        : 'text-[#A30000]'
                    }`}
                    style={{ fontFamily: '"Nunito", sans-serif', fontWeight: 550, fontVariationSettings: "'wght' 550" }}
                  >
                    {formatAstrofiedText(card.title, isDarkMode)}
                  </h2>

                  {/* Card Description */}
                  <p className="text-sm sm:text-base leading-relaxed opacity-80 font-mulish mb-4 sm:mb-5 text-justify sm:text-left flex-1">
                    {formatAstrofiedText(card.description, isDarkMode)}
                  </p>

                  {/* Quick Highlights Pills */}
                  <div className="flex flex-wrap gap-2 mb-4 sm:mb-5">
                    {card.highlights.map((h, i) => (
                      <span
                        key={i}
                        className={`text-[11px] sm:text-xs px-2.5 py-1 rounded-lg border font-semibold ${
                          isDarkMode
                            ? 'bg-white/5 border-white/10 text-gray-300'
                            : 'bg-white border-orange-200/80 text-gray-800'
                        }`}
                      >
                        • {formatAstrofiedText(h, isDarkMode)}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="relative z-10 pt-4 border-t border-orange-200/70 dark:border-white/10 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(card.id);
                    }}
                    className="flex items-center gap-2 group/btn text-left cursor-pointer focus:outline-none"
                  >
                    <span
                      className={`text-sm sm:text-base font-bold font-nunito tracking-wide transition-all group-hover/btn:underline underline-offset-4 decoration-2 ${
                        isDarkMode
                          ? 'text-[#f0fe4f] group-hover/btn:text-white group-hover/btn:decoration-white'
                          : 'text-[#A30000] group-hover/btn:text-black group-hover/btn:decoration-black'
                      }`}
                      style={{ fontFamily: '"Nunito", sans-serif' }}
                    >
                      {formatAstrofiedText(card.actionText, isDarkMode)}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(card.id);
                    }}
                    aria-label={`${card.actionText} - Open section`}
                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer shadow-md ${
                      isDarkMode
                        ? 'bg-white text-black hover:bg-[#f0fe4f]'
                        : 'bg-[#A30000] text-white hover:bg-[#850000]'
                    }`}
                  >
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 hover:translate-x-0.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
