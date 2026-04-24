import { useEffect, useRef, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * RainEffect — A performant, GPU-accelerated canvas-based rain effect
 * that renders elegant falling raindrops across the entire page.
 *
 * Features:
 * - Multiple raindrop layers for parallax depth
 * - Subtle splash particles on impact
 * - Theme-aware: gold/silver tones in dark mode, indigo/lavender in light mode
 * - Gentle wind sway for organic feel
 * - Performance-optimized with object pooling
 */
export default function RainEffect() {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const dropsRef = useRef([]);
  const splashesRef = useRef([]);
  const { isDarkMode } = useTheme();

  const DROP_COUNT = 120; // Total raindrops

  const createDrop = useCallback((width, height, forceTop = false) => {
    const layer = Math.random(); // 0 = far background, 1 = foreground
    const speed = 2 + layer * 5; // Far drops slower, near drops faster
    const length = 8 + layer * 18; // Far drops shorter
    const opacity = 0.08 + layer * 0.22; // Far drops more transparent

    return {
      x: Math.random() * width,
      y: forceTop ? -(Math.random() * height * 0.3) : Math.random() * height,
      speed,
      length,
      opacity,
      layer,
      width: 0.5 + layer * 1, // Thinner for far, thicker for near
      wind: Math.sin(Date.now() * 0.0003) * 0.5, // Gentle wind
      drift: (Math.random() - 0.5) * 0.3, // Slight random horizontal drift
    };
  }, []);

  const createSplash = useCallback((x, y, isDark) => {
    const particles = [];
    const count = 2 + Math.floor(Math.random() * 3);
    for (let i = 0; i < count; i++) {
      const angle = -Math.PI * 0.2 - Math.random() * Math.PI * 0.6; // Upward arc
      const speed = 0.5 + Math.random() * 1.5;
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 12 + Math.random() * 10,
        size: 0.5 + Math.random() * 1,
        opacity: 0.3 + Math.random() * 0.3,
      });
    }
    return particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let width, height;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Recreate drops on resize
      const drops = [];
      for (let i = 0; i < DROP_COUNT; i++) {
        drops.push(createDrop(width, height, false));
      }
      dropsRef.current = drops;
      splashesRef.current = [];
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const dark = isDarkMode;

      // --- Draw Raindrops ---
      const drops = dropsRef.current;
      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];

        // Update position
        const windOffset = Math.sin(Date.now() * 0.0002 + drop.x * 0.01) * 0.6;
        drop.x += windOffset + drop.drift;
        drop.y += drop.speed;

        // If drop goes below viewport, recycle it
        if (drop.y > height + 10) {
          // Create splash at impact point (only for nearer drops)
          if (drop.layer > 0.4 && Math.random() < 0.4) {
            const splash = createSplash(drop.x, height - 2, dark);
            splashesRef.current.push(...splash);
          }
          // Reset drop to top
          Object.assign(drop, createDrop(width, height, true));
          drop.y = -(Math.random() * 50);
        }

        // Wrap horizontally
        if (drop.x < -10) drop.x = width + 10;
        if (drop.x > width + 10) drop.x = -10;

        // Draw the raindrop as a thin line with gradient
        const endY = drop.y + drop.length;

        // Color based on theme
        let r, g, b;
        if (dark) {
          // Gold / silver tones for dark mode
          if (drop.layer > 0.7) {
            r = 212; g = 195; b = 120; // Warm gold
          } else if (drop.layer > 0.4) {
            r = 180; g = 200; b = 220; // Cool silver
          } else {
            r = 150; g = 165; b = 185; // Faint blue-grey
          }
        } else {
          // Indigo / lavender tones for light mode
          if (drop.layer > 0.7) {
            r = 100; g = 80; b = 160; // Deep indigo
          } else if (drop.layer > 0.4) {
            r = 130; g = 120; b = 180; // Lavender
          } else {
            r = 160; g = 155; b = 200; // Soft violet-grey
          }
        }

        const grad = ctx.createLinearGradient(drop.x, drop.y, drop.x, endY);
        grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
        grad.addColorStop(0.3, `rgba(${r}, ${g}, ${b}, ${drop.opacity * 0.6})`);
        grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, ${drop.opacity})`);

        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x + windOffset * 0.3, endY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = drop.width;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Subtle glow at the tip for foreground drops
        if (drop.layer > 0.7) {
          ctx.beginPath();
          ctx.arc(drop.x + windOffset * 0.3, endY, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${drop.opacity * 0.5})`;
          ctx.fill();
        }
      }

      // --- Draw Splashes ---
      const splashes = splashesRef.current;
      for (let i = splashes.length - 1; i >= 0; i--) {
        const p = splashes[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08; // Gravity

        const progress = p.life / p.maxLife;
        const alpha = p.opacity * (1 - progress);

        if (p.life >= p.maxLife || alpha <= 0) {
          splashes.splice(i, 1);
          continue;
        }

        let sr, sg, sb;
        if (dark) {
          sr = 212; sg = 195; sb = 140;
        } else {
          sr = 120; sg = 100; sb = 170;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 - progress * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${sr}, ${sg}, ${sb}, ${alpha})`;
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      window.removeEventListener('resize', resize);
    };
  }, [isDarkMode, createDrop, createSplash]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    />
  );
}
