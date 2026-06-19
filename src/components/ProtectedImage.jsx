import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * ProtectedImage component that fetches image assets as Blobs, 
 * draws them onto an HTML5 <canvas> element to obscure the source path,
 * and adds an invisible right-click/drag protection overlay.
 * 
 * By rendering to a canvas instead of an <img> tag, browser DevTools
 * cannot display hover previews or expose a copyable URL.
 */
const ProtectedImage = ({
  src,
  alt = '',
  className = '',
  style = {},
  wrapperClassName = '',
  wrapperStyle = {},
  overlayClassName = '',
  animate,
  transition,
  initial,
  whileInView,
  viewport,
  loading = 'lazy', // unused by canvas but captured to prevent React DOM warnings
  ...props
}) => {
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!src) {
      setIsLoading(false);
      return;
    }

    let active = true;
    let createdUrl = '';

    const loadImageToCanvas = async () => {
      try {
        const response = await fetch(src);
        if (!response.ok) throw new Error(`HTTP error ${response.status}`);
        const blob = await response.blob();
        createdUrl = URL.createObjectURL(blob);

        const img = new Image();
        img.src = createdUrl;
        img.onload = () => {
          if (!active) return;
          const canvas = canvasRef.current;
          if (canvas) {
            const ctx = canvas.getContext('2d');
            
            // Match canvas drawing buffer resolution to image intrinsic size
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
          }
          setIsLoading(false);
          // Revoke URL immediately as the pixel data is now in the canvas buffer
          URL.revokeObjectURL(createdUrl);
          createdUrl = '';
        };
        img.onerror = () => {
          throw new Error('Image loading failed');
        };
      } catch (err) {
        console.error('Error drawing image to canvas:', err);
        // Fallback to static URL drawing if fetch fails
        const img = new Image();
        img.src = src;
        img.onload = () => {
          if (!active) return;
          const canvas = canvasRef.current;
          if (canvas) {
            const ctx = canvas.getContext('2d');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            ctx.drawImage(img, 0, 0);
          }
          setIsLoading(false);
        };
        img.onerror = () => {
          if (active) setIsLoading(false);
        };
      }
    };

    loadImageToCanvas();

    return () => {
      active = false;
      if (createdUrl) {
        URL.revokeObjectURL(createdUrl);
      }
    };
  }, [src]);

  return (
    <div 
      className={`relative overflow-hidden ${wrapperClassName}`}
      style={{ display: 'inline-block', width: '100%', height: '100%', ...wrapperStyle }}
    >
      <motion.canvas
        ref={canvasRef}
        aria-label={alt}
        role="img"
        className={`${className} ${isLoading ? 'invisible' : 'w-full h-full object-cover'}`}
        style={{ display: 'block', ...style }}
        animate={animate}
        transition={transition}
        initial={initial}
        whileInView={whileInView}
        viewport={viewport}
        {...props}
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[2px] animate-pulse">
          <div className="w-5 h-5 border-2 border-[#ffd700]/30 border-t-[#ffd700] rounded-full animate-spin" />
        </div>
      )}
      {/* Invisible overlay */}
      <div className={`absolute inset-0 z-10 bg-transparent media-protection-overlay ${overlayClassName}`} />
    </div>
  );
};

export default ProtectedImage;
