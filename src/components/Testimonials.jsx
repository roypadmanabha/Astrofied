import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonialImages = import.meta.glob('../assets/testimonials/*', { eager: true, import: 'default' });

const getImg = (filename) => {
    return testimonialImages[`../assets/testimonials/${filename}`] || `/testimonials/${filename}`;
};

const testimonials = [
    // ── Original 15 Clients (Kept Untouched) ───────────────────────────────
    { id: 1, name: "Pralay Majumder", img: getImg("Pralay Majumder.png"), text: "Astrofied provides clarity when life feels uncertain. A great mentor." },
    { id: 2, name: "Prasenjit Chakraborty", img: getImg("Prasenjit Chakraborty.png"), text: "Highly impressed with the accuracy. It's more than predictions, it's guidance." },
    { id: 3, name: "Sibani Bhattacharjee", img: getImg("Sibani Bhattacharjee.png"), text: "Detailed analysis of every problem. An honest astrologer, every time." },
    { id: 4, name: "Somnath Chakraborty", img: getImg("Somnath Chakraborty.jpeg"), text: "Great support for family and personal concerns. The suggestions work wonder." },
    { id: 5, name: "Amjad Hossain", img: getImg("Amjad Hossain.jpeg"), text: "The career guidance was incredibly accurate. Astrofied helped me find my path." },
    { id: 6, name: "Aritrika Chakraborty", img: getImg("Aritrika Chakraborty.jpeg"), text: "Excellent insights into my personal relationship issues. Highly recommended!" },
    { id: 7, name: "Debadrita Datta", img: getImg("Debadrita Datta.jpeg"), text: "A truly professional experience. The remedies provided were practical and effective." },
    { id: 8, name: "Lipika Das", img: getImg("Lipika Das.jpeg"), text: "Very deep knowledge of Vedic astrology. My consultation was eye-opening." },
    { id: 9, name: "Madhumita Chakraborty", img: getImg("Madhumita Chakraborty.jpeg"), text: "The birth chart analysis was precise and helped me prepare for challenges." },
    { id: 10, name: "Poulami Chakraborty", img: getImg("Poulami Chakraborty.jpeg"), text: "Warm and supportive guidance. Felt very comfortable discussing my life problems." },
    { id: 11, name: "Poulami Saha", img: getImg("Poulami Saha.jpeg"), text: "Exceptional service! The predictions about my business growth were spot on." },
    { id: 12, name: "Purnima Debnath", img: getImg("Purnima Debnath.png"), text: "Helped me understand my strengths and weaknesses through my horoscope." },
    { id: 13, name: "Riya Bhattacharjee", img: getImg("Riya Bhattacharjee.jpeg"), text: "The best place for authentic astrological consultations. Very satisfied!" },
    { id: 14, name: "Rupan Bhattacharjee", img: getImg("Rupan Bhattacharjee.jpeg"), text: "Scientific approach to astrology. No superstitions, just pure logic and calculations." },
    { id: 15, name: "Suman Sarkar", img: getImg("Suman Sarkar.jpeg"), text: "Transformative experience! Astrofied changed my perspective towards traditional wisdom." },

    // ── 35 Newly Added Clients (Sorted Alphabetically from 16 to 50) ──────
    { id: 16, name: "Abhijit Das", img: getImg("Abhijit Das.jpeg"), text: "Incredible relationship clarity and guidance for a joyful marriage." },
    { id: 17, name: "Amit Banik", img: getImg("Amit Banik.jpeg"), text: "Wonderful improvements and outstanding career guidance from Astrofied." },
    { id: 18, name: "Animesh Sutradhar", img: getImg("Animesh Sutradhar.jpeg"), text: "Highly accurate guidance for career milestones and married life." },
    { id: 19, name: "Anisha Roy", img: getImg("Anisha Roy.jpeg"), text: "Astrofied restored marital harmony and boosted my financial growth." },
    { id: 20, name: "Antarlina Saha", img: getImg("Antarlina Saha.jpeg"), text: "Astrofied gave total clarity on career goals and finances." },
    { id: 21, name: "Anwesha Saha", img: getImg("Anwesha Saha.jpeg"), text: "Astrofied gave wonderful insights on career progress and marriage." },
    { id: 22, name: "Ashim Karmakar", img: getImg("Ashim Karmakar.jpeg"), text: "Astrofied brought financial stability and understanding to our marriage." },
    { id: 23, name: "Ayan Paul", img: getImg("Ayan Paul.jpeg"), text: "Great support for personal health and strategic career growth." },
    { id: 24, name: "Bapi Chakraborty", img: getImg("Bapi Chakraborty.jpeg"), text: "Astrofied provided amazing guidance for finance and career growth." },
    { id: 25, name: "Biplab Deb", img: getImg("Biplab Deb.jpeg"), text: "Practical career advice leading to financial growth and stability." },
    { id: 26, name: "Chandan Karmakar", img: getImg("Chandan Karmakar.jpeg"), text: "Career predictions and financial advice brought me lasting success." },
    { id: 27, name: "Deep Bhowmik", img: getImg("Deep Bhowmik.jpeg"), text: "Astrofied guided me to robust health and financial security." },
    { id: 28, name: "Ishika Das", img: getImg("Ishika Das.jpeg"), text: "Genuine astrological remedies for general wellness and marital harmony." },
    { id: 29, name: "Manish Goswami", img: getImg("Manish Goswami.jpeg"), text: "Outstanding financial solutions and strong career guidance by Astrofied." },
    { id: 30, name: "Manisha Saha", img: getImg("Manisha Saha.jpeg"), text: "Astrofied guided me to overall health and financial security." },
    { id: 31, name: "Mousumi Karmakar", img: getImg("Mousumi Karmakar.jpeg"), text: "Property dispute remedies and financial advice brought great relief." },
    { id: 32, name: "Nilay Saha", img: getImg("Nilay Saha.jpeg"), text: "Accurate chart analysis for business career decisions and wealth." },
    { id: 33, name: "Payel Das", img: getImg("Payel Das.jpeg"), text: "Effective remedies that boosted financial growth and marital happiness." },
    { id: 34, name: "Poushali Nandi", img: getImg("Poushali Nandi.jpeg"), text: "Deep relationship insights leading to a peaceful married life." },
    { id: 35, name: "Pratik Majumder", img: getImg("Pratik Majumder.jpeg"), text: "Exceptional remedies for problem recovery and clear career direction." },
    { id: 36, name: "Prattay Sarkar", img: getImg("Prattay Sarkar.jpeg"), text: "Heartfelt advice that strengthened our relationship and marriage bond." },
    { id: 37, name: "Priyajit Debnath", img: getImg("Priyajit Debnath.jpeg"), text: "Astrofied gave accurate predictions for career and marriage." },
    { id: 38, name: "Priyanka Bhowmik", img: getImg("Priyanka Bhowmik.jpeg"), text: "Astrofied provided exact timeline for career and financial success." },
    { id: 39, name: "Rajat Debbarma", img: getImg("Rajat Debbarma.jpeg"), text: "Superb predictions for career advancement and strong marriage foundation." },
    { id: 40, name: "Rajesh Das", img: getImg("Rajesh Das.jpeg"), text: "Professional career recommendations and outstanding financial guidance from Astrofied." },
    { id: 41, name: "Ratnajit Das", img: getImg("Ratnajit Das.jpeg"), text: "Astrofied resolved relationship issues and guided our marriage timing." },
    { id: 42, name: "Sachin Chakraborty", img: getImg("Sachin Chakraborty.jpeg"), text: "Wise advice for financial planning and marital harmony in life." },
    { id: 43, name: "Samrat Datta", img: getImg("Samrat Datta.jpeg"), text: "Clear career roadmap and meaningful insights for happy marriage." },
    { id: 44, name: "Srikanta Saha", img: getImg("Srikanta Saha.jpeg"), text: "Astrofied provided stellar guidance for my career and finances." },
    { id: 45, name: "Subrata Chakraborty", img: getImg("Subrata Chakraborty.jpeg"), text: "Astrofied helped me overcome career hurdles and excel professionally." },
    { id: 46, name: "Sujay Datta", img: getImg("Sujay Datta.jpeg"), text: "Clear direction for career decisions and wealth management advice." },
    { id: 47, name: "Sukanta Debnath", img: getImg("Sukanta Debnath.jpeg"), text: "Remarkable problem recovery and excellent trajectory for my career." },
    { id: 48, name: "Trisha Sarkar", img: getImg("Trisha Sarkar.jpeg"), text: "Astrofied brought immense positivity to my relationship and marriage." },
    { id: 49, name: "Uday Saha", img: getImg("Uday Saha.jpeg"), text: "Transformative personal advice and brilliant career planning by Astrofied." },
    { id: 50, name: "Viki Saha", img: getImg("Viki Saha.jpeg"), text: "Brilliant remedies for business growth and clearing debts." }
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
                    ? 'border-gold/20 !bg-transparent text-white shadow-[0_0_20px_rgba(8,0,46,0.5)]'
                    : 'glass border-[#A30000]/20 !bg-[#fbf2cb] text-black'}
            `}
        >
            <Quote className={`absolute top-6 right-8 w-8 h-8 hidden md:block opacity-100 ${isDarkMode ? 'text-gold' : 'text-[#A30000]'}`} />

            <div className="flex items-center gap-4">
                <div className={`relative p-[2px] rounded-full ${isDarkMode ? 'bg-gold' : 'bg-[#591000]'}`}>
                    <img
                        src={t.img}
                        alt={t.name}
                        className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover select-none pointer-events-none"
                        draggable={false}
                        loading="lazy"
                    />
                </div>
                <div className="flex flex-col">
                    <span className={`font-bold text-base md:text-lg font-mulish tracking-tight transition-colors ${isDarkMode ? 'text-white hover:text-white' : 'text-black'}`}>
                        {t.name}
                    </span>
                    <div className="flex gap-0.5 mt-1">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className="w-3 h-3 md:w-4 md:h-4"
                                fill={isDarkMode ? '#ffd700' : '#FFEA00'}
                                stroke={isDarkMode ? '#ffd700' : '#5C4033'}
                                strokeWidth={isDarkMode ? 1.5 : 1}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <p className={`text-sm md:text-lg font-mulish opacity-90 leading-relaxed italic relative z-10 ${isDarkMode ? 'text-gray-300' : 'text-black'}`}>
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
                            className={`text-3xl md:text-5xl lg:text-7xl font-bold font-mulish tracking-tight mb-4 transition-colors ${isDarkMode ? 'text-[#ffd700] hover:text-[#ffd700]' : 'text-[#A30000]'}`}
                        >
                            Voices of <span className={isDarkMode ? 'text-white' : 'text-black'}>Trust</span>
                        </h2>
                        <p className={`text-sm md:text-xl opacity-70 font-mulish ml-1 md:ml-1.5 ${isDarkMode ? 'text-gray-400' : 'text-black'}`}>
                            Hear from our clients who found clarity.
                        </p>
                    </div>

                    {/* Desktop Navigation Buttons */}
                    <div className="hidden md:flex items-center justify-center gap-4">
                        <button
                            onClick={() => scroll('left')}
                            disabled={!canScrollLeft}
                            className={`p-3 md:p-4 rounded-[20%] border transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed shadow-lg testimonial-nav-btn
                                ${isDarkMode
                                    ? 'border-gold/30 text-[#FFF8E1] bg-[#ffd700] hover:bg-[#e6c200] text-black hover:text-black hover:scale-105 active:scale-95'
                                    : 'border-[#A30000] text-white bg-[#A30000] hover:bg-white hover:text-[#A30000] hover:scale-105 active:scale-95'}
                            `}
                        >
                            <ChevronLeft size={24} strokeWidth={3} />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            disabled={!canScrollRight}
                            className={`p-3 md:p-4 rounded-[20%] border transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed shadow-lg testimonial-nav-btn
                                ${isDarkMode
                                    ? 'border-gold/30 text-[#FFF8E1] bg-[#ffd700] hover:bg-[#e6c200] text-black hover:text-black hover:scale-105 active:scale-95'
                                    : 'border-[#A30000] text-white bg-[#A30000] hover:bg-white hover:text-[#A30000] hover:scale-105 active:scale-95'}
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

            {/* Mobile Navigation Buttons */}
            <div className="flex md:hidden items-center justify-center gap-6 mt-8">
                <button
                    onClick={() => scroll('left')}
                    disabled={!canScrollLeft}
                    className={`p-4 rounded-[20%] border transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed shadow-md
                        ${isDarkMode
                            ? 'border-gold/30 text-[#FFF8E1] bg-[#ffd700] hover:bg-[#e6c200] text-black hover:text-black active:scale-90'
                            : 'border-[#591000]/20 text-purple-100 bg-[#591000] hover:bg-purple-100 hover:text-[#591000] active:scale-90'}
                    `}
                >
                    <ChevronLeft size={20} strokeWidth={4} />
                </button>
                <button
                    onClick={() => scroll('right')}
                    disabled={!canScrollRight}
                    className={`p-4 rounded-[20%] border transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed shadow-md
                        ${isDarkMode
                            ? 'border-gold/30 text-[#FFF8E1] bg-[#ffd700] hover:bg-[#e6c200] text-black hover:text-black active:scale-90'
                            : 'border-[#591000]/20 text-purple-100 bg-[#591000] hover:bg-purple-100 hover:text-[#591000] active:scale-90'}
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
