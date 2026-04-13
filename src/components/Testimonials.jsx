import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import amjad from '../assets/testimonials/amjad.jpg';
import aritrika from '../assets/testimonials/aritrika.jpg';
import debadrita from '../assets/testimonials/debadrita.jpg';
import lipika from '../assets/testimonials/lipika.jpg';
import madhumita from '../assets/testimonials/madhumita.jpg';
import poulami1 from '../assets/testimonials/poulami1.jpg';
import poulami2 from '../assets/testimonials/poulami2.jpg';
import pralay from '../assets/testimonials/pralay.jpg';
import prasenjit from '../assets/testimonials/prasenjit.jpg';
import purnima from '../assets/testimonials/purnima.jpg';
import riya from '../assets/testimonials/riya.jpg';
import rupan from '../assets/testimonials/rupan.jpg';
import sibani from '../assets/testimonials/sibani.jpg';
import somnath from '../assets/testimonials/somnath.jpg';
import suman from '../assets/testimonials/suman.jpg';

const testimonials = [
    { id: 1, name: "Amjad Hossain", img: amjad, text: "The career guidance was incredibly accurate. Astrofied helped me find my true path." },
    { id: 2, name: "Aritrika Chakraborty", img: aritrika, text: "Excellent insights into my personal relationship issues. Highly recommended!" },
    { id: 3, name: "Debadrita Datta", img: debadrita, text: "A truly professional experience. The remedies provided were practical and effective." },
    { id: 4, name: "Lipika Das", img: lipika, text: "Very deep knowledge of Vedic astrology. My consultation was eye-opening." },
    { id: 5, name: "Madhumita Chakraborty", img: madhumita, text: "The birth chart analysis was precise and helped me prepare for future challenges." },
    { id: 6, name: "Poulami Chakraborty", img: poulami1, text: "Warm and supportive guidance. Felt very comfortable discussing my life problems." },
    { id: 7, name: "Poulami Saha", img: poulami2, text: "Exceptional service! The predictions about my business growth were spot on." },
    { id: 8, name: "Pralay Majumder", img: pralay, text: "Astrofied provides clarity when life feels uncertain. A great mentor." },
    { id: 9, name: "Prasenjit Chakraborty", img: prasenjit, text: "Highly impressed with the accuracy. It's more than just predictions, it's guidance." },
    { id: 10, name: "Purnima Debnath", img: purnima, text: "Helped me understand my strengths and weaknesses through my horoscope." },
    { id: 11, name: "Riya Chakraborty", img: riya, text: "The best place for authentic astrological consultations. Very satisfied!" },
    { id: 12, name: "Rupan Bhattacharjee", img: rupan, text: "Scientific approach to astrology. No superstitions, just pure logic and calculations." },
    { id: 13, name: "Sibani Bhattacharya", img: sibani, text: "Incredible depth of analysis. Every session brings new clarity and peace of mind." },
    { id: 14, name: "Somnath Chakraborty", img: somnath, text: "Great support for family and health concerns. The suggestions work wonder." },
    { id: 15, name: "Suman Saha", img: suman, text: "Transformative experience! Astrofied changed my perspective towards traditional wisdom." },
];

export default function Testimonials() {
    const { isDarkMode } = useTheme();

    return (
        <section className={`py-8 md:py-12 overflow-hidden relative ${isDarkMode ? '' : 'bg-white'}`} style={{ background: isDarkMode ? 'transparent' : 'white' }}>
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
            </div>
        </section>
    );
}
