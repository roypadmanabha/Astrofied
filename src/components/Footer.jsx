import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Instagram, Facebook, Youtube, Phone, Mail, MapPin } from 'lucide-react';
import logo from '../assets/logo.png';

export default function Footer() {
    const { isDarkMode } = useTheme();

    const socialLinks = [
        { icon: <Instagram />, href: 'https://instagram.com/astrofied' },
        { icon: <Facebook />, href: 'https://facebook.com/astrofied' },
        { icon: <Youtube />, href: 'https://youtube.com/@astrofied' },
    ];

    return (
        <footer id="footer" className="py-12 md:py-24 glass mt-12 md:mt-24 font-mulish">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 mb-12 md:mb-16">
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-4">
                            <div className="shining-frame">
                                <img
                                    src={logo}
                                    alt="Astrofied Logo"
                                    className="w-16 h-16 rounded-full border-2 border-gold/30 object-cover"
                                />
                            </div>
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
                            <div className="flex items-center gap-3">
                                <Phone className="w-4 h-4 md:w-5 md:h-5 text-gold" />
                                <span className="text-xs md:text-sm lg:text-lg">+91 96127 36566</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="w-4 h-4 md:w-5 md:h-5 text-gold" />
                                <span className="text-xs md:text-sm lg:text-lg">contact.astrofied@gmail.com</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h4
                            className="text-lg md:text-xl lg:text-2xl font-bold"
                            style={{ color: isDarkMode ? '#D4AF37' : '#4B0082' }}
                        >
                            Address
                        </h4>
                        <div className="flex items-start gap-3">
                            <MapPin className="w-4 h-4 md:w-5 md:h-5 text-gold mt-1" />
                            <address className="not-italic text-xs md:text-sm lg:text-lg">
                                Dakbanglow Road, near Rajarshi Hall,<br />
                                Udaipur, Gomati, Tripura - 799120
                            </address>
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
