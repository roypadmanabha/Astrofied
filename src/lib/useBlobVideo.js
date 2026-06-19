import { useState, useEffect } from 'react';

/**
 * Custom React hook to fetch static video assets and expose them as client-side Blob URLs.
 * Obscures static source paths and tracks download/buffering progress.
 *
 * @param {string} videoSrc - The static video source URL
 * @returns {object} { blobUrl, progress, isLoading, error }
 */
export const useBlobVideo = (videoSrc) => {
  const [blobUrl, setBlobUrl] = useState('');
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!videoSrc) {
      setIsLoading(false);
      return;
    }

    let active = true;
    let createdUrl = '';

    const loadVideo = async () => {
      try {
        setIsLoading(true);
        setProgress(0);
        setError(null);

        const response = await fetch(videoSrc);
        if (!response.ok) {
          throw new Error(`Failed to fetch video: ${response.statusText}`);
        }

        const contentLength = response.headers.get('content-length');
        const total = contentLength ? parseInt(contentLength, 10) : 0;

        // Fallback for browsers that don't support stream readers
        if (!response.body || typeof response.body.getReader !== 'function') {
          const blob = await response.blob();
          if (active) {
            createdUrl = URL.createObjectURL(blob);
            setBlobUrl(createdUrl);
            setIsLoading(false);
          }
          return;
        }

        const reader = response.body.getReader();
        let loaded = 0;
        const chunks = [];

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          if (!active) {
            reader.cancel();
            return;
          }

          chunks.push(value);
          loaded += value.length;

          if (total > 0) {
            setProgress(Math.round((loaded / total) * 100));
          }
        }

        const blob = new Blob(chunks, { type: 'video/mp4' });
        createdUrl = URL.createObjectURL(blob);

        if (active) {
          setBlobUrl(createdUrl);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Error loading video as blob:', err);
        if (active) {
          setError(err.message);
          setIsLoading(false);
          // Fallback to the original source link if blob loading fails,
          // ensuring the video player doesn't break
          setBlobUrl(videoSrc);
        }
      }
    };

    loadVideo();

    return () => {
      active = false;
      if (createdUrl) {
        URL.revokeObjectURL(createdUrl);
      }
    };
  }, [videoSrc]);

  return { blobUrl, progress, isLoading, error };
};
