import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useState, useEffect } from 'react';
import { Briefcase, IndianRupee, Heart, Users, Scale, Baby, Stethoscope, ChevronRight, Hourglass, GraduationCap, Home, HandCoins, Plane } from 'lucide-react';

const DoubleHeart = ({ className, strokeWidth }) => (
    <div className={`relative ${className}`}>
        <Heart className="absolute w-[70%] h-[70%] -top-[15%] -left-[15%] opacity-50" strokeWidth={strokeWidth} />
        <Heart className="absolute w-[70%] h-[70%] top-[15%] left-[15%]" strokeWidth={strokeWidth} />
    </div>
);

const services = [
    {
        id: 1,
        title: 'Career',
        desc: 'Choose your career path with astrological guidance',
        price: '₹ 8915',
        duration: '40 Min',
        icon: Briefcase,
        color: 'bg-purple-100 text-purple-600',
    },
    {
        id: 2,
        title: 'Marriage',
        desc: 'Find the right time and harmony for marital bliss',
        price: '₹ 10095',
        duration: '40 Min',
        icon: DoubleHeart,
        color: 'bg-red-100 text-red-600',
    },
    {
        id: 3,
        title: 'Dasha Analysis',
        desc: 'Dasha Analysis gives you a clear future roadmap',
        price: '₹ 8500',
        duration: '60 Min',
        icon: Hourglass,
        color: 'bg-blue-100 text-blue-600',
    },
    {
        id: 4,
        title: 'Relationship Reading',
        desc: 'Deep dive into your personal dynamics and love life',
        price: '₹ 10095',
        duration: '40 Min',
        icon: Heart,
        color: 'bg-pink-100 text-pink-600',
    },
    {
        id: 5,
        title: 'Financial Reading',
        desc: 'Insights into wealth accumulation and financial stability',
        price: '₹ 12455',
        duration: '40 Mins',
        icon: IndianRupee,
        color: 'bg-orange-100 text-orange-600',
    },
    {
        id: 6,
        title: 'Health',
        desc: 'Understand planetary influences on your physical well-being',
        price: '₹ 6555',
        duration: '40 Mins',
        icon: Stethoscope,
        color: 'bg-green-100 text-green-600',
    },
    {
        id: 7,
        title: 'Legal Disputes',
        desc: 'Astrological guidance to navigate complex legal matters',
        price: '₹ 15000',
        duration: '60 Mins',
        icon: Scale,
        color: 'bg-indigo-100 text-indigo-600',
    },
    {
        id: 8,
        title: 'Child Birth',
        desc: 'Guidance and muhurta for family planning and progeny',
        price: '₹ 9500',
        duration: '40 Mins',
        icon: Baby,
        color: 'bg-yellow-100 text-yellow-600',
    },
    {
        id: 9,
        title: 'Education',
        desc: 'Academic and competitive success with astrology',
        price: '₹ 7500',
        duration: '40 Mins',
        icon: GraduationCap,
        color: 'bg-cyan-100 text-cyan-600',
    },
    {
        id: 10,
        title: 'House and Properties',
        desc: 'Identify the best time for buying, selling, or building your home',
        price: '₹ 12000',
        duration: '40 Mins',
        icon: Home,
        color: 'bg-teal-100 text-teal-600',
    },
    {
        id: 11,
        title: 'Loans and Debts',
        desc: 'Astrological solutions for debt clearance and financial recovery',
        price: '₹ 9000',
        duration: '40 Mins',
        icon: HandCoins,
        color: 'bg-rose-100 text-rose-600',
    },
    {
        id: 12,
        title: 'Foreign Settlement',
        desc: 'Insights into visa success, travel, and settling in a new land',
        price: '₹ 11000',
        duration: '40 Mins',
        icon: Plane,
        color: 'bg-emerald-100 text-emerald-600',
    },


];

export default function Services() {
    const { isDarkMode } = useTheme();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <section id="services" className={`py-24 relative ${isDarkMode ? 'bg-transparent' : 'bg-[#F5F5DC]/70'}`}>
            <div className="container mx-auto px-10 sm:px-6">
                <motion.h2
                    initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16"
                    style={{ color: isDarkMode ? '#D4AF37' : '#4B0082' }}
                >
                    What We Cover
                </motion.h2>

                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={isMobile ? { duration: 0 } : { delay: index * 0.1 }}
                            className={`rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-8 flex flex-col items-center text-center shadow-lg hover:shadow-2xl transition-all duration-300 border ${isDarkMode ? 'bg-[#17202A] border-gray-800' : 'bg-[#FFFFFF] border-gold/10'} group relative overflow-hidden`}
                        >
                            {/* Glossy Gift Ribbon */}
                            <div className="absolute top-0 left-0 w-16 h-16 md:w-25 md:h-20 pointer-events-none z-20">
                                <div className={`absolute top-0 left-0 w-[160%] h-5 md:h-7 shadow-xl transform -rotate-45 -translate-x-[35%] translate-y-[32%] flex items-center justify-center border-y border-white/30 overflow-hidden ${isDarkMode
                                    ? 'bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#B8860B]'
                                    : 'bg-gradient-to-r from-[#4B0082] via-[#6A0DAD] to-[#4B0082]'
                                    }`}>
                                    {/* Glossy Shine Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

                                    <span className={`text-[7px] md:text-[9px] font-black tracking-[0.2em] uppercase flex items-center gap-1.5 drop-shadow-sm ${isDarkMode ? 'text-black' : 'text-white'
                                        }`}>
                                        Astrofied
                                    </span>
                                </div>
                            </div>

                            {/* Bottom Right Glossy Accent */}
                            <div className={`absolute bottom-0 right-0 w-8 h-8 md:w-12 md:h-12 transition-colors duration-300 ${isDarkMode
                                ? 'bg-gradient-to-tl from-[#002366] via-[#4169E1] to-[#002366]'
                                : 'bg-gradient-to-tl from-[#B8860B] via-[#D4AF37] to-[#B8860B]'
                                }`} style={{ clipPath: 'polygon(100% 100%, 0 100%, 100% 0)' }}>
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            </div>

                            <div className={`w-16 h-16 md:w-28 md:h-28 rounded-full flex items-center justify-center mb-4 md:mb-6 relative transition-transform duration-500 group-hover:scale-110 ${service.color}`}>
                                <service.icon className="w-8 h-8 md:w-12 md:h-12" strokeWidth={1} />
                            </div>

                            <h3 className={`text-sm md:text-xl font-bold mb-2 md:mb-3 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                                {service.title}
                            </h3>

                            <p className={`text-[10px] md:text-sm mb-4 md:mb-6 flex-grow leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {service.desc}
                            </p>

                            <button
                                onClick={() => window.open('https://wa.me/919612736566?text=I%20want%20to%20book%20an%20appointment%20for%20an%20online%20consultation%20with%20Astrofied.%20Please%20guide%20me%20through%20the%20process%20of%20sending%20my%20birth%20details%20and%20completing%20the%20payment.', '_blank')}
                                className="flex items-center gap-2 text-[#F25A29] font-bold hover:text-[#D14A1F] transition-colors group/btn mt-auto"
                            >
                                {/* <span className="border-b-2 border-transparent group-hover/btn:border-[#F25A29] pb-0.5 font-mulish">Buy Now</span>
                                */}

                                {/* <div className="bg-[#F25A29] text-white rounded-full p-1 group-hover/btn:bg-[#D14A1F] transition-colors flex items-center justify-center">
                                   
                                   
                                    <ChevronRight size={18} strokeWidth={3} />
                                </div> */}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
