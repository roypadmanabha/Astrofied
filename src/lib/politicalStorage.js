import defaultPoliticalPredictions from '../data/politicalPredictions.json';

const POLITICAL_STORAGE_KEY = 'astrofied_political_predictions_data';
const POLITICAL_SYNC_EVENT = 'astrofied_political_sync';

/**
 * Get initial political predictions synchronously
 */
export function getInitialPoliticalPredictionsSync() {
  try {
    const cached = localStorage.getItem(POLITICAL_STORAGE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // ignore
  }
  return defaultPoliticalPredictions;
}

/**
 * Fetch political predictions asynchronously (API -> localStorage -> default)
 */
export async function getPoliticalPredictions() {
  // 1. Try API
  try {
    const res = await fetch('/api/political', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        try {
          localStorage.setItem(POLITICAL_STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
          console.warn('Could not cache political predictions in localStorage:', e);
        }
        return data;
      }
    }
  } catch {
    // API not reachable
  }

  // 2. Fallback to localStorage
  try {
    const cached = localStorage.getItem(POLITICAL_STORAGE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // ignore
  }

  return defaultPoliticalPredictions;
}

/**
 * Save political predictions list
 */
export async function savePoliticalPredictions(predictions) {
  if (!Array.isArray(predictions)) return false;

  // 1. Save to localStorage immediately
  try {
    localStorage.setItem(POLITICAL_STORAGE_KEY, JSON.stringify(predictions));
  } catch (e) {
    console.warn('Error saving political predictions to localStorage:', e);
  }

  // 2. Dispatch live sync event for immediate auto-population across open pages
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(POLITICAL_SYNC_EVENT, { detail: predictions }));
  }

  // 3. Persist to API
  try {
    const res = await fetch('/api/political', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(predictions)
    });
    return res.ok;
  } catch (e) {
    console.error('Failed to save to /api/political:', e);
    return false;
  }
}

/**
 * Subscribe to real-time sync events
 */
export function subscribeToPolitical(callback) {
  if (typeof window === 'undefined') return () => {};

  const handleCustomSync = (e) => {
    if (e.detail && Array.isArray(e.detail)) {
      callback(e.detail);
    }
  };

  const handleStorageEvent = (e) => {
    if (e.key === POLITICAL_STORAGE_KEY && e.newValue) {
      try {
        const parsed = JSON.parse(e.newValue);
        if (Array.isArray(parsed)) {
          callback(parsed);
        }
      } catch {
        // ignore
      }
    }
  };

  window.addEventListener(POLITICAL_SYNC_EVENT, handleCustomSync);
  window.addEventListener('storage', handleStorageEvent);

  return () => {
    window.removeEventListener(POLITICAL_SYNC_EVENT, handleCustomSync);
    window.removeEventListener('storage', handleStorageEvent);
  };
}
