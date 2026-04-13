import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Instagram, Facebook, Youtube, Phone, Mail, MapPin } from 'lucide-react';
import logo from '../assets/logo.png';

export default function Footer({ onOpenLegal }) {
    const { isDarkMode } = useTheme();

    const socialLinks = [
        { icon: <Instagram />, href: 'https://instagram.com/astrofied' },
        { icon: <Facebook />, href: 'https://facebook.com/astrofied' },
        { icon: <Youtube />, href: 'https://youtube.com/@astrofied' },
    ];

    return (
        <footer id="footer" className="py-12 md:py-24 glass mt-4 md:mt-8 font-mulish">
            <div className="container mx-auto px-6">
                <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap justify-between gap-12 mb-12 md:mb-16">
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-0">
                            <img
                                src={logo}
                                alt="Astrofied Logo"
                                className="w-16 h-16 object-contain select-none pointer-events-none"
                                draggable={false}
                                style={{ mixBlendMode: isDarkMode ? 'normal' : 'multiply', marginRight: '-6px' }}
                            />
                            <h4
                                className="text-lg md:text-xl lg:text-2xl font-bold"
                                style={{ color: isDarkMode ? '#D4AF37' : '#4B0082' }}
                            >
                                Astrofied
                            </h4>
                        </div>
                        <div className="flex gap-6">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    className="w-11 h-11 md:w-14 md:h-14 rounded-2xl glass flex items-center justify-center hover:scale-110 transition-all cursor-pointer relative group"
                                    whileHover={{ y: -10, rotate: 5 }}
                                >
                                    <div className="absolute inset-0 bg-gold/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <span className="relative z-10 text-gold group-hover:text-white transition-colors duration-300">
                                        {social.icon}
                                    </span>
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
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

                    <div className="flex flex-col gap-6">
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

                    {/* Legal Links Column */}
                    <div className="flex flex-col gap-6">
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
                </div>

                <div className="border-t border-gold/20 pt-8 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} Astrofied. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
