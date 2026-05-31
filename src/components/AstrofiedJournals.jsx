import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { House, LogOut, Search } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { createClient } from '@supabase/supabase-js';
import journalsCollage from '../assets/journal-hero-new.jpg';
import journalBg from '../assets/journal-bg.jpg';
import logo from '../assets/logo.png';
import Footer from './Footer';

import houseSeriesImg from '../assets/journals/house-series.png';
import planetSeriesImg from '../assets/journals/planet-series.jpg';
import signSeriesImg from '../assets/journals/sign-series.jpg';
import malMaasImg from '../assets/journals/mal-maas.jpg';
import jupiterImg from '../assets/journals/jupiter-cancer.jpg';
import saturnImg from '../assets/journals/saturn-revati.jpg';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let supabase;
try {
  if (supabaseUrl && supabaseAnonKey) {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } else {
    console.warn("Supabase credentials missing. Please check your .env file and restart the Vite server.");
  }
} catch (error) {
  console.error("Supabase initialization error:", error);
}

const getJournalImage = (title, defaultUrl) => {
  if (!title) return defaultUrl;
  const t = title.toLowerCase();
  if (t.includes('house')) return houseSeriesImg;
  if (t.includes('planet')) return planetSeriesImg;
  if (t.includes('sign')) return signSeriesImg;
  if (t.includes('maas') || t.includes('mal')) return malMaasImg;
  if (t.includes('jupiter') || t.includes('cancer')) return jupiterImg;
  if (t.includes('saturn') || t.includes('revati')) return saturnImg;
  return defaultUrl;
};

const JournalCard = ({ journal, idx, isLast, isDarkMode, handleDownload }) => {
  return (
    <div className="flex flex-col gap-6 md:gap-20">
      {/* Card */}
      <div className="flex flex-row items-stretch gap-3 sm:gap-6 md:gap-12">
        {/* Left Side: Title & Image */}
        <div className="w-[45%] flex flex-col items-center justify-center">
          <h2 className="text-[14px] sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#D00000] mb-2 sm:mb-4 md:mb-8 text-center leading-tight" style={{ fontFamily: '"Nunito", sans-serif', fontWeight: 700 }}>
            {journal.title}
          </h2>
          <div
            className="w-full rounded-md sm:rounded-lg md:rounded-xl overflow-hidden shadow-lg md:shadow-xl border md:border-[1.5px] border-[#D4AF37] bg-white"
            style={{ maxWidth: '923px', aspectRatio: '923/1024' }}
          >
            <img src={getJournalImage(journal.title, journal.image_url) || journalsCollage} alt={journal.title} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Divider line (Always visible) */}
        <div className={`w-px self-stretch ${isDarkMode ? 'bg-white/30' : 'bg-black/30'}`}></div>

        {/* Right Side: Description & Button */}
        <div className="w-[55%] flex flex-col justify-center h-full py-1 md:py-2">

          <p className="text-[9px] sm:text-xs md:text-base leading-[1.6] sm:leading-relaxed md:leading-relaxed text-justify mb-3 sm:mb-6 md:mb-8 whitespace-pre-wrap font-mulish font-medium md:font-normal">
            {journal.description}
          </p>

          <div className="flex justify-center md:justify-center mt-auto md:mt-0">
            <button
              onClick={() => handleDownload(journal.file_name)}
              className="bg-[#6200EA] hover:bg-[#5000D0] text-white font-bold py-1.5 px-2 sm:py-2.5 sm:px-6 md:py-3.5 md:px-8 rounded sm:rounded-md md:rounded-lg shadow-md md:shadow-lg transition-transform hover:scale-105 active:scale-95 text-[9px] sm:text-sm md:text-base w-full lg:w-auto min-w-0 md:min-w-[200px]"
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* Diamond Separator between items */}
      {!isLast && (
        <div className="flex justify-center items-center gap-2 md:gap-3 opacity-80 mt-4 md:mt-8">
          <div className="w-16 md:w-40 h-px bg-[#D4AF37]"></div>
          <div className="w-1.5 h-1.5 md:w-2.5 md:h-2.5 rotate-45 bg-[#D4AF37]"></div>
          <div className="w-16 md:w-40 h-px bg-[#D4AF37]"></div>
        </div>
      )}
    </div>
  );
};

const AstrofiedJournals = () => {
  const { isDarkMode } = useTheme();

  // Auth & DB State
  const [user, setUser] = useState(null);
  const [sessionExpired, setSessionExpired] = useState(false);
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showHomeModal, setShowHomeModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredJournals = journals.filter(journal => 
    journal.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    journal.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (user) {
      document.body.classList.add('dashboard-active');
      const style = document.createElement('style');
      style.id = 'astrofied-journals-lock';
      style.innerHTML = `
        body.dashboard-active #root > div > *:not(.astrofied-journals-container):not(.legal-modal-container) {
          display: none !important;
        }
      `;
      document.head.appendChild(style);
      if (window.lenis) {
        window.lenis.start();
        // Force lenis to recalculate document height immediately after layout shift
        setTimeout(() => window.lenis.resize(), 50);
      }
    }

    return () => {
      document.body.classList.remove('dashboard-active');
      const styleEl = document.getElementById('astrofied-journals-lock');
      if (styleEl) styleEl.remove();
    };
  }, [user]);

  useEffect(() => {
    // Check active session
    if (!supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchJournals();
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchJournals();
    });

    return () => subscription.unsubscribe();
  }, []);

  // 5 Minute Strict Auto-Logout Timer
  useEffect(() => {
    let timeoutId;
    if (user) {
      timeoutId = setTimeout(async () => {
        if (supabase) {
          await supabase.auth.signOut();
          setSessionExpired(true);
        }
      }, 300000); // 5 minutes sharp
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [user]);

  const fetchJournals = async () => {
    if (!supabase) return;
    const { data, error } = await supabase
      .from('journals')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setJournals(data);
    }
  };

  const handleLogin = async () => {
    if (!supabase) {
      alert("Supabase is not configured. Please check your .env file and restart the server.");
      return;
    }
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
        queryParams: {
          prompt: 'select_account consent'
        }
      }
    });
  };

  const handleLogout = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
  };

  const handleDownload = async (fileName) => {
    if (!fileName || !supabase) return;
    const { data } = supabase.storage.from('journal_pdfs').getPublicUrl(fileName);
    if (data?.publicUrl) {
      window.open(data.publicUrl, '_blank');
    }
  };

  const handleQuit = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setShowHomeModal(false);
    window.location.reload();
  };

  const titleContent = (
    <span className="whitespace-nowrap inline-flex items-center justify-center gap-3">
      <span className={`bg-clip-text text-transparent bg-gradient-to-r ${isDarkMode ? 'from-red-600 to-yellow-500' : 'from-black via-[#7B0000] to-[#E50000]'}`} style={{ fontFamily: '"Nunito", sans-serif', fontWeight: 650, letterSpacing: '-0.03em' }}>
        Astrofied
      </span>
      <span className={`bg-clip-text text-transparent ${isDarkMode ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' : 'bg-[#E50000]'}`} style={{ fontFamily: '"Nunito", sans-serif', fontWeight: 650, letterSpacing: '-0.03em' }}>
        Journals
      </span>
    </span>
  );

  const textContent = "Astrofied Journals has made astrology simpler and more accessible by providing free astrological articles, updates, journals, and insights that can be read or downloaded in just one click. Our goal is to spread awareness of authentic and practical astrology in society by making reliable knowledge easy to understand and available to everyone. Through simplified explanations and valuable resources, Astrofied helps people learn astrology with clarity, convenience, and confidence.";

  // --- LOGGED IN STATE: Dashboard UI ---
  if (user) {
    return (
      <div className={`astrofied-journals-container font-['Nunito'] min-h-screen w-full ${isDarkMode ? 'bg-[#1a1a1a] text-white' : 'bg-[#F4F1E1] text-black'}`}>
        {/* Top Nav */}
        <header className={`fixed top-0 left-0 w-full z-50 px-4 md:px-12 py-4 flex justify-between items-center ${isDarkMode ? 'bg-[#1a1a1a]/70' : 'bg-[#F4F1E1]/70'} backdrop-blur-lg border-b shadow-sm ${isDarkMode ? 'border-white/10 shadow-black/20' : 'border-black/10 shadow-black/5'} transition-all duration-300`}>
          <div className="flex items-center">
            <img src={logo} alt="Astrofied Logo" className="h-6 md:h-8 mr-1.5 md:mr-4 object-contain" />
            <h1 className={`text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${isDarkMode ? 'from-white to-[#E50000]' : 'from-black to-[#E50000]'}`} style={{ fontFamily: '"Nunito", sans-serif', fontWeight: 700 }}>
              Astrofied Journals
            </h1>
          </div>
          <div className="flex gap-4 md:gap-6 font-semibold items-center">
            <button onClick={() => setShowHomeModal(true)} className="hover:opacity-70 transition-opacity flex items-center" aria-label="Home">
              <span className="hidden md:inline">Home</span>
              <House className="md:hidden w-5 h-5" />
            </button>
            <button onClick={handleLogout} className="text-[#D00000] hover:opacity-70 transition-opacity flex items-center" aria-label="Logout">
              <span className="hidden md:inline">Logout</span>
              <LogOut className="md:hidden w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Home Modal */}
        <AnimatePresence>
          {showHomeModal && (
            <motion.div
              key="home-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className={`w-full max-w-sm p-6 md:p-8 rounded-2xl shadow-2xl text-center ${isDarkMode ? 'bg-[#1a1a1a] text-white border border-white/10' : 'bg-white text-black'}`}
              >
                <h3 className="text-xl md:text-2xl font-bold mb-8 font-['Nunito']">Are you sure you want to quit?</h3>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={handleQuit}
                    className="flex-1 py-3 bg-[#D00000] hover:bg-red-700 text-white rounded-xl font-bold transition-colors"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setShowHomeModal(false)}
                    className={`flex-1 py-3 rounded-xl font-bold transition-colors ${isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-black/5 hover:bg-black/10'}`}
                  >
                    No
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 md:px-8 pt-28 pb-8 md:pt-36 md:pb-12">
          {/* Intro Text */}
          <p className="text-justify text-sm md:text-base leading-relaxed mb-16 max-w-3xl mx-auto">
            Welcome to Astrofied Journals! Explore our articles, posts, and in-depth analyses on various topics of astrology. Feel free to download, share, and gain a deeper understanding of astrological concepts. Don't hesitate to contact us if you have any questions or queries.
          </p>

          {/* Search Bar */}
          <div className="mb-12 flex flex-col items-center w-full px-4">
            <div className="relative w-full max-w-lg">
              <input
                type="text"
                placeholder="Search journals by topic or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full py-3 px-6 pr-12 rounded-full border-2 outline-none transition-all shadow-md text-sm md:text-base font-mulish
                  ${isDarkMode 
                    ? 'bg-[#1a1a1a] border-[#D4AF37]/50 text-white placeholder-white/50 focus:border-[#D4AF37] focus:shadow-[0_0_15px_rgba(212,175,55,0.3)]' 
                    : 'bg-white border-[#D00000]/40 text-black placeholder-black/50 focus:border-[#D00000] focus:shadow-[0_0_15px_rgba(208,0,0,0.2)]'
                  }`}
              />
              <div className={`absolute right-5 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-[#D4AF37]' : 'text-[#D00000]'}`}>
                <Search size={20} />
              </div>
            </div>

            {/* Matches count indicator */}
            <AnimatePresence>
              {searchQuery && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  className={`text-sm font-mulish font-bold overflow-hidden ${isDarkMode ? 'text-[#D4AF37]' : 'text-[#D00000]'}`}
                >
                  {filteredJournals.length} {filteredJournals.length === 1 ? 'match' : 'matches'} found
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Journals List */}
          <div className="flex flex-col gap-12 md:gap-20">
            {loading ? (
              <div className="text-center py-20 text-lg animate-pulse">Loading journals...</div>
            ) : filteredJournals.length === 0 ? (
              <div className="text-center py-20 opacity-80 font-mulish text-base md:text-lg">
                No results found for "{searchQuery}"
              </div>
            ) : (
              filteredJournals.map((journal, idx) => (
                <JournalCard
                  key={journal.id || idx}
                  journal={journal}
                  idx={idx}
                  isLast={idx === filteredJournals.length - 1}
                  isDarkMode={isDarkMode}
                  handleDownload={handleDownload}
                />
              ))
            )}
          </div>
        </main>
        <Footer forceLightMode={true} onOpenLegal={(type) => window.dispatchEvent(new CustomEvent('openLegalModal', { detail: type }))} />
      </div>
    );
  }

  // --- LOGGED OUT STATE: Original Landing Section ---
  return (
    <>
      {/* Session Expired Modal */}
      <AnimatePresence>
        {sessionExpired && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`w-full max-w-sm p-6 md:p-8 rounded-2xl shadow-2xl text-center ${isDarkMode ? 'bg-[#1a1a1a] text-white border border-white/10' : 'bg-white text-black'}`}
            >
              <h3 className="text-xl md:text-2xl font-bold mb-4 font-['Nunito']">Session Expired</h3>
              <p className="mb-8 font-mulish opacity-90 text-sm md:text-base leading-relaxed">
                For security reasons, your session has expired after 5 minutes. Please log in again to continue reading.
              </p>
              <button
                onClick={() => setSessionExpired(false)}
                className={`w-full py-3 rounded-xl font-bold transition-colors font-['Nunito'] ${isDarkMode ? 'bg-[#FFF000] text-black hover:bg-[#FFE000]' : 'bg-[#6200EA] text-white hover:bg-[#5000D0]'}`}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="journals" className={`py-12 md:py-20 relative flex justify-center items-center overflow-hidden px-4 md:px-6`}>
        {/* Decorative Background Orbs for Glassmorphism */}
        <div className={`absolute top-0 left-1/4 w-72 h-72 rounded-full mix-blend-multiply filter blur-[120px] opacity-20 ${isDarkMode ? 'bg-[#9d00ff]' : 'bg-[#FFE000]'}`}></div>
        <div className={`absolute bottom-0 right-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-[140px] opacity-15 ${isDarkMode ? 'bg-[#FFD700]' : 'bg-[#6200EA]'}`}></div>

        <div className="container mx-auto max-w-[1200px] flex justify-center relative z-10">
          <motion.div
            className={`relative overflow-hidden flex flex-col lg:flex-row w-full gap-8 lg:gap-12 items-center lg:items-stretch p-6 md:p-10 lg:p-12 rounded-[30px] border shadow-2xl backdrop-blur-xl
            ${isDarkMode ? 'bg-white/5 border-white/10 shadow-black/50' : 'bg-white/40 border-white/40 shadow-gray-200/50'}
          `}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Sketch Background Layer (Simulated Chroma Key via Mix-Blend) */}
            <div
              className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-500
              ${isDarkMode ? 'mix-blend-screen invert opacity-10' : 'mix-blend-multiply opacity-20'}
            `}
              style={{
                backgroundImage: `url(${journalBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            />

            {/* Wrapper to keep content above the absolute background */}
            <div className="relative z-10 w-full flex flex-col lg:flex-row items-center lg:items-stretch gap-8 lg:gap-12">

              {/* Mobile Only: Title & Text (Shown before Image) */}
              <div className="w-full flex flex-col items-center lg:hidden gap-6 mb-2">
                <h2 className="text-[28px] sm:text-4xl md:text-5xl nunito-custom text-center w-full overflow-hidden text-ellipsis" style={{ fontFamily: '"Nunito", sans-serif' }}>
                  {titleContent}
                </h2>
                <p className={`text-base md:text-lg text-justify leading-relaxed font-mulish font-medium px-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  {textContent}
                </p>
              </div>

              {/* Left Side - Image (and Desktop Title) */}
              <div className="w-full lg:w-1/2 flex flex-col items-center">
                {/* Desktop Only Title */}
                <h2 className="hidden lg:block lg:text-[37px] xl:text-[45px] nunito-custom mb-6 text-center w-[85%] leading-none tracking-tight" style={{ fontFamily: '"Nunito", sans-serif' }}>
                  {titleContent}
                </h2>

                <div className="w-[95%] sm:w-[80%] lg:w-[85%] rounded-[28px] overflow-hidden shadow-2xl bg-transparent border-[1.5px] border-[#D4AF37]">
                  <img
                    src={journalsCollage}
                    alt="Astrofied Journals Collage"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>

              {/* Vertical Separator Line (Hidden on mobile) */}
              <div className={`hidden lg:block w-px h-auto self-stretch mx-6 ${isDarkMode ? 'bg-white/20' : 'bg-black/20'}`}></div>

              {/* Right Side - Buttons (and Desktop Text) */}
              <div className="w-full lg:w-1/2 flex flex-col items-center justify-center h-full pt-2 lg:pt-0">
                {/* Desktop Only Text */}
                <p className={`hidden lg:block text-lg xl:text-xl mb-12 text-justify leading-relaxed font-mulish font-medium px-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  {textContent}
                </p>

                {/* Buttons (Single button now) */}
                <div className="flex w-full max-w-[95%] sm:max-w-md lg:max-w-[320px] mx-auto justify-center">
                  <button
                    onClick={handleLogin}
                    className={`w-full py-3 lg:py-4 text-base md:text-lg lg:text-xl font-bold rounded-lg lg:rounded-2xl transition-transform hover:scale-105 active:scale-95 shadow-xl font-['Nunito']
                  ${isDarkMode
                        ? 'bg-[#FFF000] text-black shadow-[#FFF000]/20 hover:bg-[#FFE000]'
                        : 'bg-[#6200EA] text-white shadow-[#6200EA]/30 hover:bg-[#5000D0]'
                      }
                `}
                  >
                    Sign In to Explore
                  </button>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </section>
    </>
  );
};

export default AstrofiedJournals;
