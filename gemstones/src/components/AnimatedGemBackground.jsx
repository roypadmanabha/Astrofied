import React from 'react';

/**
 * TECHNICAL CHOICE JUSTIFICATION: CSS 3D vs WebGL (Three.js/React Three Fiber)
 *
 * We chose CSS 3D transforms and SVG-based gem shapes instead of a WebGL/Three.js render loop.
 * Why:
 * 1. Zero additional JS bundle size impact (no Three.js, React Three Fiber, or Drei dependencies needed).
 * 2. Excellent performance (60fps) using GPU-accelerated CSS `transform` and `opacity` properties,
 *    preventing CPU/GPU power consumption overhead.
 * 3. Immediate rendering of the critical hero text content without blocking the main thread.
 * 4. Lightweight implementation using standard browser APIs, which respects prefers-reduced-motion out of the box.
 */

export default function AnimatedGemBackground() {
  return (
    <div 
      className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden" 
      aria-hidden="true"
      style={{ perspective: '1000px' }}
    >
      <style>{`
        /* SPECULAR GLINT SWEEP */
        @keyframes glint-sweep {
          0% { transform: translate(-120px, -120px) rotate(45deg); }
          15%, 100% { transform: translate(120px, 120px) rotate(45deg); }
        }

        .glint-path {
          animation: glint-sweep 12s ease-in-out infinite;
          transform-origin: center;
        }

        /* 3D AXIS ROTATIONS */
        @keyframes rotate-3d-ruby {
          0% { transform: rotateY(0deg) rotateX(10deg) rotateZ(5deg); }
          50% { transform: rotateY(180deg) rotateX(-10deg) rotateZ(-5deg); }
          100% { transform: rotateY(360deg) rotateX(10deg) rotateZ(5deg); }
        }
        @keyframes rotate-3d-sapphire {
          0% { transform: rotateY(360deg) rotateX(-8deg) rotateZ(-10deg); }
          50% { transform: rotateY(180deg) rotateX(8deg) rotateZ(10deg); }
          100% { transform: rotateY(0deg) rotateX(-8deg) rotateZ(-10deg); }
        }
        @keyframes rotate-3d-emerald {
          0% { transform: rotateY(0deg) rotateX(12deg) rotateZ(-5deg); }
          50% { transform: rotateY(-180deg) rotateX(-12deg) rotateZ(5deg); }
          100% { transform: rotateY(-360deg) rotateX(12deg) rotateZ(-5deg); }
        }
        @keyframes rotate-3d-topaz {
          0% { transform: rotateY(0deg) rotateX(-15deg) rotateZ(8deg); }
          50% { transform: rotateY(180deg) rotateX(15deg) rotateZ(-8deg); }
          100% { transform: rotateY(360deg) rotateX(-15deg) rotateZ(8deg); }
        }
        @keyframes rotate-3d-amethyst {
          0% { transform: rotateY(360deg) rotateX(5deg) rotateZ(0deg); }
          50% { transform: rotateY(180deg) rotateX(-5deg) rotateZ(10deg); }
          100% { transform: rotateY(0deg) rotateX(5deg) rotateZ(0deg); }
        }
        @keyframes rotate-3d-pearl {
          0% { transform: rotateY(0deg) rotateX(8deg) rotateZ(-8deg); }
          50% { transform: rotateY(-180deg) rotateX(-8deg) rotateZ(8deg); }
          100% { transform: rotateY(-360deg) rotateX(8deg) rotateZ(-8deg); }
        }

        /* FLOATING DRIFT LOOPS */
        @keyframes drift-ruby {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(15px, -10px); }
        }
        @keyframes drift-sapphire {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-20px, -15px); }
        }
        @keyframes drift-emerald {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(10px, 15px); }
        }
        @keyframes drift-topaz {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-15px, 12px); }
        }
        @keyframes drift-amethyst {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(8px, -15px); }
        }
        @keyframes drift-pearl {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-12px, 15px); }
        }

        /* DEFAULT RESPONSIVE SIZES */
        .gem-container {
          position: absolute;
          filter: blur(0.5px);
          backface-visibility: hidden;
        }

        @media (prefers-reduced-motion: no-preference) {
          .anim-drift-ruby { animation: drift-ruby 18s ease-in-out infinite; }
          .anim-rotate-ruby { animation: rotate-3d-ruby 16s linear infinite; }
          
          .anim-drift-sapphire { animation: drift-sapphire 22s ease-in-out infinite; }
          .anim-rotate-sapphire { animation: rotate-3d-sapphire 18s linear infinite; }

          .anim-drift-emerald { animation: drift-emerald 20s ease-in-out infinite; }
          .anim-rotate-emerald { animation: rotate-3d-emerald 14s linear infinite; }

          .anim-drift-topaz { animation: drift-topaz 24s ease-in-out infinite; }
          .anim-rotate-topaz { animation: rotate-3d-topaz 20s linear infinite; }

          .anim-drift-amethyst { animation: drift-amethyst 21s ease-in-out infinite; }
          .anim-rotate-amethyst { animation: rotate-3d-amethyst 15s linear infinite; }

          .anim-drift-pearl { animation: drift-pearl 23s ease-in-out infinite; }
          .anim-rotate-pearl { animation: rotate-3d-pearl 17s linear infinite; }
        }

        /* ACCESSIBILITY: REDUCED MOTION */
        @media (prefers-reduced-motion: reduce) {
          .glint-path {
            transform: translate(15px, 15px) rotate(45deg);
            animation: none !important;
          }
        }
      `}</style>

      {/* Specular Glint Gradient definition shared by all gems */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="glint-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* 1. Ruby Red Gem (Left Center) */}
      <div 
        className="gem-container anim-drift-ruby top-[20%] left-[4%] sm:left-[8%] lg:left-[10%] w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 opacity-40 z-10"
      >
        <div className="anim-rotate-ruby w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
          <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_4px_12px_rgba(214,50,30,0.3)]">
            <defs>
              <clipPath id="ruby-clip">
                <polygon points="50,10 80,35 50,85 20,35" />
              </clipPath>
            </defs>
            <polygon points="50,10 20,35 50,35" fill="#E53E3E" />
            <polygon points="50,10 80,35 50,35" fill="#FC8181" />
            <polygon points="20,35 50,85 50,35" fill="#C53030" />
            <polygon points="80,35 50,85 50,35" fill="#9B2C2C" />
            <g clipPath="url(#ruby-clip)">
              <rect x="-50" y="-50" width="200" height="200" fill="url(#glint-grad)" className="glint-path" />
            </g>
          </svg>
        </div>
      </div>

      {/* 2. Blue Sapphire Gem (Top Right) */}
      <div 
        className="gem-container anim-drift-sapphire top-[15%] right-[4%] sm:right-[8%] lg:right-[12%] w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 opacity-35 z-10"
      >
        <div className="anim-rotate-sapphire w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
          <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_4px_12px_rgba(49,130,206,0.25)]">
            <defs>
              <clipPath id="sapphire-clip">
                <polygon points="50,10 85,35 85,65 50,90 15,65 15,35" />
              </clipPath>
            </defs>
            <polygon points="50,10 50,50 15,35" fill="#4299E1" />
            <polygon points="50,10 85,35 50,50" fill="#63B3ED" />
            <polygon points="85,35 85,65 50,50" fill="#3182CE" />
            <polygon points="85,65 50,90 50,50" fill="#2B6CB0" />
            <polygon points="50,90 15,65 50,50" fill="#2C5282" />
            <polygon points="15,65 15,35 50,50" fill="#1A365D" />
            <g clipPath="url(#sapphire-clip)">
              <rect x="-50" y="-50" width="200" height="200" fill="url(#glint-grad)" className="glint-path" style={{ animationDelay: '2.5s' }} />
            </g>
          </svg>
        </div>
      </div>

      {/* 3. Green Emerald Gem (Bottom Right) */}
      <div 
        className="gem-container anim-drift-emerald bottom-[12%] right-[8%] sm:right-[15%] lg:right-[20%] w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 opacity-40 z-10"
      >
        <div className="anim-rotate-emerald w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
          <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_4px_12px_rgba(72,187,120,0.25)]">
            <defs>
              <clipPath id="emerald-clip">
                <polygon points="30,15 70,15 85,30 85,70 70,85 30,85 15,70 15,30" />
              </clipPath>
            </defs>
            <polygon points="30,15 70,15 60,35 40,35" fill="#48BB78" />
            <polygon points="70,15 85,30 75,40 60,35" fill="#68D391" />
            <polygon points="85,30 85,70 65,60 75,40" fill="#38A169" />
            <polygon points="85,70 70,85 60,65 65,60" fill="#2F855A" />
            <polygon points="70,85 30,85 40,65 60,65" fill="#276749" />
            <polygon points="30,85 15,70 35,60 40,65" fill="#22543D" />
            <polygon points="15,70 15,30 35,40 35,60" fill="#1C4532" />
            <polygon points="15,30 30,15 40,35 35,40" fill="#2F855A" />
            <polygon points="40,35 60,35 65,40 65,60 60,65 40,65 35,60 35,40" fill="#9AE6B4" />
            <g clipPath="url(#emerald-clip)">
              <rect x="-50" y="-50" width="200" height="200" fill="url(#glint-grad)" className="glint-path" style={{ animationDelay: '4.8s' }} />
            </g>
          </svg>
        </div>
      </div>

      {/* 4. Golden Topaz Gem (Bottom Left) */}
      <div 
        className="gem-container anim-drift-topaz bottom-[15%] left-[6%] sm:left-[12%] lg:left-[18%] w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 opacity-35 z-10"
      >
        <div className="anim-rotate-topaz w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
          <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_4px_12px_rgba(236,151,31,0.25)]">
            <defs>
              <clipPath id="topaz-clip">
                <polygon points="50,15 85,75 15,75" />
              </clipPath>
            </defs>
            <polygon points="50,15 50,55 15,75" fill="#ED8936" />
            <polygon points="50,15 85,75 50,55" fill="#F6AD55" />
            <polygon points="15,75 85,75 50,55" fill="#C05621" />
            <polygon points="50,15 50,55 35,42" fill="#FFFFFF" opacity="0.2" />
            <polygon points="85,75 50,55 67,65" fill="#FFFFFF" opacity="0.1" />
            <g clipPath="url(#topaz-clip)">
              <rect x="-50" y="-50" width="200" height="200" fill="url(#glint-grad)" className="glint-path" style={{ animationDelay: '1.2s' }} />
            </g>
          </svg>
        </div>
      </div>

      {/* 5. Amethyst Purple Gem (Center Top - Hidden on smallest screens to avoid title overlap) */}
      <div 
        className="gem-container anim-drift-amethyst top-[6%] left-[45%] w-16 h-16 sm:w-20 sm:h-20 lg:w-22 lg:h-22 opacity-30 z-10 hidden sm:block"
      >
        <div className="anim-rotate-amethyst w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
          <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_4px_12px_rgba(159,122,234,0.2)]">
            <defs>
              <clipPath id="amethyst-clip">
                <polygon points="50,10 75,50 50,90 25,50" />
              </clipPath>
            </defs>
            <polygon points="50,10 50,50 25,50" fill="#9F7AEA" />
            <polygon points="50,10 75,50 50,50" fill="#B794F4" />
            <polygon points="75,50 50,90 50,50" fill="#76E4F7" style={{ fill: '#805AD5' }} />
            <polygon points="25,50 50,90 50,50" fill="#553C9A" />
            <polygon points="50,10 50,50 37.5,30" fill="#FFFFFF" opacity="0.25" />
            <g clipPath="url(#amethyst-clip)">
              <rect x="-50" y="-50" width="200" height="200" fill="url(#glint-grad)" className="glint-path" style={{ animationDelay: '3.6s' }} />
            </g>
          </svg>
        </div>
      </div>

      {/* 6. White Pearl Gem (Right Center - Hidden on tablet/mobile screens) */}
      <div 
        className="gem-container anim-drift-pearl top-[45%] right-[24%] w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 opacity-30 z-10 hidden lg:block"
      >
        <div className="anim-rotate-pearl w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
          <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_4px_12px_rgba(200,200,200,0.2)]">
            <defs>
              <clipPath id="pearl-clip">
                <circle cx="50" cy="50" r="38" />
              </clipPath>
            </defs>
            <circle cx="50" cy="50" r="38" fill="radial-gradient(circle at 35% 35%, #ffffff 0%, #e2e8f0 70%, #cbd5e1 100%)" style={{ fill: '#e2e8f0' }} />
            {/* Faceted look for pearl using overlay lines */}
            <path d="M50,12 L35,35 L65,35 Z" fill="#ffffff" opacity="0.4" />
            <path d="M35,35 L12,50 L35,65 Z" fill="#cbd5e1" opacity="0.3" />
            <path d="M65,35 L88,50 L65,65 Z" fill="#ffffff" opacity="0.2" />
            <path d="M35,65 L50,88 L65,65 Z" fill="#94a3b8" opacity="0.4" />
            <path d="M35,35 L50,50 L65,35 L50,12 Z" fill="#ffffff" opacity="0.6" />
            <path d="M35,65 L50,50 L65,65 L50,88 Z" fill="#cbd5e1" opacity="0.2" />
            <g clipPath="url(#pearl-clip)">
              <rect x="-50" y="-50" width="200" height="200" fill="url(#glint-grad)" className="glint-path" style={{ animationDelay: '5.5s' }} />
            </g>
          </svg>
        </div>
      </div>

    </div>
  );
}
