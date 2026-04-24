import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import { useTheme } from '../context/ThemeContext';
import { Star, Zap, Home, Crown, Link2 } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const highlightsData = [
    {
        title: "Conjunctions",
        description: "When planets align in the same house, their energies merge to create powerful Yogas that define your unique potential.",
        icon: Star,
        gradient: "from-purple-500/20 to-blue-500/20",
        tag: "Planetary Yoga"
    },
    {
        title: "Aspects",
        description: "Planetary 'Drishti' reveals how planets influence life from afar, creating secondary layers of destiny and hidden opportunities.",
        icon: Zap,
        gradient: "from-blue-500/20 to-teal-500/20",
        tag: "Planetary Vision"
    },
    {
        title: "Houses",
        description: "The 12 Bhāvas map every dimension of your existence, from character and wealth to career and spiritual purpose.",
        icon: Home,
        gradient: "from-teal-500/20 to-gold/20",
        tag: "Life Dimensions"
    },
    {
        title: "Lords",
        description: "House rulers act as the directors of your life path, determining the strength and timing of how results manifest.",
        icon: Crown,
        gradient: "from-gold/20 to-red-500/20",
        tag: "Divine Governance"
    },
    {
        title: "D1-D9 Connection",
        description: "The Rasi (D1) shows the promise, while the Navamsa (D9) reveals the true internal strength and long-term fruit of your actions.",
        icon: Link2,
        gradient: "from-red-500/20 to-purple-500/20",
        tag: "Chart Linkage"
    }
];

export default function Highlights() {
    const { isDarkMode } = useTheme();

    return (
        <section id="highlights" className={`py-24 relative overflow-hidden ${isDarkMode ? 'bg-transparent' : 'bg-[#F9F7F2]'}`}>
            {/* Background decorative elements */}
            <div className={`absolute top-1/2 left-0 w-72 h-72 rounded-full blur-[120px] opacity-20 -translate-y-1/2 ${isDarkMode ? 'bg-gold' : 'bg-[#4B0082]'}`} />
            <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-[150px] opacity-10 ${isDarkMode ? 'bg-purple-600' : 'bg-gold'}`} />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight" style={{ color: isDarkMode ? '#D4AF37' : '#4B0082' }}>
                        Astrofied Highlights
                    </h2>
                    <p className={`text-lg md:text-xl font-mulish opacity-70 max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Deep-dive into the core pillars of Vedic Astrology that shape your life's blueprint.
                    </p>
                </motion.div>

                <div className="carousel-container px-4 sm:px-10">
                    <Swiper
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={'auto'}
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 100,
                            modifier: 2.5,
                            slideShadows: false,
                        }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true
                        }}
                        modules={[EffectCoverflow, Pagination, Autoplay]}
                        className="highlights-swiper !pb-16"
                        breakpoints={{
                            320: { slidesPerView: 1 },
                            640: { slidesPerView: 1.5 },
                            1024: { slidesPerView: 2.5 },
                            1280: { slidesPerView: 3 }
                        }}
                    >
                        {highlightsData.map((item, index) => (
                            <SwiperSlide key={index} className="px-4">
                                <div className={`relative group aspect-[4/3] md:aspect-[3/4] lg:aspect-square xl:aspect-[4/5] rounded-[2.5rem] p-8 md:p-10 border transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-2xl ${isDarkMode
                                    ? 'bg-white/5 border-white/10 glass shadow-black/40'
                                    : 'bg-white/40 border-[#4B0082]/10 glass shadow-[#4B0082]/5'
                                    }`}>
                                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-700`} />
                                    
                                    <div className="relative z-10">
                                        <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl mb-8 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${isDarkMode ? 'bg-white/10 text-gold' : 'bg-[#4B0082]/10 text-[#4B0082]'}`}>
                                            <item.icon size={40} className="md:w-12 md:h-12" />
                                        </div>
                                        
                                        <span className={`text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mb-4 block ${isDarkMode ? 'text-gold' : 'text-[#4B0082]'}`}>
                                            {item.tag}
                                        </span>
                                        
                                        <h3 className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-6 font-mulish ${isDarkMode ? 'text-white' : 'text-[#4B0082]'}`}>
                                            {item.title}
                                        </h3>
                                        
                                        <p className={`text-sm md:text-base lg:text-lg leading-relaxed opacity-70 font-mulish ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            {item.description}
                                        </p>
                                    </div>
                                    
                                    <div className="relative z-10 flex justify-end mt-8">
                                        <motion.div
                                            whileHover={{ x: 10 }}
                                            className={`text-sm font-black tracking-widest flex items-center gap-2 cursor-pointer ${isDarkMode ? 'text-gold' : 'text-[#4B0082]'}`}
                                        >
                                            LEARN MORE <span className="text-xl">→</span>
                                        </motion.div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            <style jsx global>{`
                .highlights-swiper .swiper-pagination-bullet {
                    background: ${isDarkMode ? '#D4AF37' : '#4B0082'} !important;
                    width: 10px;
                    height: 10px;
                    opacity: 0.3;
                }
                .highlights-swiper .swiper-pagination-bullet-active {
                    opacity: 1;
                    width: 30px;
                    border-radius: 10px;
                }
                .glass {
                    backdrop-filter: blur(20px) saturate(180%);
                    -webkit-backdrop-filter: blur(20px) saturate(180%);
                }
            `}</style>
        </section>
    );
}
