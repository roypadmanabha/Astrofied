import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Sparkles, Moon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const moonSigns = [
    {
        name: 'Aries',
        sanskrit: 'Mesh',
        icon: '♈',
        desc: "Aries Moon sign individuals are pioneers by nature, possessing an innate courage and a fiery spirit that thrives on action. You are often the first to take initiative, fueled by an impulsive yet infectious energy that inspires those around you. Your mind works at a high velocity, constantly seeking new horizons and mental stimulation. In emotions, you are direct and honest, expressing your feelings with a raw intensity that leaves little room for ambiguity. While your independence is your strength, you may find that your path to true wisdom lies in learning the art of patience and the power of strategic stillness. Your competitive drive ensures that you rarely settle for second best, but your truest victories come when you align your fiery ambition with a deeper sense of purpose.",
        color: 'from-orange-500/20 to-red-500/20'
    },
    {
        name: 'Taurus',
        sanskrit: 'Vrishabha',
        icon: '♉',
        desc: "With the Moon in Taurus, you possess an inherent need for stability and a deep connection to the material world. You are the embodiment of patience and loyalty, seeking comfort and security in your emotional foundations. Your sensory world is rich, and you find peace in the beauty of nature and the steady rhythm of life. Once you set a goal, your determination is unshakable, moving toward success with a grace that others admire. You have a profound appreciation for the fine things in life, yet you remain remarkably grounded. Your loyalty makes you a pillar of strength for your loved ones, a calm port in any storm, providing a sense of enduring peace to all you encounter.",
        color: 'from-emerald-500/20 to-teal-500/20'
    },
    {
        name: 'Gemini',
        sanskrit: 'Mithuna',
        icon: '♊',
        desc: "Gemini Moon individuals are blessed with a lightning-fast intellect and a curiosity that knows no bounds. You process emotions through the lens of communication, finding clarity by sharing your thoughts and exploring diverse perspectives. Your versatility allows you to adapt to any situation with remarkable ease, often juggling multiple interests with infectious enthusiasm. You possess a dual nature that makes you both a great listener and a brilliant conversationalist. Your world is one of movement and ideas, where every interaction is an opportunity to learn something new. While your mind is a whirlwind of activity, your growth comes from finding the stillness within your own thoughts.",
        color: 'from-blue-400/20 to-indigo-500/20'
    },
    {
        name: 'Cancer',
        sanskrit: 'Karka',
        icon: '♋',
        desc: "The Moon finds its home in Cancer, making you deeply intuitive and profoundly connected to the emotional tides of life. You are a natural nurturer, possessing a heart that is wide enough to hold the world's sorrows and joys. Your home is your sanctuary, and you have an uncanny ability to sense the needs of others even before they are spoken. Your memory is long and your loyalty runs deep, often finding strength in the traditions and roots that ground you. You experience life with a vivid emotional intensity, where every feeling is a guide to your truest self. By trusting your powerful intuition, you navigate the complexities of life with a wisdom that is as ancient as the tides.",
        color: 'from-sky-300/20 to-blue-400/20'
    },
    {
        name: 'Leo',
        sanskrit: 'Simha',
        icon: '♌',
        desc: "With a Leo Moon, your emotions are radiant, generous, and expressed with a dramatic flair that commands attention. You possess a royal heart that thrives on warmth, creative expression, and the joy of being appreciated by those you love. Your natural leadership is guided by a fierce loyalty and a desire to see everyone in your circle succeed and shine. You have a brilliant creative energy that can turn even the simplest moment into a grand celebration. Your pride is your shield, but your vulnerability is your most powerful connection to others. Your path to fulfillment involves balancing your need for external recognition with the quiet validation of your own worthy soul.",
        color: 'from-amber-400/20 to-orange-500/20'
    },
    {
        name: 'Virgo',
        sanskrit: 'Kanya',
        icon: '♍',
        desc: "Virgo Moon individuals find emotional security in order, service, and the meticulous refinement of their inner and outer worlds. You possess a brilliant, analytical mind that seeks to understand the details and improve the lives of those around you. Your kindness is practical, often showing love through acts of service and helpful suggestions that bring clarity to chaos. You seek purity in all things, from your thoughts to your environment, and your attention to detail is your greatest gift. While you can be your own harshest critic, your journey is toward self-acceptance. You have a quiet, steady strength that ensures everything you touch is left better than you found it.",
        color: 'from-lime-500/20 to-green-600/20'
    },
    {
        name: 'Libra',
        sanskrit: 'Tula',
        icon: '♎',
        desc: "Libra Moon sign individuals are driven by a profound need for harmony, balance, and the beauty of human connection. You possess a diplomatic spirit and an innate sense of justice that allows you to see all sides of every situation. Your emotional well-being is tied to the health of your relationships, and you thrive in environments that are aesthetically pleasing and peaceful. You are a natural peacemaker, using your charm and social grace to bridge divides and create unity. Your appreciation for art and music is a reflection of your own inner elegance. By seeking peace within yourself first, you become a beacon of light, helping others navigate the complexities of life.",
        color: 'from-rose-400/20 to-pink-500/20'
    },
    {
        name: 'Scorpio',
        sanskrit: 'Vrishchika',
        icon: '♏',
        desc: "With a Scorpio Moon, your emotional world is one of profound depth, intensity, and transformative power. You possess a piercing intuition that looks beneath the surface of things, seeking the absolute truth in every situation. Your loyalty is legendary, and once you commit to a person or a cause, your devotion is absolute. You experience emotions with an intensity that can lead to great heights and deep insights, often acting as a catalyst for change. You are private and protective of your inner world, sharing its riches only with those you trust completely. Your path is one of alchemy—learning to transform your shadow into light through the process of emotional release.",
        color: 'from-red-600/20 to-purple-800/20'
    },
    {
        name: 'Sagittarius',
        sanskrit: 'Dhanu',
        icon: '♐',
        desc: "Sagittarius Moon individuals are eternal students of life, driven by a restless spirit and an unquenchable thirst for wisdom and adventure. You find emotional freedom in the exploration of new ideas, cultures, and the vast horizons of the mind. Your optimism is your greatest shield, allowing you to see the blessing in every challenge. You value truth above all else, often speaking your mind with a candid honesty that is both refreshing and bold. Your emotional world is expansive, thriving on movement and the excitement of the unknown. By grounding your philosophical insights in practical reality, you become an inspiring guide for others, showing every horizon is within reach.",
        color: 'from-violet-500/20 to-purple-600/20'
    },
    {
        name: 'Capricorn',
        sanskrit: 'Makara',
        icon: '♑',
        desc: "With a Capricorn Moon, your emotions are grounded in responsibility, ambition, and a deep respect for structure. You seek to build an emotional life that is as solid as a mountain, valuing discipline and long-term security. You are the master of your own destiny, possessing a stoic strength that allows you to endure any difficulty. Your love is demonstrated through your commitment and the tangible support you provide. You find peace in order and the satisfaction of a job well done. Your growth lies in learning to value your emotional needs as much as your achievements. By allowing yourself to be vulnerable, you find a deeper kind of strength.",
        color: 'from-slate-600/20 to-gray-800/20'
    },
    {
        name: 'Aquarius',
        sanskrit: 'Kumbha',
        icon: '♒',
        desc: "Aquarius Moon sign individuals possess a visionary mind and a heart that beats for the collective good of humanity. You are uniquely original, often viewing emotions through a lens of objectivity that allows you to see the bigger picture. Your independence is non-negotiable, and you thrive when given the freedom to explore unconventional ideas. You are a natural rebel with a cause, seeking to build a fairer and more progressive world. Your friendships are your chosen family, and you find deep fulfillment in synergy. By bringing your high ideals into your private life, you become a revolutionary of the heart, inspiring others to live their truest lives.",
        color: 'from-cyan-400/20 to-blue-500/20'
    },
    {
        name: 'Pisces',
        sanskrit: 'Meena',
        icon: '♓',
        desc: "The Moon in Pisces bestows an emotional nature that is as vast as the ocean, filled with compassion, artistry, and divine wisdom. You are a bridge between worlds, possessing a sensitivity that allows you to feel the unspoken vibrations of the universe. Your imagination is your sanctuary, and you find comfort in creative arts and spiritual exploration. You are profoundly empathetic, often absorbing the emotions of those around you with rare kindness. Your journey is one of learning to set boundaries while remaining a channel for universal love. By trusting your vivid dreams, you navigate the physical world with a soul that is forever anchored in the eternal.",
        color: 'from-purple-400/20 to-pink-400/20'
    }
];

export default function MoonSigns() {
    const { isDarkMode } = useTheme();

    return (
        <section id="moonsigns" className={`py-24 relative overflow-hidden ${isDarkMode ? 'bg-transparent' : 'bg-[#FDFDFD]'}`}>
            {/* Background decorative elements */}
            <div className={`absolute top-0 right-0 w-96 h-96 blur-[120px] opacity-10 rounded-full ${isDarkMode ? 'bg-purple-600' : 'bg-purple-200'}`} />
            <div className={`absolute bottom-0 left-0 w-96 h-96 blur-[120px] opacity-10 rounded-full ${isDarkMode ? 'bg-gold' : 'bg-yellow-100'}`} />

            <div className="container mx-auto relative z-10 px-4">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-4 glass ${
                            isDarkMode ? 'border-gold/20 text-gold shadow-gold/10' : 'border-[#4B0082]/20 text-[#4B0082] shadow-[#4B0082]/10'
                        }`}
                    >
                        <Moon size={16} />
                        <span className="text-xs font-bold tracking-widest uppercase italic font-mulish">Lunar Wisdom</span>
                    </motion.div>
                    
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold font-raleway mb-6"
                        style={{ color: isDarkMode ? '#F5F5F5' : '#0A0A0A' }}
                    >
                        Know Your <span style={{ color: isDarkMode ? '#D4AF37' : '#4B0082' }}>Moonsign</span>
                    </motion.h2>
                    
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className={`max-w-2xl mx-auto text-lg md:text-xl opacity-80 font-mulish ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                    >
                        Explore the depths of your emotional landscape through the lens of ancient Vedic astrology.
                    </motion.p>
                </div>

                <div className="relative px-0 md:px-12">
                    <Swiper
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={'auto'}
                        loop={true}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 100,
                            modifier: 2.5,
                            slideShadows: false,
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        navigation={{
                            nextEl: '.swiper-button-next-custom',
                            prevEl: '.swiper-button-prev-custom',
                        }}
                        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                        className="moon-swiper !pb-20 !pt-10"
                        breakpoints={{
                            320: {
                                slidesPerView: 1.2,
                                spaceBetween: 20
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 30
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 40
                            }
                        }}
                    >
                        {moonSigns.map((sign, index) => (
                            <SwiperSlide key={sign.name} className="max-w-[400px]">
                                <div className={`group relative rounded-[2.5rem] p-1 border h-full transition-all duration-500 ${
                                    isDarkMode ? 'border-white/5 bg-[#0F0221]/40' : 'border-black/5 bg-white/80'
                                } shadow-2xl overflow-hidden`}>
                                    <div className="relative rounded-[2.4rem] p-8 md:p-10 h-full glass backdrop-blur-3xl flex flex-col">
                                        {/* Gradient Background Mask */}
                                        <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${sign.color}`} />
                                        
                                        <div className="relative z-10 flex flex-col h-full">
                                            <div className="flex items-center justify-between mb-8">
                                                <div className="flex flex-col">
                                                    <h3 className="text-3xl font-bold font-raleway tracking-tight" style={{ color: isDarkMode ? '#F5F5F5' : '#0A0A0A' }}>
                                                        {sign.name}
                                                    </h3>
                                                    <span className="text-sm font-medium tracking-widest uppercase opacity-60 italic" style={{ color: isDarkMode ? '#D4AF37' : '#4B0082' }}>
                                                        {sign.sanskrit}
                                                    </span>
                                                </div>
                                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-xl transition-all duration-700 bg-white/5 border border-white/10`}>
                                                    {sign.icon}
                                                </div>
                                            </div>
                                            
                                            <div className="relative flex-grow">
                                                <Sparkles className={`absolute -top-4 -right-2 w-4 h-4 opacity-50 animate-pulse ${
                                                    isDarkMode ? 'text-gold' : 'text-[#4B0082]'
                                                }`} />
                                                <p className={`text-base leading-relaxed text-justify opacity-80 font-mulish ${
                                                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                                }`}>
                                                    {sign.desc}
                                                </p>
                                            </div>
                                            
                                            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                                                <span className={`text-xs font-bold tracking-widest uppercase ${
                                                    isDarkMode ? 'text-gold' : 'text-[#4B0082]'
                                                }`}>Moonsign Profile</span>
                                                <div className={`w-12 h-px ${isDarkMode ? 'bg-gold/30' : 'bg-[#4B0082]/30'}`} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Custom Navigation Buttons */}
                    <button className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all hidden md:flex">
                        <ChevronLeft size={24} />
                    </button>
                    <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all hidden md:flex">
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>

            {/* Custom pagination styles */}
            <style jsx>{`
                .moon-swiper .swiper-pagination-bullet {
                    background: ${isDarkMode ? '#D4AF37' : '#4B0082'} !important;
                    opacity: 0.3;
                    width: 10px;
                    height: 10px;
                }
                .moon-swiper .swiper-pagination-bullet-active {
                    opacity: 1;
                    width: 25px;
                    border-radius: 5px;
                }
            `}</style>
        </section>
    );
}
