import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, Phone, User } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Connect() {
    const { isDarkMode } = useTheme();
    const [formData, setFormData] = useState({
        name: '',
        phone: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const message = `Hello Astrofied, I would like to connect with you.\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}`;
        const whatsappUrl = `https://wa.me/919612736566?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <section id="connect" className={`py-24 relative overflow-hidden ${isDarkMode ? '' : 'bg-[#F5F5DC]/30'}`}>
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0.8, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="text-center mb-16"
                >
                    <h2 
                        className="text-4xl md:text-6xl font-black mb-4 tracking-tight"
                        style={{ color: isDarkMode ? '#D4AF37' : '#4B0082' }}
                    >
                        CONNECT
                    </h2>
                    <p className={`text-lg md:text-xl opacity-70 font-mulish ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Have questions? Reach out to us directly via WhatsApp.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0.8, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`glass p-8 md:p-12 rounded-[2.5rem] border shadow-2xl relative overflow-hidden ${
                        isDarkMode ? 'border-gold/20 bg-black/40' : 'border-[#4B0082]/10 bg-white/60'
                    }`}
                >
                    {/* Decorative Background Icon */}
                    <MessageSquare className={`absolute -bottom-10 -right-10 w-48 h-48 opacity-5 -rotate-12 ${
                        isDarkMode ? 'text-gold' : 'text-[#4B0082]'
                    }`} />

                    <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Name Input */}
                            <div className="space-y-2">
                                <label className={`block text-sm font-bold tracking-widest ml-1 ${
                                    isDarkMode ? 'text-gold/80' : 'text-[#4B0082]/80'
                                }`}>
                                    YOUR NAME
                                </label>
                                <div className="relative group">
                                    <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                                        isDarkMode ? 'text-gold/40 group-focus-within:text-gold' : 'text-[#4B0082]/40 group-focus-within:text-[#4B0082]'
                                    }`} />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Enter your full name"
                                        className={`w-full pl-12 pr-6 py-4 rounded-2xl border-2 outline-none transition-all font-mulish ${
                                            isDarkMode 
                                                ? 'bg-white/5 border-white/10 focus:border-gold text-white placeholder:text-white/20' 
                                                : 'bg-black/5 border-black/10 focus:border-[#4B0082] text-black placeholder:text-black/30'
                                        }`}
                                    />
                                </div>
                            </div>

                            {/* Phone Input */}
                            <div className="space-y-2">
                                <label className={`block text-sm font-bold tracking-widest ml-1 ${
                                    isDarkMode ? 'text-gold/80' : 'text-[#4B0082]/80'
                                }`}>
                                    PHONE NUMBER
                                </label>
                                <div className="relative group">
                                    <Phone className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                                        isDarkMode ? 'text-gold/40 group-focus-within:text-gold' : 'text-[#4B0082]/40 group-focus-within:text-[#4B0082]'
                                    }`} />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Enter your WhatsApp number"
                                        className={`w-full pl-12 pr-6 py-4 rounded-2xl border-2 outline-none transition-all font-mulish ${
                                            isDarkMode 
                                                ? 'bg-white/5 border-white/10 focus:border-gold text-white placeholder:text-white/20' 
                                                : 'bg-black/5 border-black/10 focus:border-[#4B0082] text-black placeholder:text-black/30'
                                        }`}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center pt-4">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className={`flex items-center gap-3 px-12 py-5 rounded-full font-bold text-lg tracking-widest transition-all shadow-xl ${
                                    isDarkMode
                                        ? 'bg-gold text-black hover:shadow-gold/20'
                                        : 'bg-[#4B0082] text-white hover:bg-[#4B0082]/90 shadow-[#4B0082]/20'
                                }`}
                            >
                                <Send className="w-5 h-5" />
                                SEND ON WHATSAPP
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
