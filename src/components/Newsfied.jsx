import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, Sparkles, X, Settings, Radio, Share2, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { getNewsfiedPosts, subscribeToNewsfied, getInitialPostsSync, getNewsfiedImageUrl } from '../lib/newsfiedStorage';
import defaultNewsImg from '../assets/newsfied-default.png';
import RichContent, { stripRichFormatting } from '../lib/renderRichContent';

export default function Newsfied({ onOpenAdmin }) {
  const { isDarkMode } = useTheme();
  const [posts, setPosts] = useState(getInitialPostsSync);
  const [activeModalPost, setActiveModalPost] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const scrollContainerRef = useRef(null);

  // Check if running on localhost to display internal admin access
  const isLocalhost = typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  // Load posts and subscribe to live changes
  useEffect(() => {
    let mounted = true;
    getNewsfiedPosts().then((data) => {
      if (mounted) setPosts(data);
    });

    const unsubscribe = subscribeToNewsfied((updatedList) => {
      if (mounted) setPosts(updatedList);
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  // Lock body scroll, pause Lenis, and handle Escape key when reader modal is open
  useEffect(() => {
    if (activeModalPost) {
      if (window.lenis) window.lenis.stop();
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setActiveModalPost(null);
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        if (window.lenis) window.lenis.start();
        document.body.style.overflow = '';
      };
    } else {
      if (window.lenis) window.lenis.start();
      document.body.style.overflow = '';
    }
    return () => {
      if (window.lenis) window.lenis.start();
      document.body.style.overflow = '';
    };
  }, [activeModalPost]);

  // Check scroll navigation availability
  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [posts]);

  const handleScroll = (direction) => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = Math.min(scrollContainerRef.current.clientWidth * 0.85, 380);
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const handleNavigateAdmin = () => {
    if (onOpenAdmin) {
      onOpenAdmin();
    } else {
      window.location.hash = 'admin';
    }
  };

  const handleCopyLink = () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}#newsfied`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2200);
      });
    }
  };

  // Auto-scroll accurately to the Newsfied div when visited via #newsfied
  useEffect(() => {
    if (posts && posts.length > 0) {
      const hash = window.location.hash.replace(/\/+$/, '').toLowerCase();
      if (hash === '#newsfied') {
        const scrollToNewsfied = () => {
          const el = document.getElementById('newsfied');
          if (el) {
            if (window.lenis) {
              window.lenis.scrollTo(el, { offset: -80 });
            } else {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        };
        const timer1 = setTimeout(scrollToNewsfied, 100);
        const timer2 = setTimeout(scrollToNewsfied, 500);
        return () => {
          clearTimeout(timer1);
          clearTimeout(timer2);
        };
      }
    }
  }, [posts]);

  // Lock background scroll completely when reader modal is active
  useEffect(() => {
    if (activeModalPost) {
      const prevBodyOverflow = document.body.style.overflow;
      const prevHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      if (window.lenis) {
        window.lenis.stop();
      }

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setActiveModalPost(null);
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = prevBodyOverflow || '';
        document.documentElement.style.overflow = prevHtmlOverflow || '';
        if (window.lenis) {
          window.lenis.start();
        }
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [activeModalPost]);

  // When there are 0 live updates, the entire section completely disappears
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section
      id="newsfied-section"
      className={`py-12 md:py-20 relative flex justify-center items-center overflow-hidden px-4 sm:px-6 transition-colors duration-500 ${
        isDarkMode ? 'bg-transparent' : 'bg-white'
      }`}
    >
      {/* Decorative Orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 rounded-full mix-blend-screen filter blur-[100px] opacity-10 bg-[#f0fe4f] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full mix-blend-screen filter blur-[120px] opacity-10 bg-[#A30000] pointer-events-none" />

      <div className="container mx-auto max-w-[1200px] flex justify-center relative z-10 w-full">
        <motion.div
          id="newsfied"
          className={`relative overflow-hidden w-full p-5 sm:p-8 md:p-10 lg:p-12 rounded-[24px] sm:rounded-[30px] transition-all duration-500 border scroll-mt-20 md:scroll-mt-24 ${
            isDarkMode
              ? 'border-white/20 sm:border-white/30 bg-transparent'
              : 'bg-gradient-to-br from-white to-[#f5f5dd] border-[#A30000]'
          }`}
          style={isDarkMode ? { backgroundColor: 'transparent' } : undefined}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 sm:mb-8 pb-4 border-b border-black/10 dark:border-white/10">
            {/* Title & Subtitle aligned to the same line */}
            <div className="flex flex-row items-center gap-2 sm:gap-3 flex-wrap">
              <h2
                className={`text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-nunito font-bold tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r ${
                  isDarkMode
                    ? 'from-red-600 to-yellow-500'
                    : 'from-black to-[#FF0000]'
                }`}
                style={{ fontFamily: '"Nunito", sans-serif', fontWeight: 700 }}
              >
                Newsfied
              </h2>
              <span
                className="text-base sm:text-xl md:text-2xl font-bold opacity-40 select-none leading-none flex items-center"
                style={{ color: isDarkMode ? '#FFFFFF' : '#1A1A1A' }}
              >
                -
              </span>
              <p
                className="text-sm sm:text-base md:text-lg lg:text-xl font-medium opacity-85 font-mulish leading-none flex items-center"
                style={{ color: isDarkMode ? '#FFFFFF' : '#1A1A1A' }}
              >
                Get Astrofied’s live updates here.
              </p>
            </div>

            {/* Right Controls: Live Badge, Admin Button, Carousel Navigation */}
            <div className="flex items-center gap-3 self-end md:self-auto">
              {/* Live Status Pill */}
              <div className="inline-flex items-center gap-2 px-2.5 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-bold tracking-wider uppercase border border-red-500/40 bg-red-500/10 text-red-600 dark:text-red-400 select-none">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
                </span>
                LIVE
              </div>

              {/* Share Direct Section Link */}
              <button
                onClick={handleCopyLink}
                title="Copy shareable link to Newsfied section"
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 sm:py-1.5 text-xs font-bold rounded-lg transition-all duration-200 border ${
                  copiedLink
                    ? 'bg-emerald-600 text-white border-emerald-500 scale-105'
                    : isDarkMode
                    ? 'border-white/20 text-white/80 hover:border-gold hover:text-gold hover:bg-white/5'
                    : 'border-black/20 text-black/80 hover:border-[#A30000] hover:text-[#A30000] hover:bg-black/5'
                }`}
                style={{ fontFamily: '"Mulish", sans-serif' }}
              >
                {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{copiedLink ? 'Link Copied!' : 'Share'}</span>
              </button>

              {/* Internal Admin Link (Only visible on localhost, opens in new tab) */}
              {isLocalhost && (
                <a
                  href="/admin"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open Internal Admin Panel in a new tab"
                  className={`inline-flex items-center gap-1.5 px-3 py-1 sm:py-1.5 text-xs font-bold rounded-lg transition-all duration-200 border ${
                    isDarkMode
                      ? 'border-gold/40 text-gold hover:bg-gold/10'
                      : 'border-[#A30000]/40 text-[#A30000] hover:bg-[#A30000]/10'
                  }`}
                  style={{ fontFamily: '"Mulish", sans-serif' }}
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Admin Portal ↗</span>
                </a>
              )}

              {/* Desktop Scroll Arrows */}
              <div className="hidden sm:flex items-center gap-1.5">
                <button
                  onClick={() => handleScroll('left')}
                  disabled={!canScrollLeft}
                  aria-label="Previous updates"
                  className={`p-2 rounded-full border transition-all duration-200 ${
                    canScrollLeft
                      ? isDarkMode
                        ? 'border-white/30 text-white hover:border-gold hover:text-gold hover:bg-white/5 active:scale-95'
                        : 'border-[#969000] text-black hover:bg-black/5 active:scale-95'
                      : 'opacity-30 cursor-not-allowed border-transparent text-gray-400'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleScroll('right')}
                  disabled={!canScrollRight}
                  aria-label="Next updates"
                  className={`p-2 rounded-full border transition-all duration-200 ${
                    canScrollRight
                      ? isDarkMode
                        ? 'border-white/30 text-white hover:border-gold hover:text-gold hover:bg-white/5 active:scale-95'
                        : 'border-[#969000] text-black hover:bg-black/5 active:scale-95'
                      : 'opacity-30 cursor-not-allowed border-transparent text-gray-400'
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Cards Track (Responsive across iPhone, iPad, Mac, Desktop) */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth no-scrollbar"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {posts.map((post, idx) => (
                <motion.article
                  key={post.id || idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className={`group shrink-0 snap-start flex flex-col justify-between p-4 sm:p-5 rounded-[20px] sm:rounded-[24px] border transition-all duration-300 hover:-translate-y-1.5 ${
                    /* Responsive card widths */
                    'w-[84vw] max-w-[310px] xs:w-[290px] sm:w-[320px] md:w-[330px] lg:w-[340px]'
                  } ${
                    isDarkMode
                      ? 'bg-white/[0.04] hover:bg-white/[0.08] border-[0.5px] border-white shadow-lg backdrop-blur-md'
                      : 'bg-[#FFFFB0] border border-[#A30000] shadow-md hover:shadow-2xl'
                  }`}
                >
                  <div className="flex flex-col gap-3">
                    {/* Card Top: Image / Banner (Square 1:1 ratio) */}
                    <div className={`w-full aspect-square rounded-[16px] sm:rounded-[18px] overflow-hidden relative shadow-inner bg-black/10 select-none border ${
                      isDarkMode ? 'border-white' : 'border-[#A30000]'
                    }`}>
                      <img
                        src={getNewsfiedImageUrl(post.image) || defaultNewsImg}
                        alt={post.title}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = defaultNewsImg;
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />

                      {/* Badge / Tag */}
                      {post.badge && (
                        <div className="absolute top-2.5 left-2.5 z-10 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-black/60 text-white backdrop-blur-md border border-white/20 select-none">
                          {post.badge}
                        </div>
                      )}
                    </div>

                    {/* Date & IST Time Pill */}
                    <div className="flex items-center gap-1.5 pt-1 text-xs font-semibold opacity-80 font-mulish select-none">
                      <Clock
                        className={`w-3.5 h-3.5 shrink-0 ${
                          isDarkMode ? 'text-gold' : 'text-[#A30000]'
                        }`}
                      />
                      <span className="truncate">{post.istFormatted}</span>
                    </div>

                    {/* Heading in Nunito Rounded */}
                    <h3
                      className={`text-base sm:text-lg md:text-xl font-nunito font-bold tracking-tight leading-snug transition-colors line-clamp-2 ${
                        isDarkMode
                          ? 'text-gold'
                          : 'text-[#A30000]'
                      }`}
                      style={{ fontFamily: '"Nunito", sans-serif', fontWeight: 700 }}
                    >
                      {post.title}
                    </h3>

                    {/* Subtext in Mulish */}
                    <p
                      className="text-xs sm:text-sm leading-relaxed opacity-90 font-mulish line-clamp-3 text-justify font-medium"
                      style={{ color: isDarkMode ? '#E5E5E5' : '#111827' }}
                    >
                      {stripRichFormatting(post.content)}
                    </p>
                  </div>

                  {/* Read More link */}
                  <div className="mt-3 pt-3 border-t border-black/10 dark:border-white/5 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveModalPost(post)}
                      className={`text-xs font-bold transition-all cursor-pointer hover:underline inline-flex items-center gap-1 select-none focus:outline-none ${
                        isDarkMode ? 'text-gold hover:text-white' : 'text-black hover:text-[#A30000]'
                      }`}
                      style={{ fontFamily: '"Mulish", sans-serif' }}
                    >
                      Read full update →
                    </button>
                  </div>
                </motion.article>
              ))
            }
          </div>
        </motion.div>
      </div>

      {/* Reader Modal for Full Update */}
      <AnimatePresence>
        {activeModalPost && (
          <div
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm overscroll-contain select-none"
            onClick={() => setActiveModalPost(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent="true"
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              style={{ overscrollBehavior: 'contain' }}
              className={`relative w-[88vw] max-w-[430px] sm:max-w-[480px] max-h-[70vh] sm:max-h-[72vh] flex flex-col rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.55)] border overflow-hidden select-text transition-colors duration-300 ${
                isDarkMode
                  ? 'bg-[#141416] border-white/15 text-white shadow-black/90'
                  : 'bg-[#FCFBF7] border-[#8D8300]/25 text-stone-900 shadow-xl'
              }`}
            >
              {/* Header: Sticky Top with Badge, Time, Close, and Pinned Headline */}
              <div className="p-4 sm:p-5 pb-3 border-b border-black/5 dark:border-white/10 shrink-0 bg-inherit flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap min-w-0">
                    {activeModalPost.badge && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase bg-gradient-to-r from-red-600 to-[#A30000] text-white tracking-wider select-none shrink-0 shadow-sm">
                        {activeModalPost.badge}
                      </span>
                    )}
                    <span className="text-[11px] sm:text-xs font-semibold opacity-70 font-mulish flex items-center gap-1 select-none">
                      <Clock className={`w-3.5 h-3.5 shrink-0 ${isDarkMode ? 'text-gold' : 'text-[#A30000]'}`} />
                      {activeModalPost.istFormatted}
                    </span>
                  </div>

                  <button
                    onClick={() => setActiveModalPost(null)}
                    aria-label="Close"
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all active:scale-90 hover:rotate-90 duration-200 shrink-0 ${
                      isDarkMode
                        ? 'bg-white/10 hover:bg-white/20 text-white'
                        : 'bg-black/5 hover:bg-black/10 text-stone-700'
                    }`}
                  >
                    <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>

                {/* Fixed Headline Anchor (Always visible as user scrolls) */}
                <h3
                  className={`text-base sm:text-lg font-nunito font-extrabold tracking-tight leading-snug break-words ${
                    isDarkMode ? 'text-white' : 'text-[#A30000]'
                  }`}
                  style={{ fontFamily: '"Nunito", sans-serif', fontWeight: 800 }}
                >
                  {activeModalPost.title}
                </h3>
              </div>

              {/* Scrollable Content Body with Elegant Modal Scrollbar */}
              <div 
                data-lenis-prevent="true"
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                style={{ overscrollBehavior: 'contain' }}
                className="overflow-y-auto overscroll-contain modal-scrollbar px-4 sm:px-5 py-3.5 space-y-3 flex-1"
              >
                {/* Formatted Rich Body Content */}
                <RichContent
                  content={activeModalPost.content}
                  isDarkMode={isDarkMode}
                  className={`text-xs sm:text-sm leading-[1.75] font-mulish break-words pb-6 ${
                    isDarkMode ? 'text-gray-200' : 'text-stone-800'
                  }`}
                />
              </div>

              {/* Subtle Bottom Ambient Fade */}
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#FCFBF7] dark:from-[#141416] to-transparent" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
