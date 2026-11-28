import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Save, 
  Plus, 
  Trash2, 
  Upload, 
  RotateCw, 
  Check, 
  ExternalLink, 
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Eye,
  FileText,
  ShieldCheck,
  FileCheck2,
  ZoomIn,
  X,
  Maximize2
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { 
  getPoliticalPredictions, 
  savePoliticalPredictions, 
  getInitialPoliticalPredictionsSync 
} from '../lib/politicalStorage';
import { politicalCategories } from '../data/politicalAnalysisData';
import PoliticalRichTextEditor from './PoliticalRichTextEditor';

export default function PoliticalAdminSection({ showToast }) {
  const { isDarkMode } = useTheme();
  const [predictions, setPredictions] = useState(getInitialPoliticalPredictionsSync);
  const [selectedId, setSelectedId] = useState(predictions[0]?.id || 'pol_2026_wb');
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingSide, setUploadingSide] = useState(null); // 'prediction' | 'result' | null
  const [jsonMode, setJsonMode] = useState(false);
  const [rawJsonText, setRawJsonText] = useState('');

  // Document metadata state: { [key]: { name, size, width, height, type } }
  const [docMeta, setDocMeta] = useState({});

  // Full-resolution inspector modal state: { src, title, meta, side }
  const [inspectModal, setInspectModal] = useState(null);

  const predImageInputRef = useRef(null);
  const resImageInputRef = useRef(null);

  useEffect(() => {
    getPoliticalPredictions().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        setPredictions(data);
        setRawJsonText(JSON.stringify(data, null, 2));
        if (!selectedId && data[0]?.id) {
          setSelectedId(data[0].id);
        }
      }
    });
  }, []);

  const currentItem = predictions.find(p => p.id === selectedId) || predictions[0] || {
    id: `pol_${Date.now()}`,
    title: '',
    category: 'State Elections',
    verified: true,
    prediction: {
      image: '/political/WB_Political_Result.png',
      postLink: '',
      postLinkText: '',
      description: '',
      label: 'OUR PREDICTION'
    },
    result: {
      image: '/political/wb_result_proof.png',
      newsLink: '',
      newsLinkText: '',
      description: '',
      label: 'RESULTS'
    }
  };

  // Helper to inspect natural dimensions of an existing image URL
  const inspectExistingImage = (url, key) => {
    if (!url || docMeta[key]) return;
    const img = new Image();
    img.onload = () => {
      setDocMeta(prev => ({
        ...prev,
        [key]: {
          name: url.split('/').pop() || 'document.png',
          size: 'Original File',
          width: img.naturalWidth,
          height: img.naturalHeight,
          type: 'Lossless Image'
        }
      }));
    };
    img.src = url;
  };

  useEffect(() => {
    if (currentItem?.prediction?.image) {
      inspectExistingImage(currentItem.prediction.image, `${currentItem.id}_prediction`);
    }
    if (currentItem?.result?.image) {
      inspectExistingImage(currentItem.result.image, `${currentItem.id}_result`);
    }
  }, [currentItem]);

  const updateCurrentItem = (updates) => {
    setPredictions(prev => {
      const next = prev.map(p => {
        if (p.id === currentItem.id) {
          return { ...p, ...updates };
        }
        return p;
      });
      setRawJsonText(JSON.stringify(next, null, 2));
      return next;
    });
  };

  const updatePredictionField = (field, value) => {
    updateCurrentItem({
      prediction: {
        ...(currentItem.prediction || {}),
        [field]: value
      }
    });
  };

  const updateResultField = (field, value) => {
    updateCurrentItem({
      result: {
        ...(currentItem.result || {}),
        [field]: value
      }
    });
  };

  // Lossless Document File Upload Handler (Zero Quality Drop)
  const handleLosslessDocUpload = (e, side) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image document (PNG, JPEG, WebP, etc.)');
      return;
    }

    setUploadingSide(side);
    const fileSizeFormatted = file.size > 1024 * 1024
      ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
      : `${Math.round(file.size / 1024)} KB`;

    // Read full raw binary as base64 without any canvas downsampling
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Data = event.target?.result;
      if (typeof base64Data !== 'string') {
        setUploadingSide(null);
        return;
      }

      // Check original uncompressed pixel dimensions
      const img = new Image();
      img.onload = async () => {
        const meta = {
          name: file.name,
          size: fileSizeFormatted,
          width: img.naturalWidth,
          height: img.naturalHeight,
          type: file.type || 'image/png'
        };

        const metaKey = `${currentItem.id}_${side}`;
        setDocMeta(prev => ({
          ...prev,
          [metaKey]: meta
        }));

        // Send full lossless document to /api/political/upload
        try {
          const res = await fetch('/api/political/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              filename: file.name,
              data: base64Data
            })
          });

          const json = await res.json();
          if (json.success && json.url) {
            if (side === 'prediction') {
              updatePredictionField('image', json.url);
            } else {
              updateResultField('image', json.url);
            }
            showToast?.(`Uploaded lossless document: ${file.name} (${meta.width}×${meta.height}px, ${fileSizeFormatted})`);
          } else {
            // Local fallback
            if (side === 'prediction') updatePredictionField('image', base64Data);
            else updateResultField('image', base64Data);
            showToast?.(`Loaded ${file.name} directly in 100% quality.`);
          }
        } catch {
          // Fallback to direct raw base64
          if (side === 'prediction') updatePredictionField('image', base64Data);
          else updateResultField('image', base64Data);
          showToast?.(`Loaded ${file.name} in 100% quality.`);
        } finally {
          setUploadingSide(null);
        }
      };

      img.src = base64Data;
    };

    reader.readAsDataURL(file);
  };

  const handleAddNew = () => {
    const newId = `pol_${Date.now()}`;
    const newEntry = {
      id: newId,
      title: 'NEW ELECTION PREDICTION',
      category: 'State Elections',
      verified: true,
      prediction: {
        image: '/political/WB_Political_Result.png',
        postLink: 'https://instagram.com/myastrofied',
        postLinkText: 'https://instagram.com/myastrofied...',
        description: 'Prediction description for this election...',
        label: 'OUR PREDICTION'
      },
      result: {
        image: '/political/wb_result_proof.png',
        newsLink: 'https://indiatoday.com/news',
        newsLinkText: 'indiatoday.com/news...',
        description: 'Verified election outcome details...',
        label: 'RESULTS'
      },
      tags: ['New Prediction']
    };

    setPredictions(prev => [newEntry, ...prev]);
    setSelectedId(newId);
    setRawJsonText(JSON.stringify([newEntry, ...predictions], null, 2));
    showToast?.('Added new election prediction entry');
  };

  const handleDeleteCurrent = () => {
    if (predictions.length <= 1) {
      alert('You cannot delete the only remaining prediction.');
      return;
    }
    if (window.confirm(`Delete "${currentItem.title}"?`)) {
      const remaining = predictions.filter(p => p.id !== currentItem.id);
      setPredictions(remaining);
      setSelectedId(remaining[0]?.id);
      setRawJsonText(JSON.stringify(remaining, null, 2));
      savePoliticalPredictions(remaining);
      showToast?.('Prediction deleted');
    }
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    let toSave = predictions;

    if (jsonMode) {
      try {
        const parsed = JSON.parse(rawJsonText);
        if (!Array.isArray(parsed)) throw new Error('Root must be an array');
        toSave = parsed;
        setPredictions(parsed);
      } catch (err) {
        alert('Invalid JSON: ' + err.message);
        setIsSaving(false);
        return;
      }
    }

    const success = await savePoliticalPredictions(toSave);
    setIsSaving(false);

    if (success) {
      showToast?.('Political Predictions published and synced successfully!');
    } else {
      showToast?.('Saved locally to browser cache.');
    }
  };

  const predMeta = docMeta[`${currentItem.id}_prediction`];
  const resMeta = docMeta[`${currentItem.id}_result`];

  return (
    <div className="flex flex-col gap-6">
      {/* Top Action Header */}
      <div
        className={`p-3.5 sm:p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 shadow-sm ${
          isDarkMode ? 'bg-[#151515] border-white/10' : 'bg-[#FAF9F5] border-black/10'
        }`}
      >
        <div>
          <span className="text-[10px] sm:text-[11px] font-extrabold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>LOSSLESS DOCUMENT MANAGER • POLITICAL ARCHIVE</span>
          </span>
          <h2
            className="text-base sm:text-xl font-bold font-mulish tracking-tight mt-0.5"
            style={{ fontFamily: '"Mulish", sans-serif' }}
          >
            Manage Our Predictions & Results
          </h2>
          <p className="text-[11px] sm:text-xs opacity-70 font-mulish mt-0.5">
            Upload real-sized image documents with 100% original quality preserved (zero compression drop).
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setJsonMode(!jsonMode)}
            className="flex-1 sm:flex-initial justify-center px-3 py-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 opacity-80 hover:opacity-100"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{jsonMode ? 'UI Editor' : 'Raw JSON'}</span>
          </button>

          <button
            type="button"
            onClick={handleAddNew}
            className="flex-1 sm:flex-initial justify-center px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ New Prediction</span>
          </button>

          <button
            type="button"
            onClick={handleSaveAll}
            disabled={isSaving}
            className={`w-full sm:w-auto justify-center px-4 py-2.5 rounded-xl text-xs font-extrabold font-mulish flex items-center gap-2 shadow-md transition-all cursor-pointer ${
              isDarkMode
                ? 'bg-[#f0fe4f] text-black hover:bg-white'
                : 'bg-[#A30000] text-white hover:bg-red-800'
            }`}
          >
            {isSaving ? <RotateCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            <span>{isSaving ? 'Publishing...' : 'Save & Publish'}</span>
          </button>
        </div>
      </div>

      {jsonMode ? (
        /* RAW JSON EDITING MODE */
        <div
          className={`p-4 sm:p-5 rounded-2xl border shadow-xl flex flex-col gap-3 ${
            isDarkMode ? 'bg-[#121212] border-white/10' : 'bg-white border-black/10'
          }`}
        >
          <label className="text-xs font-bold uppercase tracking-wider opacity-70">
            Raw JSON Editor
          </label>
          <textarea
            value={rawJsonText}
            onChange={(e) => setRawJsonText(e.target.value)}
            rows={22}
            className="w-full p-4 rounded-xl border font-mono text-xs outline-none bg-black/40 text-emerald-400 border-white/10"
          />
        </div>
      ) : (
        /* UI EDITING LAYOUT */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          
          {/* LEFT COLUMN: List of Predictions Selector (Horizontal strip on mobile, vertical on desktop) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <div
              className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border shadow-md flex flex-col gap-2 ${
                isDarkMode ? 'bg-[#121212] border-white/10' : 'bg-white border-black/10'
              }`}
            >
              <div className="flex items-center justify-between pb-1.5 border-b border-black/10 dark:border-white/10">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider opacity-70">
                  Select Prediction to Edit
                </span>
                <span className="text-[10px] opacity-60 font-semibold">{predictions.length} entries</span>
              </div>

              <div className="flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-y-auto max-h-none lg:max-h-[560px] pb-1.5 lg:pb-0 scrollbar-none -mx-1 px-1 lg:mx-0 lg:px-0">
                {predictions.map((p, idx) => (
                  <button
                    key={p.id || idx}
                    type="button"
                    onClick={() => setSelectedId(p.id)}
                    className={`p-2.5 sm:p-3 rounded-xl text-left border flex flex-col gap-1 transition-all cursor-pointer min-w-[200px] sm:min-w-[240px] lg:min-w-0 shrink-0 lg:shrink lg:w-full ${
                      selectedId === p.id
                        ? isDarkMode
                          ? 'bg-[#f0fe4f] text-black border-[#f0fe4f] font-bold shadow-sm'
                          : 'bg-[#A30000] text-white border-[#A30000] font-bold shadow-sm'
                        : isDarkMode
                        ? 'bg-white/[0.02] border-white/5 hover:border-white/20 text-gray-300'
                        : 'bg-black/[0.02] border-black/5 hover:border-black/20 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-mulish font-extrabold truncate">
                        {idx + 1}. {p.title || 'Untitled'}
                      </span>
                      <span className="text-[9px] uppercase tracking-wider opacity-75 shrink-0 px-1.5 py-0.5 rounded-full border">
                        {p.category || 'Election'}
                      </span>
                    </div>
                    <span className="text-[11px] opacity-75 line-clamp-1 font-mulish">
                      {(p.prediction?.description || '').replace(/<[^>]*>/g, '').trim() || 'No description'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Distinct Editor for Selected Item (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div
              className={`p-3.5 sm:p-6 rounded-xl sm:rounded-2xl border shadow-xl flex flex-col gap-4 sm:gap-6 ${
                isDarkMode ? 'bg-[#121212] border-white/10' : 'bg-white border-black/10'
              }`}
            >
              {/* Header Title & Category */}
              <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10 flex-wrap gap-3">
                <div className="flex-1 min-w-[240px]">
                  <label className="block text-[11px] font-bold opacity-75 mb-1 uppercase tracking-wider">
                    Prediction Title
                  </label>
                  <input
                    type="text"
                    value={currentItem.title || ''}
                    onChange={(e) => updateCurrentItem({ title: e.target.value })}
                    placeholder="e.g. West Bengal Election 2026"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-bold outline-none font-mulish ${
                      isDarkMode ? 'bg-black/40 border-white/10 focus:border-[#f0fe4f] text-[#f0fe4f]' : 'bg-[#FAF9F5] border-black/15 focus:border-[#A30000] text-[#A30000]'
                    }`}
                  />
                </div>

                <div className="w-full sm:w-48">
                  <label className="block text-[11px] font-bold opacity-75 mb-1 uppercase tracking-wider">
                    Category
                  </label>
                  <select
                    value={currentItem.category || 'State Elections'}
                    onChange={(e) => updateCurrentItem({ category: e.target.value })}
                    className={`w-full px-3 py-2.5 rounded-xl border text-xs font-bold outline-none ${
                      isDarkMode ? 'bg-black/40 border-white/10' : 'bg-[#FAF9F5] border-black/15'
                    }`}
                  >
                    {politicalCategories.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={handleDeleteCurrent}
                  className="px-3 py-2 rounded-xl border text-xs text-rose-500 border-rose-500/30 hover:bg-rose-500/10 flex items-center gap-1 font-bold transition-all self-end"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>

              {/* DUAL DISTINCT EDITING SECTIONS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* --- OUR PREDICTION SECTION --- */}
                <div
                  className={`p-4 sm:p-5 rounded-2xl border flex flex-col gap-3.5 ${
                    isDarkMode ? 'bg-black/30 border-white/10' : 'bg-[#FAF9F5] border-orange-200/80'
                  }`}
                >
                  <div className="flex items-center justify-between pb-2 border-b border-black/10 dark:border-white/10">
                    <span className="text-xs font-black uppercase tracking-wider text-[#A30000] dark:text-[#f0fe4f]">
                      1. OUR PREDICTION CARD
                    </span>
                    <span className="text-[10px] font-bold opacity-60">Left Side</span>
                  </div>

                  {/* Lossless Document Upload & Preview Box */}
                  <div>
                    <label className="block text-[11px] font-bold opacity-75 mb-1.5 flex items-center justify-between">
                      <span>Real-Sized Poster Document</span>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">100% Original Quality</span>
                    </label>

                    <div className="flex flex-col gap-2.5">
                      <div className="flex items-start gap-3">
                        {/* Thumbnail with Inspect Full Quality Trigger */}
                        <div 
                          onClick={() => setInspectModal({
                            src: currentItem.prediction?.image || '/political/WB_Political_Result.png',
                            title: currentItem.title || 'Our Prediction',
                            meta: predMeta,
                            side: 'OUR PREDICTION'
                          })}
                          className="group relative w-20 h-24 rounded-xl overflow-hidden border border-black/15 dark:border-white/15 bg-black/10 shrink-0 cursor-pointer shadow-sm"
                          title="Click to view real-sized original document preview"
                        >
                          <img
                            src={currentItem.prediction?.image || '/political/WB_Political_Result.png'}
                            alt="Prediction"
                            className="w-full h-full object-cover object-top transition-transform group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                            <Maximize2 className="w-4 h-4" />
                          </div>
                        </div>

                        {/* Upload Button & File Info */}
                        <div className="flex-1 flex flex-col gap-1.5">
                          <input
                            type="file"
                            ref={predImageInputRef}
                            onChange={(e) => handleLosslessDocUpload(e, 'prediction')}
                            accept="image/png, image/jpeg, image/webp, image/svg+xml, .png, .jpg, .jpeg, .webp"
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => predImageInputRef.current?.click()}
                            disabled={uploadingSide === 'prediction'}
                            className={`px-3 py-2 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm ${
                              uploadingSide === 'prediction'
                                ? 'opacity-60 bg-black/10 cursor-not-allowed'
                                : 'bg-white dark:bg-white/10 hover:border-gold hover:text-gold'
                            }`}
                          >
                            {uploadingSide === 'prediction' ? (
                              <>
                                <RotateCw className="w-3.5 h-3.5 animate-spin" />
                                <span>Uploading Full Document...</span>
                              </>
                            ) : (
                              <>
                                <Upload className="w-3.5 h-3.5 text-emerald-500" />
                                <span>Upload Image Document</span>
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => setInspectModal({
                              src: currentItem.prediction?.image || '/political/WB_Political_Result.png',
                              title: currentItem.title || 'Our Prediction',
                              meta: predMeta,
                              side: 'OUR PREDICTION'
                            })}
                            className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 self-start"
                          >
                            <ZoomIn className="w-3 h-3" />
                            <span>Preview Full Quality Document</span>
                          </button>
                        </div>
                      </div>

                      {/* Lossless Document Quality Status Banner */}
                      <div className="p-2.5 rounded-xl border bg-black/[0.02] dark:bg-white/[0.03] border-black/10 dark:border-white/10 flex flex-col gap-1 text-[11px]">
                        <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-extrabold">
                          <FileCheck2 className="w-3.5 h-3.5" />
                          <span>Lossless Document Active (Zero Compression)</span>
                        </div>
                        <div className="text-[10px] opacity-75 font-mono truncate">
                          Path: {currentItem.prediction?.image || 'Default'}
                        </div>
                        {predMeta && (
                          <div className="flex items-center gap-2 text-[10px] font-semibold opacity-80 pt-0.5 border-t border-black/5 dark:border-white/5">
                            <span>Resolution: {predMeta.width} × {predMeta.height} px</span>
                            <span>•</span>
                            <span>Size: {predMeta.size}</span>
                          </div>
                        )}
                      </div>

                      {/* Or Edit URL directly */}
                      <div>
                        <input
                          type="text"
                          value={currentItem.prediction?.image || ''}
                          onChange={(e) => updatePredictionField('image', e.target.value)}
                          placeholder="Or paste image URL / document path..."
                          className={`w-full px-2.5 py-1.5 rounded-lg border text-[11px] font-mono outline-none ${
                            isDarkMode ? 'bg-black/40 border-white/10' : 'bg-white border-black/15'
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Post Link */}
                  <div>
                    <label className="block text-[11px] font-bold opacity-75 mb-1">
                      Post Link (URL)
                    </label>
                    <input
                      type="text"
                      value={currentItem.prediction?.postLink || ''}
                      onChange={(e) => updatePredictionField('postLink', e.target.value)}
                      placeholder="e.g. https://instagram.com/astrofied..."
                      className={`w-full px-3 py-2 rounded-xl border text-xs outline-none ${
                        isDarkMode ? 'bg-black/40 border-white/10' : 'bg-white border-black/15'
                      }`}
                    />
                  </div>

                  {/* Post Link Display Text */}
                  <div>
                    <label className="block text-[11px] font-bold opacity-75 mb-1">
                      Post Link Display Text
                    </label>
                    <input
                      type="text"
                      value={currentItem.prediction?.postLinkText || ''}
                      onChange={(e) => updatePredictionField('postLinkText', e.target.value)}
                      placeholder="e.g. https://instagram.com/astrofied..."
                      className={`w-full px-3 py-2 rounded-xl border text-xs outline-none ${
                        isDarkMode ? 'bg-black/40 border-white/10' : 'bg-white border-black/15'
                      }`}
                    />
                  </div>

                  {/* Prediction Description with Rich Formatting Toolbar */}
                  <PoliticalRichTextEditor
                    label="Prediction Description Text"
                    value={currentItem.prediction?.description || ''}
                    onChange={(val) => updatePredictionField('description', val)}
                    placeholder="On 1st May 2026, we had posted on our Instagram..."
                    isDarkMode={isDarkMode}
                    rows={4}
                  />

                  {/* Prediction Label */}
                  <div>
                    <label className="block text-[11px] font-bold opacity-75 mb-1">
                      Bottom Label
                    </label>
                    <input
                      type="text"
                      value={currentItem.prediction?.label || 'OUR PREDICTION'}
                      onChange={(e) => updatePredictionField('label', e.target.value)}
                      placeholder="OUR PREDICTION"
                      className={`w-full px-3 py-1.5 rounded-xl border text-xs font-bold outline-none font-mulish ${
                        isDarkMode ? 'bg-black/40 border-white/10' : 'bg-white border-black/15'
                      }`}
                    />
                  </div>
                </div>

                {/* --- RESULTS SECTION --- */}
                <div
                  className={`p-4 sm:p-5 rounded-2xl border flex flex-col gap-3.5 ${
                    isDarkMode ? 'bg-black/30 border-white/10' : 'bg-[#FAF9F5] border-orange-200/80'
                  }`}
                >
                  <div className="flex items-center justify-between pb-2 border-b border-black/10 dark:border-white/10">
                    <span className="text-xs font-black uppercase tracking-wider text-[#A30000] dark:text-[#f0fe4f]">
                      2. RESULTS PROOF CARD
                    </span>
                    <span className="text-[10px] font-bold opacity-60">Right Side</span>
                  </div>

                  {/* Lossless Result Document Upload & Preview Box */}
                  <div>
                    <label className="block text-[11px] font-bold opacity-75 mb-1.5 flex items-center justify-between">
                      <span>Real-Sized Outcome Proof Document</span>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">100% Original Quality</span>
                    </label>

                    <div className="flex flex-col gap-2.5">
                      <div className="flex items-start gap-3">
                        {/* Thumbnail with Inspect Full Quality Trigger */}
                        <div 
                          onClick={() => setInspectModal({
                            src: currentItem.result?.image || '/political/wb_result_proof.png',
                            title: currentItem.title || 'Result Proof',
                            meta: resMeta,
                            side: 'RESULTS'
                          })}
                          className="group relative w-20 h-24 rounded-xl overflow-hidden border border-black/15 dark:border-white/15 bg-black/10 shrink-0 cursor-pointer shadow-sm"
                          title="Click to view real-sized original document preview"
                        >
                          <img
                            src={currentItem.result?.image || '/political/wb_result_proof.png'}
                            alt="Result"
                            className="w-full h-full object-cover object-top transition-transform group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                            <Maximize2 className="w-4 h-4" />
                          </div>
                        </div>

                        {/* Upload Button & File Info */}
                        <div className="flex-1 flex flex-col gap-1.5">
                          <input
                            type="file"
                            ref={resImageInputRef}
                            onChange={(e) => handleLosslessDocUpload(e, 'result')}
                            accept="image/png, image/jpeg, image/webp, image/svg+xml, .png, .jpg, .jpeg, .webp"
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => resImageInputRef.current?.click()}
                            disabled={uploadingSide === 'result'}
                            className={`px-3 py-2 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm ${
                              uploadingSide === 'result'
                                ? 'opacity-60 bg-black/10 cursor-not-allowed'
                                : 'bg-white dark:bg-white/10 hover:border-gold hover:text-gold'
                            }`}
                          >
                            {uploadingSide === 'result' ? (
                              <>
                                <RotateCw className="w-3.5 h-3.5 animate-spin" />
                                <span>Uploading Full Document...</span>
                              </>
                            ) : (
                              <>
                                <Upload className="w-3.5 h-3.5 text-emerald-500" />
                                <span>Upload Image Document</span>
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => setInspectModal({
                              src: currentItem.result?.image || '/political/wb_result_proof.png',
                              title: currentItem.title || 'Result Proof',
                              meta: resMeta,
                              side: 'RESULTS'
                            })}
                            className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 self-start"
                          >
                            <ZoomIn className="w-3 h-3" />
                            <span>Preview Full Quality Document</span>
                          </button>
                        </div>
                      </div>

                      {/* Lossless Document Quality Status Banner */}
                      <div className="p-2.5 rounded-xl border bg-black/[0.02] dark:bg-white/[0.03] border-black/10 dark:border-white/10 flex flex-col gap-1 text-[11px]">
                        <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-extrabold">
                          <FileCheck2 className="w-3.5 h-3.5" />
                          <span>Lossless Document Active (Zero Compression)</span>
                        </div>
                        <div className="text-[10px] opacity-75 font-mono truncate">
                          Path: {currentItem.result?.image || 'Default'}
                        </div>
                        {resMeta && (
                          <div className="flex items-center gap-2 text-[10px] font-semibold opacity-80 pt-0.5 border-t border-black/5 dark:border-white/5">
                            <span>Resolution: {resMeta.width} × {resMeta.height} px</span>
                            <span>•</span>
                            <span>Size: {resMeta.size}</span>
                          </div>
                        )}
                      </div>

                      {/* Or Edit URL directly */}
                      <div>
                        <input
                          type="text"
                          value={currentItem.result?.image || ''}
                          onChange={(e) => updateResultField('image', e.target.value)}
                          placeholder="Or paste image URL / document path..."
                          className={`w-full px-2.5 py-1.5 rounded-lg border text-[11px] font-mono outline-none ${
                            isDarkMode ? 'bg-black/40 border-white/10' : 'bg-white border-black/15'
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* News Link */}
                  <div>
                    <label className="block text-[11px] font-bold opacity-75 mb-1">
                      News Link (URL)
                    </label>
                    <input
                      type="text"
                      value={currentItem.result?.newsLink || ''}
                      onChange={(e) => updateResultField('newsLink', e.target.value)}
                      placeholder="e.g. https://indiatoday.com/news..."
                      className={`w-full px-3 py-2 rounded-xl border text-xs outline-none ${
                        isDarkMode ? 'bg-black/40 border-white/10' : 'bg-white border-black/15'
                      }`}
                    />
                  </div>

                  {/* News Link Display Text */}
                  <div>
                    <label className="block text-[11px] font-bold opacity-75 mb-1">
                      News Link Display Text
                    </label>
                    <input
                      type="text"
                      value={currentItem.result?.newsLinkText || ''}
                      onChange={(e) => updateResultField('newsLinkText', e.target.value)}
                      placeholder="e.g. indiatoday.com/news..."
                      className={`w-full px-3 py-2 rounded-xl border text-xs outline-none ${
                        isDarkMode ? 'bg-black/40 border-white/10' : 'bg-white border-black/15'
                      }`}
                    />
                  </div>

                  {/* Result Description with Rich Formatting Toolbar */}
                  <PoliticalRichTextEditor
                    label="Result Description Text"
                    value={currentItem.result?.description || ''}
                    onChange={(val) => updateResultField('description', val)}
                    placeholder="On 4th May 2026, it was proved correct..."
                    isDarkMode={isDarkMode}
                    rows={4}
                  />

                  {/* Result Label */}
                  <div>
                    <label className="block text-[11px] font-bold opacity-75 mb-1">
                      Bottom Label
                    </label>
                    <input
                      type="text"
                      value={currentItem.result?.label || 'RESULTS'}
                      onChange={(e) => updateResultField('label', e.target.value)}
                      placeholder="RESULTS"
                      className={`w-full px-3 py-1.5 rounded-xl border text-xs font-bold outline-none font-mulish ${
                        isDarkMode ? 'bg-black/40 border-white/10' : 'bg-white border-black/15'
                      }`}
                    />
                  </div>
                </div>

              </div>

              {/* LIVE EQUAL-CARD PREVIEW IN ADMIN */}
              <div className="pt-4 border-t border-black/10 dark:border-white/10 flex flex-col gap-3">
                <span className="text-xs font-bold uppercase tracking-wider opacity-70 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Real-Time Website Card Preview (Exact Equal Sizing):</span>
                </span>

                <div
                  className={`p-2.5 sm:p-5 rounded-xl sm:rounded-2xl border ${
                    isDarkMode ? 'bg-[#0d0d0d] border-white/10' : 'bg-white border-black/10'
                  }`}
                >
                  <div className="relative grid grid-cols-2 gap-3.5 sm:gap-6 items-stretch">
                    <div 
                      className="absolute top-1 bottom-9 sm:bottom-10 left-1/2 -translate-x-1/2 pointer-events-none"
                      style={{
                        width: 0,
                        borderLeft: isDarkMode ? '0.5px solid #ffffff' : '0.5px solid #A30000'
                      }}
                    />

                    {/* ROW 1 - Preview Left Card */}
                    <div
                      className={`p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border-[0.5px] h-full flex flex-col justify-between ${
                        isDarkMode ? 'bg-[#17202a] border-white' : 'bg-[#f5f5dd] border-[#A30000]'
                      }`}
                      style={{
                        border: isDarkMode ? '0.5px solid #ffffff' : '0.5px solid #A30000'
                      }}
                    >
                      <div className="relative w-full h-[130px] sm:h-[200px] md:h-[260px] shrink-0 rounded-lg sm:rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-black/[0.04] dark:bg-black/50 flex items-center justify-center p-1 sm:p-2">
                        <img
                          src={currentItem.prediction?.image || '/political/WB_Political_Result.png'}
                          alt=""
                          aria-hidden="true"
                          className="absolute inset-0 w-full h-full object-cover blur-xl opacity-25 dark:opacity-35 scale-125 pointer-events-none"
                        />
                        <img
                          src={currentItem.prediction?.image || '/political/WB_Political_Result.png'}
                          alt="Preview Pred"
                          className="relative z-10 max-w-full max-h-full object-contain rounded-md sm:rounded-lg drop-shadow-md"
                        />
                      </div>
                      <div className="pt-2 sm:pt-3 flex-1 flex flex-col justify-between">
                        <div>
                          <h5 className="font-mulish font-extrabold text-[10px] sm:text-sm text-[#A30000] dark:text-[#f0fe4f] text-center" style={{ fontFamily: '"Mulish", sans-serif' }}>
                            {currentItem.title || 'Prediction Title'}
                          </h5>
                          <div
                            className="political-rich-desc mt-1.5 text-[9.5px] sm:text-xs font-mulish text-stone-900 dark:text-gray-200 leading-snug sm:leading-relaxed text-justify"
                            style={{ fontFamily: '"Mulish", sans-serif' }}
                            dangerouslySetInnerHTML={{
                              __html: currentItem.prediction?.description || 'Prediction text goes here...'
                            }}
                          />
                        </div>
                        {currentItem.prediction?.postLink && (
                          <span className="text-[8.5px] sm:text-[11px] text-blue-600 dark:text-blue-400 mt-2 pt-1 border-t border-black/5 dark:border-white/10 truncate font-mulish">
                            Post Link: {currentItem.prediction?.postLinkText || currentItem.prediction?.postLink}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* ROW 1 - Preview Right Card */}
                    <div
                      className={`p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border-[0.5px] h-full flex flex-col justify-between ${
                        isDarkMode ? 'bg-[#17202a] border-white' : 'bg-[#f5f5dd] border-[#A30000]'
                      }`}
                      style={{
                        border: isDarkMode ? '0.5px solid #ffffff' : '0.5px solid #A30000'
                      }}
                    >
                      <div className="relative w-full h-[130px] sm:h-[200px] md:h-[260px] shrink-0 rounded-lg sm:rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-black/[0.04] dark:bg-black/50 flex items-center justify-center p-1 sm:p-2">
                        <img
                          src={currentItem.result?.image || '/political/wb_result_proof.png'}
                          alt=""
                          aria-hidden="true"
                          className="absolute inset-0 w-full h-full object-cover blur-xl opacity-25 dark:opacity-35 scale-125 pointer-events-none"
                        />
                        <img
                          src={currentItem.result?.image || '/political/wb_result_proof.png'}
                          alt="Preview Result"
                          className="relative z-10 max-w-full max-h-full object-contain rounded-md sm:rounded-lg drop-shadow-md"
                        />
                      </div>
                      <div className="pt-2 sm:pt-3 flex-1 flex flex-col justify-between">
                        <div>
                          <h5 className="font-mulish font-extrabold text-[10px] sm:text-sm text-[#A30000] dark:text-[#f0fe4f] text-center" style={{ fontFamily: '"Mulish", sans-serif' }}>
                            {currentItem.title || 'Prediction Title'}
                          </h5>
                          <div
                            className="political-rich-desc mt-1.5 text-[9.5px] sm:text-xs font-mulish text-stone-900 dark:text-gray-200 leading-snug sm:leading-relaxed text-justify"
                            style={{ fontFamily: '"Mulish", sans-serif' }}
                            dangerouslySetInnerHTML={{
                              __html: currentItem.result?.description || 'Result proof text goes here...'
                            }}
                          />
                        </div>
                        {currentItem.result?.newsLink && (
                          <span className="text-[8.5px] sm:text-[11px] text-blue-600 dark:text-blue-400 mt-2 pt-1 border-t border-black/5 dark:border-white/10 truncate font-mulish">
                            News Link: {currentItem.result?.newsLinkText || currentItem.result?.newsLink}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* ROW 2 - Preview Left Label */}
                    <h4 className="text-[11px] sm:text-xl font-[650] text-center font-mulish text-[#A30000] dark:text-[#f0fe4f]" style={{ fontFamily: '"Mulish", sans-serif', fontWeight: 650 }}>
                      {currentItem.prediction?.label || 'OUR PREDICTION'}
                    </h4>

                    {/* ROW 2 - Preview Right Label */}
                    <h4 className="text-[11px] sm:text-xl font-[650] text-center font-mulish text-[#A30000] dark:text-[#f0fe4f]" style={{ fontFamily: '"Mulish", sans-serif', fontWeight: 650 }}>
                      {currentItem.result?.label || 'RESULTS'}
                    </h4>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Save & Publish Action */}
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveAll}
                  disabled={isSaving}
                  className={`w-full sm:w-auto justify-center px-8 py-3 rounded-xl font-black text-xs sm:text-sm tracking-wider uppercase transition-all shadow-xl flex items-center gap-2 cursor-pointer ${
                    isSaving
                      ? 'opacity-60 cursor-wait'
                      : isDarkMode
                      ? 'bg-[#f0fe4f] text-black hover:bg-white'
                      : 'bg-[#A30000] text-white hover:bg-red-800'
                  }`}
                >
                  {isSaving ? <RotateCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>{isSaving ? 'Publishing...' : 'Save & Publish Prediction'}</span>
                </button>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* FULL-RESOLUTION DOCUMENT QUALITY INSPECTOR MODAL */}
      <AnimatePresence>
        {inspectModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setInspectModal(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[94vh] flex flex-col rounded-2xl overflow-hidden bg-[#111111] border border-white/20 p-4 sm:p-5 shadow-2xl text-white"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-500 text-black uppercase tracking-wider">
                    Lossless Document Preview
                  </span>
                  <span className="text-xs font-bold text-gray-300">
                    {inspectModal.side}: {inspectModal.title}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setInspectModal(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Document Metadata Bar */}
              <div className="py-2.5 px-3 bg-white/5 rounded-xl my-3 flex items-center justify-between flex-wrap gap-2 text-xs">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-emerald-400 font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>0% Quality Loss</span>
                  </div>
                  {inspectModal.meta && (
                    <>
                      <span className="opacity-40">|</span>
                      <span>Resolution: <strong>{inspectModal.meta.width} × {inspectModal.meta.height} px</strong></span>
                      <span className="opacity-40">|</span>
                      <span>Size: <strong>{inspectModal.meta.size}</strong></span>
                      <span className="opacity-40">|</span>
                      <span className="opacity-75">{inspectModal.meta.name}</span>
                    </>
                  )}
                </div>

                <a
                  href={inspectModal.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-bold flex items-center gap-1 text-white transition-colors"
                >
                  <span>Open Full Image in New Tab</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Uncompressed Real-Sized Document Viewport */}
              <div className="flex-1 max-h-[72vh] overflow-auto rounded-xl bg-black/60 p-2 flex items-center justify-center border border-white/10">
                <img
                  src={inspectModal.src}
                  alt="Full-Resolution Document"
                  className="max-h-[68vh] w-auto object-contain rounded-lg shadow-xl"
                  style={{ imageRendering: 'auto' }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
