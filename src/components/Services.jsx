import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useState, useEffect } from 'react';
import { Briefcase, IndianRupee, Heart, Users, Scale, Baby, Stethoscope, ChevronRight, UserCheck } from 'lucide-react';

const DoubleHeart = ({ size, strokeWidth }) => (
    <div className="relative">
        <Heart size={size * 0.8} strokeWidth={strokeWidth} className="relative -top-2 -left-2 opacity-50" />
        <Heart size={size * 0.8} strokeWidth={strokeWidth} className="absolute top-2 left-2" />
    </div>
);

const services = [
    {
        id: 1,
        title: 'Career',
        desc: 'Navigate your professional path with expert astrological guidance.',
        price: '₹ 8915',
        duration: '40 Min',
        icon: Briefcase,
        color: 'bg-purple-100 text-purple-600',
    },
    {
        id: 2,
        title: 'Marriage',
        desc: 'Find the right time and harmony for marital bliss.',
        price: '₹ 10095',
        duration: '40 Min',
        icon: DoubleHeart,
        color: 'bg-red-100 text-red-600',
    },
    {
        id: 3,
        title: 'Horoscope Matching',
        desc: 'Vedic Kundali matching for a prosperous married life.',
        price: '₹ 8500',
        duration: '60 Min',
        icon: UserCheck,
        color: 'bg-blue-100 text-blue-600',
    },
    {
        id: 4,
        title: 'Relationship Reading',
        desc: 'Deep dive into your personal dynamics and love life.',
        price: '₹ 10095',
        duration: '40 Min',
        icon: Heart,
        color: 'bg-pink-100 text-pink-600',
    },
    {
        id: 5,
        title: 'Financial Reading',
        desc: 'Insights into wealth accumulation and financial stability.',
        price: '₹ 12455',
        duration: '40 Mins',
        icon: IndianRupee,
        color: 'bg-orange-100 text-orange-600',
    },
    {
        id: 6,
        title: 'Health',
        desc: 'Understand planetary influences on your physical well-being.',
        price: '₹ 6555',
        duration: '40 Mins',
        icon: Stethoscope,
        color: 'bg-green-100 text-green-600',
    },
    {
        id: 7,
        title: 'Legal Disputes',
        desc: 'Astrological remedies to navigate complex legal matters.',
        price: '₹ 15000',
        duration: '60 Mins',
        icon: Scale,
        color: 'bg-indigo-100 text-indigo-600',
    },
    {
        id: 8,
        title: 'Child Birth',
        desc: 'Guidance and muhurta for family planning and progeny.',
        price: '₹ 9500',
        duration: '40 Mins',
        icon: Baby,
        color: 'bg-yellow-100 text-yellow-600',
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={isMobile ? { duration: 0 } : { delay: index * 0.1 }}
                            className={`rounded-[2rem] p-6 md:p-8 flex flex-col items-center text-center shadow-lg hover:shadow-2xl transition-all duration-300 border ${isDarkMode ? 'bg-[#17202A] border-gray-800' : 'bg-[#FFFFFF] border-gold/10'} group relative overflow-hidden`}
                        >
                            {/* Decorative Corner Gradients matching the image */}
                            <div className="absolute top-0 left-0 w-6 h-6 bg-gradient-to-br from-red-500 to-yellow-500" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
                            <div className="absolute bottom-0 right-0 w-6 h-6 bg-gradient-to-br from-red-500 to-yellow-500" style={{ clipPath: 'polygon(100% 100%, 0 100%, 100% 0)' }} />

                            <div className={`w-28 h-28 rounded-full flex items-center justify-center mb-6 relative transition-transform duration-500 group-hover:scale-110 ${service.color}`}>
                                <service.icon size={48} strokeWidth={1} />
                            </div>

                            <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                                {service.title}
                            </h3>

                            <p className={`text-sm mb-6 flex-grow ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
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
