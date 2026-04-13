import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Phone, Mail, MapPin } from 'lucide-react';
import logo from '../assets/logo.png';

export default function Footer({ onOpenLegal }) {
    const { isDarkMode } = useTheme();

    const socialLinks = [
        { 
            icon: (
                <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] md:w-8 md:h-8">
                    <defs>
                        <radialGradient id="ig-gradient" cx="0%" cy="100%" r="150%">
                            <stop offset="0%" stopColor="#f09433"/>
                            <stop offset="25%" stopColor="#e6683c"/>
                            <stop offset="50%" stopColor="#dc2743"/>
                            <stop offset="75%" stopColor="#cc2366"/>
                            <stop offset="100%" stopColor="#bc1888"/>
                        </radialGradient>
                    </defs>
                    <path fill="url(#ig-gradient)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
            ), 
            href: 'https://instagram.com/astrofied' 
        },
        { 
            icon: (
                <svg viewBox="0 0 24 24" className="w-[20px] h-[20px] md:w-9 md:h-9">
                    <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    <path fill="#FFF" d="M16.671 15.458l.532-3.47h-3.328V9.738c0-.949.465-1.874 1.956-1.874h1.513V4.91s-1.374-.235-2.686-.235c-2.741 0-4.533 1.662-4.533 4.669v2.645H7.078v3.47h3.047v8.385a12.09 12.09 0 001.438.086c.49 0 .969-.03 1.437-.086v-8.385h2.796z"/>
                </svg>
            ), 
            href: 'https://facebook.com/astrofied' 
        },
        { 
            icon: (
                <svg viewBox="0 0 24 24" className="w-[20px] h-[20px] md:w-9 md:h-9">
                    <path fill="#FF0000" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/>
                    <path fill="#FFF" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
            ), 
            href: 'https://youtube.com/@astrofied' 
        },
    ];

    return (
        <footer id="footer" className={`py-12 md:py-24 glass border-t font-mulish ${isDarkMode ? 'border-gold/20' : 'border-[#4B0082]/10'}`}>
            <div className="container mx-auto px-6">
                <div className="flex flex-wrap justify-between gap-x-4 gap-y-12 mb-12 md:mb-16">
                    <div className="flex flex-col gap-6 w-full lg:w-auto">
                        <div className="flex items-center gap-0">
                            <img
                                src={logo}
                                alt="Astrofied Logo"
                                className="w-24 h-24 lg:w-32 lg:h-32 object-contain select-none pointer-events-none"
                                draggable={false}
                                style={{ mixBlendMode: isDarkMode ? 'normal' : 'multiply', marginRight: '-6px' }}
                            />
                            <h4
                                className="text-xl md:text-xl lg:text-3xl font-bold"
                                style={{ color: isDarkMode ? '#D4AF37' : '#4B0082' }}
                            >
                                Astrofied
                            </h4>
                        </div>
                    </div>

                    {/* Legal Links Column */}
                    <div className="flex flex-col gap-6 w-[45%] sm:w-auto">
                        <h4
                            className="text-lg md:text-xl lg:text-2xl font-bold"
                            style={{ color: isDarkMode ? '#D4AF37' : '#4B0082' }}
                        >
                            Legal
                        </h4>
                        <div className="flex flex-col gap-4">
                            <button 
                                onClick={() => onOpenLegal('terms')}
                                className="text-left text-xs md:text-sm lg:text-lg hover:text-gold transition-colors bg-transparent border-none p-0"
                            >
                                Terms and Conditions
                            </button>
                            <button 
                                onClick={() => onOpenLegal('privacy')}
                                className="text-left text-xs md:text-sm lg:text-lg hover:text-gold transition-colors bg-transparent border-none p-0"
                            >
                                Privacy Policy
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 flex-1 sm:flex-none sm:w-auto min-w-[160px]">
                        <h4
                            className="text-lg md:text-xl lg:text-2xl font-bold"
                            style={{ color: isDarkMode ? '#D4AF37' : '#4B0082' }}
                        >
                            Contact Details
                        </h4>
                        <div className="flex flex-col gap-4">
                            <a href="tel:+919612736566" className="flex items-center gap-3 hover:text-gold transition-colors">
                                <Phone className="w-4 h-4 md:w-5 md:h-5 text-gold" />
                                <span className="text-xs md:text-sm lg:text-lg">+91 96127 36566</span>
                            </a>
                            <a href="mailto:contact.astrofied@gmail.com" className="flex items-center gap-3 hover:text-gold transition-colors">
                                <Mail className="w-4 h-4 md:w-5 md:h-5 text-gold" />
                                <span className="text-xs md:text-sm lg:text-lg">contact.astrofied@gmail.com</span>
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 w-full lg:w-auto">
                        <h4
                            className="text-lg md:text-xl lg:text-2xl font-bold"
                            style={{ color: isDarkMode ? '#D4AF37' : '#4B0082' }}
                        >
                            Address
                        </h4>
                        <a href="https://maps.google.com/?q=GFHW%2BX6W+Udaipur,+Tripura" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-gold transition-colors block">
                            <MapPin className="w-4 h-4 md:w-5 md:h-5 text-gold mt-1 shrink-0" />
                            <address className="not-italic text-xs md:text-sm lg:text-lg">
                                Dakbanglow Road, near Rajarshi Hall,<br />
                                Udaipur, Gomati, Tripura - 799120
                            </address>
                        </a>
                    </div>

                </div>

                <div className="flex justify-center gap-12 md:gap-16 mb-6 md:mb-16">
                    {socialLinks.map((social, index) => (
                        <motion.a
                            key={index}
                            href={social.href}
                            target="_blank"
                            className="flex items-center justify-center cursor-pointer relative group"
                            whileHover={{ scale: 1.5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            <span className="relative z-10 flex items-center justify-center">
                                {social.icon}
                            </span>
                        </motion.a>
                    ))}
                </div>

                <div className="border-t border-gold/20 pt-4 md:pt-8 text-center text-[10px] md:text-sm text-gray-500">
                    © {new Date().getFullYear()} Astrofied. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
