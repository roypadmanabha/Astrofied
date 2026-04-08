import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import amjadImg from '../assets/amjad.jpg';
import sibaniImg from '../assets/sibani.jpg';
import aritrikaImg from '../assets/aritrika.jpg';
import debadritaImg from '../assets/debadrita.png';
import prasenjitImg from '../assets/prasenjit.jpg';

const testimonials = [
  { id: 1, name: "Amjad Hossain", text: "Astrofied completely changed my perspective on my career choices.", img: amjadImg },
  { id: 2, name: "Sibani Bhattacharya", text: "Accurate and insightful! Highly recommend for life guidance.", img: sibaniImg },
  { id: 3, name: "Aritrika Chakraborty", text: "The consultation gave me clarity and peace of mind.", img: aritrikaImg },
  { id: 4, name: "Debadrita Datta", text: "Prasanta is genuine and very patient. His remedies actually work.", img: debadritaImg },
  { id: 5, name: "Prasenjit Chakraborty", text: "Best astrological advice I have received in years.", img: prasenjitImg },
  { id: 6, name: "Neha K.", text: "Astrofied mapped my future accurately. Very thankful!", img: "https://randomuser.me/api/portraits/women/22.jpg" },
  { id: 7, name: "Rohit V.", text: "Logical predictions, not just random guesses. Impressed.", img: "https://randomuser.me/api/portraits/men/12.jpg" },
  { id: 8, name: "Ananya S.", text: "The matchmaking insights were deep and very detailed.", img: "https://randomuser.me/api/portraits/women/15.jpg" },
  { id: 9, name: "Kunal J.", text: "Helped me during a tough business phase. Result-oriented.", img: "https://randomuser.me/api/portraits/men/9.jpg" },
  { id: 10, name: "Meera B.", text: "Compassionate approach, clear solutions.", img: "https://randomuser.me/api/portraits/women/35.jpg" },
  { id: 11, name: "Siddharth C.", text: "Guided me through legal troubles precisely.", img: "https://randomuser.me/api/portraits/men/29.jpg" },
  { id: 12, name: "Ritika M.", text: "Amazing experience! The health guidance was spot on.", img: "https://randomuser.me/api/portraits/women/59.jpg" },
  { id: 13, name: "Arjun N.", text: "I finally know what path to take. Thanks Astrofied!", img: "https://randomuser.me/api/portraits/men/78.jpg" },
  { id: 14, name: "Pooja L.", text: "Highly intuitive and professional reading.", img: "https://randomuser.me/api/portraits/women/90.jpg" },
  { id: 15, name: "Vikas T.", text: "Clear solutions without enforcing fake remedies.", img: "https://randomuser.me/api/portraits/men/55.jpg" },
];

export default function Testimonials() {
    const { isDarkMode } = useTheme();

    return (
        <section className="py-8 md:py-12 overflow-hidden relative" style={{ background: 'transparent' }}>
            <div className="container mx-auto px-6 mb-8 md:mb-12 text-center">
                <h2 
                    className="text-3xl md:text-4xl lg:text-5xl font-bold font-raleway"
                    style={{ color: isDarkMode ? '#D4AF37' : '#4B0082' }}
                >
                    What our clients say
                </h2>
            </div>
            
            <div className="relative flex overflow-x-hidden group">
                {/* 
                  We use an animation that translates X from 0 to -100%.
                  To make it infinite and seamless, we duplicate the content.
                */}
                <div className="flex animate-marquee group-hover:pause active:pause">
                    {testimonials.map((t) => (
                        <div 
                            key={`first-${t.id}`} 
                            className={`flex items-start gap-4 mx-4 px-6 py-4 rounded-2xl border border-opacity-20 glass backdrop-blur-md transition-all min-w-[300px] md:min-w-[400px] whitespace-normal
                                ${isDarkMode ? 'border-gold/30 hover:border-gold text-white' : 'border-[#4B0082]/20 hover:border-[#4B0082] text-black'}
                            `}
                        >
                            <img 
                                src={t.img} 
                                alt={t.name} 
                                className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover select-none pointer-events-none" 
                                draggable={false}
                            />
                            <div className="flex flex-col">
                                <span className="font-bold text-sm md:text-base font-raleway" style={{ color: isDarkMode ? '#D4AF37' : '#4B0082' }}>{t.name}</span>
                                <span className="text-xs md:text-sm font-mulish opacity-80 leading-relaxed">{t.text}</span>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Duplicate for seamless loop */}
                <div className="flex animate-marquee group-hover:pause active:pause" aria-hidden="true">
                    {testimonials.map((t) => (
                        <div 
                            key={`second-${t.id}`} 
                            className={`flex items-start gap-4 mx-4 px-6 py-4 rounded-2xl border border-opacity-20 glass backdrop-blur-md transition-all min-w-[300px] md:min-w-[400px] whitespace-normal
                                ${isDarkMode ? 'border-gold/30 hover:border-gold text-white' : 'border-[#4B0082]/20 hover:border-[#4B0082] text-black'}
                            `}
                        >
                            <img src={t.img} alt={t.name} className="w-10 h-10 md:w-12 md:h-12 rounded-2xl object-cover" />
                            <div className="flex flex-col">
                                <span className="font-bold text-sm md:text-base font-raleway" style={{ color: isDarkMode ? '#D4AF37' : '#4B0082' }}>{t.name}</span>
                                <span className="text-xs md:text-sm font-mulish opacity-80 leading-relaxed">{t.text}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
