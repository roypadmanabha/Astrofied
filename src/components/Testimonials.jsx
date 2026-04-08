import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

import t1 from '../assets/testimonials/t1.jpg';
import t2 from '../assets/testimonials/t2.jpg';
import t3 from '../assets/testimonials/t3.jpg';
import t4 from '../assets/testimonials/t4.jpg';
import t5 from '../assets/testimonials/t5.jpg';
import t6 from '../assets/testimonials/t6.jpg';
import t7 from '../assets/testimonials/t7.jpg';
import t8 from '../assets/testimonials/t8.jpg';
import t9 from '../assets/testimonials/t9.jpg';
import t10 from '../assets/testimonials/t10.jpg';
import t11 from '../assets/testimonials/t11.jpg';
import t12 from '../assets/testimonials/t12.jpg';
import t13 from '../assets/testimonials/t13.jpg';
import t14 from '../assets/testimonials/t14.jpg';
import t15 from '../assets/testimonials/t15.jpg';

const testimonials = [
  { id: 1, name: "Amjad Hossain", text: "Astrofied completely changed my perspective on my career choices.", img: t1 },
  { id: 2, name: "Sibani Bhattacharya", text: "Accurate and insightful! Highly recommend for life guidance.", img: t2 },
  { id: 3, name: "Aritrika Chakraborty", text: "The consultation gave me clarity and peace of mind.", img: t3 },
  { id: 4, name: "Debadrita Datta", text: "Prasanta is genuine and very patient. His remedies actually work.", img: t4 },
  { id: 5, name: "Prasenjit Chakraborty", text: "Best astrological advice I have received in years.", img: t5 },
  { id: 6, name: "Lipika Das", text: "Astrofied mapped my future accurately. Very thankful!", img: t6 },
  { id: 7, name: "Rupan Bhattacharjee", text: "Logical predictions, not just random guesses. Impressed.", img: t7 },
  { id: 8, name: "Purnima Debnath", text: "The matchmaking insights were deep and very detailed.", img: t8 },
  { id: 9, name: "Pralay Majumder", text: "Helped me during a tough business phase. Result-oriented.", img: t9 },
  { id: 10, name: "Poulami Chakraborty", text: "Compassionate approach, clear solutions.", img: t10 },
  { id: 11, name: "Somnath Chakraborty", text: "Guided me through legal troubles precisely.", img: t11 },
  { id: 12, name: "Madhumita Chakraborty", text: "Amazing experience! The health guidance was spot on.", img: t12 },
  { id: 13, name: "Poulami Saha", text: "I finally know what path to take. Thanks Astrofied!", img: t13 },
  { id: 14, name: "Suman Sarkar", text: "Highly intuitive and professional reading.", img: t14 },
  { id: 15, name: "Riya Chakraborty", text: "Clear solutions without enforcing fake remedies.", img: t15 },
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
