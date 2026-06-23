import React from 'react';
import { gemstones } from '../lib/constants';
import GemstoneCard from './GemstoneCard';

export default function GemstoneGrid() {
  return (
    <section id="gemstone-collection" className="bg-transparent py-16 md:py-24">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <h2>Our <span>Gemstone</span> Collection</h2>
          <p>
            Each gemstone is selected and energized under Vedic principles to align with your planetary periods. Browse the nine primary gems commonly recommended by our astrologer.
          </p>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {gemstones.map((gem, index) => (
            <GemstoneCard key={gem.id} gemstone={gem} index={index} />
          ))}
        </div>

      </div>

      <style>{`
        /* Responsive custom grid fallback in case Tailwind isn't fully active for custom classes */
        .grid {
          display: grid;
        }
      `}</style>
    </section>
  );
}
