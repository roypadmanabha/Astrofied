import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
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
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, []);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { clientWidth } = scrollRef.current;
            const scrollAmount = direction === 'left' ? -clientWidth * 0.8 : clientWidth * 0.8;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            setTimeout(checkScroll, 500);
        }
    };

    const TestimonialCard = ({ t }) => (
        <div
            className={`group relative flex flex-col gap-4 px-6 py-6 sm:px-8 sm:py-8 rounded-[2rem] border backdrop-blur-xl transition-all duration-500 min-w-[300px] sm:min-w-[380px] md:min-w-[450px] shrink-0 whitespace-normal
                ${isDarkMode
                    ? 'border-gold/20 !bg-gradient-to-br from-black via-[#08002e] to-black text-white shadow-[0_0_20px_rgba(8,0,46,0.5)]'
                    : 'glass border-[#4B0082]/20 bg-white/40 text-black'}
            `}
        >
            <Quote className={`absolute top-6 right-8 w-8 h-8 opacity-20 hidden md:block ${isDarkMode ? 'text-gold' : 'text-[#4B0082]'}`} />

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

            <p className={`text-sm md:text-lg font-mulish opacity-90 leading-relaxed italic relative z-10 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {t.text}
            </p>
        </div>
    );

    return (
        <section id="testimonials" className={`py-12 md:py-24 overflow-hidden relative ${isDarkMode ? '' : 'bg-white'}`} style={{ background: isDarkMode ? 'transparent' : 'white' }}>
            <div className="container mx-auto px-6 mb-12 md:mb-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="text-center md:text-left">
                        <h2
                            className="text-3xl md:text-5xl lg:text-7xl font-black font-mulish tracking-tight mb-4"
                            style={{ color: isDarkMode ? '#D4AF37' : '#4B0082' }}
                        >
                            Voices of <span className={isDarkMode ? 'text-white' : 'text-[#4B0082]'}>Trust</span>
                        </h2>
                        <p className={`text-sm md:text-xl opacity-70 font-mulish ml-1 md:ml-1.5 ${isDarkMode ? 'text-gray-400' : 'text-[#4B0082]'}`}>
                            Hear from our clients who found clarity.
                        </p>
                    </div>

                    {/* Desktop Navigation Buttons (Hidden on mobile) */}
                    <div className="hidden md:flex items-center justify-center gap-4">
                        <button
                            onClick={() => scroll('left')}
                            disabled={!canScrollLeft}
                            className={`p-3 md:p-4 rounded-[20%] border transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed shadow-lg
                                ${isDarkMode 
                                    ? 'border-gold/30 text-[#FFF8E1] bg-[#D4AF37] hover:bg-[#FFF8E1] hover:text-[#D4AF37] hover:scale-105 active:scale-95' 
                                    : 'border-[#4B0082]/20 text-purple-100 bg-[#4B0082] hover:bg-purple-100 hover:text-[#4B0082] hover:scale-105 active:scale-95'}
                            `}
                        >
                            <ChevronLeft size={24} strokeWidth={3} />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            disabled={!canScrollRight}
                            className={`p-3 md:p-4 rounded-[20%] border transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed shadow-lg
                                ${isDarkMode 
                                    ? 'border-gold/30 text-[#FFF8E1] bg-[#D4AF37] hover:bg-[#FFF8E1] hover:text-[#D4AF37] hover:scale-105 active:scale-95' 
                                    : 'border-[#4B0082]/20 text-purple-100 bg-[#4B0082] hover:bg-purple-100 hover:text-[#4B0082] hover:scale-105 active:scale-95'}
                            `}
                        >
                            <ChevronRight size={24} strokeWidth={3} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Carousel Container */}
            <div
                ref={scrollRef}
                onScroll={checkScroll}
                className="flex overflow-x-auto gap-6 px-6 md:px-[calc((100vw-min(1280px,100vw-48px))/2)] no-scrollbar snap-x snap-mandatory py-4 cursor-grab active:cursor-grabbing"
            >
                {testimonials.map((t) => (
                    <div key={t.id} className="snap-center">
                        <TestimonialCard t={t} />
                    </div>
                ))}
            </div>

            {/* Mobile Navigation Buttons (Visible only on mobile) */}
            <div className="flex md:hidden items-center justify-center gap-6 mt-8">
                <button
                    onClick={() => scroll('left')}
                    disabled={!canScrollLeft}
                    className={`p-4 rounded-[20%] border transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed shadow-md
                        ${isDarkMode 
                            ? 'border-gold/30 text-[#FFF8E1] bg-[#D4AF37] hover:bg-[#FFF8E1] hover:text-[#D4AF37] active:scale-90' 
                            : 'border-[#4B0082]/20 text-purple-100 bg-[#4B0082] hover:bg-purple-100 hover:text-[#4B0082] active:scale-90'}
                    `}
                >
                    <ChevronLeft size={20} strokeWidth={4} />
                </button>
                <button
                    onClick={() => scroll('right')}
                    disabled={!canScrollRight}
                    className={`p-4 rounded-[20%] border transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed shadow-md
                        ${isDarkMode 
                            ? 'border-gold/30 text-[#FFF8E1] bg-[#D4AF37] hover:bg-[#FFF8E1] hover:text-[#D4AF37] active:scale-90' 
                            : 'border-[#4B0082]/20 text-purple-100 bg-[#4B0082] hover:bg-purple-100 hover:text-[#4B0082] active:scale-90'}
                    `}
                >
                    <ChevronRight size={20} strokeWidth={4} />
                </button>
            </div>

            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
}
