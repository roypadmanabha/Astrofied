import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';

/**
 * ProtectedCanvasImage
 * Renders proprietary images as raw canvas pixels without exposing an <img> tag in the DOM.
 * Prevents direct URL inspection, dragging, right-click saving, and direct asset linking.
 */
const ProtectedCanvasImage = forwardRef(function ProtectedCanvasImage(
  {
    src,
    alt = '',
    className = '',
    style = {},
    aspectRatio,
    onLoaded,
    ...props
  },
  forwardedRef
) {
  const internalRef = useRef(null);
  useImperativeHandle(forwardedRef, () => internalRef.current);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!src) return;
    let isCurrent = true;

    const img = new Image();
    img.decoding = 'async';
    img.src = src;

    const render = () => {
      if (!isCurrent) return;
      const canvas = internalRef.current;
      if (!canvas) return;

      const width = img.naturalWidth || img.width || 800;
      const height = img.naturalHeight || img.height || 600;

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d', { alpha: true });
      if (ctx) {
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        setIsReady(true);
        if (onLoaded) onLoaded();
      }
    };

    if (img.complete && img.naturalWidth > 0) {
      render();
    } else {
      img.onload = render;
    }

    return () => {
      isCurrent = false;
    };
  }, [src, onLoaded]);

  return (
    <canvas
      ref={internalRef}
      role="img"
      aria-label={alt}
      className={`select-none pointer-events-none transition-opacity duration-300 ${
        isReady ? 'opacity-100' : 'opacity-0'
      } ${className}`}
      style={{
        display: 'block',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
        ...(aspectRatio ? { aspectRatio } : {}),
        ...style,
      }}
      onContextMenu={(e) => e.preventDefault()}
      {...props}
    />
  );
});

export default ProtectedCanvasImage;
