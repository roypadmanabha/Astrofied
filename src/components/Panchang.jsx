import { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const CARDS = [
    {
        id: 'moonSign',
        title: 'MOON SIGN',
        type: 'single',
        desc: "Represents the specific zodiac constellation the Moon is transiting through on that given day."
    },
    {
        id: 'amritKaal',
        title: 'AMRIT KAAL',
        type: 'range',
        startKey: 'amritKaalStart',
        endKey: 'amritKaalEnd',
        desc: "A highly auspicious daily time window, derived from the active Nakshatra, considered perfect for initiating important tasks or rituals."
    },
    {
        id: 'mahendraYog',
        title: 'MAHENDRA YOG',
        type: 'range',
        startKey: 'mahendraYogStart',
        endKey: 'mahendraYogEnd',
        desc: "An exceptionally favorable timing window within the day that is traditionally believed to bring success and positive outcomes to new endeavors."
    },
    {
        id: 'rahuKaal',
        title: 'RAHU KAAL',
        type: 'range',
        startKey: 'rahuKaalStart',
        endKey: 'rahuKaalEnd',
        desc: "A daily inauspicious period lasting approximately 90 minutes during which it is advised to avoid starting any major or new activities."
    }
];

export default function Panchang() {
    const { isDarkMode } = useTheme();
    const [panchangData, setPanchangData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentDateString, setCurrentDateString] = useState("");

    useEffect(() => {
        // Format date string for display (e.g., "2 June 2026 • Tuesday")
        const now = new Date();
        const formattedDate = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(now);
        const weekday = new Intl.DateTimeFormat('en-GB', { weekday: 'long' }).format(now);
        setCurrentDateString(`${formattedDate} • ${weekday}`);

        const fetchPanchang = async (lat, lng) => {
            try {
                // Ensure double digits for month and day
                const year = now.getFullYear();
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const day = String(now.getDate()).padStart(2, '0');
                const dateStr = `${year}-${month}-${day}`;
                
                const timeStr = now.toTimeString().split(' ')[0].substring(0, 5); // "HH:MM"

                const payload = {
                    question: "Calculate the daily panchang timings. Return ONLY a valid JSON object with the keys 'moonSign', 'amritKaalStart', 'amritKaalEnd', 'mahendraYogStart', 'mahendraYogEnd', 'rahuKaalStart', 'rahuKaalEnd', 'sunrise', and 'sunset'. No markdown formatting or conversational text.",
                    birthDetails: {
                        date: dateStr,
                        time: timeStr,
                        lat: lat,
                        lng: lng
                    }
                };

                const response = await fetch("https://api.vedika.io/sandbox/api/v1/astrology/query", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    throw new Error("API response not ok");
                }

                const data = await response.json();
                
                // Parse the markdown out of data.response
                let jsonStr = data.response || "{}";
                jsonStr = jsonStr.replace(/```json/g, "").replace(/```/g, "").trim();
                
                const parsed = JSON.parse(jsonStr);
                
                // Validate parsed data structure minimally
                if (parsed.sunrise) {
                    setPanchangData(parsed);
                } else {
                    throw new Error("Invalid format received");
                }
            } catch (error) {
                console.error("Error fetching panchang:", error);
                // Fallback demo data
                setPanchangData({
                    moonSign: "SCORPIO",
                    amritKaalStart: "12:15 PM",
                    amritKaalEnd: "02:15 PM",
                    mahendraYogStart: "08:15 PM",
                    mahendraYogEnd: "08:41 PM",
                    rahuKaalStart: "10:15 AM",
                    rahuKaalEnd: "03:15 PM",
                    sunrise: "04:32 AM",
                    sunset: "05:42 PM"
                });
            } finally {
                setLoading(false);
            }
        };

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    fetchPanchang(position.coords.latitude, position.coords.longitude);
                },
                (error) => {
                    // Fallback coordinates
                    fetchPanchang(23.5332, 91.4836);
                },
                { timeout: 5000 }
            );
        } else {
            fetchPanchang(23.5332, 91.4836);
        }
    }, []);

    return (
        <section className={`py-16 md:py-24 transition-colors duration-500 ${isDarkMode ? 'bg-[#121212]' : 'bg-[#f8f6eb]'}`}>
            <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                {/* Header Section */}
                <div className="text-center mb-10 md:mb-16">
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold font-mulish mb-2 tracking-tight">
                        <span className="text-[#D00000]">Astrofied</span> <span className={isDarkMode ? 'text-white' : 'text-[#1a202c]'}>Panchang</span>
                    </h2>
                    <h3 className={`text-2xl md:text-4xl font-bold mb-6 font-mulish tracking-tight ${isDarkMode ? 'text-gray-300' : 'text-[#1a202c]'}`}>
                        Today's Panchang
                    </h3>
                    
                    <div className="flex flex-col items-center justify-center gap-3 mt-8">
                        <div className={`flex items-center gap-2 text-xl md:text-2xl font-bold font-mulish ${isDarkMode ? 'text-gray-200' : 'text-black'}`}>
                            <Calendar className="w-6 h-6 text-[#D00000]" />
                            {currentDateString}
                        </div>
                        <div className={`text-sm md:text-lg font-bold font-mulish ${isDarkMode ? 'text-gray-400' : 'text-black'}`}>
                            {loading 
                                ? 'Calculating planetary positions...' 
                                : `Sunrise ${panchangData?.sunrise || '04:32 AM'} | Sunset ${panchangData?.sunset || '05:42 PM'} - IST`
                            }
                        </div>
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-mulish">
                    {loading ? (
                        /* Skeleton Loaders */
                        [1, 2, 3, 4].map(i => (
                            <div key={i} className="rounded-[2rem] bg-gradient-to-b from-yellow-300/50 to-orange-400/50 animate-pulse min-h-[400px] p-5 md:p-6 flex flex-col">
                                <div className="h-6 bg-black/10 rounded w-1/2 mx-auto mb-8"></div>
                                <div className="h-4 bg-black/10 rounded w-1/3 mx-auto mb-2"></div>
                                <div className="h-10 bg-black/10 rounded w-2/3 mx-auto mb-6"></div>
                                <div className="h-px bg-black/10 w-3/4 mx-auto my-4"></div>
                                <div className="h-4 bg-black/10 rounded w-1/3 mx-auto mb-2"></div>
                                <div className="h-10 bg-black/10 rounded w-2/3 mx-auto mb-auto"></div>
                                <div className="h-24 bg-[#3b2a21]/50 rounded-2xl w-full mt-6"></div>
                            </div>
                        ))
                    ) : (
                        /* Actual Data Cards */
                        CARDS.map(card => (
                            <div 
                                key={card.id} 
                                className="rounded-[2rem] bg-gradient-to-b from-yellow-300 to-orange-400 p-5 md:p-6 flex flex-col text-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 min-h-[400px]"
                            >
                                <h4 className="text-[#D00000] font-black text-xl md:text-2xl tracking-wide mb-6">
                                    {card.title}
                                </h4>
                                
                                {card.type === 'single' ? (
                                    <div className="flex-grow flex items-center justify-center mb-6 px-2">
                                        <span className="text-[#4a2e1b] font-black text-3xl sm:text-4xl uppercase leading-tight drop-shadow-sm">
                                            {panchangData?.[card.id] || '-'}
                                        </span>
                                    </div>
                                ) : (
                                    <div className="flex-grow flex flex-col items-center justify-center mb-6">
                                        <span className="text-[#D00000] font-bold text-sm md:text-base mb-1">starts at</span>
                                        <span className="text-[#4a2e1b] font-black text-3xl sm:text-[2rem] md:text-[2.2rem] drop-shadow-sm">
                                            {panchangData?.[card.startKey] || '-'}
                                        </span>
                                        
                                        <hr className="border-[#4a2e1b]/20 border-t-2 w-[80%] mx-auto my-4 md:my-5" />
                                        
                                        <span className="text-[#D00000] font-bold text-sm md:text-base mb-1">ends at</span>
                                        <span className="text-[#4a2e1b] font-black text-3xl sm:text-[2rem] md:text-[2.2rem] drop-shadow-sm">
                                            {panchangData?.[card.endKey] || '-'}
                                        </span>
                                    </div>
                                )}

                                <div className="bg-[#3b2a21] text-white text-[10px] md:text-xs rounded-[1rem] p-4 mt-auto text-center leading-relaxed md:leading-relaxed shadow-inner">
                                    {card.desc}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
