import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import pricingHoroscope from '../assets/pricing-horoscope.png';
import pricingKundali from '../assets/pricing-kundali.jpg';

const Pricing = () => {
  const { isDarkMode } = useTheme();

  const pricingData = [
    {
      id: 1,
      title: "Overall Horoscope Analysis",
      price: "750",
      image: pricingHoroscope,
      description: "Complete life roadmap and planetary guidance.",
      tag: "FEATURED",
      color: "from-blue-500/20 to-purple-500/20",
      accent: "#3B82F6"
    },
    {
      id: 2,
      title: "Horoscope Matching",
      price: "1500",
      image: pricingKundali,
      description: "Deep compatibility analysis for a prosperous union.",
      tag: "Exclusive",
      color: "from-red-500/20 to-gold/20",
      accent: "#D4AF37",
      isKundali: true
    }
  ];

  return (
    <section id="pricing" className={`py-24 relative overflow-hidden ${isDarkMode ? 'bg-[#05010d]/50' : 'bg-[#FAF9F6]'}`}>
      <div className="container mx-auto px-6 max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight" style={{ color: isDarkMode ? '#D4AF37' : '#4B0082' }}>
            Best Prices
          </h2>
          <p className={`text-lg md:text-xl font-mulish opacity-70 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            High-quality astrological guidance made affordable for everyone.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {pricingData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: idx === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className={`relative group rounded-[2.5rem] p-4 border shadow-2xl overflow-hidden transition-all duration-500 ${isDarkMode
                ? 'bg-[#17202A] border-white/10 hover:border-gold/30'
                : 'bg-[#D4AF37] border-black/5 hover:border-purple-600/30'
                }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-30 -z-10`} />

              {/* Image Container */}
              <div className={`relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-8 shadow-inner ${isDarkMode ? 'bg-white/5' : 'bg-[#FAF9F6]'}`}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`w-full h-full object-cover select-none pointer-events-none transition-all duration-700 ${item.isKundali
                      ? (isDarkMode ? 'brightness-110 contrast-125 saturate-[1.2] multiply-blend invert-colors' : 'mix-blend-multiply')
                      : 'group-hover:scale-110'
                      }`}
                    style={item.isKundali ? {
                      mixBlendMode: isDarkMode ? 'screen' : 'multiply',
                      filter: isDarkMode ? 'invert(1) hue-rotate(180deg) brightness(0.8)' : 'none'
                    } : {}}
                  />
                </motion.div>
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full z-10 shadow-lg">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white">{item.tag}</span>
                </div>
              </div>

              {/* Content */}
              <div className="px-4 pb-4">
                <h3 className={`text-2xl md:text-3xl font-black mb-2 font-mulish ${isDarkMode ? 'text-white' : 'text-[#4B0082]'}`}>
                  {item.title}
                </h3>
                <p className={`text-sm md:text-base font-mulish opacity-60 mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {item.description}
                </p>

                <div className="flex items-center justify-between mt-auto bg-black/5 dark:bg-white/5 p-4 rounded-2xl">
                  <div className="flex flex-col">
                    <span className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-gold' : 'text-[#4B0082]'}`}>Price</span>
                    <span className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      ₹ {item.price}
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open('https://wa.me/919612736566?text=I%20want%20to%20book%20' + encodeURIComponent(item.title) + '.', '_blank')}
                    className={`px-6 py-3 rounded-xl font-black text-xs tracking-widest uppercase shadow-lg transition-all ${isDarkMode
                      ? 'bg-gold text-black hover:bg-white shadow-gold/20'
                      : 'bg-[#4B0082] text-white hover:bg-black shadow-[#4B0082]/20'
                      }`}
                  >
                    Book Now
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
