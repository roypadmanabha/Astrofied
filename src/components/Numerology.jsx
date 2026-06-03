import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { RotateCcw } from 'lucide-react';

const Numerology = () => {
    const { isDarkMode } = useTheme();
    const [dob, setDob] = useState('');
    const [results, setResults] = useState(null);
    const [error, setError] = useState('');

    const reduceToSingleDigit = (num) => {
        let n = parseInt(num, 10);
        if (isNaN(n)) return 0;
        while (n > 9) {
            n = String(n).split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
        }
        return n;
    };

    const handleCalculate = () => {
        if (!dob) {
            setError('Please enter valid DOB in DD MM YYYY format only');
            return;
        }
        
        const parts = dob.split('-');
        if (parts.length !== 3) return;
        
        const year = parseInt(parts[0], 10);
        if (year < 1900 || year > 2099 || parts[0].length > 4) {
            setError('Please enter valid DOB in DD MM YYYY format only');
            return;
        }
        const month = parseInt(parts[1], 10);
        const day = parseInt(parts[2], 10);

        const moolank = reduceToSingleDigit(day);
        
        const sumOfAllDigits = String(day).split('')
            .concat(String(month).split(''), String(year).split(''))
            .reduce((acc, curr) => acc + parseInt(curr, 10), 0);
        const bhagyank = reduceToSingleDigit(sumOfAllDigits);

        const currentYear = new Date().getFullYear();
        const varshankSum = String(day).split('')
            .concat(String(month).split(''), String(currentYear).split(''))
            .reduce((acc, curr) => acc + parseInt(curr, 10), 0);
        const varshank = reduceToSingleDigit(varshankSum);

        const attitudeSum = String(day).split('')
            .concat(String(month).split(''))
            .reduce((acc, curr) => acc + parseInt(curr, 10), 0);
        const attitude = reduceToSingleDigit(attitudeSum);

        setResults({
            moolank,
            bhagyank,
            varshank,
            attitude
        });
    };

    const cards = [
        {
            titlePrefix: "Mool",
            titleSuffix: "ank",
            key: "moolank",
            desc: "Used to determine a person's core personality traits, natural inclinations, and fundamental self-image."
        },
        {
            titlePrefix: "Bhagy",
            titleSuffix: "ank",
            key: "bhagyank",
            desc: "Used to reveal a person's ultimate life purpose, long-term destiny, and overarching karmic path."
        },
        {
            titlePrefix: "Varsh",
            titleSuffix: "ank",
            key: "varshank",
            desc: "Used to forecast the specific themes, opportunities, and challenges a person will encounter during the current calendar year."
        },
        {
            titlePrefix: "Attitude ",
            titleSuffix: "No.",
            key: "attitude",
            desc: "Used to understand a person's instinctual, day-to-day reactions and the initial impression they make on others."
        }
    ];

    const handleDateChange = (e) => {
        const val = e.target.value;
        if (val) {
            const parts = val.split('-');
            const yearStr = parts[0];
            
            if (yearStr && yearStr.length > 4) {
                const correctedVal = `${yearStr.substring(0, 4)}-${parts[1]}-${parts[2]}`;
                setDob(correctedVal);
                setError('Please enter valid DOB in DD MM YYYY format only');
                return;
            }
            
            if (yearStr && yearStr.length === 4) {
                const yearNum = parseInt(yearStr, 10);
                if (yearNum < 1900 || yearNum > 2099) {
                    setError('Please enter valid DOB in DD MM YYYY format only');
                    setDob(val);
                    setResults(null);
                    return;
                }
            }
        }
        setError('');
        setDob(val);
        setResults(null);
    };

    return (
        <section className={`py-16 md:py-24 font-mulish overflow-hidden ${isDarkMode ? 'bg-transparent' : 'bg-white'}`}>
            <div className="container mx-auto px-6 max-w-6xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className={`text-4xl md:text-6xl lg:text-[5rem] font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                            Know your <span className={isDarkMode ? 'text-[#ffd700]' : 'text-[#FF0000]'}>Numbers</span>
                    </h2>
                    <p className={`text-sm md:text-xl font-medium max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                        Calculate your core numerology numbers for free with<br className="hidden md:block" /> 100% accurate calculations.
                    </p>
                </div>

                {/* Input & Button */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4 w-full">
                    {/* Inner wrapper to keep Input and Reset on the same line on mobile */}
                    <div className="flex flex-row items-center justify-center gap-2 md:gap-4 w-full md:w-auto order-1 md:order-none">
                        
                        {/* Input (Rendered First on Mobile, Second on Desktop) */}
                        <div className="relative w-full md:w-auto flex-grow order-1 md:order-2">
                            {/* Mobile Input: Native Date Picker */}
                            <input 
                                type="date"
                                onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
                                min="1900-01-01"
                                max="2099-12-31"
                                value={dob}
                                onChange={handleDateChange}
                                className={`md:hidden px-4 py-3 rounded-xl border-2 text-[15px] font-bold shadow-lg w-full outline-none transition-all ${error ? 'border-red-500 focus:border-red-500 text-red-500' : isDarkMode ? 'bg-[#1a1a1a] border-white/10 text-white focus:border-[#ffd700]' : 'bg-white border-transparent focus:border-[#A30000] text-black'}`}
                            />
                            {/* Desktop Input: Native Date Picker */}
                            <input 
                                type="date"
                                min="1900-01-01"
                                max="2099-12-31"
                                value={dob}
                                onChange={handleDateChange}
                                onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
                                className={`hidden md:block px-6 py-4 rounded-xl border-2 text-2xl font-bold shadow-lg min-w-[250px] outline-none transition-all ${error ? 'border-red-500 focus:border-red-500 text-red-500' : isDarkMode ? 'bg-[#1a1a1a] border-white/10 text-white focus:border-[#ffd700]' : 'bg-white border-transparent focus:border-[#A30000] text-black'}`}
                            />
                        </div>

                        {/* Reset Button (Rendered Second on Mobile, First on Desktop) */}
                        <button
                            onClick={() => {
                                setDob('');
                                setResults(null);
                                setError('');
                            }}
                            className={`p-3 md:p-4 rounded-xl border-2 shadow-lg transition-all flex items-center justify-center group flex-shrink-0 order-2 md:order-1 ${isDarkMode ? 'bg-[#1a1a1a] border-white/10 text-white hover:border-[#ffd700] hover:text-[#ffd700]' : 'bg-white border-transparent text-black hover:text-[#A30000]'}`}
                            title="Reset"
                        >
                            <RotateCcw className="w-6 h-6 md:w-7 md:h-7 transition-transform group-hover:-rotate-180 duration-500" />
                        </button>
                    </div>

                    <button 
                        onClick={handleCalculate}
                        className={`px-8 py-3 md:py-4 rounded-xl text-lg md:text-2xl font-bold shadow-lg transition-colors w-full md:w-auto order-2 md:order-none ${isDarkMode ? 'bg-[#ffd700] text-black hover:bg-[#e6c200]' : 'bg-[#A30000] text-white hover:bg-white hover:text-[#A30000]'}`}
                    >
                        Calculate
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="text-center text-red-500 text-sm md:text-base font-bold mb-4 animate-pulse">
                        {error}
                    </div>
                )}

                <div className="text-center mb-12">
                    <p className={`text-[10px] md:text-xs max-w-3xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-black/80'}`}>
                        Note: Please ensure your birth details are entered correctly. Any errors in the day, month, or year will result in inaccurate calculations.
                    </p>
                </div>

                {/* Cards Container */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
                    {cards.map((card, idx) => (
                        <div 
                            key={idx} 
                            className={`rounded-2xl p-2 sm:p-4 md:p-6 flex flex-col shadow-xl relative overflow-hidden transition-all duration-500 ${isDarkMode ? 'bg-transparent border border-[#ffd700]' : 'bg-gradient-to-b from-[#ffde59] to-[#ff914d] border border-[#A30000]'}`}
                        >
                            {/* Card Header */}
                            <h3 className={`text-[15px] sm:text-2xl md:text-3xl font-bold text-center mt-2 z-10 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                                {card.titlePrefix}<span className={isDarkMode ? 'text-[#ffd700]' : 'text-[#FF0000]'}>{card.titleSuffix}</span>
                            </h3>

                            {/* Result Number */}
                            <AnimatePresence>
                                {results && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0, marginTop: 0, marginBottom: 0 }}
                                        animate={{ height: "auto", opacity: 1, marginTop: 16, marginBottom: 16 }}
                                        exit={{ height: 0, opacity: 0, marginTop: 0, marginBottom: 0 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                        className="flex items-center justify-center z-10 overflow-hidden py-2"
                                    >
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.5, y: -40 }} // calendar drop-down effect
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            transition={{ type: "spring", stiffness: 200, damping: 15, delay: idx * 0.1 }}
                                            className={`text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] leading-none drop-shadow-md nunito-black numerology-result-number ${isDarkMode ? 'text-[#ffd700]' : 'astrofied-title-gradient'}`}
                                        >
                                            {results[card.key]}
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Bottom Description Box */}
                            <div className={`rounded-2xl p-2 sm:p-4 md:p-5 text-[8px] sm:text-[10px] md:text-xs leading-relaxed z-10 mt-3 sm:mt-4 md:mt-6 h-[75px] sm:h-[110px] md:h-[140px] flex items-center shadow-lg ${isDarkMode ? 'text-white bg-transparent border border-[#ffd700]' : 'text-white bg-black border border-black'}`}>
                                <p className="text-justify w-full m-0">{card.desc}</p>
                            </div>
                            
                            {/* Subtle background glow effect if needed */}
                            <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/10 rounded-b-full blur-2xl -z-0 pointer-events-none" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Numerology;
