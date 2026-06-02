import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { CalendarDays } from 'lucide-react';

export default function Panchang() {
    const { isDarkMode } = useTheme();
    const [panchangData, setPanchangData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true }));

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true }));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const fetchPanchang = async () => {
            try {
                const today = new Date();
                
                // Fetch from our backend which safely handles the Prokerala API keys and aggregations
                const API_URL = import.meta.env.VITE_API_URL || 'https://astrofied-production.up.railway.app';
                // Using 28.6139, 77.2090 as default New Delhi coordinates
                const res = await fetch(`${API_URL}/api/panchang?datetime=${today.toISOString()}&lat=28.6139&lon=77.2090`);
                const data = await res.json();

                // Helper to format ISO string into local time e.g., "03:46 PM"
                const formatTimeStr = (isoStr) => {
                    if (!isoStr) return 'N/A';
                    return new Date(isoStr).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
                };

                setPanchangData({
                    sunrise: formatTimeStr(data.sunrise),
                    sunset: formatTimeStr(data.sunset),
                    currentDate: today.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
                    currentDay: today.toLocaleDateString('en-GB', { weekday: 'long' }),
                    kaals: [
                        {
                            id: 1,
                            heading: data.nakshatra?.name ? `Nakshatra: ${data.nakshatra.name}` : 'Nakshatra',
                            start: formatTimeStr(data.nakshatra?.start),
                            end: formatTimeStr(data.nakshatra?.end),
                            desc: 'Represents the specific zodiac constellation the Moon is transiting through on that given day.'
                        },
                        {
                            id: 2,
                            heading: 'Abhijit Muhurta',
                            start: formatTimeStr(data.abhijit?.start),
                            end: formatTimeStr(data.abhijit?.end),
                            desc: 'An exceptionally favorable timing window within the day, considered perfect for initiating important tasks or rituals.'
                        },
                        {
                            id: 3,
                            heading: 'Rahu Kaal',
                            start: formatTimeStr(data.rahu?.start),
                            end: formatTimeStr(data.rahu?.end),
                            desc: 'A daily inauspicious period lasting approximately 90 minutes during which it is advised to avoid starting any major or new activities.'
                        },
                        {
                            id: 4,
                            heading: 'Yam Gandam',
                            start: formatTimeStr(data.yama?.start),
                            end: formatTimeStr(data.yama?.end),
                            desc: 'Another inauspicious daily period where starting new and important tasks is generally avoided according to Vedic astrology.'
                        }
                    ]
                });

            } catch (error) {
                console.error("Failed to fetch panchang from Prokerala backend", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPanchang();
    }, []);

    if (loading || !panchangData) return null;

    return (
        <section className={`py-16 font-mulish ${isDarkMode ? 'bg-[#0A0A0A] text-white' : 'bg-[#F2EFE9] text-black'}`}>
            <div className="container mx-auto px-4 md:px-8 max-w-7xl">
                
                {/* Header */}
                <div className="text-center mb-10">
                    <h2 
                        className={`text-4xl md:text-7xl mb-4 tracking-tight bg-gradient-to-r ${isDarkMode ? 'from-white' : 'from-black'} to-[#FF0000] text-transparent bg-clip-text pb-2`} 
                        style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 900 }}
                    >
                        Astrofied Panchang
                    </h2>
                    <h3 className={`text-3xl md:text-4xl font-bold mb-6 font-mulish ${isDarkMode ? 'text-gray-200' : 'text-[#111827]'}`}>
                        Today's Panchang
                    </h3>
                    
                    <div className="flex flex-col items-center justify-center gap-4">
                        <div className="flex items-center gap-3">
                            <CalendarDays className={`w-8 h-8 ${isDarkMode ? 'text-gray-300' : 'text-[#4A5568]'}`} strokeWidth={1.5} />
                            <span className="text-2xl md:text-3xl font-bold font-mulish">
                                {panchangData.currentDate} <span className="mx-2 font-normal">•</span> {panchangData.currentDay} <span className="mx-2 font-normal">•</span> {currentTime}
                            </span>
                        </div>
                        <div className="text-sm md:text-base font-bold tracking-wide uppercase mt-2 font-mulish">
                            Sunrise {panchangData.sunrise} | Sunset {panchangData.sunset} - IST
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mt-12">
                    {panchangData.kaals.map((kaal) => (
                        <motion.div
                            key={kaal.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: kaal.id * 0.1 }}
                            className="rounded-3xl p-4 md:p-6 lg:p-8 flex flex-col items-center text-center shadow-lg hover:shadow-2xl transition-all duration-300"
                            style={{
                                background: 'linear-gradient(180deg, #FFD700 0%, #FF8C00 100%)',
                            }}
                        >
                            <h4 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold font-mulish text-[#8B0000] mb-4 tracking-tight leading-tight min-h-[3rem] flex items-center justify-center whitespace-nowrap">
                                {kaal.heading}
                            </h4>
                            
                            <div className="w-full h-[1px] bg-black/20 my-2"></div>
                            
                            <div className="flex flex-col items-center my-3 w-full">
                                <span className="text-red-700 font-bold font-mulish text-xs md:text-sm uppercase tracking-wider mb-1">starts at</span>
                                <span className="text-xl md:text-3xl lg:text-4xl font-black font-mulish text-[#5C2B2B]">
                                    {kaal.start}
                                </span>
                            </div>

                            <div className="w-4/5 h-[2px] bg-[#8B0000]/60 my-2"></div>

                            <div className="flex flex-col items-center my-3 w-full">
                                <span className="text-red-700 font-bold font-mulish text-xs md:text-sm uppercase tracking-wider mb-1">ends at</span>
                                <span className="text-xl md:text-3xl lg:text-4xl font-black font-mulish text-[#5C2B2B]">
                                    {kaal.end}
                                </span>
                            </div>

                            <div className="mt-6 bg-[#2B2B2B] rounded-2xl p-4 md:p-5 text-left w-full flex-grow flex items-center shadow-inner min-h-[6rem]">
                                <p className="text-white text-[10px] md:text-xs font-mulish leading-relaxed font-medium">
                                    {kaal.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
