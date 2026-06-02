import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { CalendarDays } from 'lucide-react';

export default function Panchang() {
    const { isDarkMode } = useTheme();
    const [panchangData, setPanchangData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPanchang = async () => {
            try {
                // Fetching Sunrise/Sunset for New Delhi (Standard IST)
                const res = await fetch('https://api.sunrisesunset.io/json?lat=28.6139&lng=77.2090');
                const data = await res.json();
                
                if (data.status === 'OK') {
                    const { sunrise, sunset } = data.results;
                    
                    // Convert AM/PM to Date objects for today
                    const today = new Date();
                    const parseTime = (timeStr) => {
                        const [time, modifier] = timeStr.split(' ');
                        let [hours, minutes, seconds] = time.split(':');
                        if (hours === '12') hours = '00';
                        if (modifier === 'PM') hours = parseInt(hours, 10) + 12;
                        const date = new Date(today);
                        date.setHours(hours, minutes, seconds, 0);
                        return date;
                    };

                    const srDate = parseTime(sunrise);
                    const ssDate = parseTime(sunset);
                    
                    const dayDurationMs = ssDate - srDate;
                    const onePartMs = dayDurationMs / 8;
                    const dayOfWeek = today.getDay(); // 0 = Sun, 1 = Mon...

                    // Rahu Kaal Multipliers (1-indexed parts, so multiply by part - 1)
                    const rahuParts = [8, 2, 7, 5, 6, 4, 3];
                    const rahuStartMs = srDate.getTime() + (rahuParts[dayOfWeek] - 1) * onePartMs;
                    const rahuEndMs = rahuStartMs + onePartMs;

                    // Yamaganda Kaal Multipliers
                    const yamaParts = [5, 4, 3, 2, 1, 7, 6];
                    const yamaStartMs = srDate.getTime() + (yamaParts[dayOfWeek] - 1) * onePartMs;
                    const yamaEndMs = yamaStartMs + onePartMs;

                    // Abhijit Muhurat
                    const solarNoonMs = srDate.getTime() + (dayDurationMs / 2);
                    const abhijitDurationMs = dayDurationMs / 15;
                    const abhijitStartMs = solarNoonMs - (abhijitDurationMs / 2);
                    const abhijitEndMs = solarNoonMs + (abhijitDurationMs / 2);

                    // Brahma Muhurat (Approx 1 hr 36 mins to 48 mins before sunrise)
                    const brahmaStartMs = srDate.getTime() - (96 * 60000);
                    const brahmaEndMs = srDate.getTime() - (48 * 60000);

                    const formatTime = (ms) => {
                        return new Date(ms).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
                    };

                    setPanchangData({
                        sunrise,
                        sunset,
                        currentDate: today.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
                        currentDay: today.toLocaleDateString('en-GB', { weekday: 'long' }),
                        kaals: [
                            {
                                id: 1,
                                heading: 'Brahma Muhurat',
                                start: formatTime(brahmaStartMs),
                                end: formatTime(brahmaEndMs),
                                desc: 'A highly auspicious daily time window, traditionally believed to bring success and positive outcomes to new endeavors.'
                            },
                            {
                                id: 2,
                                heading: 'Abhijit Muhurat',
                                start: formatTime(abhijitStartMs),
                                end: formatTime(abhijitEndMs),
                                desc: 'An exceptionally favorable timing window within the day, considered perfect for initiating important tasks or rituals.'
                            },
                            {
                                id: 3,
                                heading: 'Rahu Kaal',
                                start: formatTime(rahuStartMs),
                                end: formatTime(rahuEndMs),
                                desc: 'A daily inauspicious period lasting approximately 90 minutes during which it is advised to avoid starting any major or new activities.'
                            },
                            {
                                id: 4,
                                heading: 'Yamaganda Kaal',
                                start: formatTime(yamaStartMs),
                                end: formatTime(yamaEndMs),
                                desc: 'Another inauspicious daily period where starting new and important tasks is generally avoided according to Vedic astrology.'
                            }
                        ]
                    });
                }
            } catch (error) {
                console.error("Failed to fetch panchang", error);
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
                    <h2 className="text-4xl md:text-6xl font-black mb-4">
                        <span className="text-[#FF0000]">Astrofied</span> <span className={isDarkMode ? 'text-white' : 'text-[#1B263B]'}>Panchang</span>
                    </h2>
                    <h3 className={`text-3xl md:text-4xl font-bold mb-6 ${isDarkMode ? 'text-gray-200' : 'text-[#111827]'}`}>
                        Today's Panchang
                    </h3>
                    
                    <div className="flex flex-col items-center justify-center gap-4">
                        <div className="flex items-center gap-3">
                            <CalendarDays className={`w-8 h-8 ${isDarkMode ? 'text-gray-300' : 'text-[#4A5568]'}`} strokeWidth={1.5} />
                            <span className="text-2xl md:text-3xl font-bold">
                                {panchangData.currentDate} <span className="mx-2 font-normal">•</span> {panchangData.currentDay}
                            </span>
                        </div>
                        <div className="text-sm md:text-base font-bold tracking-wide uppercase mt-2">
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
                            <h4 className="text-lg md:text-2xl lg:text-3xl font-black text-[#8B0000] mb-4 uppercase tracking-tight">
                                {kaal.heading}
                            </h4>
                            
                            <div className="w-full h-[1px] bg-black/20 my-2"></div>
                            
                            <div className="flex flex-col items-center my-3 w-full">
                                <span className="text-red-700 font-bold text-xs md:text-sm uppercase tracking-wider mb-1">starts at</span>
                                <span className="text-xl md:text-3xl lg:text-4xl font-black text-[#5C2B2B]">
                                    {kaal.start}
                                </span>
                            </div>

                            <div className="w-4/5 h-[2px] bg-[#8B0000]/60 my-2"></div>

                            <div className="flex flex-col items-center my-3 w-full">
                                <span className="text-red-700 font-bold text-xs md:text-sm uppercase tracking-wider mb-1">ends at</span>
                                <span className="text-xl md:text-3xl lg:text-4xl font-black text-[#5C2B2B]">
                                    {kaal.end}
                                </span>
                            </div>

                            <div className="mt-6 bg-[#2B2B2B] rounded-2xl p-4 md:p-5 text-left w-full flex-grow flex items-center shadow-inner">
                                <p className="text-white text-[10px] md:text-xs leading-relaxed font-medium">
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
