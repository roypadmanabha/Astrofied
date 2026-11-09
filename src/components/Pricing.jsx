import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { getWhatsAppLink } from '../lib/constants';
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
      prices: [
        { label: "Online", amount: "750" },
        { label: "Offline", amount: "850" }
      ],
      image: pricingHoroscope,
      description: "Your complete life roadmap and planetary guidance through proven astrological methods.",
      tag: "FEATURED",
      color: "from-[#3B82F6]/20 via-transparent to-[#8B5CF6]/20",
      glow: "group-hover:shadow-[0_0_50px_rgba(59,130,246,0.2)]",
      accent: "#3B82F6"
    },
    {
      id: 2,
      title: "Horoscope Matching",
      prices: [
        { label: "Online", amount: "1500" },
        { label: "Offline", amount: "1500" }
      ],
      image: pricingKundali,
      description: "Deep compatibility analysis for a prosperous and harmonious lifelong union.",
      tag: "EXCLUSIVE",
      color: "from-[#f0fe4f]/20 via-transparent to-[#F59E0B]/20",
      glow: "group-hover:shadow-[0_0_50px_rgba(240,254,79,0.2)]",
      accent: "#f0fe4f",
      isKundali: true
    }
  ];

  return (
    <section id="pricing" className={`py-16 md:py-24 relative overflow-hidden ${isDarkMode ? 'bg-transparent' : 'bg-[#f5f5dd]'}`}>
      <style>{`
        @media (min-width: 1024px) {
          .pricing-grid {
            grid-auto-rows: 1fr !important;
          }
          .pricing-card-title {
            min-height: 5.75rem !important;
            display: flex !important;
            align-items: flex-start !important;
          }
          .pricing-card-desc {
            min-height: 3.5rem !important;
          }
        }
      `}</style>
      <div className="container mx-auto px-6 max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0.8, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 tracking-tight">
            <span className={`transition-colors ${isDarkMode ? 'text-white' : 'text-[#A30000]'}`}>Best</span>{' '}
            <span style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>Prices</span>
          </h2>
          <p className={`text-base md:text-xl font-mulish opacity-70 ${isDarkMode ? 'text-gray-300' : 'text-black'}`}>
            High-quality astrological guidance made affordable for everyone.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-8 xl:gap-12 items-stretch pricing-grid" style={{ gridAutoRows: '1fr' }}>
          {pricingData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0.8, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              style={{ height: '100%' }}
              className={`pricing-card relative rounded-[24px] p-4 sm:p-5 border flex flex-col justify-between h-full ${isDarkMode
                  ? `shadow-2xl transition-all duration-700 bg-transparent border-[whitesmoke]`
                  : 'bg-white border-gray-200 shadow-md'
                }`}
            >
              {/* Animated Background Glow (Dark Mode Only) */}
              {isDarkMode && (
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 transition-opacity duration-700 -z-10 rounded-[24px]`} />
              )}

              {/* Card Decoration */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-current opacity-[0.02] rounded-full blur-3xl pointer-events-none" />

              <div className="flex-1 flex flex-col">
                {/* Image Container */}
                <div className={`relative aspect-[16/10] rounded-[16px] overflow-hidden mb-8 shadow-md border ${isDarkMode ? 'shadow-2xl transition-transform duration-700 group-hover:scale-[1.02] bg-black/40 border-[0.5px] border-[whitesmoke]' : 'bg-[#f5f5dd] border-transparent'
                  }`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`w-full h-full object-cover select-none pointer-events-none ${isDarkMode ? '' : ''
                      } ${item.isKundali ? (isDarkMode ? '' : 'mix-blend-multiply') : ''
                      }`}
                    style={item.isKundali ? {
                      mixBlendMode: isDarkMode ? 'screen' : 'multiply',
                      filter: isDarkMode ? 'invert(1) brightness(0.9) contrast(1.1)' : 'none'
                    } : {}}
                    loading="lazy"
                  />

                  {/* Badge Overlay */}
                  <div className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 md:top-4 md:right-4 z-10">
                    <div className="bg-black/60 backdrop-blur-md border border-white/20 px-2.5 py-0.5 sm:px-3.5 sm:py-1 rounded-full shadow-md flex items-center justify-center">
                      <span className="text-[8px] sm:text-[9px] md:text-[10px] font-extrabold uppercase tracking-widest text-white leading-tight select-none">
                        {item.tag}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Area */}
                <div className="px-4 pb-4 flex-1 flex flex-col">
                  <div className="flex flex-col gap-3 mb-8 flex-1">
                    <h3 className={`pricing-card-title text-2xl sm:text-3xl lg:text-4xl font-mulish leading-tight ${isDarkMode ? 'font-bold text-[#f0fe4f]' : 'font-bold text-[#A30000]'
                      }`}>
                      {item.title}
                    </h3>
                    <p className={`pricing-card-desc text-sm sm:text-base font-mulish font-medium leading-relaxed ${isDarkMode ? 'text-white' : 'text-black/80 opacity-60'
                      }`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Price & CTA Box */}
              <div className="px-3 sm:px-4 pb-4 mt-auto">
                <div className={`flex flex-nowrap items-center justify-between gap-2 sm:gap-3 lg:gap-4 mt-auto p-3 sm:p-4 rounded-[10px] border ${isDarkMode
                    ? 'backdrop-blur-xl bg-white/5 border-[0.5px] border-[whitesmoke] transition-colors duration-500'
                    : 'bg-[#f5f5dd] border-black/[0.05]'
                  }`}>
                  {item.prices ? (
                    <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 shrink-0">
                      {item.prices.map((p, pIdx) => (
                        <React.Fragment key={pIdx}>
                          {pIdx > 0 && (
                            <div className={`w-[1px] h-7 sm:h-9 self-center ${isDarkMode ? 'bg-[whitesmoke]/60' : 'bg-black'}`} />
                          )}
                          <div className="flex flex-col justify-center">
                            <span className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider leading-none mb-1 ${isDarkMode ? 'text-white' : 'text-[#A30000]'
                              }`}>
                              {p.label}
                            </span>
                            <span className={`text-base sm:text-xl xl:text-2xl font-bold leading-none ${isDarkMode ? 'text-gold' : 'text-[#A30000]'}`}>
                              ₹{p.amount}
                            </span>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col shrink-0">
                      <span className={`text-xl sm:text-3xl font-bold ${isDarkMode ? 'text-gold' : 'text-[#A30000]'
                        }`}>
                        ₹{item.price}
                      </span>
                    </div>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open(getWhatsAppLink(`I want to book ${item.title}.`), '_blank')}
                    className={`shrink-0 ml-auto group/btn flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 xl:px-6 xl:py-3 rounded-[10px] font-black text-[8px] sm:text-[10px] tracking-wider uppercase shadow-2xl transition-all duration-300 ease-in-out whitespace-nowrap pricing-card-btn ${isDarkMode
                        ? 'bg-white text-black hover:bg-[#f0fe4f] shadow-white/10 hover:shadow-gold/20'
                        : 'bg-[#A30000] text-white hover:bg-black shadow-[#991600]/20'
                      }`}
                  >
                    Book Now
                    {isDarkMode ? (
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    ) : (
                      <span>→</span>
                    )}
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
