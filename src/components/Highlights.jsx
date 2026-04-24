import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import { useTheme } from '../context/ThemeContext';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

// Assets
import imgConjunctions from '../assets/highlights/conjunctions.png';
import imgAspects from '../assets/highlights/aspects.png';
import imgHouses from '../assets/highlights/houses.png';
import imgLords from '../assets/highlights/lords.png';
import imgD1D9 from '../assets/highlights/d1-d9.png';

const highlightsData = [
    {
        title: "Conjunctions",
        description: "When planets align in the same house, their energies merge to create powerful Yogas.",
        image: imgConjunctions,
        tag: "Planetary Yoga"
    },
    {
        title: "Aspects",
        description: "Planetary 'Drishti' reveals hidden connections and secondary layers of destiny.",
        image: imgAspects,
        tag: "Planetary Vision"
    },
    {
        title: "Houses",
        description: "The 12 Bhāvas map every dimension of your existence, from character to status.",
        image: imgHouses,
        tag: "Life Dimensions"
    },
    {
        title: "Lords",
        description: "House rulers act as the directors of your life path, determining the strength of results.",
        image: imgLords,
        tag: "Divine Governance"
    },
    {
        title: "D1-D9 Connection",
        description: "The Rasi (D1) shows the promise, while the Navamsa (D9) reveals long-term fruit.",
        image: imgD1D9,
        tag: "Chart Linkage"
    }
];

export default function Highlights() {
    const { isDarkMode } = useTheme();

    return (
        <section id="highlights" className={`py-24 relative overflow-hidden ${isDarkMode ? 'bg-transparent' : 'bg-[#F9F7F2]'}`}>
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
                        Deep-dive into the core pillars of Vedic Astrology through our curated insights.
                    </p>
                </motion.div>

                <div className="highlights-carousel-wrapper">
                    <Swiper
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        loop={true}
                        slidesPerView={'auto'}
                        coverflowEffect={{
                            rotate: 15,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: false,
                        }}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true
                        }}
                        modules={[EffectCoverflow, Pagination, Autoplay]}
                        className="highlights-swiper-v2 !pb-20"
                        breakpoints={{
                            320: { slidesPerView: 1.5, spaceBetween: 20 },
                            640: { slidesPerView: 2.5, spaceBetween: 30 },
                            1024: { slidesPerView: 3.5, spaceBetween: 40 },
                            1280: { slidesPerView: 4.5, spaceBetween: 50 }
                        }}
                    >
                        {highlightsData.map((item, index) => (
                            <SwiperSlide key={index} className="highlights-slide">
                                <div className="highlights-card group relative">
                                    {/* Image Base */}
                                    <div className="relative aspect-[2/3] md:aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl transition-all duration-500 group-hover:scale-[1.02]">
                                        <img 
                                            src={item.image} 
                                            alt={item.title} 
                                            className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
                                        />
                                        
                                        {/* Overlay Gradients */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                                        
                                        {/* Content Overlay */}
                                        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            <span className="text-gold text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mb-2 block opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                                                {item.tag}
                                            </span>
                                            <h3 className="text-white text-xl md:text-2xl font-bold mb-3 font-mulish">
                                                {item.title}
                                            </h3>
                                            <p className="text-white/70 text-xs md:text-sm leading-relaxed font-mulish opacity-0 group-hover:opacity-100 transition-opacity delay-200 line-clamp-3">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    {/* Floating Glow Element */}
                                    <div className="absolute -inset-1 bg-gradient-to-br from-gold/30 to-purple-500/30 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-30 -z-10 transition-opacity" />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            <style jsx global>{`
                .highlights-swiper-v2 .swiper-slide {
                    transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
                    filter: blur(2px) grayscale(50%);
                    opacity: 0.6;
                    transform: scale(0.85) translateY(40px);
                }

                .highlights-swiper-v2 .swiper-slide-active {
                    filter: blur(0) grayscale(0);
                    opacity: 1;
                    transform: scale(1.1) translateY(-30px);
                    z-index: 10;
                }

                .highlights-swiper-v2 .swiper-slide-prev,
                .highlights-swiper-v2 .swiper-slide-next {
                    opacity: 0.8;
                    filter: blur(1px) grayscale(20%);
                    transform: scale(0.95) translateY(0);
                }

                .highlights-swiper-v2 .swiper-pagination-bullet {
                    background: ${isDarkMode ? '#D4AF37' : '#4B0082'} !important;
                    width: 8px;
                    height: 8px;
                    opacity: 0.3;
                }
                .highlights-swiper-v2 .swiper-pagination-bullet-active {
                    opacity: 1;
                    width: 24px;
                    border-radius: 8px;
                }
            `}</style>
        </section>
    );
}
