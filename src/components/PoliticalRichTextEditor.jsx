import React, { useState, useRef, useEffect } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Palette,
  Link as LinkIcon,
  Eraser,
  Check,
  X,
  ExternalLink,
  Sun,
  Moon
} from 'lucide-react';

const PRESET_PALETTE = [
  { name: 'Brand Red', hex: '#A30000' },
  { name: 'Vibrant Red', hex: '#FF0000' },
  { name: 'Solar Gold', hex: '#FFD700' },
  { name: 'Amber Orange', hex: '#F59E0B' },
  { name: 'Emerald Green', hex: '#10B981' },
  { name: 'Electric Blue', hex: '#2563EB' },
  { name: 'Sky Blue', hex: '#38BDF8' },
  { name: 'Royal Purple', hex: '#8B5CF6' },
  { name: 'Rose Pink', hex: '#EC4899' },
  { name: 'Sunset Orange', hex: '#F97316' },
  { name: 'Slate Gray', hex: '#64748B' },
  { name: 'Charcoal Black', hex: '#111827' },
  { name: 'Pure White', hex: '#FFFFFF', border: true },
];

function normalizeHex(val) {
  if (!val) return '#A30000';
  let clean = val.trim();
  if (!clean.startsWith('#')) clean = '#' + clean;
  return clean;
}

function isValidHex(hex) {
  return /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/.test(hex);
}

export default function PoliticalRichTextEditor({
  value = '',
  onChange,
  placeholder = 'Enter description text...',
  isDarkMode = false,
  label = 'Description Text',
  rows = 4
}) {
  const [activePopover, setActivePopover] = useState(null); // 'color' | 'link' | null
  const [editorTheme, setEditorTheme] = useState(isDarkMode ? 'dark' : 'light'); // 'light' | 'dark'
  const [customHex, setCustomHex] = useState('#A30000');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [activeStates, setActiveStates] = useState({
    bold: false,
    italic: false,
    underline: false,
    strike: false
  });

  const editorRef = useRef(null);
  const containerRef = useRef(null);
  const savedRangeRef = useRef(null);

  // Sync editor theme when parent theme changes
  useEffect(() => {
    setEditorTheme(isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Sync value into contentEditable when outside value changes
  useEffect(() => {
    if (!editorRef.current) return;
    const currentHtml = editorRef.current.innerHTML;
    if (value !== currentHtml) {
      if (!value) {
        editorRef.current.innerHTML = '';
      } else if (document.activeElement !== editorRef.current) {
        editorRef.current.innerHTML = value;
      }
    }
  }, [value]);

  // Click outside to close popovers
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setActivePopover(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      savedRangeRef.current = sel.getRangeAt(0).cloneRange();
      const str = sel.toString();
      if (str) {
        setLinkText(str);
      }
    }
  };

  const restoreSelection = () => {
    if (!savedRangeRef.current) return;
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(savedRangeRef.current);
  };

  const updateActiveStates = () => {
    try {
      setActiveStates({
        bold: document.queryCommandState('bold'),
        italic: document.queryCommandState('italic'),
        underline: document.queryCommandState('underline'),
        strike: document.queryCommandState('strikeThrough')
      });
    } catch {
      // Ignore
    }
  };

  const handleInput = () => {
    if (!editorRef.current) return;
    const html = editorRef.current.innerHTML;
    if (onChange) onChange(html);
    updateActiveStates();
  };

  const execCommand = (cmd, val = null) => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    try {
      document.execCommand('styleWithCSS', false, true);
    } catch {}
    document.execCommand(cmd, false, val);
    handleInput();
  };

  const handleApplyColor = (colorHex) => {
    const normalized = normalizeHex(colorHex);
    restoreSelection();
    if (editorRef.current) editorRef.current.focus();

    try {
      document.execCommand('styleWithCSS', false, true);
      document.execCommand('foreColor', false, normalized);
    } catch {}

    handleInput();
    setActivePopover(null);
  };

  const handleInsertLink = () => {
    if (!linkUrl.trim()) return;
    restoreSelection();
    if (editorRef.current) editorRef.current.focus();

    let fullUrl = linkUrl.trim();
    if (!/^(https?:\/\/|mailto:|tel:|\/)/i.test(fullUrl)) {
      fullUrl = 'https://' + fullUrl;
    }

    const sel = window.getSelection();
    if (sel && !sel.isCollapsed && sel.toString().trim().length > 0) {
      document.execCommand('createLink', false, fullUrl);
    } else {
      const displayText = linkText.trim() || fullUrl;
      const linkTag = `<a href="${fullUrl}" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline; font-weight: 600;">${displayText}</a>`;
      document.execCommand('insertHTML', false, linkTag);
    }

    handleInput();
    setLinkUrl('');
    setLinkText('');
    setActivePopover(null);
  };

  const handleClearFormatting = () => {
    restoreSelection();
    if (editorRef.current) editorRef.current.focus();
    try {
      document.execCommand('removeFormat', false, null);
      document.execCommand('unlink', false, null);
    } catch {}
    handleInput();
  };

  const btnNormalClass = isDarkMode
    ? 'text-gray-200 hover:text-white hover:bg-white/10'
    : 'text-stone-800 hover:text-black hover:bg-black/10';

  return (
    <div ref={containerRef} className="flex flex-col gap-1.5 relative font-mulish" style={{ fontFamily: '"Mulish", sans-serif' }}>
      {/* Label Bar & Card Appearance Preview Switcher */}
      <div className="flex items-center justify-between">
        <label className="block text-[11px] font-bold opacity-75 uppercase tracking-wider">
          {label}
        </label>

        {/* Live Appearance Card Mode Switcher */}
        <div className={`flex items-center gap-1 p-0.5 rounded-lg text-[10px] font-bold border ${
          isDarkMode ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
        }`}>
          <span className="text-[9px] opacity-60 px-1 hidden sm:inline">Card Preview:</span>
          <button
            type="button"
            onClick={() => setEditorTheme('light')}
            className={`px-2 py-0.5 rounded-md transition-all flex items-center gap-1 cursor-pointer ${
              editorTheme === 'light'
                ? 'bg-[#f5f5dd] text-[#A30000] border border-orange-300 shadow-sm font-black'
                : 'opacity-60 hover:opacity-100'
            }`}
            title="Preview on Light Card: Normal text in dark charcoal, highlights in chosen colors"
          >
            <Sun className="w-3 h-3 text-amber-500" />
            <span>Light Card</span>
          </button>
          <button
            type="button"
            onClick={() => setEditorTheme('dark')}
            className={`px-2 py-0.5 rounded-md transition-all flex items-center gap-1 cursor-pointer ${
              editorTheme === 'dark'
                ? 'bg-[#141414] text-white border border-white/30 shadow-sm font-black'
                : 'opacity-60 hover:opacity-100'
            }`}
            title="Preview on Dark Card: Regular text is White, highlighted & bolded text turns to Yellow (#f0fe4f)"
          >
            <Moon className="w-3 h-3 text-blue-400" />
            <span>Dark Card</span>
          </button>
        </div>
      </div>

      {/* Visual Editor Toolbar - ALWAYS HIGH CONTRAST */}
      <div
        data-lenis-prevent="true"
        className={`p-1 sm:p-1.5 rounded-xl border flex items-center gap-1 shadow-sm select-none transition-colors overflow-x-auto scrollbar-none flex-nowrap sm:flex-wrap ${
          isDarkMode
            ? 'bg-[#18181b] border-white/15 text-white'
            : 'bg-white border-black/15 text-stone-900'
        }`}
      >
        {/* Bold Button */}
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            saveSelection();
            execCommand('bold');
          }}
          className={`p-1.5 rounded-lg transition-colors font-bold cursor-pointer ${
            activeStates.bold
              ? 'bg-[#A30000] text-white shadow-sm'
              : btnNormalClass
          }`}
          title="Bold (turns Yellow in dark mode)"
        >
          <Bold className="w-3.5 h-3.5" />
        </button>

        {/* Italic Button */}
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            saveSelection();
            execCommand('italic');
          }}
          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
            activeStates.italic
              ? 'bg-[#A30000] text-white shadow-sm'
              : btnNormalClass
          }`}
          title="Italic (Ctrl+I / Cmd+I)"
        >
          <Italic className="w-3.5 h-3.5" />
        </button>

        {/* Underline Button */}
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            saveSelection();
            execCommand('underline');
          }}
          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
            activeStates.underline
              ? 'bg-[#A30000] text-white shadow-sm'
              : btnNormalClass
          }`}
          title="Underline (Ctrl+U / Cmd+U)"
        >
          <Underline className="w-3.5 h-3.5" />
        </button>

        {/* Strikethrough Button */}
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            saveSelection();
            execCommand('strikeThrough');
          }}
          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
            activeStates.strike
              ? 'bg-[#A30000] text-white shadow-sm'
              : btnNormalClass
          }`}
          title="Strikethrough"
        >
          <Strikethrough className="w-3.5 h-3.5" />
        </button>

        <span className={`w-px h-4 mx-0.5 ${isDarkMode ? 'bg-white/20' : 'bg-black/15'}`} />

        {/* Color Palette Popover Button */}
        <div className="relative">
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              saveSelection();
              setActivePopover(activePopover === 'color' ? null : 'color');
            }}
            className={`px-2 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
              activePopover === 'color'
                ? 'bg-red-500 text-white shadow-sm'
                : btnNormalClass
            }`}
            title="Choose Text Color (Turns to Yellow in dark mode)"
          >
            <Palette className="w-3.5 h-3.5 text-red-500" />
            <span className="text-[11px] font-bold">Color</span>
            <div
              className="w-3 h-3 rounded-full border border-black/30 shadow-sm shrink-0"
              style={{ backgroundColor: customHex }}
            />
          </button>

          {/* COLOR POPOVER */}
          {activePopover === 'color' && (
            <div
              className={`absolute top-full left-0 mt-2 p-3 sm:p-3.5 rounded-2xl border shadow-2xl z-50 w-72 max-w-[calc(100vw-3rem)] flex flex-col gap-3 font-mulish ${
                isDarkMode
                  ? 'bg-[#1a1a1f] border-white/20 text-white shadow-black/80'
                  : 'bg-white border-black/15 text-stone-900 shadow-stone-400'
              }`}
              style={{ fontFamily: '"Mulish", sans-serif' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-1.5 border-b border-black/10 dark:border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-red-500" />
                  <span>Choose Color</span>
                </span>
                <button
                  type="button"
                  onClick={() => setActivePopover(null)}
                  className="p-1 rounded-md opacity-60 hover:opacity-100 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 1. COLOR PALETTE SWATCHES */}
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider opacity-60 mb-1.5">
                  1. Color Palette Swatches
                </div>
                <div className="grid grid-cols-7 gap-1.5">
                  {PRESET_PALETTE.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => {
                        setCustomHex(c.hex);
                        handleApplyColor(c.hex);
                      }}
                      title={`${c.name} (${c.hex})`}
                      className="w-7 h-7 rounded-full border border-black/20 dark:border-white/20 hover:scale-115 active:scale-95 transition-transform flex items-center justify-center shadow-sm cursor-pointer"
                      style={{ backgroundColor: c.hex }}
                    >
                      {customHex.toLowerCase() === c.hex.toLowerCase() && (
                        <Check className={`w-3.5 h-3.5 ${c.hex === '#FFFFFF' || c.hex === '#f0fe4f' || c.hex === '#FFD700' ? 'text-black' : 'text-white'}`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. HEX CODE & NATIVE SPECTRUM PICKER */}
              <div className="pt-2 border-t border-black/10 dark:border-white/10 flex flex-col gap-2">
                <div className="text-[10px] font-bold uppercase tracking-wider opacity-60">
                  2. Hex Code & Custom Spectrum
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-black/20 dark:border-white/20 shrink-0 shadow-sm cursor-pointer" title="Click to open visual spectrum color picker">
                    <input
                      type="color"
                      value={isValidHex(customHex) ? customHex : '#A30000'}
                      onChange={(e) => setCustomHex(e.target.value)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div
                      className="w-full h-full pointer-events-none"
                      style={{ backgroundColor: customHex }}
                    />
                  </div>

                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={customHex}
                      onChange={(e) => setCustomHex(e.target.value)}
                      placeholder="#A30000"
                      className={`w-full px-2.5 py-1.5 text-xs font-mono font-bold rounded-lg border outline-none uppercase ${
                        isDarkMode
                          ? 'bg-black/50 border-white/20 focus:border-gold text-white'
                          : 'bg-black/5 border-black/20 focus:border-[#A30000] text-black'
                      }`}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => handleApplyColor(customHex)}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#A30000] hover:bg-red-800 shadow-sm transition-all cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Hyperlink Popover Button */}
        <div className="relative">
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              saveSelection();
              setActivePopover(activePopover === 'link' ? null : 'link');
            }}
            className={`px-2 py-1.5 rounded-lg flex items-center gap-1 text-xs font-bold transition-all cursor-pointer ${
              activePopover === 'link'
                ? 'bg-blue-600 text-white shadow-sm'
                : btnNormalClass
            }`}
            title="Add or Edit Hyperlink"
          >
            <LinkIcon className="w-3.5 h-3.5 text-blue-500" />
            <span className="text-[11px] font-bold">Link</span>
          </button>

          {/* HYPERLINK POPOVER */}
          {activePopover === 'link' && (
            <div
              className={`absolute top-full left-0 mt-2 p-3 rounded-2xl border shadow-2xl z-50 w-72 max-w-[calc(100vw-3rem)] flex flex-col gap-2.5 font-mulish ${
                isDarkMode
                  ? 'bg-[#1a1a1f] border-white/20 text-white shadow-black/80'
                  : 'bg-white border-black/15 text-stone-900 shadow-stone-400'
              }`}
              style={{ fontFamily: '"Mulish", sans-serif' }}
            >
              <div className="flex items-center justify-between pb-1.5 border-b border-black/10 dark:border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider opacity-80 flex items-center gap-1.5">
                  <LinkIcon className="w-3.5 h-3.5 text-blue-500" />
                  <span>Insert Hyperlink</span>
                </span>
                <button
                  type="button"
                  onClick={() => setActivePopover(null)}
                  className="p-1 rounded-md opacity-60 hover:opacity-100 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider opacity-60 mb-1">
                  Destination URL
                </label>
                <input
                  type="text"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://instagram.com/astrofied..."
                  className={`w-full px-2.5 py-1.5 text-xs rounded-lg border outline-none ${
                    isDarkMode
                      ? 'bg-black/50 border-white/20 text-white focus:border-blue-400'
                      : 'bg-black/5 border-black/20 text-black focus:border-blue-600'
                  }`}
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider opacity-60 mb-1">
                  Display Text (Optional)
                </label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="e.g. Read Instagram Post"
                  className={`w-full px-2.5 py-1.5 text-xs rounded-lg border outline-none ${
                    isDarkMode
                      ? 'bg-black/50 border-white/20 text-white focus:border-blue-400'
                      : 'bg-black/5 border-black/20 text-black focus:border-blue-600'
                  }`}
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-1 border-t border-black/10 dark:border-white/10">
                <button
                  type="button"
                  onClick={handleInsertLink}
                  className="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-sm flex items-center gap-1 cursor-pointer"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Insert Link</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <span className={`w-px h-4 mx-0.5 ${isDarkMode ? 'bg-white/20' : 'bg-black/15'}`} />

        {/* Clear Formatting */}
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            saveSelection();
            handleClearFormatting();
          }}
          className={`p-1.5 rounded-lg cursor-pointer ${
            isDarkMode
              ? 'text-gray-300 hover:bg-white/10'
              : 'text-stone-700 hover:bg-black/10'
          }`}
          title="Clear text formatting from selection"
        >
          <Eraser className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Editor Body: Visual contentEditable accurately mimicking Card Background */}
      <div
        ref={editorRef}
        contentEditable={true}
        onInput={handleInput}
        onBlur={handleInput}
        onKeyUp={updateActiveStates}
        onMouseUp={updateActiveStates}
        data-lenis-prevent="true"
        data-placeholder={placeholder}
        className={`w-full p-3.5 rounded-xl border text-xs font-mulish leading-relaxed outline-none min-h-[96px] max-h-[220px] overflow-y-auto cursor-text transition-colors duration-200 political-rich-desc ${
          editorTheme === 'dark'
            ? 'bg-[#141414] border-white/20 text-white dark-editor focus:border-gold/60'
            : 'bg-[#f5f5dd] border-orange-300/60 text-stone-900 light-editor focus:border-[#A30000]/60'
        }`}
        style={{ fontFamily: '"Mulish", sans-serif' }}
      />

      {/* Help tooltip tip */}
      <div className="flex items-center justify-between text-[10px] opacity-60 px-1">
        <span>In dark mode: All text is White, and bolded or coloured text turns to Yellow (#f0fe4f).</span>
        <span>Viewing: <strong className="capitalize">{editorTheme} Card</strong></span>
      </div>
    </div>
  );
}
