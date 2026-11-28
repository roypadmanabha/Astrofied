import { upcomingForecasts as defaultUpcoming } from '../data/futureForecastsData';

export const FORECASTS_STORAGE_KEY = 'astrofied_future_forecasts_data';
export const FORECASTS_SYNC_EVENT = 'astrofied_future_forecasts_sync';

export const defaultForecastsData = {
  upcomingForecasts: defaultUpcoming,
};

/**
 * Get initial forecasts data synchronously from localStorage or bundled defaults
 */
export function getInitialForecastsDataSync() {
  try {
    const cached = localStorage.getItem(FORECASTS_STORAGE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed && Array.isArray(parsed.upcomingForecasts)) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Could not read cached forecasts data:', err);
  }
  return defaultForecastsData;
}

/**
 * Asynchronously fetch forecasts data (tries API first, then localStorage, then default)
 */
export async function getForecastsData() {
  try {
    const res = await fetch('/api/forecasts', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.upcomingForecasts)) {
        try {
          localStorage.setItem(FORECASTS_STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
          console.warn('Could not cache forecasts data:', e);
        }
        return data;
      }
    }
  } catch {
    // API not available, proceed to localStorage
  }

  return getInitialForecastsDataSync();
}

/**
 * Save forecasts data to localStorage and broadcast sync event
 */
export async function saveForecastsData(data) {
  if (!data || !Array.isArray(data.upcomingForecasts)) {
    throw new Error('Invalid forecasts data format');
  }

  // 1. Save to localStorage
  try {
    localStorage.setItem(FORECASTS_STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save forecasts data to localStorage:', err);
  }

  // 2. Broadcast local sync event
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent(FORECASTS_SYNC_EVENT, { detail: data })
    );
  }

  // 3. Attempt API post if server endpoint exists
  try {
    await fetch('/api/forecasts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  } catch {
    // Localhost / standalone client mode
  }

  return data;
}
