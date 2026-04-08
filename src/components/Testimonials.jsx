import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

import amjad from '../assets/testimonials/amjad.jpg';
import sibani from '../assets/testimonials/sibani.jpg';
import aritrika from '../assets/testimonials/aritrika.jpg';
import debadrita from '../assets/testimonials/debadrita.jpg';
import prasenjit from '../assets/testimonials/prasenjit.jpg';

const testimonials = [
  { id: 1, name: "Amjad Hossain", text: "Astrofied completely changed my perspective on my career choices.", img: amjad, pos: "object-top" },
  { id: 2, name: "Sibani Bhattacharya", text: "Accurate and insightful! Highly recommend for life guidance.", img: sibani, pos: "object-top" },
  { id: 3, name: "Aritrika Chakraborty", text: "The consultation gave me clarity and peace of mind.", img: aritrika, pos: "object-top" },
  { id: 4, name: "Debadrita Datta", text: "Prasanta is genuine and very patient. His remedies actually work.", img: debadrita, pos: "object-center" },
  { id: 5, name: "Prasenjit Chakraborty", text: "Best astrological advice I have received in years.", img: prasenjit, pos: "object-top" },
  { id: 6, name: "Amjad Hossain", text: "Highly intuitive and professional reading. Guided me through tough times.", img: amjad, pos: "object-top" },
  { id: 7, name: "Sibani Bhattacharya", text: "Amazing experience! The health guidance was spot on.", img: sibani, pos: "object-top" },
  { id: 8, name: "Aritrika Chakraborty", text: "I finally know what path to take. Thanks Astrofied!", img: aritrika, pos: "object-top" },
  { id: 9, name: "Debadrita Datta", text: "Logical predictions, not just random guesses. Impressed.", img: debadrita, pos: "object-center" },
  { id: 10, name: "Prasenjit Chakraborty", text: "Result-oriented approach without fake remedies.", img: prasenjit, pos: "object-top" },
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
                                className={`w-10 h-10 md:w-14 md:h-14 object-cover select-none pointer-events-none ${t.pos || 'object-center'}`} 
                                style={{ borderRadius: '100%' }}
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
                            <img 
                                src={t.img} 
                                alt={t.name} 
                                className={`w-10 h-10 md:w-14 md:h-14 object-cover select-none pointer-events-none ${t.pos || 'object-center'}`} 
                                style={{ borderRadius: '100%' }}
                                draggable={false}
                            />
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
