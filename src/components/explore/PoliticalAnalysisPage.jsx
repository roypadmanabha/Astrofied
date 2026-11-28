import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ExternalLink
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import ExploreHeader from './ExploreHeader';
import { formatAstrofiedText } from './formatAstrofiedText';
import { politicalCategories } from '../../data/politicalAnalysisData';
import { 
  getPoliticalPredictions, 
  getInitialPoliticalPredictionsSync, 
  subscribeToPolitical 
} from '../../lib/politicalStorage';

export default function PoliticalAnalysisPage({ onBackToHome, onBackToExplore }) {
  const { isDarkMode } = useTheme();
  const [predictions, setPredictions] = useState(getInitialPoliticalPredictionsSync);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let mounted = true;
    getPoliticalPredictions().then((data) => {
      if (mounted && Array.isArray(data)) {
        setPredictions(data);
      }
    });

    const unsubscribe = subscribeToPolitical((updatedList) => {
      if (mounted && Array.isArray(updatedList)) {
        setPredictions(updatedList);
      }
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  const filteredPosts = predictions.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesTitle = post.title?.toLowerCase().includes(q);
    const matchesPredDesc = post.prediction?.description?.toLowerCase().includes(q);
    const matchesResDesc = post.result?.description?.toLowerCase().includes(q);
    const matchesTags = post.tags?.some(t => t.toLowerCase().includes(q));

    return matchesCategory && (matchesTitle || matchesPredDesc || matchesResDesc || matchesTags);
  });

  return (
    <div 
      className={`min-h-0 sm:min-h-screen pb-8 sm:pb-16 md:pb-20 lg:pb-24 font-mulish ${isDarkMode ? '' : 'bg-white text-black'}`}
      style={{ fontFamily: '"Mulish", sans-serif' }}
    >
      <ExploreHeader
        title="Political Analysis"
        subtitle="Chronological record of verified election outcomes, leadership trajectories, and geopolitical predictions with exact timestamp documentation."
        currentSection="Political Analysis"
        fontFamily="Mulish"
        onBackToHome={onBackToHome}
        onBackToExplore={onBackToExplore}
      />

      <div className="container mx-auto px-3 sm:px-6 max-w-5xl lg:max-w-6xl xl:max-w-[1240px]">

        {/* Filters & Search Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-4 mb-5 sm:mb-10">
          {/* Category Tabs */}
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-1 max-w-full scrollbar-none">
            {politicalCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 sm:px-3.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-bold tracking-tight whitespace-nowrap transition-all border-[0.5px] ${
                  selectedCategory === cat
                    ? isDarkMode
                      ? 'bg-white text-black shadow-md border-white'
                      : 'bg-[#A30000] text-white shadow-md border-[#A30000]'
                    : isDarkMode
                    ? 'bg-white/5 hover:bg-white/10 text-gray-300 border-[#d3d3d3]'
                    : 'bg-[#f5f5dd] hover:bg-[#eaeac8] text-gray-800 border-black/10'
                }`}
                style={{ 
                  fontFamily: '"Mulish", sans-serif',
                  border: isDarkMode 
                    ? (selectedCategory === cat ? '0.5px solid #ffffff' : '0.5px solid lightgrey')
                    : undefined
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="w-full sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search predictions..."
              className={`w-full px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm border-[0.5px] outline-none font-mulish ${
                isDarkMode
                  ? 'bg-black/50 border-[#d3d3d3] focus:border-gold text-white placeholder-gray-500'
                  : 'bg-[#f5f5dd] border-black/10 focus:border-[#A30000] text-black placeholder-gray-500'
              }`}
              style={{
                border: isDarkMode ? '0.5px solid lightgrey' : undefined
              }}
            />
          </div>
        </div>

        {/* Comparative Side-by-Side Verification Cards List */}
        <div className="flex flex-col">
          {filteredPosts.map((post, index) => {
            const pred = post.prediction || {};
            const res = post.result || {};

            return (
              <motion.div
                key={post.id || index}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="w-full"
              >
                {/* 2-Column Comparative Layout: [ OUR PREDICTION ]  |  [ RESULTS ] (Guaranteed exact equal sizing via grid row alignment) */}
                <div className="relative grid grid-cols-2 gap-x-3 sm:gap-x-5 md:gap-x-8 lg:gap-x-20 xl:gap-x-28 gap-y-2.5 sm:gap-y-3.5 md:gap-y-4 items-stretch">
                  
                  {/* Vertical Dividing Line (Spanning card height with left/right breathing room) */}
                  <div 
                    className="absolute top-1 bottom-8 sm:bottom-11 md:bottom-14 lg:bottom-16 left-1/2 -translate-x-1/2 pointer-events-none"
                    style={{
                      width: 0,
                      borderLeft: isDarkMode ? '0.5px solid #ffffff' : '0.5px solid #A30000'
                    }}
                  />

                  {/* ROW 1 - LEFT CARD: OUR PREDICTION */}
                  <div
                    className={`p-2.5 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl md:rounded-[28px] border-[0.5px] h-full flex flex-col justify-between shadow-sm transition-all duration-300 ${
                      isDarkMode
                        ? 'bg-[#17202a] border-white'
                        : 'bg-[#f5f5dd] border-[#A30000]'
                    }`}
                    style={{
                      border: isDarkMode ? '0.5px solid #ffffff' : '0.5px solid #A30000'
                    }}
                  >
                    {/* Top Poster Image - Proportional & Clear on phone */}
                    <div className="relative w-full h-[145px] xs:h-[165px] sm:h-[220px] md:h-[270px] lg:h-[310px] shrink-0 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-black/[0.04] dark:bg-black/50 flex items-center justify-center p-1 sm:p-2">
                      {/* Ambient soft backdrop */}
                      <img
                        src={pred.image}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-25 dark:opacity-35 scale-125 pointer-events-none select-none"
                      />
                      {/* Intact Document/Poster */}
                      <img
                        src={pred.image}
                        alt={`${post.title} - Our Prediction`}
                        className="relative z-10 max-w-full max-h-full object-contain rounded-md sm:rounded-lg md:rounded-xl drop-shadow-md transition-transform duration-300 hover:scale-[1.01]"
                        loading="lazy"
                      />
                    </div>

                    {/* Content Section */}
                    <div className="pt-2.5 sm:pt-3.5 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Title in Bold Red/Maroon - Center Aligned */}
                        <h4
                          className={`font-mulish font-extrabold text-[11.5px] min-[360px]:text-[12.5px] min-[390px]:text-[13px] sm:text-sm md:text-base tracking-tight sm:tracking-wide leading-snug text-center ${
                            isDarkMode ? 'text-[#f0fe4f]' : 'text-[#A30000]'
                          }`}
                          style={{ fontFamily: '"Mulish", sans-serif' }}
                        >
                          {post.title}
                        </h4>

                        {/* Description */}
                        <div
                          className="political-rich-desc mt-2 sm:mt-2.5 text-[11px] min-[360px]:text-[11.5px] min-[390px]:text-[12px] sm:text-xs md:text-sm font-mulish leading-relaxed text-stone-900 dark:text-gray-200 text-justify"
                          style={{ fontFamily: '"Mulish", sans-serif' }}
                          dangerouslySetInnerHTML={{
                            __html: pred.description || ''
                          }}
                        />
                      </div>

                      {/* Post Link (Below Description - Pinned to bottom) */}
                      {pred.postLink && (
                        <div className="mt-2.5 sm:mt-3 text-[10px] min-[360px]:text-[10.5px] sm:text-xs md:text-[13px] font-mulish font-normal break-all pt-2 border-t border-black/5 dark:border-white/10" style={{ fontFamily: '"Mulish", sans-serif' }}>
                          <span className="font-bold text-black dark:text-white" style={{ fontFamily: '"Mulish", sans-serif' }}>Post Link: </span>
                          <a
                            href={pred.postLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 font-medium hover:underline inline-flex items-center gap-0.5 font-mulish"
                            style={{ fontFamily: '"Mulish", sans-serif' }}
                          >
                            <span className="truncate max-w-[85px] sm:max-w-none">{pred.postLinkText || pred.postLink}</span>
                            <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0 ml-0.5 inline" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ROW 1 - RIGHT CARD: RESULTS */}
                  <div
                    className={`p-2.5 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl md:rounded-[28px] border-[0.5px] h-full flex flex-col justify-between shadow-sm transition-all duration-300 ${
                      isDarkMode
                        ? 'bg-[#17202a] border-white'
                        : 'bg-[#f5f5dd] border-[#A30000]'
                    }`}
                    style={{
                      border: isDarkMode ? '0.5px solid #ffffff' : '0.5px solid #A30000'
                    }}
                  >
                    {/* Top Proof Image - Proportional & Clear on phone */}
                    <div className="relative w-full h-[145px] xs:h-[165px] sm:h-[220px] md:h-[270px] lg:h-[310px] shrink-0 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-black/[0.04] dark:bg-black/50 flex items-center justify-center p-1 sm:p-2">
                      {/* Ambient soft backdrop */}
                      <img
                        src={res.image}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-25 dark:opacity-35 scale-125 pointer-events-none select-none"
                      />
                      {/* Intact Proof Image */}
                      <img
                        src={res.image}
                        alt={`${post.title} - Results Proof`}
                        className="relative z-10 max-w-full max-h-full object-contain rounded-md sm:rounded-lg md:rounded-xl drop-shadow-md transition-transform duration-300 hover:scale-[1.01]"
                        loading="lazy"
                      />
                    </div>

                    {/* Content Section */}
                    <div className="pt-2.5 sm:pt-3.5 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Title in Bold Red/Maroon - Center Aligned */}
                        <h4
                          className={`font-mulish font-extrabold text-[11.5px] min-[360px]:text-[12.5px] min-[390px]:text-[13px] sm:text-sm md:text-base tracking-tight sm:tracking-wide leading-snug text-center ${
                            isDarkMode ? 'text-[#f0fe4f]' : 'text-[#A30000]'
                          }`}
                          style={{ fontFamily: '"Mulish", sans-serif' }}
                        >
                          {post.title}
                        </h4>

                        {/* Description */}
                        <div
                          className="political-rich-desc mt-2 sm:mt-2.5 text-[11px] min-[360px]:text-[11.5px] min-[390px]:text-[12px] sm:text-xs md:text-sm font-mulish leading-relaxed text-stone-900 dark:text-gray-200 text-justify"
                          style={{ fontFamily: '"Mulish", sans-serif' }}
                          dangerouslySetInnerHTML={{
                            __html: res.description || ''
                          }}
                        />
                      </div>

                      {/* News Link (Below Description - Pinned to bottom) */}
                      {res.newsLink && (
                        <div className="mt-2.5 sm:mt-3 text-[10px] min-[360px]:text-[10.5px] sm:text-xs md:text-[13px] font-mulish font-normal break-all pt-2 border-t border-black/5 dark:border-white/10" style={{ fontFamily: '"Mulish", sans-serif' }}>
                          <span className="font-bold text-black dark:text-white" style={{ fontFamily: '"Mulish", sans-serif' }}>News Link: </span>
                          <a
                            href={res.newsLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 font-medium hover:underline inline-flex items-center gap-0.5 font-mulish"
                            style={{ fontFamily: '"Mulish", sans-serif' }}
                          >
                            <span className="truncate max-w-[85px] sm:max-w-none">{res.newsLinkText || res.newsLink}</span>
                            <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0 ml-0.5 inline" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ROW 2 - LEFT LABEL: OUR PREDICTION */}
                  <h3
                    className={`text-xs min-[360px]:text-sm sm:text-lg md:text-2xl lg:text-3xl font-[650] tracking-wider text-center font-mulish shrink-0 ${
                      isDarkMode ? 'text-[#f0fe4f]' : 'text-[#A30000]'
                    }`}
                    style={{ fontFamily: '"Mulish", sans-serif', fontWeight: 650 }}
                  >
                    {pred.label || "OUR PREDICTION"}
                  </h3>

                  {/* ROW 2 - RIGHT LABEL: RESULTS */}
                  <h3
                    className={`text-xs min-[360px]:text-sm sm:text-lg md:text-2xl lg:text-3xl font-[650] tracking-wider text-center font-mulish shrink-0 ${
                      isDarkMode ? 'text-[#f0fe4f]' : 'text-[#A30000]'
                    }`}
                    style={{ fontFamily: '"Mulish", sans-serif', fontWeight: 650 }}
                  >
                    {res.label || "RESULTS"}
                  </h3>

                </div>

                {/* Ornamental Star / Diamond Divider between prediction rows */}
                {index < filteredPosts.length - 1 && (
                  <div className="flex items-center justify-center gap-3 my-5 sm:my-7 md:my-8 max-w-xl mx-auto">
                    <div 
                      className="h-[1.5px] flex-1"
                      style={{
                        background: isDarkMode 
                          ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' 
                          : 'linear-gradient(90deg, transparent, rgba(179, 67, 63, 0.4), transparent)'
                      }}
                    />
                    <span 
                      className="text-lg sm:text-xl font-bold select-none"
                      style={{ color: isDarkMode ? '#f0fe4f' : '#b3433f' }}
                    >
                      ✦
                    </span>
                    <div 
                      className="h-[1.5px] flex-1"
                      style={{
                        background: isDarkMode 
                          ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' 
                          : 'linear-gradient(90deg, transparent, rgba(179, 67, 63, 0.4), transparent)'
                      }}
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
