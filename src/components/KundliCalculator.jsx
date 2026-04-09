import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Mail, MapPin, Clock, Calendar, User, Search, X, Smartphone } from 'lucide-react';
import { getPlanetaryPositions, getKundali } from 'vedic-astro';
import { DateTime } from 'luxon';

const PLANET_COLORS = {
    "As": "#4CAF50", // Ascendant
    "Su": "#FFA500", // Sun
    "Mo": "#FFFFFF", // Moon
    "Ma": "#FF0000", // Mars
    "Me": "#32CD32", // Mercury
    "Ju": "#FFD700", // Jupiter
    "Ve": "#FF69B4", // Venus
    "Sa": "#4B0082", // Saturn
    "Ra": "#808080", // Rahu
    "Ke": "#808080", // Ketu
    "Ur": "#40E0D0", // Uranus
    "Ne": "#0000FF", // Neptune
    "Pl": "#8B0000"  // Pluto
};

export default function KundliCalculator() {
    const { isDarkMode } = useTheme();
    const [formData, setFormData] = useState({
        name: '', phone: '', email: '', dob: '', tob: '12:00', pob: '', gender: '', lat: '', lon: ''
    });

    const [citySuggestions, setCitySuggestions] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showChart, setShowChart] = useState(false);
    const [status, setStatus] = useState('idle');
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        if (formData.pob.length < 3) { setCitySuggestions([]); return; }
        const delayDebounceFn = setTimeout(async () => {
            setIsSearching(true);
            try {
                // Fetch with addressdetails to get clean city/state/country names
                const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(formData.pob)}&addressdetails=1&limit=8`);
                const data = await res.json();
                
                const refined = data.map(item => {
                    const addr = item.address;
                    const city = addr.city || addr.town || addr.village || addr.suburb || addr.hamlet || addr.county;
                    const state = addr.state || addr.region;
                    const country = addr.country;
                    
                    // Filter out results that don't have basic city/state info
                    if (!city || !state || !country) return null;
                    
                    return {
                        displayName: `${city}, ${state}, ${country}`,
                        lat: item.lat,
                        lon: item.lon
                    };
                }).filter(Boolean);
                
                setCitySuggestions(refined);
            } catch (err) { 
                console.error("Search error:", err); 
            } finally { 
                setIsSearching(false); 
            }
        }, 800);
        return () => clearTimeout(delayDebounceFn);
    }, [formData.pob]);

    const handleSelectCity = (city) => {
        setFormData({ ...formData, pob: city.displayName, lat: city.lat, lon: city.lon });
        setCitySuggestions([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            // 1. Precise Timezone Detection (Handling Historical Shifts)
            let utcIso = "";
            try {
                const tzRes = await fetch(`https://api.bigdatacloud.net/data/timezone-by-location?latitude=${formData.lat}&longitude=${formData.lon}&localityLanguage=en`);
                const tzData = await tzRes.json();
                
                // Use Luxon to get the exact offset for that specific date in history
                const iana = tzData.ianaTimeId || "Asia/Kolkata";
                const dt = DateTime.fromISO(`${formData.dob}T${formData.tob}`, { zone: iana });
                utcIso = dt.toUTC().toISO();
                
                if (!utcIso) throw new Error("Invalid Date/Time");
            } catch (tzErr) {
                console.warn("Timezone API or Luxon failed, falling back to IST (+5:30)");
                utcIso = `${formData.dob}T${formData.tob}:00+05:30`;
            }

            // 2. Exact Calculation using Lahiri Ayanamsa (vedic-astro default)
            const location = { latitude: parseFloat(formData.lat), longitude: parseFloat(formData.lon) };
            const planetPositions = await getPlanetaryPositions({ iso: utcIso }, location);
            const kundali = getKundali(planetPositions);

            // 3. Map to D1 Chart
            const lagnaSign = kundali.houses[1].sign;
            const placements = {};
            for (let h = 1; h <= 12; h++) {
                placements[h] = kundali.houses[h].planets.map(p => {
                    const label = Object.keys(PLANET_COLORS).find(k => p.name.includes(k)) || p.name;
                    return `${label} ${Math.floor(p.position)}°`;
                });
                if (h === 1) placements[h].unshift("As");
            }

            setChartData({ lagna: lagnaSign, placements });

            // 4. Submit to Email
            await fetch("https://formsubmit.co/ajax/sj.astrologyservices@gmail.com", {
                method: "POST",
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    "Subject": "New PRECISE Kundli Request",
                    ...formData,
                    "Lagna": lagnaSign,
                    "_template": "table"
                })
            });

            setStatus('success');
            setShowChart(true);
        } catch (err) {
            console.error(err);
            setStatus('error');
            alert("Calculation failed. Please verify birth details.");
        }
    };

    return (
        <section id="calculator" className="py-24 relative overflow-hidden font-raleway">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2 text-center lg:text-left">
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6">Get Your <span className="text-gold">Free Kundli</span></h2>
                        <div className="w-20 h-1.5 bg-gold mb-8 mx-auto lg:mx-0 rounded-full" />
                        <p className="text-lg md:text-xl opacity-80 leading-relaxed max-w-lg mx-auto lg:mx-0">Precision Vedic birth chart calculation based on exact astronomical data.</p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`w-full lg:w-1/2 rounded-[2.5rem] p-8 md:p-12 shadow-2xl border ${isDarkMode ? 'bg-[#0A0A0A] border-gold/20' : 'bg-[#FFF9F0] border-[#4B0082]/10'}`}>
                        <h3 className="text-2xl md:text-3xl font-bold mb-10 text-center uppercase tracking-widest" style={{ color: isDarkMode ? '#D4AF37' : '#4B0082' }}>Kundli Calculator</h3>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <InputField label="Name" icon={<User className="w-4 h-4" />} required onChange={e => setFormData({...formData, name: e.target.value})} />
                            <InputField label="Phone" icon={<Smartphone className="w-4 h-4" />} required onChange={e => setFormData({...formData, phone: e.target.value})} />
                            <InputField label="Email" icon={<Mail className="w-4 h-4" />} type="email" required onChange={e => setFormData({...formData, email: e.target.value})} />
                            <InputField label="Date" icon={<Calendar className="w-4 h-4" />} type="date" required onChange={e => setFormData({...formData, dob: e.target.value})} />
                            <InputField label="Time" icon={<Clock className="w-4 h-4" />} type="time" required onChange={e => setFormData({...formData, tob: e.target.value})} />
                            <div className="flex flex-col gap-2 relative">
                                <label className="text-sm font-bold opacity-70 flex items-center gap-2"><MapPin className="w-4 h-4 text-gold" /> Birth Place</label>
                                <input required value={formData.pob} className="bg-transparent border-b-2 border-gold/30 py-2 focus:border-gold outline-none" onChange={e => setFormData({...formData, pob: e.target.value})} />
                                {isSearching && <Search className="absolute right-2 bottom-3 w-4 h-4 animate-spin text-gold" />}
                                {citySuggestions.length > 0 && (
                                    <div className={`absolute top-full left-0 right-0 z-50 mt-1 rounded-2xl shadow-2xl border overflow-hidden ${isDarkMode ? 'bg-[#121212] border-gold/20' : 'bg-white border-gray-100'}`}>
                                        <div className="bg-[#666] text-white px-4 py-2 text-[11px] text-center font-bold tracking-tight opacity-90">Type more letters for precise results</div>
                                        <div className="max-h-[250px] overflow-y-auto">
                                            {citySuggestions.map((c, i) => (
                                                <div key={i} onClick={() => handleSelectCity(c)} className="p-4 hover:bg-gold/10 hover:text-gold cursor-pointer text-sm flex items-center gap-3 border-b border-gray-100 dark:border-zinc-800 last:border-0 transition-colors">
                                                    <MapPin className="w-4 h-4 text-gray-400" />
                                                    <span className="font-medium">{c.displayName}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="bg-[#C1FCB1]/30 dark:bg-[#C1FCB1]/10 px-4 py-3 text-sm text-center font-semibold text-gray-500 dark:text-gray-400 cursor-default">Show more places available</div>
                                    </div>
                                )}

                            </div>
                            <div className="flex flex-col gap-2 md:col-span-2">
                                <label className="text-sm font-bold opacity-70">Gender</label>
                                <select required className={`bg-transparent border-b-2 border-gold/30 py-2 focus:border-gold outline-none ${isDarkMode ? 'text-white' : 'text-black'}`} onChange={e => setFormData({...formData, gender: e.target.value})}>
                                    <option value="">--Select Option--</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            <button disabled={status === 'loading'} className="md:col-span-2 mt-8 py-4 rounded-xl font-bold text-xl uppercase tracking-widest shadow-xl transition-all hover:scale-[1.02]" style={{ background: 'linear-gradient(45deg, #D4AF37, #FFD700, #B8860B)', color: '#000' }}>{status === 'loading' ? 'Calculating...' : 'Submit'}</button>
                        </form>
                    </motion.div>
                </div>
            </div>

            <AnimatePresence>
                {showChart && chartData && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
                        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className={`relative w-full max-w-3xl rounded-[2.5rem] p-8 md:p-12 border-4 border-gold shadow-2xl ${isDarkMode ? 'bg-[#0f0f0f]' : 'bg-white'}`}>
                            <button onClick={() => setShowChart(false)} className="absolute top-6 right-6 text-gold"><X className="w-10 h-10" /></button>
                            <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gold tracking-widest uppercase">Precise Kundli Chart</h3>
                            <div className="w-full aspect-square max-w-md mx-auto relative border border-gold/20 p-4">
                                <NorthIndianChart lagna={chartData.lagna} placements={chartData.placements} />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

function InputField({ label, icon, ...props }) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-bold opacity-70 flex items-center gap-2"><span className="text-gold">{icon}</span> {label}</label>
            <input {...props} className="bg-transparent border-b-2 border-gold/30 py-2 focus:border-gold outline-none transition-all" />
        </div>
    );
}

function NorthIndianChart({ lagna, placements }) {
    const getSign = (h) => { let s = (lagna + h - 1) % 12; return s === 0 ? 12 : s; };
    return (
        <div className="w-full h-full relative">
            <svg viewBox="0 0 400 400" className="w-full h-full stroke-[#4B0082] stroke-[1.5] fill-none"><rect x="0" y="0" width="400" height="400" /><line x1="0" y1="0" x2="400" y2="400" /><line x1="400" y1="0" x2="0" y2="400" /><path d="M200 0 L400 200 L200 400 L0 200 Z" /></svg>
            <ChartHouse x="200" y="120" sign={getSign(1)} planets={placements[1]} />
            <ChartHouse x="100" y="50" sign={getSign(2)} planets={placements[2]} />
            <ChartHouse x="50" y="100" sign={getSign(3)} planets={placements[3]} />
            <ChartHouse x="120" y="200" sign={getSign(4)} planets={placements[4]} />
            <ChartHouse x="50" y="300" sign={getSign(5)} planets={placements[5]} />
            <ChartHouse x="100" y="350" sign={getSign(6)} planets={placements[6]} />
            <ChartHouse x="200" y="280" sign={getSign(7)} planets={placements[7]} />
            <ChartHouse x="300" y="350" sign={getSign(8)} planets={placements[8]} />
            <ChartHouse x="350" y="300" sign={getSign(9)} planets={placements[9]} />
            <ChartHouse x="280" y="200" sign={getSign(10)} planets={placements[10]} />
            <ChartHouse x="350" y="100" sign={getSign(11)} planets={placements[11]} />
            <ChartHouse x="300" y="50" sign={getSign(12)} planets={placements[12]} />
        </div>
    );
}

function ChartHouse({ x, y, sign, planets = [] }) {
    return (
        <div className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center p-1 text-center min-w-[50px]" style={{ left: `${(x / 400) * 100}%`, top: `${(y / 400) * 100}%` }}>
            <span className="text-red-600 font-bold text-xs md:text-sm mb-1">{sign}</span>
            <div className="flex flex-wrap items-center justify-center gap-1">
                {planets?.map((p, i) => <span key={i} className="text-[10px] md:text-xs font-bold" style={{ color: PLANET_COLORS[p.split(' ')[0]] || '#D4AF37' }}>{p}</span>)}
            </div>
        </div>
    );
}
