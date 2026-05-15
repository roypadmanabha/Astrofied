import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import pricingHoroscope from '../assets/pricing-horoscope.png';
import pricingKundali from '../assets/pricing-kundali.jpg';

const Pricing = () => {
  const { isDarkMode } = useTheme();
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const pricingData = [
    {
      id: 1,
      title: "Overall Horoscope Analysis",
      price: "750",
      image: pricingHoroscope,
      description: "Complete life roadmap and planetary guidance through ancient Vedic wisdom.",
      tag: "FEATURED",
      color: "from-[#3B82F6]/20 via-transparent to-[#8B5CF6]/20",
      glow: "group-hover:shadow-[0_0_50px_rgba(59,130,246,0.2)]",
      accent: "#3B82F6"
    },
    {
      id: 2,
      title: "Horoscope Matching",
      price: "1500",
      image: pricingKundali,
      description: "Deep compatibility analysis for a prosperous and harmonious lifelong union.",
      tag: "EXCLUSIVE",
      color: "from-[#D4AF37]/20 via-transparent to-[#F59E0B]/20",
      glow: "group-hover:shadow-[0_0_50px_rgba(212,175,55,0.2)]",
      accent: "#D4AF37",
      isKundali: true
    }
  ];

  return (
    <section id="pricing" className={`py-24 relative overflow-hidden ${isDarkMode ? 'bg-[#05010d]/50' : 'bg-[#FAF9F6]'}`}>
      <div className="container mx-auto px-6 max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0.8, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
            <span style={{ color: isDarkMode ? '#D4AF37' : '#4B0082' }}>Best</span>{' '}
            <span style={{ color: isDarkMode ? '#FFFFFF' : '#4B0082' }}>Prices</span>
          </h2>
          <p className={`text-lg md:text-xl font-mulish opacity-70 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            High-quality astrological guidance made affordable for everyone.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          {pricingData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0.8, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`relative group rounded-[24px] p-5 border shadow-2xl transition-all duration-700 hover:-translate-y-4 ${item.glow} ${
                isDarkMode
                  ? 'bg-white/[0.03] border-white/10 hover:bg-white/[0.05]'
                  : 'bg-white border-black/[0.03] hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)]'
              }`}
            >
              {/* Animated Background Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 rounded-[24px]`} />
              
              {/* Card Decoration */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-current opacity-[0.02] rounded-full blur-3xl pointer-events-none" />

              {/* Image Container */}
              <div className={`relative aspect-[16/10] rounded-[16px] overflow-hidden mb-8 shadow-2xl transition-transform duration-700 group-hover:scale-[1.02] ${
                isDarkMode ? 'bg-black/40' : 'bg-[#FAF9F6]'
              }`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={`w-full h-full object-cover select-none pointer-events-none transition-all duration-700 group-hover:scale-110 ${
                    item.isKundali ? (isDarkMode ? '' : 'mix-blend-multiply') : ''
                  }`}
                  style={item.isKundali ? {
                    mixBlendMode: isDarkMode ? 'screen' : 'multiply',
                    filter: isDarkMode ? 'invert(1) brightness(0.9) contrast(1.1)' : 'none'
                  } : {}}
                />
                
                {/* Badge Overlay */}
                <div className="absolute top-6 right-6">
                  <div className="bg-black/30 backdrop-blur-xl border border-white/20 px-5 py-2 rounded-2xl shadow-2xl">
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white">
                      {item.tag}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="px-4 pb-4">
                <div className="flex flex-col gap-3 mb-8">
                  <h3 className={`text-3xl lg:text-4xl font-black font-mulish leading-tight ${
                    isDarkMode ? 'text-white' : 'text-[#4B0082]'
                  }`}>
                    {item.title}
                  </h3>
                  <p className={`text-base font-mulish font-medium leading-relaxed opacity-60 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {item.description}
                  </p>
                </div>

                <div className={`flex items-center justify-between mt-auto p-6 rounded-[2rem] backdrop-blur-xl border transition-colors duration-500 ${
                  isDarkMode 
                    ? 'bg-white/5 border-white/5 group-hover:bg-white/[0.08]' 
                    : 'bg-black/[0.02] border-black/[0.03] group-hover:bg-black/[0.04]'
                }`}>
                  <div className="flex flex-col">
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 ${
                      isDarkMode ? 'text-gold' : 'text-purple-600'
                    }`}>Price</span>
                    <div className="flex items-baseline gap-1">
                      <span className={`text-sm font-bold ${isDarkMode ? 'text-white/50' : 'text-gray-400'}`}>₹</span>
                      <span className={`text-3xl font-bold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {item.price}
                      </span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open('https://wa.me/919612736566?text=I%20want%20to%20book%20' + encodeURIComponent(item.title) + '.', '_blank')}
                    className={`group/btn flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-[10px] tracking-[0.2em] uppercase shadow-2xl transition-all duration-500 ${
                      isDarkMode
                        ? 'bg-gold text-black hover:bg-white shadow-gold/20'
                        : 'bg-[#4B0082] text-white hover:bg-black shadow-purple-900/20'
                    }`}
                  >
                    Book Now
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
