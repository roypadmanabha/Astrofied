import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Save, 
  Plus, 
  Trash2, 
  RotateCw, 
  Check, 
  FileText, 
  Clock, 
  Zap, 
  Eye, 
  Sparkles 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { 
  getInitialForecastsDataSync, 
  getForecastsData, 
  saveForecastsData, 
  defaultForecastsData 
} from '../lib/forecastsStorage';
import PoliticalRichTextEditor from './PoliticalRichTextEditor';

const URGENCY_PRESETS = [
  'HIGH IMPACT',
  'CRITICAL WATCH',
  'HISTORIC MILESTONE',
  'GEOPOLITICAL PIVOT',
  'NATIONAL ATTENTION',
  'MARKET ALERT'
];

const CATEGORY_PRESETS = [
  'Economy & Markets',
  'Weather & Environment',
  'Space, Defense & Tech',
  'National Security & Foreign Affairs',
  'Social & Cultural Shift',
  'Governance & Policy'
];

export default function ForecastsAdminSection({ showToast }) {
  const { isDarkMode } = useTheme();
  const [forecastsData, setForecastsData] = useState(getInitialForecastsDataSync);
  
  // Selection ID for upcoming forecasts
  const [selectedUpcomingId, setSelectedUpcomingId] = useState(
    forecastsData.upcomingForecasts[0]?.id || ''
  );

  const [isSaving, setIsSaving] = useState(false);
  const [jsonMode, setJsonMode] = useState(false);
  const [rawJsonText, setRawJsonText] = useState('');
  const [previewTheme, setPreviewTheme] = useState('current'); // 'current' | 'light' | 'dark'

  // Load latest on mount
  useEffect(() => {
    getForecastsData().then((data) => {
      if (data && Array.isArray(data.upcomingForecasts)) {
        setForecastsData(data);
        setRawJsonText(JSON.stringify(data, null, 2));
        if (!selectedUpcomingId && data.upcomingForecasts[0]?.id) {
          setSelectedUpcomingId(data.upcomingForecasts[0].id);
        }
      }
    });
  }, []);

  const isPreviewDark = previewTheme === 'current' ? isDarkMode : previewTheme === 'dark';

  // Active item
  const currentUpcoming = forecastsData.upcomingForecasts.find(
    (f) => f.id === selectedUpcomingId
  ) || forecastsData.upcomingForecasts[0] || {};

  // Helpers to update Upcoming item
  const updateCurrentUpcoming = (fields) => {
    setForecastsData((prev) => {
      const updated = prev.upcomingForecasts.map((item) =>
        item.id === currentUpcoming.id ? { ...item, ...fields } : item
      );
      return { ...prev, upcomingForecasts: updated };
    });
  };

  // Save All
  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      let dataToSave = forecastsData;
      if (jsonMode) {
        dataToSave = JSON.parse(rawJsonText);
        setForecastsData(dataToSave);
      }
      await saveForecastsData(dataToSave);
      setRawJsonText(JSON.stringify(dataToSave, null, 2));
      showToast?.('Forecasts (Next 3–4 Months) published successfully!', 'success');
    } catch (err) {
      console.error('Error saving forecasts data:', err);
      showToast?.('Error saving: ' + (err.message || 'Invalid format'), 'error');
    } finally {
      setIsSaving(false);
    }
  };

  // Add New Upcoming Forecast
  const handleAddUpcoming = () => {
    const newId = 'fc_' + Date.now();
    const newItem = {
      id: newId,
      title: 'New Upcoming Forecast',
      timeframe: 'Next 30–60 Days',
      category: 'Economy & Markets',
      urgency: 'HIGH IMPACT',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      summary: 'Detailed forecast summary and predictions for national events...',
      planetaryDrivers: 'Planetary alignments and transit drivers...',
      keySignals: ['Key observable indicator 1.', 'Key observable indicator 2.']
    };
    setForecastsData((prev) => ({
      ...prev,
      upcomingForecasts: [newItem, ...prev.upcomingForecasts]
    }));
    setSelectedUpcomingId(newId);
    showToast?.('Added new upcoming forecast entry!', 'success');
  };

  // Delete Current Item
  const handleDeleteCurrent = () => {
    if (forecastsData.upcomingForecasts.length <= 1) {
      showToast?.('Must have at least one upcoming forecast card.', 'error');
      return;
    }
    if (!window.confirm(`Delete forecast "${currentUpcoming.title}"?`)) return;
    const filtered = forecastsData.upcomingForecasts.filter((f) => f.id !== currentUpcoming.id);
    setForecastsData((prev) => ({ ...prev, upcomingForecasts: filtered }));
    setSelectedUpcomingId(filtered[0]?.id || '');
    showToast?.('Deleted forecast.', 'info');
  };

  // Signals helper
  const handleAddSignal = () => {
    const signals = [...(currentUpcoming.keySignals || []), 'New key signal or indicator.'];
    updateCurrentUpcoming({ keySignals: signals });
  };

  const handleUpdateSignal = (index, value) => {
    const signals = [...(currentUpcoming.keySignals || [])];
    signals[index] = value;
    updateCurrentUpcoming({ keySignals: signals });
  };

  const handleDeleteSignal = (index) => {
    const signals = (currentUpcoming.keySignals || []).filter((_, i) => i !== index);
    updateCurrentUpcoming({ keySignals: signals });
  };

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      {/* Top Banner Control Header */}
      <div
        className={`p-3.5 sm:p-5 rounded-2xl border shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all ${
          isDarkMode
            ? 'bg-gradient-to-r from-[#18181b] via-[#121212] to-[#18181b] border-white/10'
            : 'bg-gradient-to-r from-[#FAF9F5] via-white to-[#FAF9F5] border-black/10'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500 shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-black uppercase tracking-widest text-purple-500">
                Explore Astrofied Module
              </span>
              <span className="text-[10px] opacity-60 font-semibold">• Next 3–4 Months</span>
            </div>
            <h2
              className="text-base sm:text-xl font-nunito font-extrabold tracking-tight"
              style={{ fontFamily: '"Nunito", sans-serif' }}
            >
              Manage "What’s Going to Happen" (Next 3–4 Months)
            </h2>
            <p className="text-[11px] sm:text-xs opacity-75 font-mulish">
              Edit upcoming forecast cards, triggers, indicators, and rich styled HTML text with automatic dark mode color adaption.
            </p>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
          <button
            type="button"
            onClick={() => {
              if (!jsonMode) {
                setRawJsonText(JSON.stringify(forecastsData, null, 2));
              }
              setJsonMode(!jsonMode);
            }}
            className={`px-3 py-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              jsonMode
                ? 'bg-purple-600 text-white border-purple-600'
                : isDarkMode
                ? 'bg-white/5 border-white/10 hover:bg-white/10'
                : 'bg-black/5 border-black/10 hover:bg-black/10'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{jsonMode ? 'Form View' : 'Raw JSON'}</span>
          </button>

          <button
            type="button"
            onClick={handleAddUpcoming}
            className={`px-3 py-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              isDarkMode
                ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white'
                : 'bg-black/5 border-black/10 hover:bg-black/10 text-black'
            }`}
          >
            <Plus className="w-3.5 h-3.5 text-purple-500" />
            <span>+ New Forecast</span>
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
          <div className="flex items-center justify-between pb-2 border-b border-black/10 dark:border-white/10">
            <span className="text-xs font-bold uppercase tracking-wider opacity-70">
              Raw JSON Editor (Next 3–4 Months Forecasts)
            </span>
            <span className="text-[11px] opacity-60">Direct schema access</span>
          </div>
          <textarea
            value={rawJsonText}
            onChange={(e) => setRawJsonText(e.target.value)}
            rows={22}
            className="w-full p-4 rounded-xl border font-mono text-xs outline-none bg-black/40 text-purple-400 border-white/10"
          />
        </div>
      ) : (
        /* VISUAL FORM EDITOR MODE */
        <div className="flex flex-col gap-5">
          {/* MAIN 2-COLUMN LAYOUT: List Selector (Left) + Detail Editor & Preview (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
            
            {/* LEFT COLUMN: Horizontal swipe on mobile, vertical stack on desktop */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              <div
                className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border shadow-md flex flex-col gap-2 ${
                  isDarkMode ? 'bg-[#121212] border-white/10' : 'bg-white border-black/10'
                }`}
              >
                <div className="flex items-center justify-between pb-1.5 border-b border-black/10 dark:border-white/10">
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider opacity-70">
                    Select Forecast to Edit
                  </span>
                  <span className="text-[10px] opacity-60 font-semibold">
                    {forecastsData.upcomingForecasts.length} entries
                  </span>
                </div>

                {/* List items */}
                <div className="flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-y-auto max-h-none lg:max-h-[560px] pb-1.5 lg:pb-0 scrollbar-none -mx-1 px-1 lg:mx-0 lg:px-0">
                  {forecastsData.upcomingForecasts.map((fc, idx) => (
                    <button
                      key={fc.id || idx}
                      type="button"
                      onClick={() => setSelectedUpcomingId(fc.id)}
                      className={`p-2.5 sm:p-3 rounded-xl text-left border flex flex-col gap-1 transition-all cursor-pointer min-w-[200px] sm:min-w-[240px] lg:min-w-0 shrink-0 lg:shrink lg:w-full ${
                        selectedUpcomingId === fc.id
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
                          {idx + 1}. {fc.title || 'Untitled Forecast'}
                        </span>
                        <span className="text-[9px] uppercase tracking-wider opacity-75 shrink-0 px-1.5 py-0.5 rounded-full border">
                          {fc.urgency || 'Alert'}
                        </span>
                      </div>
                      <span className="text-[11px] opacity-75 line-clamp-1 font-mulish">
                        {fc.timeframe || 'Active horizon'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Detail Form & Real-time Live Preview */}
            <div className="lg:col-span-8 flex flex-col gap-5 sm:gap-6">
              
              {/* Form Card */}
              <div
                className={`p-3.5 sm:p-6 rounded-xl sm:rounded-2xl border shadow-xl flex flex-col gap-4 sm:gap-6 ${
                  isDarkMode ? 'bg-[#121212] border-white/10' : 'bg-white border-black/10'
                }`}
              >
                {/* Header bar: Title & Delete */}
                <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-purple-500" />
                    <h3 className="text-base sm:text-lg font-nunito font-bold">
                      Editing: {currentUpcoming.title || 'Forecast'}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={handleDeleteCurrent}
                    className="px-3 py-1.5 rounded-xl border text-xs text-rose-500 border-rose-500/30 hover:bg-rose-500/10 flex items-center gap-1 font-bold transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Card</span>
                  </button>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-[11px] font-bold opacity-75 mb-1 uppercase tracking-wider">
                    Forecast Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={currentUpcoming.title || ''}
                    onChange={(e) => updateCurrentUpcoming({ title: e.target.value })}
                    placeholder="e.g. Major Economic Policy Shift & Banking Liquidity Surge"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-bold outline-none font-nunito ${
                      isDarkMode
                        ? 'bg-black/40 border-white/10 focus:border-[#f0fe4f] text-[#f0fe4f]'
                        : 'bg-[#FAF9F5] border-black/15 focus:border-[#A30000] text-[#A30000]'
                    }`}
                  />
                </div>

                {/* Row: Category + Urgency Tag + Timeframe */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold opacity-75 mb-1 uppercase tracking-wider">
                      Category
                    </label>
                    <input
                      type="text"
                      value={currentUpcoming.category || ''}
                      onChange={(e) => updateCurrentUpcoming({ category: e.target.value })}
                      list="category-presets"
                      placeholder="e.g. Economy & Markets"
                      className={`w-full px-3 py-2 rounded-xl border text-xs font-semibold outline-none ${
                        isDarkMode ? 'bg-black/40 border-white/10' : 'bg-[#FAF9F5] border-black/15'
                      }`}
                    />
                    <datalist id="category-presets">
                      {CATEGORY_PRESETS.map((c) => (
                        <option key={c} value={c} />
                      ))}
                    </datalist>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold opacity-75 mb-1 uppercase tracking-wider">
                      Urgency Badge
                    </label>
                    <input
                      type="text"
                      value={currentUpcoming.urgency || ''}
                      onChange={(e) => updateCurrentUpcoming({ urgency: e.target.value })}
                      list="urgency-presets"
                      placeholder="e.g. HIGH IMPACT"
                      className={`w-full px-3 py-2 rounded-xl border text-xs font-bold outline-none ${
                        isDarkMode ? 'bg-black/40 border-white/10' : 'bg-[#FAF9F5] border-black/15'
                      }`}
                    />
                    <datalist id="urgency-presets">
                      {URGENCY_PRESETS.map((u) => (
                        <option key={u} value={u} />
                      ))}
                    </datalist>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold opacity-75 mb-1 uppercase tracking-wider">
                      Timeframe Horizon
                    </label>
                    <input
                      type="text"
                      value={currentUpcoming.timeframe || ''}
                      onChange={(e) => updateCurrentUpcoming({ timeframe: e.target.value })}
                      placeholder="e.g. Next 30–60 Days (Nov–Dec 2026)"
                      className={`w-full px-3 py-2 rounded-xl border text-xs font-semibold outline-none ${
                        isDarkMode ? 'bg-black/40 border-white/10' : 'bg-[#FAF9F5] border-black/15'
                      }`}
                    />
                  </div>
                </div>

                {/* Summary with Rich Text Toolbar */}
                <PoliticalRichTextEditor
                  label="Forecast Detailed Summary (Color, Bold, Italics, Links Supported)"
                  value={currentUpcoming.summary || ''}
                  onChange={(val) => updateCurrentUpcoming({ summary: val })}
                  placeholder="Detailed astrological forecast summary..."
                  isDarkMode={isDarkMode}
                  rows={4}
                />

                {/* Planetary Drivers / Trigger */}
                <div>
                  <label className="block text-[11px] font-bold opacity-75 mb-1 uppercase tracking-wider">
                    Planetary Trigger / Astrological Drivers
                  </label>
                  <input
                    type="text"
                    value={currentUpcoming.planetaryDrivers || ''}
                    onChange={(e) => updateCurrentUpcoming({ planetaryDrivers: e.target.value })}
                    placeholder="e.g. Jupiter in Cancer (Exalted) moving into Leo with beneficial aspect..."
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none font-mulish ${
                      isDarkMode ? 'bg-black/40 border-white/10' : 'bg-[#FAF9F5] border-black/15'
                    }`}
                  />
                </div>

                {/* Key Signals / Indicators to Watch */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold opacity-75 uppercase tracking-wider">
                      Indicators to Watch / Key Signals ({currentUpcoming.keySignals?.length || 0})
                    </label>
                    <button
                      type="button"
                      onClick={handleAddSignal}
                      className="px-2.5 py-1 rounded-lg border text-[11px] font-bold transition-all flex items-center gap-1 opacity-80 hover:opacity-100"
                    >
                      <Plus className="w-3 h-3 text-purple-500" />
                      <span>+ Add Indicator</span>
                    </button>
                  </div>

                  <div className="flex flex-col gap-2">
                    {(currentUpcoming.keySignals || []).map((sig, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2">
                        <span className="text-xs font-bold text-purple-500 shrink-0">
                          {sIdx + 1}.
                        </span>
                        <input
                          type="text"
                          value={sig}
                          onChange={(e) => handleUpdateSignal(sIdx, e.target.value)}
                          className={`flex-1 px-3 py-1.5 rounded-lg border text-xs outline-none font-mulish ${
                            isDarkMode ? 'bg-black/40 border-white/10' : 'bg-[#FAF9F5] border-black/15'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => handleDeleteSignal(sIdx)}
                          className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
                          title="Delete indicator"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Real-Time Live Website Card Preview Box */}
                <div className="pt-4 border-t border-black/10 dark:border-white/10 flex flex-col gap-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider opacity-70 flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Live Website Card Preview (Auto Dark-Mode #A30000 ➔ Yellow Active):</span>
                    </span>

                    {/* Theme switcher */}
                    <div className="flex items-center gap-1 text-[11px] font-bold">
                      <button
                        type="button"
                        onClick={() => setPreviewTheme('light')}
                        className={`px-2 py-0.5 rounded cursor-pointer ${
                          previewTheme === 'light' ? 'bg-[#A30000] text-white' : 'opacity-60'
                        }`}
                      >
                        Light
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreviewTheme('dark')}
                        className={`px-2 py-0.5 rounded cursor-pointer ${
                          previewTheme === 'dark' ? 'bg-[#f0fe4f] text-black font-extrabold' : 'opacity-60'
                        }`}
                      >
                        Dark
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreviewTheme('current')}
                        className={`px-2 py-0.5 rounded cursor-pointer ${
                          previewTheme === 'current' ? 'bg-gray-500 text-white' : 'opacity-60'
                        }`}
                      >
                        Current
                      </button>
                    </div>
                  </div>

                  {/* Rendered Card Mock */}
                  <div className={isPreviewDark ? 'dark' : ''}>
                    <div
                      className={`whats-going-card rounded-2xl sm:rounded-[30px] p-4 sm:p-7 border-[0.5px] shadow-sm transition-all relative overflow-hidden ${
                        isPreviewDark
                          ? 'bg-[#17202a] border-white text-white'
                          : 'bg-[#f5f5dd] border-[#A30000] text-black'
                      }`}
                      style={{
                        border: isPreviewDark ? '0.5px solid #ffffff' : '0.5px solid #A30000'
                      }}
                    >
                      <div>
                        {/* Meta Bar */}
                        <div className="flex items-center justify-between gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap">
                          <span
                            className={`px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider border ${
                              isPreviewDark ? 'bg-white/5 border-white/10 text-gray-300' : 'bg-white border-black/10 text-gray-800'
                            }`}
                          >
                            {currentUpcoming.category || 'Category'}
                          </span>

                          <span className={`px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider border ${currentUpcoming.badgeColor || 'bg-purple-500/10 text-purple-400 border-purple-500/30'}`}>
                            {currentUpcoming.urgency || 'URGENCY'}
                          </span>
                        </div>

                        {/* Timeframe pill */}
                        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold font-nunito text-gold dark:text-[#f0fe4f] mb-1.5 sm:mb-2">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{currentUpcoming.timeframe || 'Horizon'}</span>
                        </div>

                        {/* Title - Auto Yellow in Dark Mode */}
                        <h3
                          className={`text-base sm:text-2xl font-mulish tracking-tight mb-2 sm:mb-3 leading-snug font-medium ${
                            isPreviewDark ? 'text-[#f0fe4f]' : 'text-[#A30000]'
                          }`}
                          style={{ fontFamily: '"Mulish", sans-serif', fontWeight: 500 }}
                        >
                          {currentUpcoming.title || 'Forecast Title'}
                        </h3>

                        {/* Summary */}
                        <div
                          className="text-xs sm:text-sm leading-relaxed opacity-85 font-mulish mb-4 text-justify"
                          dangerouslySetInnerHTML={{
                            __html: isPreviewDark
                              ? (currentUpcoming.summary || '').replace(/#a30000/gi, '#f0fe4f').replace(/rgb\(163,\s*0,\s*0\)/gi, '#f0fe4f')
                              : currentUpcoming.summary || 'Summary text goes here...'
                          }}
                        />

                        {/* Planetary Drivers */}
                        {currentUpcoming.planetaryDrivers && (
                          <div
                            className={`p-2.5 sm:p-3.5 rounded-xl border text-[11px] sm:text-xs font-mulish mb-4 ${
                              isPreviewDark ? 'bg-white/[0.02] border-white/5' : 'bg-white border-black/10'
                            }`}
                          >
                            <strong className="block text-gold dark:text-[#f0fe4f] mb-0.5">Planetary Trigger:</strong>
                            <span className="opacity-80">{currentUpcoming.planetaryDrivers}</span>
                          </div>
                        )}

                        {/* Indicators */}
                        {(currentUpcoming.keySignals || []).length > 0 && (
                          <div className="flex flex-col gap-1.5 mb-2">
                            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider opacity-60">
                              Indicators to Watch:
                            </span>
                            {currentUpcoming.keySignals.map((signal, sIdx) => (
                              <div key={sIdx} className="flex items-start gap-1.5 text-[11px] sm:text-xs font-mulish opacity-85">
                                <span className="text-purple-500 font-bold">•</span>
                                <span>{signal}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
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
                    <span>{isSaving ? 'Publishing...' : 'Save & Publish Forecasts'}</span>
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
