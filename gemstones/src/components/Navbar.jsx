import React from 'react';
import { Gem, ClipboardList } from 'lucide-react';
import logo from '../assets/logo.png';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 md:px-12 py-4 flex justify-between items-center bg-[#f5f5dd]/70 backdrop-blur-lg border-b shadow-sm border-black/10 shadow-black/5 transition-all duration-300">
      
      {/* Logo and Wordmark */}
      <div 
        className="flex items-center gap-1.5 md:gap-3 cursor-pointer" 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <img
          src={logo}
          alt="Astrofied Logo"
          className="h-5 sm:h-6 md:h-8 mr-0 md:mr-1 object-contain select-none pointer-events-none"
          style={{ mixBlendMode: 'multiply' }}
          draggable={false}
        />
        
        {/* Wordmark matching Journals wordmark layout */}
        <h1 className="text-base sm:text-xl md:text-2xl font-bold whitespace-nowrap flex items-center gap-1 md:gap-2" style={{ fontFamily: '"Nunito", sans-serif', fontWeight: 700 }}>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-black via-[#7B0000] to-[#E50000]" style={{ letterSpacing: '-0.03em' }}>
            Astrofied
          </span>
          <span className="bg-clip-text text-transparent bg-[#E50000]" style={{ letterSpacing: '-0.03em' }}>
            Gemstones
          </span>
        </h1>
      </div>

      {/* Right Side Navigation Links */}
      <div className="flex gap-4 md:gap-6 font-semibold items-center font-mulish">
        <button 
          onClick={() => {
            const gridSection = document.getElementById('gemstone-collection');
            if (gridSection) gridSection.scrollIntoView({ behavior: 'smooth' });
          }}
          className="hover:opacity-70 transition-opacity flex items-center gap-1.5 text-black bg-transparent border-none p-0 cursor-pointer font-bold"
          title="Collection"
        >
          <Gem size={18} className="sm:hidden text-black shrink-0" />
          <span className="hidden sm:inline text-xs sm:text-sm md:text-base">Collection</span>
        </button>
        <button 
          onClick={() => {
            const formSection = document.getElementById('order-form');
            if (formSection) formSection.scrollIntoView({ behavior: 'smooth' });
          }}
          className="hover:opacity-70 transition-opacity flex items-center gap-1.5 text-[#A30000] bg-transparent border-none p-0 cursor-pointer font-bold"
          title="Order Form"
        >
          <ClipboardList size={18} className="sm:hidden text-[#A30000] shrink-0" />
          <span className="hidden sm:inline text-xs sm:text-sm md:text-base">Order Form</span>
        </button>
      </div>

    </header>
  );
}
