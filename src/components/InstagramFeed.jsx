import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { ChevronLeft, ChevronRight, Instagram, ExternalLink } from 'lucide-react';

const IG_LINK = 'https://www.instagram.com/astrofied___/';

const posts = [
  {
    id: 1,
    title: 'Mercury Transit',
    description: "Mercury's transit into Aries brings sharp communication & bold decision-making. Know how it impacts your chart.",
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    icon: '\u263F',
    tag: 'TRANSIT',
  },
  {
    id: 2,
    title: 'Saturn Return',
    description: "Experiencing your Saturn Return? It's a time of transformation, discipline and major life lessons.",
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    icon: '\u2644',
    tag: 'PLANET',
  },
  {
    id: 3,
    title: 'Full Moon Insights',
    description: 'The Full Moon illuminates hidden truths. Discover which house it activates in your birth chart.',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    icon: '\uD83C\uDF15',
    tag: 'LUNAR',
  },
  {
    id: 4,
    title: 'Rahu-Ketu Axis',
    description: 'The shadow planets Rahu & Ketu define your karmic journey. Learn about their current transit effects.',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    icon: '\u260A',
    tag: 'KARMA',
  },
  {
    id: 5,
    title: 'Jupiter in Taurus',
    description: "Jupiter's transit through Taurus expands material stability and spiritual grounding for all signs.",
    gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    icon: '\u2643',
    tag: 'TRANSIT',
  },
  {
    id: 6,
    title: 'Venus & Relationships',
    description: 'Venus governs love, beauty & partnerships. See how its current placement shapes your relationships.',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    icon: '\u2640',
    tag: 'LOVE',
  },
  {
    id: 7,
    title: 'Mars Energy Boost',
    description: 'Mars fuels ambition, courage & drive. Understand your Mars sign to unlock peak performance.',
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
    icon: '\u2642',
    tag: 'ENERGY',
  },
  {
    id: 8,
    title: 'Nakshatra Wisdom',
    description: "The 27 Nakshatras hold the key to your deeper personality. Explore your birth star's secrets.",
    gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
    icon: '\u2726',
    tag: 'VEDIC',
  },
];

export default function InstagramFeed() {
  const { isDarkMode } = useTheme();
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const CARD_WIDTH = 300;
  const GAP = 24;

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = (CARD_WIDTH + GAP) * 2;
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section
      id="instagram"
      className={`py-24 relative overflow-hidden ${isDarkMode ? '' : 'bg-white'}`}
    >
      <div className="container mx-auto px-6 max-w-[1200px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div
              className="p-3 rounded-2xl"
              style={{
                background: isDarkMode
                  ? 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(75,0,130,0.15))'
                  : 'linear-gradient(135deg, rgba(75,0,130,0.08), rgba(212,175,55,0.08))',
                border: `1px solid ${isDarkMode ? 'rgba(212,175,55,0.2)' : 'rgba(75,0,130,0.15)'}`,
              }}
            >
              <Instagram
                size={32}
                style={{ color: isDarkMode ? '#D4AF37' : '#4B0082' }}
              />
            </div>
          </div>

          <h2
            className="text-3xl md:text-5xl font-black mb-5 tracking-tight font-mulish"
            style={{ color: isDarkMode ? '#D4AF37' : '#4B0082' }}
          >
            Follow Us on Instagram
          </h2>
          <p
            className={`text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-mulish ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Explore our page to learn about planets, transits, and astrology in a way that is easy to
            understand, insightful, and truly enriching.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative mt-14">
          {/* Navigation Arrows */}
          <AnimatePresence>
            {canScrollLeft && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => scroll('left')}
                className="absolute -left-2 md:-left-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center backdrop-blur-xl shadow-2xl transition-all duration-300 cursor-pointer"
                style={{
                  background: isDarkMode
                    ? 'rgba(212,175,55,0.15)'
                    : 'rgba(75,0,130,0.08)',
                  border: `1.5px solid ${isDarkMode ? 'rgba(212,175,55,0.3)' : 'rgba(75,0,130,0.2)'}`,
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Scroll left"
              >
                <ChevronLeft
                  size={24}
                  style={{ color: isDarkMode ? '#D4AF37' : '#4B0082' }}
                />
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {canScrollRight && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => scroll('right')}
                className="absolute -right-2 md:-right-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center backdrop-blur-xl shadow-2xl transition-all duration-300 cursor-pointer"
                style={{
                  background: isDarkMode
                    ? 'rgba(212,175,55,0.15)'
                    : 'rgba(75,0,130,0.08)',
                  border: `1.5px solid ${isDarkMode ? 'rgba(212,175,55,0.3)' : 'rgba(75,0,130,0.2)'}`,
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Scroll right"
              >
                <ChevronRight
                  size={24}
                  style={{ color: isDarkMode ? '#D4AF37' : '#4B0082' }}
                />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Scrollable Track */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4 px-1"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            <style>{`#instagram [data-scroll-track]::-webkit-scrollbar { display: none; }`}</style>

            {posts.map((post, idx) => (
              <motion.div
                key={post.id}
                data-scroll-track
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="flex-shrink-0"
                style={{ width: CARD_WIDTH }}
              >
                <div
                  className="relative h-full rounded-[1.75rem] overflow-hidden transition-all duration-500 group"
                  style={{
                    background: isDarkMode
                      ? 'rgba(255,255,255,0.03)'
                      : 'rgba(255,255,255,0.6)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: `1px solid ${isDarkMode ? 'rgba(212,175,55,0.12)' : 'rgba(75,0,130,0.1)'}`,
                    boxShadow: isDarkMode
                      ? '0 8px 32px rgba(0,0,0,0.3)'
                      : '0 8px 32px rgba(75,0,130,0.06)',
                  }}
                >
                  {/* Gradient Art Area */}
                  <div
                    className="relative h-44 overflow-hidden flex items-center justify-center"
                    style={{ background: post.gradient }}
                  >
                    {/* Decorative circles */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute w-32 h-32 rounded-full bg-white/30 -top-8 -right-8 blur-md" />
                      <div className="absolute w-24 h-24 rounded-full bg-white/20 bottom-2 -left-6 blur-sm" />
                    </div>

                    {/* Planet Icon */}
                    <span className="text-6xl select-none drop-shadow-lg relative z-10 transition-transform duration-500 group-hover:scale-110">
                      {post.icon}
                    </span>

                    {/* Tag */}
                    <div className="absolute top-3 left-3 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                      <span className="text-[10px] font-black tracking-widest text-white uppercase font-mulish">
                        {post.tag}
                      </span>
                    </div>

                    {/* Instagram watermark */}
                    <div className="absolute bottom-3 right-3 bg-black/20 backdrop-blur-md p-1.5 rounded-full border border-white/20">
                      <Instagram size={14} className="text-white/80" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3
                      className={`text-lg font-black mb-2 font-mulish leading-tight ${
                        isDarkMode ? 'text-white' : 'text-[#1a1a2e]'
                      }`}
                    >
                      {post.title}
                    </h3>
                    <p
                      className={`text-sm leading-relaxed mb-5 font-mulish line-clamp-3 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      {post.description}
                    </p>

                    <motion.a
                      href={IG_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-black tracking-widest uppercase transition-all duration-300 font-mulish cursor-pointer"
                      style={{
                        background: isDarkMode
                          ? 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05))'
                          : 'linear-gradient(135deg, rgba(75,0,130,0.08), rgba(75,0,130,0.03))',
                        border: `1px solid ${isDarkMode ? 'rgba(212,175,55,0.25)' : 'rgba(75,0,130,0.15)'}`,
                        color: isDarkMode ? '#D4AF37' : '#4B0082',
                      }}
                    >
                      Know More
                      <ExternalLink size={12} />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Scroll Fade Edges */}
          <div
            className="absolute top-0 left-0 w-8 h-full pointer-events-none z-10"
            style={{
              background: isDarkMode
                ? 'linear-gradient(to right, rgba(2,0,8,0.8), transparent)'
                : 'linear-gradient(to right, rgba(255,255,255,0.9), transparent)',
            }}
          />
          <div
            className="absolute top-0 right-0 w-8 h-full pointer-events-none z-10"
            style={{
              background: isDarkMode
                ? 'linear-gradient(to left, rgba(2,0,8,0.8), transparent)'
                : 'linear-gradient(to left, rgba(255,255,255,0.9), transparent)',
            }}
          />
        </div>

        {/* Follow CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <motion.a
            href={IG_LINK}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-8 py-3.5 rounded-full font-black text-sm tracking-widest uppercase shadow-lg transition-all duration-300 font-mulish cursor-pointer"
            style={{
              background: isDarkMode
                ? 'linear-gradient(135deg, #D4AF37, #B8860B)'
                : 'linear-gradient(135deg, #4B0082, #6B21A8)',
              color: isDarkMode ? '#000' : '#fff',
              boxShadow: isDarkMode
                ? '0 8px 30px rgba(212,175,55,0.25)'
                : '0 8px 30px rgba(75,0,130,0.25)',
            }}
          >
            <Instagram size={18} />
            Follow @astrofied___
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
