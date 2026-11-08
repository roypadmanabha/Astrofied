import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Upload, 
  Trash2, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Image as ImageIcon,
  RotateCw,
  Eye,
  Send,
  Sun,
  Moon,
  ShieldCheck,
  Camera,
  Edit3,
  Save,
  X
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { 
  getNewsfiedPosts, 
  publishNewsfiedPost, 
  updateNewsfiedPost,
  deleteNewsfiedPost, 
  updateNewsfiedPostImage,
  getCurrentISTFormatted,
  getNewsfiedImageUrl
} from '../lib/newsfiedStorage';
import defaultNewsImg from '../assets/newsfied-default.png';
import logo from '../assets/logo.png';
import NewsfiedEditorToolbar from './NewsfiedEditorToolbar';
import RichContent, { stripRichFormatting } from '../lib/renderRichContent';

const BADGE_PRESETS = [
  'LIVE UPDATE',
  'TRANSIT ALERT',
  'ANNOUNCEMENT',
  'MUHURTA',
  'FESTIVAL',
  'GENERAL'
];

export default function NewsfiedAdmin({ onBackToSite }) {
  const { isDarkMode, toggleTheme } = useTheme();

  // State for posts
  const [posts, setPosts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null); // { type: 'success' | 'error', message: '' }
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [updatingImagePostId, setUpdatingImagePostId] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);

  // Form State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [istFormatted, setIstFormatted] = useState(getCurrentISTFormatted());
  const [badge, setBadge] = useState('LIVE UPDATE');
  const [customBadge, setCustomBadge] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [previewTheme, setPreviewTheme] = useState('current'); // 'current' | 'light' | 'dark'
  const [editorTab, setEditorTab] = useState('write'); // 'write' | 'preview'

  // Verification that we are strictly running on localhost
  const isLocalhost = typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  // Load posts on mount
  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const data = await getNewsfiedPosts();
    setPosts(data || []);
  };

  const showToast = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3500);
  };

  // Image upload handler
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (JPEG, PNG, WebP).', 'error');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast('Image size exceeds 5MB. Please choose a smaller image.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      showToast('Image uploaded and preview ready!');
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview('');
  };

  const handleRefreshIST = () => {
    const nowIST = getCurrentISTFormatted();
    setIstFormatted(nowIST);
    showToast('Updated to current IST time: ' + nowIST);
  };

  // Submit new post
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('Please enter an update title / heading.', 'error');
      return;
    }
    if (!content.trim() || !stripRichFormatting(content).trim()) {
      showToast('Please enter update description / content.', 'error');
      return;
    }

    setIsSubmitting(true);
    const finalBadge = customBadge.trim() ? customBadge.trim().toUpperCase() : badge;

    const postPayload = {
      title: title.trim(),
      content: content.trim(),
      image: imagePreview || '',
      istFormatted: istFormatted.trim() || getCurrentISTFormatted(),
      badge: finalBadge,
    };

    try {
      if (editingPostId) {
        const res = await updateNewsfiedPost(editingPostId, postPayload);
        if (res.success) {
          showToast('Post updated and republished to live Newsfied!');
          handleCancelEdit();
          await loadPosts();
        } else {
          showToast(res.error || 'Failed to update post.', 'error');
        }
      } else {
        const res = await publishNewsfiedPost(postPayload);
        if (res.success) {
          showToast('Update posted LIVE to Newsfied successfully!');
          // Reset form
          setTitle('');
          setContent('');
          setImagePreview('');
          setCustomBadge('');
          setIstFormatted(getCurrentISTFormatted());
          await loadPosts();
        } else {
          showToast(res.error || 'Failed to post update.', 'error');
        }
      }
    } catch (err) {
      showToast(err.message || 'Error occurred.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Edit existing post handler
  const handleEditPost = (post) => {
    setEditingPostId(post.id);
    setTitle(post.title || '');
    setContent(post.content || '');
    setIstFormatted(post.istFormatted || getCurrentISTFormatted());
    setImagePreview(post.image ? getNewsfiedImageUrl(post.image) : '');
    if (BADGE_PRESETS.includes(post.badge)) {
      setBadge(post.badge);
      setCustomBadge('');
    } else {
      setBadge('GENERAL');
      setCustomBadge(post.badge || '');
    }
    setEditorTab('write');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Loaded "${(post.title || 'post').substring(0, 30)}..." into editor.`);
  };

  const handleCancelEdit = () => {
    setEditingPostId(null);
    setTitle('');
    setContent('');
    setImagePreview('');
    setCustomBadge('');
    setBadge('LIVE UPDATE');
    setIstFormatted(getCurrentISTFormatted());
    showToast('Edit mode closed. Form reset.');
  };

  // Delete post
  const handleDelete = async (postId) => {
    try {
      const res = await deleteNewsfiedPost(postId);
      if (res.success) {
        showToast('Update deleted from live page.');
        setDeleteConfirmId(null);
        await loadPosts();
      } else {
        showToast(res.error || 'Could not delete update.', 'error');
      }
    } catch (err) {
      showToast(err.message || 'Error occurred.', 'error');
    }
  };

  // Change / Edit image for an already posted update
  const handleImageEditForPost = (postId, file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file.', 'error');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast('Image size should be less than 5MB.', 'error');
      return;
    }

    setUpdatingImagePostId(postId);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target.result;
      try {
        const res = await updateNewsfiedPostImage(postId, base64);
        if (res.success) {
          showToast('Image updated successfully for live post!');
          await loadPosts();
        } else {
          showToast(res.error || 'Failed to update image.', 'error');
        }
      } catch (err) {
        showToast(err.message || 'Error occurred updating image.', 'error');
      } finally {
        setUpdatingImagePostId(null);
      }
    };
    reader.onerror = () => {
      showToast('Failed to read image file.', 'error');
      setUpdatingImagePostId(null);
    };
    reader.readAsDataURL(file);
  };

  const handleBack = () => {
    if (onBackToSite) {
      onBackToSite();
    } else {
      window.location.hash = 'newsfied';
    }
  };

  // Determine preview theme
  const isPreviewDark = previewTheme === 'current' ? isDarkMode : previewTheme === 'dark';

  if (!isLocalhost) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-black text-white text-center font-mulish">
        <div className="max-w-md p-8 rounded-2xl border border-red-500/30 bg-red-950/20">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold font-nunito mb-2">Restricted Access</h1>
          <p className="text-sm opacity-80 mb-6">
            The Newsfied Admin Control Center is strictly internal and operates exclusively on localhost.
          </p>
          <button
            onClick={handleBack}
            className="px-6 py-2 rounded-xl bg-white text-black font-bold text-sm"
          >
            Return to Astrofied
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      data-lenis-prevent="true"
      className={`min-h-screen transition-colors duration-500 font-mulish ${
        isDarkMode ? 'bg-[#0A0A0A] text-white' : 'bg-[#FAF9F5] text-black'
      }`}
    >
      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <div className="fixed top-6 right-6 z-[99999] max-w-md select-none">
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border text-sm font-bold ${
                notification.type === 'error'
                  ? 'bg-red-600 border-red-400 text-white'
                  : 'bg-emerald-600 border-emerald-400 text-white'
              }`}
            >
              {notification.type === 'error' ? (
                <AlertCircle className="w-5 h-5 shrink-0" />
              ) : (
                <CheckCircle2 className="w-5 h-5 shrink-0" />
              )}
              <span>{notification.message}</span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Top Header Bar */}
      <header
        className={`sticky top-0 z-40 px-4 sm:px-8 py-3.5 border-b backdrop-blur-md transition-colors ${
          isDarkMode
            ? 'bg-[#0A0A0A]/90 border-white/10'
            : 'bg-[#FAF9F5]/90 border-black/10'
        }`}
      >
        <div className="container mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={handleBack}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-bold transition-all ${
                isDarkMode
                  ? 'border-white/20 hover:border-gold hover:text-gold bg-white/5'
                  : 'border-black/20 hover:border-[#A30000] hover:text-[#A30000] bg-black/5'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Live Website</span>
            </button>

            <div className="flex items-center gap-2">
              <img src={logo} alt="Astrofied" className="w-7 h-7 sm:w-8 sm:h-8 object-contain" />
              <div>
                <h1
                  className="text-base sm:text-lg font-nunito font-bold tracking-tight"
                  style={{ fontFamily: '"Nunito", sans-serif', fontWeight: 700 }}
                >
                  Newsfied <span className={isDarkMode ? 'text-gold' : 'text-[#A30000]'}>Admin</span>
                </h1>
                <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-500">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Internal Localhost Mode</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl border transition-all ${
                isDarkMode
                  ? 'border-white/20 text-gold hover:bg-white/5'
                  : 'border-black/20 text-[#A30000] hover:bg-black/5'
              }`}
              title="Toggle Light / Dark mode"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Dashboard */}
      <main className="container mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Create New Post Form (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div
              className={`p-5 sm:p-7 rounded-[24px] border shadow-xl transition-all ${
                isDarkMode ? 'bg-[#121212] border-white/10' : 'bg-white border-[#969000]/30'
              }`}
            >
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-black/10 dark:border-white/10">
                <div>
                  <h2
                    className="text-xl sm:text-2xl font-nunito font-bold tracking-tight"
                    style={{ fontFamily: '"Nunito", sans-serif', fontWeight: 700 }}
                  >
                    {editingPostId ? 'Edit Newsfied Update' : 'Create Newsfied Update'}
                  </h2>
                  <p className="text-xs sm:text-sm opacity-70">
                    {editingPostId
                      ? 'Editing existing post. Saved changes will update this live post directly.'
                      : 'Post real-time updates directly to the live site. Zero database, instant sync.'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {editingPostId && (
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-stone-500/10 hover:bg-stone-500/20 text-stone-400 border border-stone-500/30 transition-all"
                    >
                      Cancel Edit
                    </button>
                  )}
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      editingPostId
                        ? 'bg-amber-500/15 text-amber-500 border border-amber-500/30'
                        : 'bg-red-600/10 text-red-500 border border-red-500/20'
                    }`}
                  >
                    {editingPostId ? 'Editing Mode' : 'Live Post'}
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Title Input (Nunito Rounded) */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 opacity-80">
                    Update Title / Heading <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onPaste={(e) => e.stopPropagation()}
                    onKeyDown={(e) => e.stopPropagation()}
                    onCopy={(e) => e.stopPropagation()}
                    onCut={(e) => e.stopPropagation()}
                    placeholder="e.g., Key Astrological Transit: Sun enters Scorpio"
                    required
                    className={`w-full px-4 py-3 rounded-xl border text-sm sm:text-base font-nunito font-bold tracking-tight outline-none transition-all ${
                      isDarkMode
                        ? 'bg-black/40 border-white/20 focus:border-gold text-white'
                        : 'bg-[#FAF9F5] border-[#969000]/40 focus:border-[#A30000] text-black'
                    }`}
                    style={{ fontFamily: '"Nunito", sans-serif', fontWeight: 700 }}
                  />
                  <div className="flex justify-between text-[11px] opacity-60 mt-1">
                    <span>Formatted in Nunito Rounded</span>
                    <span>{title.length} characters</span>
                  </div>
                </div>

                {/* IST Date & Time Field with Refresh */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider opacity-80">
                      Date & IST Time <span className="text-red-500">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleRefreshIST}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-gold dark:text-gold text-[#A30000] hover:underline"
                    >
                      <RotateCw className="w-3 h-3" />
                      <span>Set to Current IST</span>
                    </button>
                  </div>
                  <div className="relative">
                    <Clock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 opacity-50 pointer-events-none" />
                    <input
                      type="text"
                      value={istFormatted}
                      onChange={(e) => setIstFormatted(e.target.value)}
                      onPaste={(e) => e.stopPropagation()}
                      onKeyDown={(e) => e.stopPropagation()}
                      onCopy={(e) => e.stopPropagation()}
                      onCut={(e) => e.stopPropagation()}
                      placeholder="e.g., 03 Nov 2026 • 10:30 AM IST"
                      required
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold outline-none ${
                        isDarkMode
                          ? 'bg-black/40 border-white/20 focus:border-gold text-white'
                          : 'bg-[#FAF9F5] border-[#969000]/40 focus:border-[#A30000] text-black'
                      }`}
                    />
                  </div>
                </div>

                {/* Badge / Category Pills */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 opacity-80">
                    Badge / Tag
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {BADGE_PRESETS.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => {
                          setBadge(b);
                          setCustomBadge('');
                        }}
                        className={`px-3 py-1 rounded-lg text-xs font-extrabold tracking-wider transition-all border ${
                          badge === b && !customBadge
                            ? 'bg-red-600 text-white border-red-500 shadow-md scale-105'
                            : isDarkMode
                            ? 'border-white/10 hover:border-white/30 text-white/70'
                            : 'border-black/10 hover:border-black/30 text-black/70'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={customBadge}
                    onChange={(e) => setCustomBadge(e.target.value)}
                    onPaste={(e) => e.stopPropagation()}
                    onKeyDown={(e) => e.stopPropagation()}
                    onCopy={(e) => e.stopPropagation()}
                    onCut={(e) => e.stopPropagation()}
                    placeholder="Or type a custom badge (e.g. BREAKING)"
                    className={`w-full px-3 py-1.5 rounded-lg border text-xs outline-none ${
                      isDarkMode
                        ? 'bg-black/40 border-white/10 focus:border-gold'
                        : 'bg-[#FAF9F5] border-[#969000]/30 focus:border-[#A30000]'
                    }`}
                  />
                </div>

                {/* Image Upload / Attachment */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 opacity-80">
                    Cover Image (Optional)
                  </label>

                  {imagePreview ? (
                    <div className="relative rounded-2xl overflow-hidden border border-gold/40 shadow-md aspect-square max-h-64 mx-auto bg-black flex items-center justify-center">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-contain"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-lg shadow-lg hover:bg-red-700 transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove Image</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <label
                        className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed cursor-pointer transition-all ${
                          isDarkMode
                            ? 'border-white/20 hover:border-gold bg-white/[0.02] hover:bg-white/[0.04]'
                            : 'border-[#969000]/40 hover:border-[#A30000] bg-black/[0.01] hover:bg-black/[0.03]'
                        }`}
                      >
                        <Upload className="w-8 h-8 opacity-60 mb-2" />
                        <span className="text-xs sm:text-sm font-bold">
                          Click to upload an image from your device
                        </span>
                        <span className="text-[11px] opacity-60 mt-1">
                          PNG, JPG, WebP (Max 5MB) • If no image is added, 'Newsfied default.png' will appear automatically.
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  )}
                </div>

                {/* Content / Subtext Input with WYSIWYG Rich Editor */}
                <div className="flex flex-col">
                  <NewsfiedEditorToolbar
                    content={content}
                    setContent={setContent}
                    isDarkMode={isDarkMode}
                    editorTab={editorTab}
                    setEditorTab={setEditorTab}
                  />
                </div>

                {/* Submit & Cancel Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex-1 py-4 rounded-xl font-black text-sm sm:text-base tracking-wider uppercase transition-all shadow-xl flex items-center justify-center gap-2 ${
                      isSubmitting
                        ? 'opacity-60 cursor-wait'
                        : editingPostId
                        ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white hover:brightness-110 active:scale-[0.99]'
                        : isDarkMode
                        ? 'bg-gradient-to-r from-red-600 via-yellow-500 to-gold text-black hover:brightness-110 active:scale-[0.99]'
                        : 'bg-[#A30000] text-white hover:bg-[#850000] active:scale-[0.99]'
                    }`}
                    style={{ fontFamily: '"Nunito", sans-serif' }}
                  >
                    {editingPostId ? <Save className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                    <span>
                      {isSubmitting
                        ? editingPostId
                          ? 'Updating Post...'
                          : 'Publishing...'
                        : editingPostId
                        ? 'Save & Repost to Live Newsfied'
                        : 'Post Update to Live Newsfied'}
                    </span>
                  </button>

                  {editingPostId && (
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="px-4 py-4 rounded-xl border border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 text-xs sm:text-sm font-bold uppercase transition-all shrink-0"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Live Card Preview + Active Updates List (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Real-time Card Preview Box */}
            <div
              className={`p-5 rounded-[24px] border shadow-xl transition-all ${
                isDarkMode ? 'bg-[#121212] border-white/10' : 'bg-white border-[#969000]/30'
              }`}
            >
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-black/10 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-gold dark:text-gold text-[#A30000]" />
                  <h3
                    className="text-sm font-nunito font-bold tracking-tight uppercase tracking-wider"
                    style={{ fontFamily: '"Nunito", sans-serif', fontWeight: 700 }}
                  >
                    Live Card Preview
                  </h3>
                </div>

                {/* Theme preview selector */}
                <div className="flex items-center gap-1 text-[11px] font-bold">
                  <button
                    type="button"
                    onClick={() => setPreviewTheme('light')}
                    className={`px-2 py-0.5 rounded ${
                      previewTheme === 'light' ? 'bg-[#A30000] text-white' : 'opacity-60'
                    }`}
                  >
                    Light
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewTheme('dark')}
                    className={`px-2 py-0.5 rounded ${
                      previewTheme === 'dark' ? 'bg-gold text-black' : 'opacity-60'
                    }`}
                  >
                    Dark
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewTheme('current')}
                    className={`px-2 py-0.5 rounded ${
                      previewTheme === 'current' ? 'bg-gray-500 text-white' : 'opacity-60'
                    }`}
                  >
                    Current
                  </button>
                </div>
              </div>

              {/* The Mocked Card */}
              <div
                className={`p-4 rounded-[20px] border transition-all duration-300 ${
                  isPreviewDark
                    ? 'bg-[#181818] border-white/10 text-white shadow-lg'
                    : 'bg-[#FFFFB0] border border-[#A30000] text-black shadow-md'
                }`}
              >
                {/* Image Banner (Square 1:1 shape) */}
                <div className={`w-full aspect-square rounded-[16px] overflow-hidden relative shadow-inner mb-3 bg-black/10 border ${
                  isPreviewDark ? 'border-[#ffd700]' : 'border-[#A30000]'
                }`}>
                  <img
                    src={getNewsfiedImageUrl(imagePreview) || defaultNewsImg}
                    alt="Preview"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = defaultNewsImg;
                    }}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-black/70 text-white backdrop-blur-sm">
                    {customBadge.trim() ? customBadge.toUpperCase() : badge}
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-1.5 text-xs font-semibold opacity-75 mb-1.5 font-mulish">
                  <Clock
                    className={`w-3.5 h-3.5 ${
                      isPreviewDark ? 'text-gold' : 'text-[#A30000]'
                    }`}
                  />
                  <span>{istFormatted || 'DATE & IST TIME'}</span>
                </div>

                {/* Title */}
                <h4
                  className={`text-base font-nunito font-bold tracking-tight leading-snug mb-2 ${
                    isPreviewDark ? 'text-gold' : 'text-[#A30000]'
                  }`}
                  style={{ fontFamily: '"Nunito", sans-serif', fontWeight: 700 }}
                >
                  {title.trim() || 'Headline will appear here...'}
                </h4>

                {/* Subtext */}
                <p
                  className="text-xs leading-relaxed opacity-90 font-mulish line-clamp-3 text-justify font-medium"
                  style={{ color: isPreviewDark ? '#E5E5E5' : '#111827' }}
                >
                  {stripRichFormatting(content) ||
                    'Your subtext / descriptive news update will be formatted here in Mulish font.'}
                </p>

                {/* Read More link */}
                <div className="mt-3 pt-3 border-t border-black/10 dark:border-white/5 flex items-center justify-between">
                  <span
                    className={`text-xs font-bold transition-all ${
                      isPreviewDark ? 'text-gold' : 'text-black'
                    }`}
                    style={{ fontFamily: '"Mulish", sans-serif' }}
                  >
                    Read full update →
                  </span>
                </div>
              </div>
            </div>

            {/* Manage / Delete Existing Updates */}
            <div
              className={`p-5 rounded-[24px] border shadow-xl transition-all ${
                isDarkMode ? 'bg-[#121212] border-white/10' : 'bg-white border-[#969000]/30'
              }`}
            >
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-black/10 dark:border-white/10">
                <h3
                  className="text-sm font-nunito font-bold tracking-tight uppercase tracking-wider"
                  style={{ fontFamily: '"Nunito", sans-serif', fontWeight: 700 }}
                >
                  Active Updates ({posts.length})
                </h3>
                <span className="text-xs opacity-60">Newest first</span>
              </div>

              <div
                data-lenis-prevent="true"
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                style={{ overscrollBehavior: 'contain' }}
                className="flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-1"
              >
                {posts.length === 0 ? (
                  <p className="text-xs opacity-60 text-center py-6">
                    No active updates found. Post one above!
                  </p>
                ) : (
                  posts.map((post) => (
                    <div
                      key={post.id}
                      className={`p-3 rounded-xl border flex items-start justify-between gap-3 transition-all ${
                        editingPostId === post.id
                          ? 'border-amber-500/80 bg-amber-500/10 ring-2 ring-amber-500/30'
                          : isDarkMode
                          ? 'bg-white/[0.03] border-white/10 hover:border-white/20'
                          : 'bg-black/[0.02] border-black/10 hover:border-black/20'
                      }`}
                    >
                      {/* Thumbnail with Click-to-Change-Image overlay */}
                      <label
                        title="Click to change/replace image"
                        className="relative group/thumb w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-black/20 cursor-pointer block border border-black/10 dark:border-white/10 hover:border-gold transition-all"
                      >
                        <img
                          src={getNewsfiedImageUrl(post.image) || defaultNewsImg}
                          alt={post.title}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = defaultNewsImg;
                          }}
                          className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform"
                        />

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/65 opacity-0 group-hover/thumb:opacity-100 flex flex-col items-center justify-center transition-opacity text-white">
                          <Camera className="w-4 h-4 text-gold drop-shadow" />
                          <span className="text-[8px] font-bold tracking-tight mt-0.5">Change</span>
                        </div>

                        {/* Loading Spinner */}
                        {updatingImagePostId === post.id && (
                          <div className="absolute inset-0 bg-black/75 flex items-center justify-center text-gold z-10">
                            <RotateCw className="w-4 h-4 animate-spin" />
                          </div>
                        )}

                        <input
                          type="file"
                          accept="image/*"
                          disabled={updatingImagePostId === post.id}
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleImageEditForPost(post.id, e.target.files[0]);
                              e.target.value = '';
                            }
                          }}
                          className="hidden"
                        />
                      </label>

                      {/* Content summary */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold opacity-75">
                          <span className="text-red-500">{post.badge}</span>
                          <span>•</span>
                          <span className="truncate">{post.istFormatted}</span>
                          {editingPostId === post.id && (
                            <span className="ml-1 px-1.5 py-0.5 rounded bg-amber-500 text-black text-[9px] font-black uppercase">
                              Editing Now
                            </span>
                          )}
                        </div>
                        <h5
                          className="text-xs font-nunito font-bold tracking-tight truncate mt-0.5"
                          style={{ fontFamily: '"Nunito", sans-serif', fontWeight: 700 }}
                        >
                          {post.title}
                        </h5>
                        <p className="text-[11px] opacity-70 line-clamp-1 mt-0.5 font-mulish">
                          {stripRichFormatting(post.content)}
                        </p>
                      </div>

                      {/* Actions: Edit Post Text + Change Image + Delete */}
                      <div className="shrink-0 flex items-center gap-1">
                        {/* Edit Post Text & Content Button */}
                        <button
                          type="button"
                          onClick={() => handleEditPost(post)}
                          className={`p-1.5 rounded-lg transition-colors flex items-center justify-center ${
                            editingPostId === post.id
                              ? 'bg-amber-500 text-black shadow-sm font-bold'
                              : isDarkMode
                              ? 'text-white/60 hover:text-gold hover:bg-white/10'
                              : 'text-black/60 hover:text-[#A30000] hover:bg-black/5'
                          }`}
                          title="Edit title, text & details of this post"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        {/* Change Image Button */}
                        <label
                          title="Change image for this post"
                          className={`p-1.5 rounded-lg cursor-pointer transition-colors flex items-center justify-center ${
                            isDarkMode
                              ? 'text-white/60 hover:text-gold hover:bg-white/10'
                              : 'text-black/60 hover:text-[#A30000] hover:bg-black/5'
                          }`}
                        >
                          {updatingImagePostId === post.id ? (
                            <RotateCw className="w-4 h-4 animate-spin text-gold" />
                          ) : (
                            <Camera className="w-4 h-4" />
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            disabled={updatingImagePostId === post.id}
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                handleImageEditForPost(post.id, e.target.files[0]);
                                e.target.value = '';
                              }
                            }}
                            className="hidden"
                          />
                        </label>

                        {/* Delete Action */}
                        {deleteConfirmId === post.id ? (
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleDelete(post.id)}
                              className="px-2 py-1 bg-red-600 text-white text-[10px] font-bold rounded hover:bg-red-700"
                            >
                              Confirm
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteConfirmId(null)}
                              className="px-1.5 py-1 text-[10px] opacity-60 hover:opacity-100"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(post.id)}
                            className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
                            title="Delete this update"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
