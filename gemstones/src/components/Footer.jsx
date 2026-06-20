import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';
import logo from '../assets/logo.png';

export default function Footer() {
  const socialLinks = [
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] md:w-8 md:h-8">
          <defs>
            <radialGradient id="ig-gradient-gem" cx="0%" cy="100%" r="150%">
              <stop offset="0%" stopColor="#f09433" />
              <stop offset="25%" stopColor="#e6683c" />
              <stop offset="50%" stopColor="#dc2743" />
              <stop offset="75%" stopColor="#cc2366" />
              <stop offset="100%" stopColor="#bc1888" />
            </radialGradient>
          </defs>
          <path fill="url(#ig-gradient-gem)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      href: 'https://instagram.com/astrofied___'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-[20px] h-[20px] md:w-9 md:h-9">
          <path fill="#FF0000" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
          <path fill="#FFF" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
      href: 'https://www.youtube.com/channel/UC4qpHGM_v7YqlT0OvjfLYqg'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-[20px] h-[20px] md:w-9 md:h-9">
          <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          <path fill="#FFF" d="M16.671 15.458l.532-3.47h-3.328V9.738c0-.949.465-1.874 1.956-1.874h1.513V4.91s-1.374-.235-2.686-.235c-2.741 0-4.533 1.662-4.533 4.669v2.645H7.078v3.47h3.047v8.385a12.09 12.09 0 001.438.086c.49 0 .969-.03 1.437-.086v-8.385h2.796z" />
        </svg>
      ),
      href: 'https://www.facebook.com/profile.php?id=61572572734535'
    }
  ];

  return (
    <footer id="footer" className="py-8 md:py-12 bg-[#f5f5dd] border-t font-mulish border-[#A30000]/10">
      <div className="container mx-auto px-6">

        {/* ===== DESKTOP LAYOUT (≥1280px): Single row with dividers ===== */}
        <div className="footer-desktop-row" style={{ marginBottom: '2.5rem' }}>

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0px', flexShrink: 0 }}>
            <img
              src={logo}
              alt="Astrofied Logo"
              className="object-contain select-none pointer-events-none"
              draggable={false}
              style={{ width: '128px', height: '128px', mixBlendMode: 'multiply', marginRight: '-6px' }}
              loading="lazy"
            />
            <h4 className="font-nunito font-bold bg-clip-text text-transparent bg-gradient-to-r from-black to-red-600" style={{ fontSize: '1.875rem', whiteSpace: 'nowrap' }}>
              Astrofied
            </h4>
          </div>

          {/* Divider 1 */}
          <div style={{ width: '1px', height: '6rem', backgroundColor: 'rgba(0,0,0,0.1)', flexShrink: 0, alignSelf: 'center' }} />

          {/* Legal */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flexShrink: 0 }}>
            <h4 className="font-bold text-[#A30000]" style={{ fontSize: '1.25rem' }}>Legal</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button
                onClick={() => alert("Terms & Conditions: All gemstone shipments are handled with secure packaging. Certified authenticity is guaranteed. No reseller commercialization allowed.")}
                className="hover:text-[#A30000] transition-colors"
                style={{ textAlign: 'left', fontSize: '1.125rem', background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', color: '#5A5A5A', whiteSpace: 'nowrap' }}
              >
                Terms and Conditions
              </button>
              <button
                onClick={() => alert("Privacy Policy: All customer and order details are 100% confidential. We do not share your physical address, phone number, or payment screenshots with any third parties.")}
                className="hover:text-[#A30000] transition-colors"
                style={{ textAlign: 'left', fontSize: '1.125rem', background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', color: '#5A5A5A', whiteSpace: 'nowrap' }}
              >
                Privacy Policy
              </button>
            </div>
          </div>

          {/* Divider 2 */}
          <div style={{ width: '1px', height: '6rem', backgroundColor: 'rgba(0,0,0,0.1)', flexShrink: 0, alignSelf: 'center' }} />

          {/* Contact Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flexShrink: 0 }}>
            <h4 className="font-bold text-[#A30000]" style={{ fontSize: '1.25rem', whiteSpace: 'nowrap' }}>Contact Details</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: '#5A5A5A' }}>
              <button 
                onClick={() => window.location.href = 'tel:+919612736566'} 
                className="hover:text-[#A30000] transition-colors"
                style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
              >
                <Phone style={{ width: '20px', height: '20px', color: '#A30000', flexShrink: 0 }} />
                <span style={{ fontSize: '1.125rem', whiteSpace: 'nowrap' }}>+91 96127 36566</span>
              </button>
              <button 
                onClick={() => window.location.href = 'mailto:contact.astrofied@gmail.com'} 
                className="hover:text-[#A30000] transition-colors"
                style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
              >
                <Mail style={{ width: '20px', height: '20px', color: '#A30000', flexShrink: 0 }} />
                <span style={{ fontSize: '1.125rem', whiteSpace: 'nowrap' }}>contact.astrofied@gmail.com</span>
              </button>
            </div>
          </div>

          {/* Divider 3 */}
          <div style={{ width: '1px', height: '6rem', backgroundColor: 'rgba(0,0,0,0.1)', flexShrink: 0, alignSelf: 'center' }} />

          {/* Address */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flexShrink: 0 }}>
            <h4 className="font-bold text-[#A30000]" style={{ fontSize: '1.25rem' }}>Address</h4>
            <button
              onClick={() => window.open('https://maps.google.com/?q=GFHW%2BX6W+Udaipur,+Tripura', '_blank')}
              className="hover:text-[#A30000] transition-colors"
              style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', color: '#5A5A5A' }}
            >
              <MapPin style={{ width: '20px', height: '20px', marginTop: '2px', color: '#A30000', flexShrink: 0 }} />
              <address style={{ fontStyle: 'normal', fontSize: '1.125rem', lineHeight: 1.4, whiteSpace: 'nowrap' }}>
                Dakbanglow Road, near Rajarshi Hall,<br />
                Udaipur, Gomati, Tripura - 799120
              </address>
            </button>
          </div>

        </div>

        {/* ===== MOBILE/TABLET LAYOUT (<1280px): Stacked or 2-col grid ===== */}
        <div className="footer-mobile-grid" style={{ marginBottom: '2.5rem' }}>

          {/* Logo */}
          <div className="flex flex-col gap-2 md:gap-6">
            <div className="flex items-center gap-0">
              <img
                src={logo}
                alt="Astrofied Logo"
                className="w-24 h-24 lg:w-32 lg:h-32 object-contain select-none pointer-events-none"
                draggable={false}
                style={{ mixBlendMode: 'multiply', marginRight: '-6px' }}
                loading="lazy"
              />
              <h4 className="text-xl md:text-xl lg:text-3xl font-nunito font-bold bg-clip-text text-transparent bg-gradient-to-r from-black to-red-600">
                Astrofied
              </h4>
            </div>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-2 md:gap-6">
            <h4 className="text-lg md:text-xl lg:text-2xl font-bold text-[#A30000]">Legal</h4>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => alert("Terms & Conditions: All gemstone shipments are handled with secure packaging. Certified authenticity is guaranteed. No reseller commercialization allowed.")}
                className="text-left text-xs md:text-sm lg:text-lg hover:text-[#A30000] transition-colors bg-transparent border-none p-0 cursor-pointer text-[#5A5A5A]"
              >
                Terms and Conditions
              </button>
              <button
                onClick={() => alert("Privacy Policy: All customer and order details are 100% confidential. We do not share your physical address, phone number, or payment screenshots with any third parties.")}
                className="text-left text-xs md:text-sm lg:text-lg hover:text-[#A30000] transition-colors bg-transparent border-none p-0 cursor-pointer text-[#5A5A5A]"
              >
                Privacy Policy
              </button>
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-2 md:gap-6">
            <h4 className="text-lg md:text-xl lg:text-2xl font-bold text-[#A30000]">Contact Details</h4>
            <div className="flex flex-col gap-4 text-[#5A5A5A]">
              <button 
                onClick={() => window.location.href = 'tel:+919612736566'} 
                className="flex items-center gap-3 hover:text-[#A30000] transition-colors bg-transparent border-none p-0 cursor-pointer text-left"
              >
                <Phone className="w-4 h-4 md:w-5 md:h-5 text-[#A30000] shrink-0" />
                <span className="text-xs md:text-sm lg:text-lg">+91 96127 36566</span>
              </button>
              <button 
                onClick={() => window.location.href = 'mailto:contact.astrofied@gmail.com'} 
                className="flex items-center gap-3 hover:text-[#A30000] transition-colors bg-transparent border-none p-0 cursor-pointer text-left"
              >
                <Mail className="w-4 h-4 md:w-5 md:h-5 text-[#A30000] shrink-0" />
                <span className="text-xs md:text-sm lg:text-lg">contact.astrofied@gmail.com</span>
              </button>
            </div>
          </div>

          {/* Address */}
          <div className="flex flex-col gap-2 md:gap-6">
            <h4 className="text-lg md:text-xl lg:text-2xl font-bold text-[#A30000]">Address</h4>
            <button
              onClick={() => window.open('https://maps.google.com/?q=GFHW%2BX6W+Udaipur,+Tripura', '_blank')}
              className="flex items-start gap-3 hover:text-[#A30000] transition-colors bg-transparent border-none p-0 cursor-pointer text-left text-[#5A5A5A]"
            >
              <MapPin className="w-4 h-4 md:w-5 md:h-5 mt-1 text-[#A30000] shrink-0" />
              <address className="not-italic text-xs md:text-sm lg:text-lg leading-tight text-left">
                Dakbanglow Road, near Rajarshi Hall,<br />
                Udaipur, Gomati, Tripura - 799120
              </address>
            </button>
          </div>

        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-12 md:gap-16 mb-6 md:mb-10">
          {socialLinks.map((social, index) => (
            <motion.button
              key={index}
              onClick={() => window.open(social.href, '_blank')}
              className="flex items-center justify-center cursor-pointer relative group bg-transparent border-none p-0"
              whileHover={{ scale: 1.5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="relative z-10 flex items-center justify-center">
                {social.icon}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Copyright */}
        <div className="border-t border-[#A30000]/20 pt-4 md:pt-8 text-center text-[10px] md:text-sm text-gray-500 font-mulish">
          © {new Date().getFullYear()} Astrofied. All rights reserved | Made by Vignette
        </div>

      </div>
    </footer>
  );
}
