import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Heart, Star, Sparkles, BookOpen, Compass, Info, ChevronRight, Calculator } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5001/api' 
    : 'https://astrofied-production.up.railway.app/api';

const ZODIAC_SIGNS = [
    { name: 'Aries', date: 'Mar 21 - Apr 19', element: 'Fire', planet: 'Mars', symbol: '♈' },
    { name: 'Taurus', date: 'Apr 20 - May 20', element: 'Earth', planet: 'Venus', symbol: '♉' },
    { name: 'Gemini', date: 'May 21 - Jun 20', element: 'Air', planet: 'Mercury', symbol: '♊' },
    { name: 'Cancer', date: 'Jun 21 - Jul 22', element: 'Water', planet: 'Moon', symbol: '♋' },
    { name: 'Leo', date: 'Jul 23 - Aug 22', element: 'Fire', planet: 'Sun', symbol: '♌' },
    { name: 'Virgo', date: 'Aug 23 - Sep 22', element: 'Earth', planet: 'Mercury', symbol: '♍' },
    { name: 'Libra', date: 'Sep 23 - Oct 22', element: 'Air', planet: 'Venus', symbol: '♎' },
    { name: 'Scorpio', date: 'Oct 23 - Nov 21', element: 'Water', planet: 'Mars/Pluto', symbol: '♏' },
    { name: 'Sagittarius', date: 'Nov 22 - Dec 21', element: 'Fire', planet: 'Jupiter', symbol: '♐' },
    { name: 'Capricorn', date: 'Dec 22 - Jan 19', element: 'Earth', planet: 'Saturn', symbol: '♑' },
    { name: 'Aquarius', date: 'Jan 20 - Feb 18', element: 'Air', planet: 'Saturn/Uranus', symbol: '♒' },
    { name: 'Pisces', date: 'Feb 19 - Mar 20', element: 'Water', planet: 'Jupiter/Neptune', symbol: '♓' }
];

const MYTHS_vs_FACTS = [
    { myth: "Astrology is just about your Sun sign.", fact: "Vedic astrology uses your Moon sign and Nakshatra for much deeper personal accuracy." },
    { myth: "Gemstones can change your's entire destiny.", fact: "Gemstones act as planetary energy filters; they support your efforts but don't replace them." },
    { myth: "Horoscope matching is only about Guna points.", fact: "True Vedic matching also analyzes Mangal Dosha and planetary strengths (Shadbala)." },
];

export default function AstroInsights() {
    const { isDarkMode } = useTheme();
    const [activeTab, setActiveTab] = useState('panchang');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    // Form states
    const [birthDetails, setBirthDetails] = useState({ dob: '', tob: '', lat: '23.8315', lon: '91.2868' });
    const [matchDetails, setMatchDetails] = useState({ boy_dob: '', boy_tob: '', girl_dob: '', girl_tob: '' });

    // Fetch Daily Panchang on load
    useEffect(() => {
        if (activeTab === 'panchang') {
            fetchPanchang();
        }
    }, [activeTab]);

    const fetchPanchang = async () => {
        setLoading(true);
        try {
            const now = new Date().toISOString();
            const res = await axios.post(`${API_BASE_URL}/panchang`, {
                datetime: now,
                lat: '23.8315', // Default Agartala
                lon: '91.2868'
            });
            setData(res.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleBirthTool = async (type) => {
        if (!birthDetails.dob || !birthDetails.tob) return alert('Please enter birth details');
        setLoading(true);
        try {
            const endpoint = type === 'nakshatra' ? 'nakshatra' : 'gemstone';
            const res = await axios.post(`${API_BASE_URL}/${endpoint}`, {
                datetime: `${birthDetails.dob}T${birthDetails.tob}:00+05:30`,
                lat: birthDetails.lat,
                lon: birthDetails.lon
            });
            setData(res.data.data);
        } catch (err) {
            alert('Error fetching data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleMatch = async () => {
        setLoading(true);
        try {
            const res = await axios.post(`${API_BASE_URL}/matching`, {
                boy_dob: matchDetails.boy_dob, boy_tob: matchDetails.boy_tob, boy_lat: '23.83', boy_lon: '91.28',
                girl_dob: matchDetails.girl_dob, girl_tob: matchDetails.girl_tob, girl_lat: '23.83', girl_lon: '91.28'
            });
            setData(res.data.data);
        } catch (err) {
            alert('Matching failed. Ensure all details are correct.');
        } finally {
            setLoading(false);
        }
    };

    const tabs = [
        { id: 'panchang', label: 'Daily Panchang', icon: Sun },
        { id: 'zodiac', label: 'Zodiac Facts', icon: Sparkles },
        { id: 'matching', label: 'Love Match', icon: Heart },
        { id: 'nakshatra', label: 'Birth Star', icon: Star },
        { id: 'gemstone', label: 'Gemstones', icon: Compass },
        { id: 'tips', label: 'Astro Tips', icon: BookOpen },
    ];

    return (
        <section id="insights" className="py-24 relative overflow-hidden">
            <div className={`absolute inset-0 opacity-10 bg-grid-white/[0.05] ${isDarkMode ? '' : 'invert'}`} />
            
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight" style={{ color: isDarkMode ? '#D4AF37' : '#4B0082' }}>
                        Free Astro Insights
                    </h2>
                    <p className={`text-lg font-mulish opacity-80 max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Unlock the ancient calculations of Vedic Astrology. Accurate, interactive, and completely free.
                    </p>
                </motion.div>

                {/* Tabs Navigation */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => { setActiveTab(tab.id); setData(null); }}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all border ${
                                activeTab === tab.id
                                    ? (isDarkMode ? 'bg-gold border-gold text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]' : 'bg-[#4B0082] border-[#4B0082] text-white')
                                    : (isDarkMode ? 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10' : 'bg-black/5 border-black/10 text-gray-600 hover:bg-black/10')
                            }`}
                        >
                            <tab.icon size={18} />
                            <span className="hidden sm:inline">{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className={`min-h-[400px] glass rounded-[2.5rem] border p-8 md:p-12 ${
                            isDarkMode ? 'border-white/10' : 'border-black/5'
                        }`}
                    >
                        {activeTab === 'panchang' && (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {loading ? (
                                    <div className="col-span-full py-20 flex justify-center"><Sparkles className="animate-spin text-gold" size={48} /></div>
                                ) : data ? (
                                    <>
                                        <PanchangCard title="Tithi" value={data.tithi.details.name} desc={data.tithi.details.description} isDarkMode={isDarkMode} />
                                        <PanchangCard title="Nakshatra" value={data.nakshatra.details.name} desc={data.nakshatra.details.description} isDarkMode={isDarkMode} />
                                        <PanchangCard title="Yoga" value={data.yoga.details.name} desc={data.yoga.details.description} isDarkMode={isDarkMode} />
                                        <PanchangCard title="Karana" value={data.karana.details.name} desc={data.karana.details.description} isDarkMode={isDarkMode} />
                                        <PanchangCard title="Sunrise" value={data.sunrise} icon={<Sun size={20} />} isDarkMode={isDarkMode} />
                                        <PanchangCard title="Sunset" value={data.sunset} icon={<Moon size={20} />} isDarkMode={isDarkMode} />
                                    </>
                                ) : <p className="text-center col-span-full">Unable to load daily Panchang.</p>}
                            </div>
                        )}

                        {activeTab === 'zodiac' && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                                {ZODIAC_SIGNS.map((sign) => (
                                    <div key={sign.name} className={`group p-6 rounded-3xl border transition-all hover:scale-105 ${
                                        isDarkMode ? 'bg-white/5 border-white/10 hover:border-gold/50' : 'bg-black/5 border-black/10 hover:border-[#4B0082]/50'
                                    }`}>
                                        <div className="text-4xl mb-3">{sign.symbol}</div>
                                        <h3 className="font-bold text-lg">{sign.name}</h3>
                                        <p className="text-[10px] opacity-60 uppercase tracking-tighter mb-2">{sign.date}</p>
                                        <div className="space-y-1">
                                            <p className="text-[10px]"><span className="opacity-50">Element:</span> {sign.element}</p>
                                            <p className="text-[10px]"><span className="opacity-50">Ruler:</span> {sign.planet}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'matching' && (
                            <div className="max-w-4xl mx-auto">
                                <div className="grid md:grid-cols-2 gap-8 mb-8">
                                    <InputGroup label="Boy's Birth" dateVal={matchDetails.boy_dob} timeVal={matchDetails.boy_tob} 
                                        onDateChange={(v) => setMatchDetails({...matchDetails, boy_dob: v})} 
                                        onTimeChange={(v) => setMatchDetails({...matchDetails, boy_tob: v})} isDarkMode={isDarkMode} />
                                    <InputGroup label="Girl's Birth" dateVal={matchDetails.girl_dob} timeVal={matchDetails.girl_tob} 
                                        onDateChange={(v) => setMatchDetails({...matchDetails, girl_dob: v})} 
                                        onTimeChange={(v) => setMatchDetails({...matchDetails, girl_tob: v})} isDarkMode={isDarkMode} />
                                </div>
                                <button onClick={handleMatch} disabled={loading} className={`w-full py-4 rounded-2xl font-bold transition-all ${
                                    isDarkMode ? 'bg-gold text-black' : 'bg-[#4B0082] text-white'
                                }`}>
                                    {loading ? 'Calculating...' : 'Check Compatibility'}
                                </button>
                                {data && (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                                        <h4 className="text-2xl font-bold mb-2">Match Score: {data.total_points}/36</h4>
                                        <p className="opacity-80 italic">"{data.message.description}"</p>
                                    </motion.div>
                                )}
                            </div>
                        )}

                        {(activeTab === 'nakshatra' || activeTab === 'gemstone') && (
                            <div className="max-w-2xl mx-auto">
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-bold opacity-60">Birth Date</label>
                                        <input type="date" value={birthDetails.dob} onChange={e => setBirthDetails({...birthDetails, dob: e.target.value})} className={`p-4 rounded-xl border bg-transparent focus:outline-none ${isDarkMode ? 'border-white/10' : 'border-black/10'}`} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-bold opacity-60">Birth Time</label>
                                        <input type="time" value={birthDetails.tob} onChange={e => setBirthDetails({...birthDetails, tob: e.target.value})} className={`p-4 rounded-xl border bg-transparent focus:outline-none ${isDarkMode ? 'border-white/10' : 'border-black/10'}`} />
                                    </div>
                                </div>
                                <button onClick={() => handleBirthTool(activeTab)} disabled={loading} className={`w-full py-4 rounded-2xl font-bold transition-all ${
                                    isDarkMode ? 'bg-gold text-black' : 'bg-[#4B0082] text-white'
                                }`}>
                                    {loading ? 'Finding...' : (activeTab === 'nakshatra' ? 'Reveal My Nakshatra' : 'Suggest Gemstones')}
                                </button>
                                {data && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 p-8 rounded-[2rem] border border-gold/20 bg-gold/5">
                                        {activeTab === 'nakshatra' ? (
                                            <>
                                                <h4 className="text-3xl font-bold text-gold mb-2">{data.nakshatra.name}</h4>
                                                <p className="opacity-90">{data.nakshatra.description}</p>
                                                <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
                                                    <div><span className="opacity-50">Lord:</span> {data.nakshatra.lord}</div>
                                                    <div><span className="opacity-50">Rashi:</span> {data.rasi.name}</div>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="space-y-4">
                                                <h4 className="text-xl font-bold">Recommended for You:</h4>
                                                {['lucky_gemstone', 'benefic_gemstone', 'life_gemstone'].map(k => data[k] && (
                                                    <div key={k} className="p-4 rounded-xl bg-white/5 border border-white/10">
                                                        <span className="text-[10px] font-bold opacity-50 uppercase">{k.replace('_', ' ')}</span>
                                                        <div className="text-lg font-bold text-gold">{data[k].name}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </div>
                        )}

                        {activeTab === 'tips' && (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {MYTHS_vs_FACTS.map((item, i) => (
                                    <div key={i} className={`p-8 rounded-3xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
                                        <div className="mb-4 flex items-center gap-2 text-red-500"><Info size={16} /> <span className="text-xs font-black uppercase">MYTH</span></div>
                                        <p className="text-sm font-bold mb-6 italic opacity-60">"{item.myth}"</p>
                                        <div className="mb-4 flex items-center gap-2 text-green-500"><Sparkles size={16} /> <span className="text-xs font-black uppercase">Vedic FACT</span></div>
                                        <p className="text-sm leading-relaxed">{item.fact}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}

function PanchangCard({ title, value, desc, icon, isDarkMode }) {
    return (
        <div className={`p-6 rounded-3xl border transition-all ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
            <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold opacity-50 uppercase tracking-widest">{title}</span>
                <span className="text-gold">{icon || <Calculator size={16} />}</span>
            </div>
            <div className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-[#4B0082]'}`}>{value}</div>
            {desc && <p className="text-xs opacity-60 font-mulish leading-relaxed">{desc}</p>}
        </div>
    );
}

function InputGroup({ label, dateVal, timeVal, onDateChange, onTimeChange, isDarkMode }) {
    return (
        <div className="flex flex-col gap-4 p-6 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-sm font-bold">{label}</span>
            <div className="grid grid-cols-2 gap-2">
                <input type="date" value={dateVal} onChange={e => onDateChange(e.target.value)} className="bg-transparent border-b border-white/20 p-2 text-sm focus:outline-none" />
                <input type="time" value={timeVal} onChange={e => onTimeChange(e.target.value)} className="bg-transparent border-b border-white/20 p-2 text-sm focus:outline-none" />
            </div>
        </div>
    );
}
