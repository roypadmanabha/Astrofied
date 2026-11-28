import React from 'react';
import { Home, ArrowLeft, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { formatAstrofiedText } from './formatAstrofiedText';

export default function ExploreHeader({
  title,
  subtitle,
  badgeText = null,
  currentSection,
  onBackToHome,
  onBackToExplore,
  showBackToExplore = true,
  showOfficialHome = false,
  fontFamily
}) {
  const { isDarkMode } = useTheme();
  const hasBreadcrumbs = showOfficialHome || showBackToExplore || currentSection;

  return (
    <div className={`relative ${hasBreadcrumbs ? 'pt-20 sm:pt-28 md:pt-32 pb-3 sm:pb-4 mb-4 sm:mb-6' : 'pt-[100px] sm:pt-[130px] md:pt-[146px] pb-3 sm:pb-4 mb-4 sm:mb-6'} ${isDarkMode ? '' : 'bg-white'}`}>
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Top Navigation Row: Breadcrumbs (only when active) */}
        {hasBreadcrumbs && (
          <div className="flex items-center justify-between gap-3 mb-2.5 sm:mb-5 flex-wrap">
            <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm font-mulish flex-wrap">
              {showOfficialHome && (
                <button
                  onClick={onBackToHome}
                  className={`flex items-center gap-1.5 font-bold px-3 py-1.5 rounded-full border transition-all ${
                    isDarkMode
                      ? 'border-gold/30 hover:border-gold hover:bg-gold/10 text-gold shadow-sm'
                      : 'border-[#A30000]/30 hover:border-[#A30000] bg-[#f5f5dd] hover:bg-[#eaeac8] text-[#A30000] shadow-sm'
                  }`}
                  title="Return to Astrofied Official Homepage"
                  aria-label="Return to Astrofied Homepage"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Official Home</span>
                </button>
              )}

              {showBackToExplore && (
                <>
                  {showOfficialHome && <span className="opacity-40">/</span>}
                  <button
                    onClick={onBackToExplore}
                    className="font-bold opacity-75 hover:opacity-100 transition-opacity flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    <span>Explore</span>
                  </button>
                </>
              )}

              {currentSection && (
                <>
                  <span className="opacity-40">/</span>
                  <span className={`font-semibold ${isDarkMode ? 'text-[#f0fe4f]' : 'text-[#A30000]'}`}>
                    {formatAstrofiedText(currentSection, isDarkMode)}
                  </span>
                </>
              )}
            </div>
          </div>
        )}

        {/* Title & Badge */}
        <div className="max-w-3xl lg:max-w-5xl xl:max-w-none">
          {badgeText && (
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-xs font-extrabold uppercase tracking-widest mb-2 sm:mb-3 border ${
              isDarkMode
                ? 'bg-white/5 border-white/10 text-gold dark:text-[#f0fe4f]'
                : 'bg-[#f5f5dd] border-black/10 text-[#A30000]'
            }`}>
              <Sparkles className="w-3 h-3" />
              <span>{formatAstrofiedText(badgeText, isDarkMode)}</span>
            </div>
          )}

          <h1
            className={`text-lg sm:text-3xl md:text-5xl lg:text-6xl font-mulish font-medium tracking-tight leading-tight mb-2 sm:mb-4 ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}
            style={{
              fontFamily: '"Mulish", sans-serif',
              fontWeight: 500,
              fontVariationSettings: "'wght' 500"
            }}
          >
            {formatAstrofiedText(title, isDarkMode, { isExploreAstrofied: title === 'Explore Astrofied' })}
          </h1>

          {subtitle && (
            <p className="text-xs sm:text-base md:text-lg opacity-80 font-mulish leading-relaxed max-w-2xl lg:max-w-4xl xl:max-w-none xl:whitespace-nowrap text-left">
              {formatAstrofiedText(subtitle, isDarkMode)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
