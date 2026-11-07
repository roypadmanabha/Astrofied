import initialData from '../data/newsfied.json';

const STORAGE_KEY = 'astrofied_newsfied_posts';
const SYNC_EVENT = 'astrofied_newsfied_sync';

/**
 * Returns the current date and time formatted in Indian Standard Time (IST).
 * Example: "03 Nov 2026 • 10:35 AM IST"
 */
export function getCurrentISTFormatted(date = new Date()) {
  try {
    const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
    const datePart = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(d);

    const timePart = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(d);

    return `${datePart} • ${timePart.toUpperCase()} IST`;
  } catch {
    return 'LIVE IST';
  }
}

/**
 * Synchronous initial getter to prevent UI flicker on initial render
 */
export function getInitialPostsSync() {
  try {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached !== null) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // ignore
  }
  return initialData || [];
}

/**
 * Normalizes and resolves Newsfied image URLs safely across routes (e.g., /admin, /#newsfied).
 */
export function getNewsfiedImageUrl(imagePath) {
  if (!imagePath || typeof imagePath !== 'string') return '';
  const trimmed = imagePath.trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('data:') || trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  // Strip any leading ./ or /
  const clean = trimmed.replace(/^(\.\/|\/)+/, '');
  return `/${clean}`;
}

/**
 * Get all Newsfied posts. Tries local API first, falls back to localStorage, then bundled JSON.
 */
export async function getNewsfiedPosts() {
  // Try fetching from local API endpoint
  try {
    const res = await fetch('/api/newsfied', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
          console.warn('Could not cache posts in localStorage:', e);
        }
        return data;
      }
    }
  } catch {
    // API not available, proceed to fallback
  }

  // Fallback to localStorage
  try {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached !== null) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch {
    // Parsing error
  }

  // Default to bundled initial data
  return initialData || [];
}

/**
 * Publish a new update to Newsfied.
 */
export async function publishNewsfiedPost(newPost) {
  const post = {
    id: newPost.id || `news_${Date.now()}`,
    title: newPost.title.trim(),
    content: newPost.content.trim(),
    image: newPost.image || '',
    gradient: newPost.gradient || 'from-[#fbb034] via-[#ff9900] to-[#ff5e36]',
    istFormatted: newPost.istFormatted || getCurrentISTFormatted(),
    timestamp: Date.now(),
    badge: newPost.badge || 'LIVE UPDATE',
  };

  // Try API post first to persist and get server-saved image URL
  let savedViaApi = false;
  try {
    const res = await fetch('/api/newsfied', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.post) {
        if (data.post.image) post.image = data.post.image;
        savedViaApi = true;
      }
    }
  } catch {
    // API failed, continue with local storage
  }

  // Update localStorage with normalized image URL
  try {
    const cached = localStorage.getItem(STORAGE_KEY);
    let list = cached ? JSON.parse(cached) : [...initialData];
    list = [post, ...list.filter((p) => p.id !== post.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent(SYNC_EVENT, { detail: list }));
    return { success: true, post, savedViaApi };
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
    return { success: true, post, savedViaApi, warning: err.message };
  }
}

/**
 * Delete a post from Newsfied.
 */
export async function deleteNewsfiedPost(postId) {
  // Try API delete
  try {
    await fetch(`/api/newsfied/${postId}`, { method: 'DELETE' });
  } catch {
    // Continue
  }

  // Always update localStorage
  try {
    const cached = localStorage.getItem(STORAGE_KEY);
    let list = cached !== null ? JSON.parse(cached) : [...initialData];
    const updated = list.filter((p) => String(p.id) !== String(postId));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(SYNC_EVENT, { detail: updated }));
    return { success: true, count: updated.length };
  } catch (err) {
    console.error('Failed to delete post:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Update the image of an existing post.
 */
export async function updateNewsfiedPostImage(postId, newImage) {
  let finalImage = newImage;

  // Try API update to persist to file system
  try {
    const res = await fetch(`/api/newsfied/${postId}/image`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: newImage }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.image) {
        finalImage = data.image;
      }
    }
  } catch (e) {
    console.warn('API image update failed, falling back to client storage:', e);
  }

  // Update localStorage safely
  try {
    const cached = localStorage.getItem(STORAGE_KEY);
    let list = cached !== null ? JSON.parse(cached) : [...initialData];
    const updated = list.map((p) => {
      if (String(p.id) === String(postId)) {
        return { ...p, image: finalImage };
      }
      return p;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(SYNC_EVENT, { detail: updated }));
    return { success: true, image: finalImage };
  } catch (err) {
    console.error('Failed to update post image in localStorage:', err);
    return { success: true, image: finalImage };
  }
}

/**
 * Update an existing post in Newsfied (text, title, badge, timestamp, image).
 */
export async function updateNewsfiedPost(postId, updatedFields) {
  let updatedPost = { ...updatedFields, id: postId };

  // Try API update first
  let savedViaApi = false;
  try {
    const res = await fetch(`/api/newsfied/${postId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedFields),
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.post) {
        updatedPost = data.post;
        savedViaApi = true;
      }
    }
  } catch (e) {
    console.warn('API update failed, updating local client storage:', e);
  }

  // Update localStorage safely
  try {
    const cached = localStorage.getItem(STORAGE_KEY);
    let list = cached !== null ? JSON.parse(cached) : [...initialData];
    list = list.map((p) => {
      if (String(p.id) === String(postId)) {
        return { ...p, ...updatedPost };
      }
      return p;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent(SYNC_EVENT, { detail: list }));
    return { success: true, post: updatedPost, savedViaApi };
  } catch (err) {
    console.error('Failed to update post in localStorage:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Subscribe to Newsfied updates (across components and tabs).
 */
export function subscribeToNewsfied(callback) {
  const handleCustomSync = (e) => {
    if (e.detail) callback(e.detail);
  };
  const handleStorageSync = (e) => {
    if (e.key === STORAGE_KEY && e.newValue) {
      try {
        callback(JSON.parse(e.newValue));
      } catch {
        // ignore
      }
    }
  };

  window.addEventListener(SYNC_EVENT, handleCustomSync);
  window.addEventListener('storage', handleStorageSync);

  return () => {
    window.removeEventListener(SYNC_EVENT, handleCustomSync);
    window.removeEventListener('storage', handleStorageSync);
  };
}
