import React from 'react';
import { ClipboardList, ChevronsLeft } from 'lucide-react';
import logo from '../assets/logo.png';
import gemstoneIcon from '../assets/gemstone-icon.png';

export default function Navbar() {
  const handleHomeClick = () => {
    const isLocal = typeof window !== 'undefined' && 
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    const destination = isLocal
      ? 'http://localhost:5174'
      : typeof window !== 'undefined' && window.location.pathname.startsWith('/Astrofied')
        ? '/Astrofied/'
        : '/';
    window.location.href = destination;
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 md:px-12 py-4 flex justify-between items-center bg-[#f5f5dd]/70 backdrop-blur-lg border-b shadow-sm border-black/10 shadow-black/5 transition-all duration-300">
      
      {/* Logo and Wordmark */}
      <div 
        className="flex items-center gap-0.5 sm:gap-1 cursor-pointer" 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <img
          src={logo}
          alt="Astrofied Logo"
          className="h-5 sm:h-6 md:h-8 mr-0 object-contain select-none pointer-events-none"
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
      <div className="flex gap-10 sm:gap-7 md:gap-6 font-semibold items-center font-mulish">
        <button 
          onClick={handleHomeClick}
          className="hover:text-[#FF0000] transition-all relative group flex items-center gap-1.5 text-black bg-transparent border-none p-0 cursor-pointer font-bold"
          title="Home"
        >
          <ChevronsLeft size={16} className="sm:hidden text-black shrink-0 group-hover:text-[#FF0000] transition-colors" style={{ strokeWidth: 3 }} />
          <span className="hidden sm:inline text-xs sm:text-sm md:text-base">Home</span>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full bg-[#FF0000] hidden sm:block" />
        </button>
        <button 
          onClick={() => {
            const gridSection = document.getElementById('gemstone-collection');
            if (gridSection) gridSection.scrollIntoView({ behavior: 'smooth' });
          }}
          className="hover:text-[#FF0000] transition-all relative group flex items-center gap-1.5 text-black bg-transparent border-none p-0 cursor-pointer font-bold"
          title="Collection"
        >
          <img src={gemstoneIcon} alt="Collection" className="sm:hidden w-4 h-4 shrink-0 object-contain group-hover:opacity-80 transition-opacity" />
          <span className="hidden sm:inline text-xs sm:text-sm md:text-base">Collection</span>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full bg-[#FF0000] hidden sm:block" />
        </button>
        <button 
          onClick={() => {
            const formSection = document.getElementById('order-form');
            if (formSection) formSection.scrollIntoView({ behavior: 'smooth' });
          }}
          className="hover:text-[#FF0000] transition-all relative group flex items-center gap-1.5 text-black bg-transparent border-none p-0 cursor-pointer font-bold"
          title="Order Form"
        >
          <ClipboardList size={16} className="sm:hidden text-black shrink-0 group-hover:text-[#FF0000] transition-colors" />
          <span className="hidden sm:inline text-xs sm:text-sm md:text-base">Order Form</span>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full bg-[#FF0000] hidden sm:block" />
        </button>
      </div>

    </header>
  );
}
