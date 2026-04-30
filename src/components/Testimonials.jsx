import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Quote, Star } from 'lucide-react';
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
    { id: 8, name: "Pralay Majumder", img: pralay, text: "Astrofied provides clarity when life feels uncertain. A great mentor." },
    { id: 9, name: "Prasenjit Chakraborty", img: prasenjit, text: "Highly impressed with the accuracy. It's more than just predictions, it's guidance." },
    { id: 13, name: "Sibani Bhattacharya", img: sibani, text: "Incredible depth of analysis. Every session brings new clarity and peace of mind." },
    { id: 14, name: "Somnath Chakraborty", img: somnath, text: "Great support for family and health concerns. The suggestions work wonder." },
    { id: 1, name: "Amjad Hossain", img: amjad, text: "The career guidance was incredibly accurate. Astrofied helped me find my true path." },
    { id: 2, name: "Aritrika Chakraborty", img: aritrika, text: "Excellent insights into my personal relationship issues. Highly recommended!" },
    { id: 3, name: "Debadrita Datta", img: debadrita, text: "A truly professional experience. The remedies provided were practical and effective." },
    { id: 4, name: "Lipika Das", img: lipika, text: "Very deep knowledge of Vedic astrology. My consultation was eye-opening." },
    { id: 5, name: "Madhumita Chakraborty", img: madhumita, text: "The birth chart analysis was precise and helped me prepare for future challenges." },
    { id: 6, name: "Poulami Chakraborty", img: poulami1, text: "Warm and supportive guidance. Felt very comfortable discussing my life problems." },
    { id: 7, name: "Poulami Saha", img: poulami2, text: "Exceptional service! The predictions about my business growth were spot on." },
    { id: 10, name: "Purnima Debnath", img: purnima, text: "Helped me understand my strengths and weaknesses through my horoscope." },
    { id: 11, name: "Riya Chakraborty", img: riya, text: "The best place for authentic astrological consultations. Very satisfied!" },
    { id: 12, name: "Rupan Bhattacharjee", img: rupan, text: "Scientific approach to astrology. No superstitions, just pure logic and calculations." },
    { id: 15, name: "Suman Saha", img: suman, text: "Transformative experience! Astrofied changed my perspective towards traditional wisdom." },
];

export default function Testimonials() {
    const { isDarkMode } = useTheme();

    const TestimonialCard = ({ t, idPrefix }) => (
        <div
            key={`${idPrefix}-${t.id}`}
            className={`group relative flex flex-col gap-4 mx-4 px-6 py-6 sm:px-8 sm:py-8 rounded-[2rem] border glass backdrop-blur-xl transition-all duration-500 min-w-[280px] sm:min-w-[320px] md:min-w-[420px] whitespace-normal
                ${isDarkMode
                    ? 'border-gold/50 hover:border-gold text-white'
                    : 'border-[#4B0082]/40 hover:border-[#4B0082] text-black'}
            `}
        >
            <Quote className={`absolute top-6 right-8 w-8 h-8 opacity-100 transition-opacity hidden md:block ${isDarkMode ? 'text-gold' : 'text-[#4B0082]'}`} />

            <div className="flex items-center gap-4">
                <div className={`relative p-[2px] rounded-full ${isDarkMode ? 'bg-gold' : 'bg-[#4B0082]'}`}>
                    <img
                        src={t.img}
                        alt={t.name}
                        className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover select-none pointer-events-none"
                        draggable={false}
                    />
                </div>
                <div className="flex flex-col">
                    <span className="font-bold text-base md:text-lg font-mulish tracking-tight" style={{ color: isDarkMode ? '#D4AF37' : '#4B0082' }}>
                        {t.name}
                    </span>
                    <div className="flex gap-0.5 mt-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-gold text-gold" />
                        ))}
                    </div>
                </div>
            </div>

            <p className={`text-sm md:text-base font-mulish opacity-80 leading-relaxed italic relative z-10 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {t.text}
            </p>
        </div>
    );

    return (
        <section id="testimonials" className={`py-12 md:py-20 overflow-hidden relative ${isDarkMode ? '' : 'bg-white'}`} style={{ background: isDarkMode ? 'transparent' : 'white' }}>
            <div className="container mx-auto px-6 mb-12 md:mb-16 text-center">
                <h2
                    className="text-3xl md:text-5xl lg:text-6xl font-black font-mulish tracking-tight"
                    style={{ color: isDarkMode ? '#D4AF37' : '#4B0082' }}
                >
                    Voices of <span className={isDarkMode ? 'text-white' : 'text-[#4B0082]'}>Trust</span>
                </h2>
            </div>

            <div
                className="relative flex overflow-x-hidden group py-4"
            >
                <div className="flex animate-marquee group-hover:pause active:pause">
                    {testimonials.map((t) => (
                        <TestimonialCard key={`first-${t.id}`} t={t} idPrefix="first" />
                    ))}
                </div>

                <div className="flex animate-marquee group-hover:pause active:pause" aria-hidden="true">
                    {testimonials.map((t) => (
                        <TestimonialCard key={`second-${t.id}`} t={t} idPrefix="second" />
                    ))}
                </div>
            </div>
        </section>
    );
}
