import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Ecliptic, Body, MakeTime } from 'astronomy-engine';
import { Sun, Moon, Sparkles, Star } from 'lucide-react';

const TITHIS = [
    "Shukla Pratipada", "Shukla Dwitiya", "Shukla Tritiya", "Shukla Chaturthi", "Shukla Panchami", 
    "Shukla Shashthi", "Shukla Saptami", "Shukla Ashtami", "Shukla Navami", "Shukla Dashami", 
    "Shukla Ekadashi", "Shukla Dwadashi", "Shukla Trayodashi", "Shukla Chaturdashi", "Purnima",
    "Krishna Pratipada", "Krishna Dwitiya", "Krishna Tritiya", "Krishna Chaturthi", "Krishna Panchami", 
    "Krishna Shashthi", "Krishna Saptami", "Krishna Ashtami", "Krishna Navami", "Krishna Dashami", 
    "Krishna Ekadashi", "Krishna Dwadashi", "Krishna Trayodashi", "Krishna Chaturdashi", "Amavasya"
];

const NAKSHATRAS = [
    "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashirsha", "Ardra", 
    "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni", 
    "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha", 
    "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", 
    "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"
];

const YOGAS = [
    "Vishkambha", "Priti", "Ayushman", "Saubhagya", "Shobhana", "Atiganda", 
    "Sukarma", "Dhriti", "Shula", "Ganda", "Vriddhi", "Dhruva", 
    "Vyaghata", "Harshana", "Vajra", "Siddhi", "Vyatipata", "Variyan", 
    "Parigha", "Shiva", "Siddha", "Sadhya", "Shubha", "Shukla", 
    "Brahma", "Indra", "Vaidhriti"
];

const MOVING_KARANAS = ["Bava", "Balava", "Kaulava", "Taitila", "Gara", "Vanija", "Vishti"];
const getKaranaName = (index) => {
    if (index === 0) return "Kimstughna";
    if (index >= 1 && index <= 56) return MOVING_KARANAS[(index - 1) % 7];
    if (index === 57) return "Shakuni";
    if (index === 58) return "Chatushpada";
    if (index === 59) return "Naga";
    return "";
};

const getPanchang = (date) => {
    try {
        const time = MakeTime(date);
        
        // Geocentric apparent ecliptic coordinates
        const sunEcl = Ecliptic(Body.Sun, time);
        const moonEcl = Ecliptic(Body.Moon, time);
        
        // Ayanamsa calculation (Lahiri approximation)
        // Base 23.85 for J2000, moving ~50.29 arcsec/year
        const daysSince2000 = (date.getTime() - Date.UTC(2000, 0, 1)) / (1000 * 60 * 60 * 24);
        const ayanamsa = 23.85 + (daysSince2000 * (50.29 / 365.25 / 3600));
        
        let sunLong = (sunEcl.elon - ayanamsa) % 360;
        if (sunLong < 0) sunLong += 360;
        
        let moonLong = (moonEcl.elon - ayanamsa) % 360;
        if (moonLong < 0) moonLong += 360;
        
        // 1. Tithi
        let diff = (moonLong - sunLong) % 360;
        if (diff < 0) diff += 360;
        const tithiIndex = Math.floor(diff / 12);
        
        // 2. Nakshatra
        const nakshatraIndex = Math.floor(moonLong / (13 + 1/3));
        
        // 3. Yoga
        const sum = (moonLong + sunLong) % 360;
        const yogaIndex = Math.floor(sum / (13 + 1/3));
        
        // 4. Karana
        const karanaIndex = Math.floor(diff / 6);
        
        return {
            tithi: TITHIS[tithiIndex],
            nakshatra: NAKSHATRAS[nakshatraIndex],
            yoga: YOGAS[yogaIndex],
            karana: getKaranaName(karanaIndex),
        };
    } catch (e) {
        return { tithi: "Loading...", nakshatra: "Loading...", yoga: "Loading...", karana: "Loading..." };
    }
};

export default function AstrofiedPanchang() {
    const { isDarkMode } = useTheme();
    const [currentTime, setCurrentTime] = useState(new Date());
    const [panchang, setPanchang] = useState({ tithi: "", nakshatra: "", yoga: "", karana: "" });

    useEffect(() => {
        // Initial calculation
        setPanchang(getPanchang(new Date()));

        // Update every second for real-time clock
        const timer = setInterval(() => {
            const now = new Date();
            setCurrentTime(now);
            
            // Recalculate panchang only every minute to save CPU, as it changes slowly
            if (now.getSeconds() === 0) {
                setPanchang(getPanchang(now));
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const timeOptions = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    const dateOptions = { timeZone: 'Asia/Kolkata', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    
    const timeString = currentTime.toLocaleTimeString('en-IN', timeOptions);
    const dateString = currentTime.toLocaleDateString('en-IN', dateOptions);

    const cards = [
        { title: "Tithi", value: panchang.tithi, icon: Moon, desc: "Lunar Day" },
        { title: "Nakshatra", value: panchang.nakshatra, icon: Star, desc: "Lunar Mansion" },
        { title: "Yoga", value: panchang.yoga, icon: Sparkles, desc: "Sun-Moon Angle" },
        { title: "Karana", value: panchang.karana, icon: Sun, desc: "Half Lunar Day" }
    ];

    return (
        <section className={`py-20 font-mulish relative overflow-hidden ${isDarkMode ? 'bg-[#020008]' : 'bg-[#fff9e6]'}`}>
            
            {/* Background Accents */}
            <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-[150px] opacity-20 pointer-events-none ${isDarkMode ? 'bg-[#ffd700]' : 'bg-[#4B0082]'}`} />
            <div className={`absolute bottom-0 left-0 w-96 h-96 rounded-full blur-[150px] opacity-20 pointer-events-none ${isDarkMode ? 'bg-[#4B0082]' : 'bg-[#ffd700]'}`} />

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block mb-4 px-6 py-2 rounded-full border glass"
                    >
                        <span className={`text-sm md:text-base font-bold tracking-widest uppercase ${isDarkMode ? 'text-[#ffd700]' : 'text-[#4B0082]'}`}>Live Realtime</span>
                    </motion.div>
                    
                    <h2 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight ${isDarkMode ? 'text-white' : 'text-black'}`}>
                        Astrofied <span className={isDarkMode ? 'text-[#ffd700]' : 'text-[#4B0082]'}>Panchang</span>
                    </h2>
                    
                    <div className="flex flex-col items-center gap-2">
                        <div className={`text-2xl md:text-4xl font-black tabular-nums tracking-widest ${isDarkMode ? 'text-white' : 'text-[#4B0082]'}`}>
                            {timeString}
                        </div>
                        <div className={`text-lg md:text-xl font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {dateString} <span className="opacity-50 text-sm ml-2">(IST)</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {cards.map((card, idx) => (
                        <motion.div
                            key={card.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className={`flex flex-col items-center justify-center p-6 md:p-8 rounded-[2rem] border transition-all duration-300 shadow-xl hover:-translate-y-2
                                ${isDarkMode 
                                    ? 'border-[#ffd700]/20 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-xl' 
                                    : 'border-[#4B0082]/10 bg-white/60 backdrop-blur-xl'}
                            `}
                        >
                            <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-4
                                ${isDarkMode ? 'bg-[#ffd700]/10 text-[#ffd700]' : 'bg-[#4B0082]/10 text-[#4B0082]'}
                            `}>
                                <card.icon strokeWidth={1.5} className="w-8 h-8 md:w-10 md:h-10" />
                            </div>
                            
                            <h3 className={`text-xs md:text-sm font-bold uppercase tracking-widest mb-2 opacity-70
                                ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}
                            `}>
                                {card.title}
                            </h3>
                            
                            <div className={`text-lg md:text-2xl font-black text-center leading-tight
                                ${isDarkMode ? 'text-white' : 'text-black'}
                            `}>
                                {card.value || "..."}
                            </div>
                            
                            <div className={`text-[10px] md:text-xs mt-3 px-3 py-1 rounded-full border
                                ${isDarkMode ? 'border-white/10 text-gray-400' : 'border-black/10 text-gray-500'}
                            `}>
                                {card.desc}
                            </div>
                        </motion.div>
                    ))}
                </div>
                
                <div className="mt-8 text-center">
                    <p className={`text-xs md:text-sm opacity-60 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        *Calculations are based on Lahiri Ayanamsa and precise astronomical algorithms.
                    </p>
                </div>
            </div>
        </section>
    );
}
