import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Clock, Moon, Sun, Compass, Calendar, Sunrise, Sunset, Star, Timer } from 'lucide-react';

const formatTime = (timeDiff) => {
  if (timeDiff < 0) return "00 : 00 : 00 : 00";
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeDiff / 1000 / 60) % 60);
  const seconds = Math.floor((timeDiff / 1000) % 60);

  return `${days.toString().padStart(2, '0')} Days : ${hours.toString().padStart(2, '0')} Hours : ${minutes.toString().padStart(2, '0')} Minutes : ${seconds.toString().padStart(2, '0')} Seconds`;
};

// Real API Layer fetching from Node.js Swiss Ephemeris engine
class PanchangAPI {
  static async fetchCurrentData() {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://astrofied-production.up.railway.app';
      const response = await fetch(`${apiUrl}/api/panchang?date=${new Date().toISOString()}`);
      if (!response.ok) throw new Error('Failed to fetch panchang');
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export default function Panchang() {
  const { isDarkMode } = useTheme();
  const [data, setData] = useState(null);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    PanchangAPI.fetchCurrentData().then(setData);

    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!data) return null;

  return (
    <section id="panchang" className={`py-24 relative overflow-hidden ${isDarkMode ? 'text-white bg-transparent' : 'bg-white text-black'}`}>



      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-black font-mulish mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
            Live Vedic <span className={isDarkMode ? 'text-gold' : 'text-[#FF0000]'}>Panchang</span>
          </h2>
          <p className={`text-lg md:text-xl font-mulish opacity-70 max-w-3xl mx-auto mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Real-time astronomical ephemeris calculated with Sidereal Astrology (Lahiri Ayanamsa). The backend dynamically computes exact planetary boundaries in real-time.
          </p>
          <div className={`inline-block px-3 sm:px-6 md:px-8 py-2 md:py-4 rounded-xl md:rounded-[1.5rem] border text-[11px] sm:text-sm md:text-xl font-bold font-mulish tracking-wider shadow-sm transition-colors ${isDarkMode ? 'bg-transparent border-white' : 'bg-[#f5f5dd] border-black'}`}>
            <div className={`whitespace-nowrap ${isDarkMode ? 'text-yellow-400 drop-shadow-md' : 'bg-gradient-to-r from-black to-[#FF2400] bg-clip-text text-transparent'}`}>
              {new Date(now).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              <span className="mx-1.5 sm:mx-3 md:mx-4 font-thin">|</span>
              <span>{new Date(now).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
              <span className="mx-1.5 sm:mx-3 md:mx-4 font-thin">|</span>
              {new Date(now).toLocaleDateString('en-US', { weekday: 'long' })}
            </div>
          </div>
          <p className={`mt-6 md:mt-8 text-[10px] md:text-sm font-mulish max-w-2xl mx-auto px-4 ${isDarkMode ? 'text-[whitesmoke]' : 'text-[dimgrey]'}`}>
            Note: These are general panchangs, while it may vary from location to location, regional and cultural influences and calculation methods.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8">

          {/* Main Cosmic Details */}
          <div className="xl:col-span-8 space-y-6 lg:space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className={`p-3 md:p-10 rounded-2xl md:rounded-[2rem] border shadow-2xl transition-all duration-500 ${isDarkMode ? 'bg-transparent border-white/10 shadow-none' : 'backdrop-blur-xl bg-[#f5f5dd] border-[#A30000]/20 shadow-xl'}`}
            >
              <div className="grid grid-cols-3 gap-2 md:gap-8">
                <PanchangItem icon={<Moon size={18} />} label="Tithi" value={data.tithi} isDark={isDarkMode} />
                <PanchangItem icon={<Star size={18} />} label="Nakshatra" value={data.nakshatra} isDark={isDarkMode} />
                <PanchangItem icon={<Compass size={18} />} label="Yoga" value={data.yoga} isDark={isDarkMode} />
                <PanchangItem icon={<Timer size={18} />} label="Karana" value={data.karana} isDark={isDarkMode} />
                <PanchangItem icon={<Calendar size={18} />} label="Vara" value={data.vara} isDark={isDarkMode} />
                <PanchangItem icon={<Moon size={18} />} label="Paksha" value={data.paksha} isDark={isDarkMode} />
                <PanchangItem icon={<Sun size={18} />} label="Sun Sign" value={data.sunSign} isDark={isDarkMode} />
                <PanchangItem icon={<Moon size={18} />} label="Moon Sign" value={data.moonSign} isDark={isDarkMode} />
                <PanchangItem icon={<Calendar size={18} />} label="Lunar Month" value={data.lunarMonth} isDark={isDarkMode} />
              </div>
            </motion.div>

            {/* Timers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`hidden lg:block p-3 md:p-8 rounded-2xl md:rounded-[2rem] border ${isDarkMode ? 'bg-transparent border-white/20' : 'backdrop-blur-xl bg-[#f5f5dd] border-[#A30000]/20'}`}
            >
              <h3 className={`text-[10px] md:text-2xl font-bold font-mulish mb-3 md:mb-8 flex items-center gap-1 md:gap-3 ${isDarkMode ? 'text-gold' : 'text-[#A30000]'}`}>
                <Clock className="w-3.5 h-3.5 md:w-7 md:h-7 animate-pulse" /> Live Cosmic Transitions
              </h3>

              <div className="space-y-6">
                <CountdownRow label="Next Tithi Change" targetTime={data.countdowns.tithi} now={now} isDark={isDarkMode} />
                <CountdownRow label="Next Nakshatra Change" targetTime={data.countdowns.nakshatra} now={now} isDark={isDarkMode} />
                <CountdownRow label="Next Moon Sign Change" targetTime={data.countdowns.moon} now={now} isDark={isDarkMode} />
                <CountdownRow label="Next Sun Sign Change" targetTime={data.countdowns.sun} now={now} isDark={isDarkMode} />
                <CountdownRow label="Next Yoga Change" targetTime={data.countdowns.yoga} now={now} isDark={isDarkMode} />
                <CountdownRow label="Next Karana Change" targetTime={data.countdowns.karana} now={now} isDark={isDarkMode} />
              </div>
            </motion.div>
          </div>

          {/* Sidebar Muhurtas */}
          <div className="xl:col-span-4 space-y-6 lg:space-y-8 self-center w-full">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`p-3 md:p-8 rounded-2xl md:rounded-[2rem] border ${isDarkMode ? 'bg-transparent border-white/10' : 'backdrop-blur-xl bg-[#f5f5dd] border-[#A30000]/20 shadow-xl'}`}
            >
              <h3 className={`text-[12px] sm:text-sm md:text-xl font-bold font-mulish mb-3 md:mb-6 ${isDarkMode ? 'text-white' : 'text-[#A30000]'}`}>Daily Muhurtas</h3>
              <div className="flex flex-col">
                <MuhurtaRow label="Sunrise" value={data.muhurtas.sunrise} icon={<Sunrise size={18} />} isDark={isDarkMode} />
                <MuhurtaRow label="Sunset" value={data.muhurtas.sunset} icon={<Sunset size={18} />} isDark={isDarkMode} />
                <MuhurtaRow label="Moonrise" value={data.muhurtas.moonrise} icon={<Moon size={18} />} isDark={isDarkMode} />
                <MuhurtaRow label="Moonset" value={data.muhurtas.moonset} icon={<Moon size={18} />} isDark={isDarkMode} />
                <MuhurtaRow label="Rahu Kaal" value={data.muhurtas.rahuKaal} isDark={isDarkMode} highlight />
                <MuhurtaRow label="Yamaganda" value={data.muhurtas.yamaganda} isDark={isDarkMode} />
                <MuhurtaRow label="Gulika Kaal" value={data.muhurtas.gulikaKaal} isDark={isDarkMode} />
                <MuhurtaRow label="Abhijit" value={data.muhurtas.abhijit} isDark={isDarkMode} positive />
                <MuhurtaRow label="Brahma" value={data.muhurtas.brahma} isDark={isDarkMode} positive />
                <MuhurtaRow label="Amrit Kaal" value={data.muhurtas.amritKaal} isDark={isDarkMode} positive />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`p-3 md:p-6 rounded-2xl md:rounded-[1.5rem] border ${isDarkMode ? 'bg-transparent border-white/10' : 'backdrop-blur-xl bg-[#f5f5dd] border-[#A30000]/20 shadow-sm'}`}
            >
              <div className={`flex justify-between items-center px-2 sm:px-6 md:px-12 lg:px-32 xl:px-4 py-2 md:py-3 last:border-0 ${isDarkMode ? 'border-b border-white/10' : 'border-b-[0.5px] border-gray-500/50'}`}>
                <span className={`font-mulish font-bold text-[10px] sm:text-xs md:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Panchak Status</span>
                <span className={`font-bold px-2 md:px-3 py-1 md:py-1 rounded-full text-[9px] sm:text-[10px] md:text-sm ${data.status.panchak !== 'Active' ? (isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600') : 'bg-red-500/20 text-red-400'}`}>{data.status.panchak}</span>
              </div>
              <div className={`flex justify-between items-center px-2 sm:px-6 md:px-12 lg:px-32 xl:px-4 py-2 md:py-3 last:border-0 ${isDarkMode ? 'border-b border-white/10' : 'border-b-[0.5px] border-gray-500/50'}`}>
                <span className={`font-mulish font-bold text-[10px] sm:text-xs md:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Bhadra Status</span>
                <span className={`font-bold px-2 md:px-3 py-1 md:py-1 rounded-full text-[9px] sm:text-[10px] md:text-sm ${data.status.bhadra !== 'Active' ? (isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600') : 'bg-red-500/20 text-red-400'}`}>{data.status.bhadra}</span>
              </div>
              <div className={`flex justify-between items-center px-2 sm:px-6 md:px-12 lg:px-32 xl:px-4 py-2 md:py-3 last:border-0 ${isDarkMode ? 'border-b border-white/10' : 'border-b-[0.5px] border-gray-500/50'}`}>
                <span className={`font-mulish font-bold text-[10px] sm:text-xs md:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Samvatsara</span>
                <span className={`font-bold text-[10px] sm:text-xs md:text-base ${isDarkMode ? 'text-gold' : 'text-[#A30000]'}`}>{data.samvatsara}</span>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={`block lg:hidden mt-8 text-center text-[10px] sm:text-xs font-mulish italic px-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
        >
          For more real-time cosmic transitions and a comprehensive Panchang analysis, please experience our platform on a laptop or desktop.
        </motion.p>
      </div>
    </section>
  );
}

const RASHI_SYMBOLS = {
  "Mesha": "\u2648\uFE0E", "Vrishabh": "\u2649\uFE0E", "Mithun": "\u264A\uFE0E",
  "Kark": "\u264B\uFE0E", "Simha": "\u264C\uFE0E", "Kanya": "\u264D\uFE0E",
  "Tula": "\u264E\uFE0E", "Vrishchik": "\u264F\uFE0E", "Dhanu": "\u2650\uFE0E",
  "Makar": "\u2651\uFE0E", "Kumbh": "\u2652\uFE0E", "Meen": "\u2653\uFE0E"
};

const PanchangItem = ({ icon, label, value, isDark }) => (
  <div className="flex flex-col gap-0.5 md:gap-2">
    <div className={`flex items-center gap-1 md:gap-2 text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-wider ${isDark ? 'text-gold' : 'text-[#A30000]'}`}>
      <span className="opacity-70 scale-50 md:scale-100 origin-left hidden md:block">{icon}</span> <span className="truncate">{label}</span>
    </div>
    <div className={`flex items-center gap-1.5 md:gap-2 text-[11px] sm:text-xs md:text-xl font-bold font-mulish ${isDark ? 'text-white' : 'text-black'}`}>
      {(label === 'Sun Sign' || label === 'Moon Sign') && RASHI_SYMBOLS[value] && (
        <span className={`text-sm md:text-2xl font-sans ${isDark ? 'text-gold' : 'text-[#A30000]'}`}>{RASHI_SYMBOLS[value]}</span>
      )}
      {value}
    </div>
  </div>
);

const MuhurtaRow = ({ label, value, icon, isDark, highlight, positive }) => {
  let colorClass = isDark ? 'text-gray-300' : 'text-gray-700';
  if (highlight) colorClass = isDark ? 'text-red-400' : 'text-red-600';
  if (positive) colorClass = isDark ? 'text-green-400' : 'text-green-600';

  return (
    <div className={`flex justify-between items-center py-2 md:py-3 px-6 md:px-12 lg:px-32 xl:px-4 last:border-0 ${isDark ? 'border-b border-white/10' : 'border-b-[0.5px] border-gray-500/50'}`}>
      <div className={`flex items-center gap-2 font-mulish font-medium text-[10px] sm:text-xs md:text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        <span className="scale-75 md:scale-100 hidden sm:block">{icon}</span> {label}
      </div>
      <div className={`font-bold font-mulish text-[10px] sm:text-xs md:text-base ${colorClass}`}>
        {value}
      </div>
    </div>
  );
};

const CountdownRow = ({ label, targetTime, now, isDark }) => {
  const diff = targetTime - now;
  return (
    <div className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-1 md:gap-3 p-2 md:p-5 rounded-xl md:rounded-[1rem] ${isDark ? 'bg-transparent border-white/20' : 'bg-white hover:bg-white/80 border-[#A30000]/10 shadow-sm'} transition-colors border`}>
      <div className={`font-bold font-mulish text-[6px] md:text-base ${isDark ? 'text-gray-300' : 'text-gray-700'} w-full md:w-1/3`}>
        {label}
      </div>
      <div className={`text-[8px] sm:text-[10px] md:text-base lg:text-lg font-mulish font-normal whitespace-nowrap ${isDark ? 'text-white' : 'text-[#A30000]'} w-full md:w-2/3 md:text-right`}>
        {formatTime(diff)}
      </div>
    </div>
  );
};
