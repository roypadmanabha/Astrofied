import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Briefcase, IndianRupee, Heart, Users, Scale, Baby, Stethoscope, ChevronRight, UserCheck, LayoutGrid } from 'lucide-react';

const DoubleHeart = ({ size, strokeWidth }) => (
    <div className="relative">
        <Heart size={size * 0.8} strokeWidth={strokeWidth} className="relative -top-2 -left-2 opacity-50" />
        <Heart size={size * 0.8} strokeWidth={strokeWidth} className="absolute top-2 left-2" />
    </div>
);

const DoubleChart = ({ size }) => (
    <div style={{ width: size, height: size }} className="flex items-center justify-center">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M93.0668 97.1636C95.8491 91.6885 102.192 90.4294 106.249 92.3931C110.655 94.5222 112.654 100.603 110.742 107.738C109.575 112.591 104.891 118.444 100.745 122.582C100.322 123.005 99.7049 123.17 99.1278 123.016C93.4672 121.506 86.4847 118.777 83.0471 115.159C77.8226 109.936 76.5142 103.672 79.2652 99.6238C81.7969 95.8932 87.9206 93.8133 93.0668 97.1636ZM92.6195 101.107C88.965 97.4588 83.9619 98.68 82.0407 101.507C81.1058 102.882 80.9783 104.625 81.4704 106.461C82.034 108.565 83.396 110.768 85.4335 112.799C85.4447 112.813 85.4559 112.824 85.4671 112.835C88.3634 115.897 94.1426 118.131 99.0563 119.516C102.619 115.861 106.508 111.035 107.484 106.937C107.488 106.919 107.492 106.904 107.497 106.888C108.244 104.11 108.322 101.52 107.759 99.4158C107.267 97.5796 106.285 96.1348 104.789 95.4124C101.711 93.9228 96.7683 95.3677 95.4241 100.355C95.2698 100.932 94.818 101.384 94.2388 101.538C93.6617 101.693 93.0445 101.529 92.6195 101.107Z" fill="currentColor"></path>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M110.797 104.505C109.933 104.837 108.963 104.403 108.632 103.539C108.298 102.674 108.732 101.703 109.596 101.372C113.026 100.057 116.332 98.3796 118.289 96.3108C118.3 96.2974 118.311 96.2862 118.323 96.275C120.36 94.242 121.722 92.039 122.286 89.9345C122.778 88.0983 122.65 86.356 121.715 84.9828C119.794 82.1535 114.791 80.9324 111.137 84.5802C110.712 85.0029 110.094 85.1684 109.517 85.0118C108.938 84.8575 108.486 84.4057 108.332 83.8287C106.988 78.8412 102.045 77.3964 98.9675 78.886C97.4713 79.6106 96.4894 81.0554 95.9974 82.8894C95.4338 84.9939 95.5121 87.5839 96.2591 90.3639C96.2635 90.3795 96.268 90.3952 96.2725 90.4108C96.5476 91.5738 97.0754 92.7995 97.7576 94.043C98.2049 94.8548 97.9074 95.8747 97.0955 96.3198C96.2837 96.7671 95.2638 96.4696 94.8187 95.6578C93.9845 94.1369 93.356 92.634 93.0139 91.2093C91.1016 84.0747 93.1011 77.9981 97.5071 75.8666C101.564 73.903 107.907 75.1621 110.689 80.6394C115.835 77.2868 121.959 79.3691 124.491 83.0974C127.24 87.1455 125.933 93.41 120.725 98.6167C118.477 100.992 114.733 102.996 110.797 104.505Z" fill="currentColor"></path>
        </svg>
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
        icon: DoubleChart,
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

    return (
        <section id="services" className={`py-24 relative ${isDarkMode ? 'bg-transparent' : 'bg-[#F5F5DC]/70'}`}>
            <div className="container mx-auto px-10 sm:px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
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
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
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
