import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { createClient } from '@supabase/supabase-js';
import journalsCollage from '../assets/journals-collage.jpg';
import journalBg from '../assets/journal-bg.jpg';
import logo from '../assets/logo.png';

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

const AstrofiedJournals = () => {
  const { isDarkMode } = useTheme();
  
  // Auth & DB State
  const [user, setUser] = useState(null);
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showHomeModal, setShowHomeModal] = useState(false);

  useEffect(() => {
    if (user) {
      const style = document.createElement('style');
      style.id = 'astrofied-journals-lock';
      style.innerHTML = `html, body { overflow: hidden !important; }`;
      document.head.appendChild(style);
      if (window.lenis) window.lenis.stop();
    }
    
    return () => {
      const styleEl = document.getElementById('astrofied-journals-lock');
      if (styleEl) styleEl.remove();
      if (window.lenis) window.lenis.start();
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

  const textContent = "Read our articles, journals, predictions, analyses, and insights on planets, transits, and horoscopes.";

  // --- LOGGED IN STATE: Dashboard UI ---
  if (user) {
    return (
      <div className={`fixed inset-0 z-50 overflow-y-auto font-['Nunito'] ${isDarkMode ? 'bg-[#1a1a1a] text-white' : 'bg-[#F4F1E1] text-black'}`}>
         {/* Top Nav */}
         <header className={`sticky top-0 z-10 px-8 md:px-12 py-4 flex justify-between items-center ${isDarkMode ? 'bg-[#1a1a1a]/90' : 'bg-[#F4F1E1]/90'} backdrop-blur-md border-b ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
           <div className="flex items-center">
             <img src={logo} alt="Astrofied Logo" className="h-6 md:h-8 mr-4 md:mr-6 object-contain" />
             <h1 className={`text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${isDarkMode ? 'from-white to-[#E50000]' : 'from-black to-[#E50000]'}`} style={{ fontFamily: '"Nunito", sans-serif', fontWeight: 700 }}>
               Astrofied Journals
             </h1>
           </div>
           <div className="flex gap-4 md:gap-6 font-semibold">
             <button onClick={() => setShowHomeModal(true)} className="hover:opacity-70 transition-opacity">Home</button>
             <button onClick={handleLogout} className="text-[#D00000] hover:opacity-70 transition-opacity">Logout</button>
           </div>
         </header>

         {/* Home Modal */}
         <AnimatePresence>
           {showHomeModal && (
             <motion.div 
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
         <main className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12">
           {/* Intro Text */}
           <p className="text-center text-sm md:text-base leading-relaxed mb-16 max-w-3xl mx-auto">
             Welcome to Astrofied Journals! Explore our articles, posts, and in-depth analyses on various topics of astrology. Feel free to download, share, and gain a deeper understanding of astrological concepts. Don't hesitate to contact us if you have any questions or queries.
           </p>

           {/* Journals List */}
           <div className="flex flex-col gap-12 md:gap-20">
             {loading ? (
                <div className="text-center py-20 text-lg animate-pulse">Loading journals...</div>
             ) : journals.length === 0 ? (
                <div className="text-center py-20 opacity-70">No journals found.</div>
             ) : (
               journals.map((journal, idx) => (
                 <div key={journal.id || idx} className="flex flex-col gap-12 md:gap-20">
                   {/* Card */}
                   <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
                     {/* Left Side: Title & Image */}
                     <div className="w-full md:w-[45%] flex flex-col items-center">
                       <h2 className="text-3xl md:text-4xl font-bold text-[#D00000] mb-8 text-center">{journal.title}</h2>
                       <div className="w-full max-w-sm rounded-xl overflow-hidden shadow-xl border-[1.5px] border-[#D4AF37] bg-white">
                          <img src={journal.image_url || journalsCollage} alt={journal.title} className="w-full h-auto object-cover" />
                       </div>
                     </div>

                     {/* Divider line (Desktop) */}
                     <div className={`hidden md:block w-px self-stretch ${isDarkMode ? 'bg-white/30' : 'bg-black/30'}`}></div>

                     {/* Right Side: Description & Button */}
                     <div className="w-full md:w-[55%] flex flex-col h-full md:pt-[4.5rem]">
                       <p className="text-sm md:text-base leading-relaxed text-justify mb-8 whitespace-pre-wrap">
                         {journal.description}
                       </p>
                       <div className="flex justify-center md:justify-center mt-auto">
                         <button 
                           onClick={() => handleDownload(journal.file_name)}
                           className="bg-[#6200EA] hover:bg-[#5000D0] text-white font-bold py-3.5 px-8 rounded-lg shadow-lg transition-transform hover:scale-105 active:scale-95 w-full md:w-auto min-w-[200px]"
                         >
                           Download PDF
                         </button>
                       </div>
                     </div>
                   </div>

                   {/* Diamond Separator between items */}
                   {idx < journals.length - 1 && (
                     <div className="flex justify-center items-center gap-3 opacity-80 mt-4 md:mt-8">
                       <div className="w-24 md:w-40 h-px bg-[#D4AF37]"></div>
                       <div className="w-2.5 h-2.5 rotate-45 bg-[#D4AF37]"></div>
                       <div className="w-24 md:w-40 h-px bg-[#D4AF37]"></div>
                     </div>
                   )}
                 </div>
               ))
             )}
           </div>
         </main>
      </div>
    );
  }

  // --- LOGGED OUT STATE: Original Landing Section ---
  return (
    <section className={`py-12 md:py-20 relative flex justify-center items-center overflow-hidden px-4 md:px-6`}>
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
            <h2 className="text-[28px] sm:text-4xl md:text-5xl nunito-custom text-center drop-shadow-sm w-full overflow-hidden text-ellipsis" style={{ fontFamily: '"Nunito", sans-serif' }}>
              {titleContent}
            </h2>
            <p className={`text-lg md:text-xl text-center leading-relaxed font-['Nunito'] px-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
              {textContent}
            </p>
          </div>

          {/* Left Side - Image (and Desktop Title) */}
          <div className="w-full lg:w-1/2 flex flex-col items-center">
            {/* Desktop Only Title */}
            <h2 className="hidden lg:block lg:text-[42px] xl:text-[50px] nunito-custom mb-6 text-center drop-shadow-sm w-[85%] leading-none tracking-tight" style={{ fontFamily: '"Nunito", sans-serif' }}>
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
            <p className={`hidden lg:block text-xl lg:text-2xl mb-12 text-center leading-relaxed font-['Nunito'] ${isDarkMode ? 'text-white' : 'text-black'}`}>
              {textContent}
            </p>
            
            {/* Buttons (Side-by-side on mobile, stacked on desktop) */}
            <div className="flex flex-row lg:flex-col gap-4 lg:gap-6 w-full max-w-[95%] sm:max-w-md lg:max-w-[320px] mx-auto justify-center">
              <button 
                onClick={handleLogin}
                className={`flex-1 lg:w-full py-2.5 lg:py-4 text-base md:text-lg lg:text-2xl font-bold rounded-lg lg:rounded-2xl transition-transform hover:scale-105 active:scale-95 shadow-xl font-['Nunito']
                  ${isDarkMode 
                    ? 'bg-[#FFF000] text-black shadow-[#FFF000]/20 hover:bg-[#FFE000]' 
                    : 'bg-[#6200EA] text-white shadow-[#6200EA]/30 hover:bg-[#5000D0]'
                  }
                `}
              >
                SIGN UP
              </button>
              <button 
                onClick={handleLogin}
                className={`flex-1 lg:w-full py-2.5 lg:py-4 text-base md:text-lg lg:text-2xl font-bold rounded-lg lg:rounded-2xl transition-transform hover:scale-105 active:scale-95 shadow-xl font-['Nunito']
                  ${isDarkMode 
                    ? 'bg-[#FFF000] text-black shadow-[#FFF000]/20 hover:bg-[#FFE000]' 
                    : 'bg-[#6200EA] text-white shadow-[#6200EA]/30 hover:bg-[#5000D0]'
                  }
                `}
              >
                LOGIN
              </button>
            </div>
          </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default AstrofiedJournals;
