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
                const today = new Date();
                const reqPayload = {
                    year: today.getFullYear(),
                    month: today.getMonth() + 1,
                    date: today.getDate(),
                    hours: today.getHours(),
                    minutes: today.getMinutes(),
                    seconds: today.getSeconds(),
                    latitude: 28.6139,
                    longitude: 77.2090,
                    timezone: 5.5
                };

                const fetchOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': '5NoilrNtyM1jXyVDDrbxM7GeZvRZNzz05sqoBf7a'
                    },
                    body: JSON.stringify(reqPayload)
                };

                // Fetch data concurrently from the same API source
                const [srssRes, nakshatraRes, rahuRes, yamaRes] = await Promise.all([
                    fetch('https://json.freeastrologyapi.com/getsunriseandset', fetchOptions),
                    fetch('https://json.freeastrologyapi.com/nakshatra-durations', fetchOptions),
                    fetch('https://json.freeastrologyapi.com/rahu-kalam', fetchOptions),
                    fetch('https://json.freeastrologyapi.com/yama-gandam', fetchOptions)
                ]);

                const parseAstro = async (res) => {
                    const data = await res.json();
                    if (data.statusCode === 200 && data.output) {
                        return typeof data.output === 'string' ? JSON.parse(data.output) : data.output;
                    }
                    if (data.output) return typeof data.output === 'string' ? JSON.parse(data.output) : data.output;
                    return data;
                };

                const srssData = await parseAstro(srssRes);
                const nakshatraData = await parseAstro(nakshatraRes);
                const rahuData = await parseAstro(rahuRes);
                const yamaData = await parseAstro(yamaRes);

                // Helper to format string time like "2026-06-02 15:46:39" into "03:46 PM"
                const formatTimeStr = (dateStr) => {
                    if (!dateStr) return 'N/A';
                    const timePart = dateStr.includes(' ') ? dateStr.split(' ')[1] : dateStr;
                    if (!timePart) return dateStr;
                    const [hours, minutes] = timePart.split(':');
                    let h = parseInt(hours, 10);
                    const ampm = h >= 12 ? 'PM' : 'AM';
                    h = h % 12;
                    h = h ? h : 12;
                    return `${h.toString().padStart(2, '0')}:${minutes} ${ampm}`;
                };

                let abhijitStartStr = 'N/A';
                let abhijitEndStr = 'N/A';
                let sunriseStr = 'N/A';
                let sunsetStr = 'N/A';

                if (srssData && srssData.sun_rise_time) {
                    sunriseStr = formatTimeStr(srssData.sun_rise_time);
                    sunsetStr = formatTimeStr(srssData.sun_set_time);
                    
                    const parseTime = (timeStr) => {
                        let [hours, minutes, seconds] = timeStr.split(':');
                        const date = new Date(today);
                        date.setHours(hours, minutes, seconds || 0, 0);
                        return date;
                    };

                    const srDate = parseTime(srssData.sun_rise_time); // "5:23:40"
                    const ssDate = parseTime(srssData.sun_set_time);  // "19:14:57"
                    const dayDurationMs = ssDate - srDate;
                    
                    const solarNoonMs = srDate.getTime() + (dayDurationMs / 2);
                    const abhijitDurationMs = dayDurationMs / 15;
                    const abhijitStartMs = solarNoonMs - (abhijitDurationMs / 2);
                    const abhijitEndMs = solarNoonMs + (abhijitDurationMs / 2);

                    const formatLocalTime = (ms) => {
                        return new Date(ms).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
                    };

                    abhijitStartStr = formatLocalTime(abhijitStartMs);
                    abhijitEndStr = formatLocalTime(abhijitEndMs);
                }

                setPanchangData({
                    sunrise: sunriseStr,
                    sunset: sunsetStr,
                    currentDate: today.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
                    currentDay: today.toLocaleDateString('en-GB', { weekday: 'long' }),
                    kaals: [
                        {
                            id: 1,
                            heading: nakshatraData?.name ? `Nakshatra: ${nakshatraData.name}` : 'Nakshatra',
                            start: formatTimeStr(nakshatraData?.starts_at),
                            end: formatTimeStr(nakshatraData?.ends_at),
                            desc: 'Represents the specific zodiac constellation the Moon is transiting through on that given day.'
                        },
                        {
                            id: 2,
                            heading: 'Abhijit Muhurat',
                            start: abhijitStartStr,
                            end: abhijitEndStr,
                            desc: 'An exceptionally favorable timing window within the day, considered perfect for initiating important tasks or rituals.'
                        },
                        {
                            id: 3,
                            heading: 'Rahu Kaal',
                            start: formatTimeStr(rahuData?.starts_at),
                            end: formatTimeStr(rahuData?.ends_at),
                            desc: 'A daily inauspicious period lasting approximately 90 minutes during which it is advised to avoid starting any major or new activities.'
                        },
                        {
                            id: 4,
                            heading: 'Yama Gandam',
                            start: formatTimeStr(yamaData?.starts_at),
                            end: formatTimeStr(yamaData?.ends_at),
                            desc: 'Another inauspicious daily period where starting new and important tasks is generally avoided according to Vedic astrology.'
                        }
                    ]
                });

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
                            <h4 className="text-lg md:text-xl lg:text-3xl font-black text-[#8B0000] mb-4 uppercase tracking-tight leading-tight min-h-[3rem] flex items-center justify-center">
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

                            <div className="mt-6 bg-[#2B2B2B] rounded-2xl p-4 md:p-5 text-left w-full flex-grow flex items-center shadow-inner min-h-[6rem]">
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
