import defaultRashifal from '../data/weeklyRashifal.json';

const RASHIFAL_STORAGE_KEY = 'astrofied_weekly_rashifal_data';
const RASHIFAL_SYNC_EVENT = 'astrofied_weekly_rashifal_sync';

/**
 * Get the current weekly rashifal data synchronously from cache or fallback
 */
export function getInitialWeeklyRashifalSync() {
  try {
    const cached = localStorage.getItem(RASHIFAL_STORAGE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed && Array.isArray(parsed.rashis) && parsed.rashis.length === 12) {
        return parsed;
      }
    }
  } catch {
    // ignore
  }
  return defaultRashifal;
}

/**
 * Fetch weekly rashifal asynchronously (tries API first, then localStorage, then bundled)
 */
export async function getWeeklyRashifal() {
  // Try local API endpoint
  try {
    const res = await fetch('/api/rashifal', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.rashis) && data.rashis.length === 12) {
        try {
          localStorage.setItem(RASHIFAL_STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
          console.warn('Could not cache rashifal in localStorage:', e);
        }
        return data;
      }
    }
  } catch {
    // API not reachable
  }

  // Fallback to localStorage
  try {
    const cached = localStorage.getItem(RASHIFAL_STORAGE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed && Array.isArray(parsed.rashis) && parsed.rashis.length === 12) {
        return parsed;
      }
    }
  } catch {
    // parse error
  }

  return defaultRashifal;
}

/**
 * Save updated weekly rashifal data to API and localStorage
 */
export async function saveWeeklyRashifal(updatedData) {
  const payload = {
    ...updatedData,
    lastUpdated: updatedData.lastUpdated || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST'
  };

  let savedViaApi = false;
  try {
    const res = await fetch('/api/rashifal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      savedViaApi = true;
    }
  } catch (e) {
    console.warn('API save failed, persisting locally:', e);
  }

  try {
    localStorage.setItem(RASHIFAL_STORAGE_KEY, JSON.stringify(payload));
    window.dispatchEvent(new CustomEvent(RASHIFAL_SYNC_EVENT, { detail: payload }));
    return { success: true, savedViaApi, data: payload };
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Subscribe to real-time sync across components
 */
export function subscribeToWeeklyRashifal(callback) {
  const handler = (e) => {
    if (e.detail) callback(e.detail);
  };
  window.addEventListener(RASHIFAL_SYNC_EVENT, handler);
  return () => window.removeEventListener(RASHIFAL_SYNC_EVENT, handler);
}
