import { useEffect, useRef, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * StarfieldBg — A performant, GPU-accelerated canvas-based starfield
 * that renders a living night sky for dark mode.
 * 
 * Features:
 * - Multiple star layers for parallax depth
 * - Smooth twinkle animation per-star
 * - Subtle scroll-linked parallax shift
 * - Occasional gentle shooting stars
 * - Deep-space nebula color washes
 */
export default function StarfieldBg() {
    const canvasRef = useRef(null);
    const animFrameRef = useRef(null);
    const starsRef = useRef([]);
    const shootingStarsRef = useRef([]);
    const scrollYRef = useRef(0);
    const { isDarkMode } = useTheme();

    const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 1024;
    const STAR_COUNT_BASE = isMobileDevice ? 100 : 350; // heavily reduced for mobile

    const createStars = useCallback((width, height) => {
        // Scale star count based on viewport area
        const area = width * height;
        const desktopArea = 1920 * 1080;
        const scaleFactor = Math.max(0.4, Math.min(1.6, area / desktopArea));
        const count = Math.floor(STAR_COUNT_BASE * scaleFactor);

        const stars = [];
        for (let i = 0; i < count; i++) {
            const layer = Math.random(); // 0-1, determines depth
            const baseSize = layer < 0.5 ? 0.4 : layer < 0.85 ? 0.8 : 1.3;
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height * 3, // extend beyond viewport for scroll
                baseSize,
                size: baseSize,
                opacity: Math.random() * 0.5 + 0.3,
                twinkleSpeed: Math.random() * 0.015 + 0.005,
                twinklePhase: Math.random() * Math.PI * 2,
                layer, // 0 = far, 1 = near
                // Color: mostly white, some warm gold, some cool blue
                color: Math.random() < 0.7
                    ? { r: 255, g: 255, b: 255 }
                    : Math.random() < 0.5
                        ? { r: 255, g: 235, b: 180 } // warm gold
                        : { r: 180, g: 210, b: 255 }, // cool blue
            });
        }
        return stars;
    }, []);

    const createShootingStar = useCallback((width, height) => {
        return {
            x: Math.random() * width * 0.8,
            y: Math.random() * height * 0.5,
            length: Math.random() * 80 + 40,
            speed: Math.random() * 4 + 3,
            angle: (Math.PI / 6) + Math.random() * (Math.PI / 12), // roughly 30-45 degrees
            opacity: 1,
            life: 0,
            maxLife: 60 + Math.random() * 40,
        };
    }, []);

    useEffect(() => {
        if (!isDarkMode) {
            // Clean up if switching to light mode
            if (animFrameRef.current) {
                cancelAnimationFrame(animFrameRef.current);
                animFrameRef.current = null;
            }
            return;
        }

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true });
        let width, height;

        const resize = () => {
            const dpr = isMobileDevice ? 1 : Math.min(window.devicePixelRatio || 1, 2); // cap at 1x for mobile perf
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            // Recreate stars on resize
            starsRef.current = createStars(width, height);
        };

        resize();

        const handleScroll = () => {
            scrollYRef.current = window.scrollY || window.pageYOffset;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', resize, { passive: true });

        let frameCount = 0;

        const draw = () => {
            frameCount++;
            ctx.clearRect(0, 0, width, height);

            // Deep space gradient background
            const bgGrad = ctx.createRadialGradient(
                width * 0.5, height * 0.4, 0,
                width * 0.5, height * 0.4, Math.max(width, height)
            );
            bgGrad.addColorStop(0, '#0d0221');
            bgGrad.addColorStop(0.4, '#080118');
            bgGrad.addColorStop(0.7, '#05010d');
            bgGrad.addColorStop(1, '#020008');
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, width, height);

            // Only draw nebula on desktop
            if (!isMobileDevice) {
                const time = frameCount * 0.002;
                const nebulaX1 = width * (0.2 + Math.sin(time * 0.3) * 0.05);
                const nebulaY1 = height * (0.3 + Math.cos(time * 0.2) * 0.05);
                const nebula1 = ctx.createRadialGradient(nebulaX1, nebulaY1, 0, nebulaX1, nebulaY1, width * 0.4);
                nebula1.addColorStop(0, 'rgba(75, 0, 130, 0.06)');
                nebula1.addColorStop(0.5, 'rgba(75, 0, 130, 0.02)');
                nebula1.addColorStop(1, 'transparent');
                ctx.fillStyle = nebula1;
                ctx.fillRect(0, 0, width, height);

                const nebulaX2 = width * (0.8 + Math.cos(time * 0.25) * 0.05);
                const nebulaY2 = height * (0.7 + Math.sin(time * 0.35) * 0.05);
                const nebula2 = ctx.createRadialGradient(nebulaX2, nebulaY2, 0, nebulaX2, nebulaY2, width * 0.35);
                nebula2.addColorStop(0, 'rgba(212, 175, 55, 0.04)');
                nebula2.addColorStop(0.5, 'rgba(212, 175, 55, 0.01)');
                nebula2.addColorStop(1, 'transparent');
                ctx.fillStyle = nebula2;
                ctx.fillRect(0, 0, width, height);
            }

            // Draw stars with scroll parallax
            const scrollOffset = scrollYRef.current;
            const stars = starsRef.current;
            for (let i = 0; i < stars.length; i++) {
                const star = stars[i];

                // Twinkle
                star.twinklePhase += star.twinkleSpeed;
                const twinkle = Math.sin(star.twinklePhase);
                const currentOpacity = star.opacity + twinkle * 0.3;
                const currentSize = star.baseSize + twinkle * 0.2;

                if (currentOpacity <= 0) continue;

                // Parallax: only on desktop
                const parallaxFactor = isMobileDevice ? 0 : (0.02 + star.layer * 0.08);
                const drawY = ((star.y - scrollOffset * parallaxFactor) % (height * 3));
                const finalY = drawY < -10 ? drawY + height * 3 : drawY;

                // Only draw if in viewport (with margin)
                if (finalY < -5 || finalY > height + 5) continue;

                const { r, g, b } = star.color;
                const alpha = Math.max(0, Math.min(1, currentOpacity));

                // Glow for larger stars
                if (currentSize > 1) {
                    ctx.beginPath();
                    ctx.arc(star.x, finalY, currentSize * 2.5, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.08})`;
                    ctx.fill();
                }

                // Core star
                ctx.beginPath();
                ctx.arc(star.x, finalY, Math.max(0.2, currentSize), 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
                ctx.fill();
            }

            // Shooting stars
            if (Math.random() < 0.003 && shootingStarsRef.current.length < 2) {
                shootingStarsRef.current.push(createShootingStar(width, height));
            }

            for (let i = shootingStarsRef.current.length - 1; i >= 0; i--) {
                const ss = shootingStarsRef.current[i];
                ss.life++;
                ss.x += Math.cos(ss.angle) * ss.speed;
                ss.y += Math.sin(ss.angle) * ss.speed;

                // Fade in then out
                if (ss.life < 10) {
                    ss.opacity = ss.life / 10;
                } else if (ss.life > ss.maxLife - 20) {
                    ss.opacity = (ss.maxLife - ss.life) / 20;
                }

                if (ss.life >= ss.maxLife) {
                    shootingStarsRef.current.splice(i, 1);
                    continue;
                }

                const tailX = ss.x - Math.cos(ss.angle) * ss.length;
                const tailY = ss.y - Math.sin(ss.angle) * ss.length;

                const grad = ctx.createLinearGradient(ss.x, ss.y, tailX, tailY);
                grad.addColorStop(0, `rgba(255, 255, 255, ${ss.opacity * 0.9})`);
                grad.addColorStop(0.3, `rgba(212, 175, 55, ${ss.opacity * 0.4})`);
                grad.addColorStop(1, `rgba(255, 255, 255, 0)`);

                ctx.beginPath();
                ctx.moveTo(ss.x, ss.y);
                ctx.lineTo(tailX, tailY);
                ctx.strokeStyle = grad;
                ctx.lineWidth = 1.5;
                ctx.stroke();

                // Head glow
                ctx.beginPath();
                ctx.arc(ss.x, ss.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${ss.opacity * 0.8})`;
                ctx.fill();
            }

            animFrameRef.current = requestAnimationFrame(draw);
        };

        animFrameRef.current = requestAnimationFrame(draw);

        return () => {
            if (animFrameRef.current) {
                cancelAnimationFrame(animFrameRef.current);
            }
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', resize);
        };
    }, [isDarkMode, createStars, createShootingStar]);

    if (!isDarkMode) return null;

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: -1 }}
            aria-hidden="true"
        />
    );
}
