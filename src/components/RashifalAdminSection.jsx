import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Save, 
  RotateCw, 
  Trash2, 
  Calendar, 
  Sparkles, 
  Eye, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Copy, 
  Check, 
  Flame, 
  Droplets, 
  Wind, 
  Mountain,
  ListOrdered,
  Plus,
  Eraser
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { getWeeklyRashifal, saveWeeklyRashifal } from '../lib/weeklyRashifalStorage';
import defaultRashifal from '../data/weeklyRashifal.json';

export default function RashifalAdminSection({ showToast }) {
  const { isDarkMode } = useTheme();
  const [rashifalData, setRashifalData] = useState(defaultRashifal);
  const [selectedRashiId, setSelectedRashiId] = useState('aries');
  const [isSaving, setIsSaving] = useState(false);
  const [jsonMode, setJsonMode] = useState(false);
  const [rawJsonText, setRawJsonText] = useState('');
  const [copied, setCopied] = useState(false);
  const [activePointsText, setActivePointsText] = useState('');

  // Helper to extract points array from rashi object
  const getRashiPoints = (rashi) => {
    if (Array.isArray(rashi?.points) && rashi.points.length > 0) {
      return rashi.points;
    }
    // Backward compatibility with legacy forecast/career/finance fields
    const legacy = [rashi?.forecast, rashi?.career, rashi?.finance, rashi?.love, rashi?.health].filter(Boolean);
    return legacy.length > 0 ? legacy : [];
  };

  useEffect(() => {
    getWeeklyRashifal().then((data) => {
      if (data && Array.isArray(data.rashis) && data.rashis.length === 12) {
        setRashifalData(data);
        setRawJsonText(JSON.stringify(data, null, 2));
        const cur = data.rashis.find(r => r.id === selectedRashiId) || data.rashis[0];
        const pts = getRashiPoints(cur);
        setActivePointsText(pts.map((p, i) => `${i + 1}. ${p}`).join('\n\n'));
      }
    });
  }, []);

  const currentRashi = rashifalData.rashis.find(r => r.id === selectedRashiId) || rashifalData.rashis[0];

  // Sync textarea text whenever selected sign changes
  useEffect(() => {
    const cur = rashifalData.rashis.find(r => r.id === selectedRashiId) || rashifalData.rashis[0];
    if (cur) {
      const pts = getRashiPoints(cur);
      setActivePointsText(pts.map((p, i) => `${i + 1}. ${p}`).join('\n\n'));
    }
  }, [selectedRashiId]);

  const handleUpdatePointsFromText = (rawText) => {
    // Parse each numbered block or line into points array
    const rawLines = rawText.split('\n').map(l => l.trim()).filter(Boolean);
    const parsedPoints = [];

    rawLines.forEach(line => {
      // Strip leading numbering like "1. ", "1) ", "- ", "• ", "* "
      const cleanPoint = line.replace(/^(\d+[\.\)]|[-*•])\s*/, '').trim();
      if (cleanPoint) {
        parsedPoints.push(cleanPoint);
      }
    });

    setRashifalData(prev => {
      const updatedRashis = prev.rashis.map(r => {
        if (r.id === selectedRashiId) {
          return {
            ...r,
            points: parsedPoints,
            // Clean up legacy sub-parts if present
            career: undefined,
            finance: undefined,
            love: undefined,
            health: undefined,
            luckyColor: undefined,
            luckyNumber: undefined,
            auspiciousDay: undefined,
            remedy: undefined
          };
        }
        return r;
      });
      const updated = { ...prev, rashis: updatedRashis };
      setRawJsonText(JSON.stringify(updated, null, 2));
      return updated;
    });
  };

  const handleAutoNumber = () => {
    const pts = getRashiPoints(currentRashi);
    if (pts.length === 0) return;
    const formatted = pts.map((p, i) => `${i + 1}. ${p}`).join('\n\n');
    setActivePointsText(formatted);
    handleUpdatePointsFromText(formatted);
    showToast('Auto-formatted all points with numbers!');
  };

  const handleAddNewPoint = () => {
    const pts = getRashiPoints(currentRashi);
    const updatedPoints = [...pts, `New prediction point for ${currentRashi.rashi}`];
    const formatted = updatedPoints.map((p, i) => `${i + 1}. ${p}`).join('\n\n');
    setActivePointsText(formatted);
    handleUpdatePointsFromText(formatted);
  };

  const handleClearPoints = () => {
    if (window.confirm(`Clear all bullet points for ${currentRashi.rashi}?`)) {
      setActivePointsText('');
      handleUpdatePointsFromText('');
    }
  };

  const handleUpdateMetaField = (field, value) => {
    setRashifalData(prev => {
      const updated = { ...prev, [field]: value };
      setRawJsonText(JSON.stringify(updated, null, 2));
      return updated;
    });
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      const payload = {
        ...rashifalData,
        lastUpdated: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST'
      };
      const res = await saveWeeklyRashifal(payload);
      if (res.success) {
        showToast(res.savedViaApi 
          ? 'Weekly Rashifal saved to local JSON file & live website!' 
          : 'Weekly Rashifal saved to live site!');
      } else {
        showToast(res.error || 'Failed to save Weekly Rashifal', 'error');
      }
    } catch (e) {
      showToast(e.message || 'Error saving data', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleApplyJson = () => {
    try {
      const parsed = JSON.parse(rawJsonText);
      if (!parsed.rashis || !Array.isArray(parsed.rashis) || parsed.rashis.length !== 12) {
        showToast('Invalid format: JSON must have a "rashis" array of all 12 signs.', 'error');
        return;
      }
      setRashifalData(parsed);
      setJsonMode(false);
      showToast('JSON successfully imported into editor!');
    } catch (err) {
      showToast('JSON Syntax Error: ' + err.message, 'error');
    }
  };

  const handleResetToDefault = () => {
    if (window.confirm('Are you sure you want to reset Weekly Rashifal back to initial template?')) {
      setRashifalData(defaultRashifal);
      setRawJsonText(JSON.stringify(defaultRashifal, null, 2));
      showToast('Reset to default template.');
    }
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(rashifalData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    showToast('Copied full 12-Rashi JSON to clipboard!');
  };

  const currentPoints = getRashiPoints(currentRashi);

  return (
    <div className="flex flex-col gap-6">
      {/* Top Banner */}
      <div
        className={`p-3.5 sm:p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 shadow-sm ${
          isDarkMode ? 'bg-[#141414] border-white/10' : 'bg-white border-black/10'
        }`}
      >
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-gold dark:text-[#f0fe4f]">
              Weekly Horoscope Control Center
            </span>
            <span className="px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black bg-emerald-500/10 text-emerald-500 border border-emerald-500/30">
              12 RASHIS • BULLET POINTS
            </span>
          </div>
          <h2
            className="text-base sm:text-xl font-bold font-nunito tracking-tight mt-0.5"
            style={{ fontFamily: '"Nunito", sans-serif' }}
          >
            Manage & Publish Weekly Rashifal
          </h2>
          <p className="text-[11px] sm:text-xs opacity-75 font-mulish">
            Generalized numbered bullet points format (1., 2., 3., ...) per sign. No sub-categories.
          </p>
        </div>

        {/* Action Buttons: Save & JSON Mode */}
        <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setJsonMode(!jsonMode)}
            className={`flex-1 sm:flex-initial justify-center px-3 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
              jsonMode
                ? 'bg-purple-600 text-white border-purple-600 shadow'
                : isDarkMode
                ? 'border-white/20 hover:bg-white/5 text-gray-200'
                : 'border-black/20 hover:bg-black/5 text-gray-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{jsonMode ? 'Form View' : 'Quick JSON'}</span>
          </button>

          <button
            type="button"
            onClick={handleCopyJson}
            className={`p-2 rounded-xl text-xs font-bold border transition-all flex items-center justify-center ${
              isDarkMode
                ? 'border-white/20 hover:bg-white/5 text-gray-200'
                : 'border-black/20 hover:bg-black/5 text-gray-800'
            }`}
            title="Copy entire 12-Rashi JSON"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <button
            type="button"
            onClick={handleSaveAll}
            disabled={isSaving}
            className={`w-full sm:w-auto justify-center px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm tracking-wider uppercase transition-all shadow-lg flex items-center gap-2 ${
              isSaving
                ? 'opacity-60 cursor-wait'
                : isDarkMode
                ? 'bg-[#f0fe4f] text-black hover:brightness-110 active:scale-95'
                : 'bg-[#A30000] text-white hover:bg-[#850000] active:scale-95'
            }`}
            style={{ fontFamily: '"Nunito", sans-serif' }}
          >
            {isSaving ? <RotateCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{isSaving ? 'Saving...' : 'Save & Publish Rashifal'}</span>
          </button>
        </div>
      </div>

      {/* JSON RAW PASTE / EDIT MODE */}
      {jsonMode ? (
        <div
          className={`p-4 sm:p-6 rounded-2xl border shadow-xl flex flex-col gap-4 ${
            isDarkMode ? 'bg-[#121212] border-white/10' : 'bg-white border-black/10'
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10">
            <div>
              <h3 className="text-sm sm:text-base font-bold font-nunito flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-500" />
                <span>Direct JSON Editor / Importer</span>
              </h3>
              <p className="text-xs opacity-70 font-mulish">
                Paste pre-written 12-rashi predictions with <code>"points": ["1...", "2..."]</code> arrays to update all signs simultaneously.
              </p>
            </div>
            <button
              type="button"
              onClick={handleResetToDefault}
              className="text-xs font-bold text-rose-500 hover:underline flex items-center gap-1"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Reset Template</span>
            </button>
          </div>

          <textarea
            value={rawJsonText}
            onChange={(e) => setRawJsonText(e.target.value)}
            rows={18}
            className={`w-full p-4 rounded-xl border text-xs font-mono outline-none leading-relaxed resize-y ${
              isDarkMode
                ? 'bg-black/60 border-white/10 text-emerald-400 focus:border-gold'
                : 'bg-stone-50 border-black/15 text-stone-900 focus:border-[#A30000]'
            }`}
          />

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setJsonMode(false)}
              className="px-4 py-2 rounded-xl text-xs font-bold border border-black/20 dark:border-white/20 hover:bg-black/5"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApplyJson}
              className="px-6 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Apply JSON to Form</span>
            </button>
          </div>
        </div>
      ) : (
        /* VISUAL FORM EDITOR MODE */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          {/* Left Column: Metadata & 12 Rashi Nav (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4 sm:gap-5">
            {/* Week Meta Card */}
            <div
              className={`p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border shadow-md flex flex-col gap-3 ${
                isDarkMode ? 'bg-[#121212] border-white/10' : 'bg-white border-black/10'
              }`}
            >
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider opacity-70 pb-1.5 border-b border-black/10 dark:border-white/10">
                1. Week Overview & Date Range
              </span>

              <div>
                <label className="block text-[11px] font-bold opacity-75 mb-1">Week Title</label>
                <input
                  type="text"
                  value={rashifalData.weekTitle || ''}
                  onChange={(e) => handleUpdateMetaField('weekTitle', e.target.value)}
                  placeholder="e.g. Weekly Rashifal & Horoscope"
                  className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm font-semibold outline-none ${
                    isDarkMode ? 'bg-black/40 border-white/10 focus:border-gold' : 'bg-[#FAF9F5] border-black/15 focus:border-[#A30000]'
                  }`}
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold opacity-75 mb-1">
                  Date Range (e.g. 17 Nov – 23 Nov 2026)
                </label>
                <input
                  type="text"
                  value={rashifalData.dateRange || ''}
                  onChange={(e) => handleUpdateMetaField('dateRange', e.target.value)}
                  placeholder="Active week dates..."
                  className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm font-semibold outline-none ${
                    isDarkMode ? 'bg-black/40 border-white/10 focus:border-gold' : 'bg-[#FAF9F5] border-black/15 focus:border-[#A30000]'
                  }`}
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold opacity-75 mb-1">Overall Weekly Theme / Synopsis</label>
                <textarea
                  value={rashifalData.overview || ''}
                  onChange={(e) => handleUpdateMetaField('overview', e.target.value)}
                  rows={2}
                  placeholder="General astrological synopsis for the week..."
                  className={`w-full p-2.5 rounded-xl border text-xs outline-none font-mulish leading-relaxed ${
                    isDarkMode ? 'bg-black/40 border-white/10 focus:border-gold' : 'bg-[#FAF9F5] border-black/15 focus:border-[#A30000]'
                  }`}
                />
              </div>
            </div>

            {/* 12 Rashi Selector (Grid on mobile, list on desktop) */}
            <div
              className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border shadow-md flex flex-col gap-2 ${
                isDarkMode ? 'bg-[#121212] border-white/10' : 'bg-white border-black/10'
              }`}
            >
              <div className="flex items-center justify-between pb-1.5 border-b border-black/10 dark:border-white/10">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider opacity-70">
                  2. Select Sign to Edit
                </span>
                <span className="text-[10px] opacity-60 font-semibold">12 signs</span>
              </div>

              <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-6 lg:flex lg:flex-col gap-1.5 max-h-none lg:max-h-[460px] lg:overflow-y-auto pr-0 lg:pr-1">
                {rashifalData.rashis.map((r, i) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setSelectedRashiId(r.id)}
                    className={`p-1.5 sm:p-2.5 rounded-xl text-left border flex items-center justify-center lg:justify-between gap-1 sm:gap-2 transition-all cursor-pointer ${
                      selectedRashiId === r.id
                        ? isDarkMode
                          ? 'bg-[#f0fe4f] text-black border-[#f0fe4f] font-bold shadow-sm'
                          : 'bg-[#A30000] text-white border-[#A30000] font-bold shadow-sm'
                        : isDarkMode
                        ? 'bg-white/[0.02] border-white/5 hover:border-white/20 text-gray-300'
                        : 'bg-black/[0.02] border-black/5 hover:border-black/20 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-1 sm:gap-2 truncate">
                      <span className="text-sm sm:text-base shrink-0">{r.symbol}</span>
                      <span className="text-[10px] sm:text-xs font-nunito font-bold truncate">
                        {r.rashi}
                      </span>
                    </div>
                    <span className="text-[9px] sm:text-[10px] opacity-75 hidden lg:inline shrink-0">{r.element}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Selected Sign Bullet Points Editor & Live Preview (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-4 sm:gap-5">
            <div
              className={`p-3.5 sm:p-6 rounded-xl sm:rounded-2xl border shadow-xl flex flex-col gap-3.5 sm:gap-4 ${
                isDarkMode ? 'bg-[#121212] border-white/10' : 'bg-white border-black/10'
              }`}
            >
              {/* Sign Title Banner */}
              <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10 flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{currentRashi.symbol}</span>
                  <div>
                    <h3
                      className="text-lg sm:text-xl font-bold font-nunito leading-tight"
                      style={{ fontFamily: '"Nunito", sans-serif' }}
                    >
                      Editing: {currentRashi.rashi} ({currentRashi.hindiName})
                    </h3>
                    <span className="text-xs opacity-60 font-mulish">
                      Ruler: {currentRashi.ruler} • Element: {currentRashi.element}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleAutoNumber}
                    className="px-3 py-1.5 rounded-lg border text-xs font-bold transition-all flex items-center gap-1 opacity-80 hover:opacity-100"
                    title="Prefix every line with 1., 2., 3., etc."
                  >
                    <ListOrdered className="w-3.5 h-3.5" />
                    <span>Auto Number</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleAddNewPoint}
                    className="px-3 py-1.5 rounded-lg border text-xs font-bold transition-all flex items-center gap-1 opacity-80 hover:opacity-100"
                    title="Append a new point"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Point</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleClearPoints}
                    className="p-1.5 rounded-lg border text-xs text-rose-500 opacity-70 hover:opacity-100"
                    title="Clear points for this sign"
                  >
                    <Eraser className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Generalized Bullet Points Input Area */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider opacity-80 flex items-center gap-1.5">
                    <ListOrdered className="w-4 h-4 text-gold dark:text-[#f0fe4f]" />
                    <span>Rashifal Bullet Points (Post line-by-line or numbered)</span>
                  </label>
                  <span className="text-[11px] opacity-60 font-mulish">
                    {currentPoints.length} {currentPoints.length === 1 ? 'point' : 'points'}
                  </span>
                </div>

                <p className="text-[11px] opacity-65 mb-2 font-mulish">
                  Type or paste your points below. You can start each line with <code>1. </code>, <code>2. </code> or write line by line. Every line will be displayed as an individual numbered bullet card on the website.
                </p>

                <textarea
                  value={activePointsText}
                  onChange={(e) => {
                    const val = e.target.value;
                    setActivePointsText(val);
                    handleUpdatePointsFromText(val);
                  }}
                  rows={9}
                  placeholder={`1. First prediction or guidance point for ${currentRashi.rashi}...\n2. Second point...\n3. Third point...`}
                  className={`w-full p-3.5 rounded-xl border text-xs sm:text-sm outline-none font-mulish leading-relaxed ${
                    isDarkMode ? 'bg-black/40 border-white/10 focus:border-gold' : 'bg-[#FAF9F5] border-black/15 focus:border-[#A30000]'
                  }`}
                />
              </div>

              {/* Live Card Preview Box */}
              <div className="mt-2 pt-4 border-t border-black/10 dark:border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider opacity-70 flex items-center gap-1.5 mb-3">
                  <Eye className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Live Preview as Seen on Website:</span>
                </span>

                <div
                  className={`p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border transition-all ${
                    isDarkMode ? 'bg-[#181818] border-white/10' : 'bg-[#f5f5dd] border-orange-300/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{currentRashi.symbol}</span>
                      <div>
                        <h4 className="text-base font-bold font-nunito leading-tight">
                          {currentRashi.rashi}
                        </h4>
                        <span className="text-[11px] opacity-70">
                          {currentRashi.hindiName} • Ruler: {currentRashi.ruler}
                        </span>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-emerald-500/30 text-emerald-500">
                      {currentRashi.element}
                    </span>
                  </div>

                  {currentPoints.length === 0 ? (
                    <div className="p-4 text-center text-xs opacity-50 italic">
                      No points added yet. Type in the box above to see the live preview.
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2.5">
                      {currentPoints.map((pt, pIdx) => (
                        <div
                          key={pIdx}
                          className={`p-3 rounded-xl border text-xs font-mulish flex items-start gap-2.5 leading-relaxed ${
                            isDarkMode
                              ? 'bg-white/[0.03] border-white/10 text-gray-200'
                              : 'bg-white border-orange-200/80 text-stone-900 shadow-sm'
                          }`}
                        >
                          <span
                            className={`w-5 h-5 rounded-full shrink-0 flex items-center justify-center text-[10px] font-black font-nunito shadow-sm ${
                              isDarkMode ? 'bg-[#f0fe4f] text-black' : 'bg-[#A30000] text-white'
                            }`}
                          >
                            {pIdx + 1}
                          </span>
                          <p className="flex-1 text-justify pt-0.5">{pt}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Save Action */}
              <div className="pt-3 flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveAll}
                  disabled={isSaving}
                  className={`w-full sm:w-auto px-8 py-3 rounded-xl font-black text-xs sm:text-sm tracking-wider uppercase transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer ${
                    isSaving
                      ? 'opacity-60 cursor-wait'
                      : isDarkMode
                      ? 'bg-[#f0fe4f] text-black hover:brightness-110 active:scale-95'
                      : 'bg-[#A30000] text-white hover:bg-[#850000] active:scale-95'
                  }`}
                  style={{ fontFamily: '"Nunito", sans-serif' }}
                >
                  <Save className="w-4 h-4" />
                  <span>Save All 12 Rashis</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
