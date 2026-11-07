import React, { useState, useRef, useEffect } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Palette,
  Highlighter,
  Type,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Minus,
  Eraser,
  ChevronDown,
  Sparkles,
  Eye,
  Edit3,
  AlignLeft,
  AlignCenter,
  AlignJustify,
  AlignRight
} from 'lucide-react';
import RichContent, { stripRichFormatting } from '../lib/renderRichContent';

const FONT_OPTIONS = [
  { name: 'Default (Mulish)', value: 'Mulish, sans-serif', family: "'Mulish', sans-serif" },
  { name: 'Nunito (Rounded)', value: 'Nunito, sans-serif', family: "'Nunito', sans-serif" },
  { name: 'Playfair (Editorial)', value: 'Playfair Display, serif', family: "'Playfair Display', serif" },
  { name: 'Cinzel (Vedic / Classic)', value: 'Cinzel, serif', family: "'Cinzel', serif" },
  { name: 'Inter (Clean Sans)', value: 'Inter, sans-serif', family: "'Inter', sans-serif" },
  { name: 'Monospace (Data / Time)', value: 'monospace', family: 'monospace' },
];

const TEXT_COLORS = [
  { name: 'Default', value: 'inherit', border: true },
  { name: 'Brand Red', value: '#FF0000' },
  { name: 'Crimson', value: '#A30000' },
  { name: 'Gold', value: '#FFD700' },
  { name: 'Amber', value: '#F59E0B' },
  { name: 'Emerald', value: '#10B981' },
  { name: 'Electric Blue', value: '#2563EB' },
  { name: 'Royal Purple', value: '#8B5CF6' },
  { name: 'Charcoal Black', value: '#111827' },
  { name: 'Pure White', value: '#FFFFFF', border: true },
];

const HIGHLIGHT_COLORS = [
  { name: 'Yellow', value: '#FEF08A' },
  { name: 'Gold', value: '#FDE68A' },
  { name: 'Coral / Red', value: '#FECACA' },
  { name: 'Mint Green', value: '#A7F3D0' },
  { name: 'Ice Blue', value: '#BAE6FD' },
  { name: 'Lavender', value: '#DDD6FE' },
  { name: 'Dark Slate', value: '#374151', textDark: true },
];

const ASTRO_SYMBOLS = [
  { label: '♈', name: 'Aries' },
  { label: '♉', name: 'Taurus' },
  { label: '♊', name: 'Gemini' },
  { label: '♋', name: 'Cancer' },
  { label: '♌', name: 'Leo' },
  { label: '♍', name: 'Virgo' },
  { label: '♎', name: 'Libra' },
  { label: '♏', name: 'Scorpio' },
  { label: '♐', name: 'Sagittarius' },
  { label: '♑', name: 'Capricorn' },
  { label: '♒', name: 'Aquarius' },
  { label: '♓', name: 'Pisces' },
  { label: '☉', name: 'Sun' },
  { label: '☽', name: 'Moon' },
  { label: '☿', name: 'Mercury' },
  { label: '♀', name: 'Venus' },
  { label: '♂', name: 'Mars' },
  { label: '♃', name: 'Jupiter' },
  { label: '♄', name: 'Saturn' },
  { label: '☊', name: 'Rahu' },
  { label: '☋', name: 'Ketu' },
  { label: '✨', name: 'Sparkle' },
  { label: '✦', name: 'Star' },
  { label: '🌟', name: 'Glow' },
  { label: '🔮', name: 'Crystal' },
];

export default function NewsfiedEditorToolbar({
  content = '',
  setContent,
  isDarkMode = false,
  editorTab = 'write',
  setEditorTab
}) {
  const [activeMenu, setActiveMenu] = useState(null); // 'font' | 'color' | 'highlight' | 'size' | null
  const [customColor, setCustomColor] = useState('#FF0000');
  const [customHighlight, setCustomHighlight] = useState('#FEF08A');
  const [isEmpty, setIsEmpty] = useState(!content || !content.trim());
  const [activeStates, setActiveStates] = useState({
    bold: false,
    italic: false,
    underline: false,
    strike: false,
    alignLeft: false,
    alignCenter: false,
    alignJustify: false,
    alignRight: false,
    ul: false,
    ol: false
  });

  const editorRef = useRef(null);
  const containerRef = useRef(null);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Configure default paragraph separator
  useEffect(() => {
    try {
      document.execCommand('defaultParagraphSeparator', false, 'p');
    } catch (e) {}
  }, []);

  const checkIsEmpty = (html) => {
    if (!html) return true;
    const stripped = html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
    return stripped.length === 0;
  };

  // Sync content into editable div when content prop changes from outside (e.g. form reset or initial load)
  useEffect(() => {
    if (!editorRef.current) return;
    const currentHtml = editorRef.current.innerHTML;

    if (content !== currentHtml) {
      if (!content || !content.trim()) {
        editorRef.current.innerHTML = '';
        setIsEmpty(true);
      } else if (document.activeElement !== editorRef.current) {
        editorRef.current.innerHTML = content;
        setIsEmpty(checkIsEmpty(content));
      }
    }
  }, [content]);

  // Update active formatting states for B, I, U, alignments, etc. based on cursor position
  const updateActiveStates = () => {
    try {
      setActiveStates({
        bold: document.queryCommandState('bold'),
        italic: document.queryCommandState('italic'),
        underline: document.queryCommandState('underline'),
        strike: document.queryCommandState('strikeThrough'),
        alignLeft: document.queryCommandState('justifyLeft'),
        alignCenter: document.queryCommandState('justifyCenter'),
        alignJustify: document.queryCommandState('justifyFull'),
        alignRight: document.queryCommandState('justifyRight'),
        ul: document.queryCommandState('insertUnorderedList'),
        ol: document.queryCommandState('insertOrderedList'),
      });
    } catch (e) {}
  };

  const handleInput = () => {
    if (!editorRef.current) return;
    const html = editorRef.current.innerHTML;
    setContent(html);
    setIsEmpty(checkIsEmpty(html));
    updateActiveStates();
  };

  // Execute formatting command with zero code intervention (pure WYSIWYG)
  const execCmd = (cmd, val = null) => {
    if (!editorRef.current) return;
    editorRef.current.focus();

    try {
      document.execCommand('styleWithCSS', false, true);
    } catch (e) {}

    switch (cmd) {
      case 'font':
        document.execCommand('fontName', false, val);
        break;
      case 'size':
        if (val === 'h1' || val === 'h2' || val === 'h3') {
          document.execCommand('formatBlock', false, `<${val}>`);
        } else if (val === 'p') {
          document.execCommand('formatBlock', false, '<p>');
        } else if (val === 'small') {
          document.execCommand('fontSize', false, '2');
        }
        break;
      case 'color':
        if (val === 'inherit') {
          document.execCommand('removeFormat', false, null);
        } else {
          document.execCommand('foreColor', false, val);
        }
        break;
      case 'highlight':
        if (!document.execCommand('hiliteColor', false, val)) {
          document.execCommand('backColor', false, val);
        }
        break;
      case 'align-left':
        document.execCommand('justifyLeft', false, null);
        break;
      case 'align-center':
        document.execCommand('justifyCenter', false, null);
        break;
      case 'align-justify':
        document.execCommand('justifyFull', false, null);
        break;
      case 'align-right':
        document.execCommand('justifyRight', false, null);
        break;
      case 'list-ul':
        document.execCommand('insertUnorderedList', false, null);
        break;
      case 'list-ol':
        document.execCommand('insertOrderedList', false, null);
        break;
      case 'quote':
        document.execCommand('formatBlock', false, '<blockquote>');
        break;
      case 'link': {
        const url = window.prompt('Enter Link / URL:', 'https://');
        if (url) {
          document.execCommand('createLink', false, url);
        }
        break;
      }
      case 'hr':
        document.execCommand('insertHorizontalRule', false, null);
        break;
      case 'symbol':
        document.execCommand('insertText', false, val);
        break;
      case 'clear':
        document.execCommand('removeFormat', false, null);
        document.execCommand('formatBlock', false, '<p>');
        break;
      default:
        document.execCommand(cmd, false, val);
        break;
    }

    setActiveMenu(null);
    handleInput();
  };

  // Keyboard shortcuts (Cmd+B / Ctrl+B, Cmd+I / Ctrl+I, Cmd+U / Ctrl+U)
  const handleKeyDown = (e) => {
    e.stopPropagation();
    const isMac = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
    const isMod = isMac ? e.metaKey : e.ctrlKey;

    if (isMod) {
      const key = e.key.toLowerCase();
      if (key === 'b') {
        e.preventDefault();
        execCmd('bold');
        return;
      }
      if (key === 'i') {
        e.preventDefault();
        execCmd('italic');
        return;
      }
      if (key === 'u') {
        e.preventDefault();
        execCmd('underline');
        return;
      }
      if (key === 'z') {
        setTimeout(handleInput, 20);
        return;
      }
    }
  };

  const toggleMenu = (menuName) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  const visibleCharCount = stripRichFormatting(content).length;

  return (
    <div ref={containerRef} className="flex flex-col gap-1.5 mb-2 relative">
      {/* Top Header: Label + Edit / Live Preview Tabs */}
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold uppercase tracking-wider opacity-80">
          Update Body / Content <span className="text-red-500">*</span>
        </label>

        {/* Tab Pills */}
        <div className="flex items-center p-0.5 rounded-lg border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-xs font-bold select-none">
          <button
            type="button"
            onClick={() => setEditorTab('write')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all ${
              editorTab === 'write'
                ? 'bg-white dark:bg-[#222] shadow-sm text-black dark:text-white'
                : 'opacity-60 hover:opacity-100'
            }`}
          >
            <Edit3 className="w-3 h-3 text-red-500" />
            <span>Write (Visual)</span>
          </button>
          <button
            type="button"
            onClick={() => setEditorTab('preview')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all ${
              editorTab === 'preview'
                ? 'bg-white dark:bg-[#222] shadow-sm text-black dark:text-white'
                : 'opacity-60 hover:opacity-100'
            }`}
          >
            <Eye className="w-3 h-3 text-gold" />
            <span>Live Preview</span>
          </button>
        </div>
      </div>

      {/* Formatting Toolbar (Only in Write tab) */}
      {editorTab === 'write' && (
        <div
          data-lenis-prevent="true"
          className={`p-2 rounded-xl border flex flex-wrap items-center gap-1 shadow-sm select-none transition-colors ${
            isDarkMode
              ? 'bg-[#18181b] border-white/15 text-white'
              : 'bg-[#FDFCF7] border-black/15 text-stone-900 shadow-stone-200/50'
          }`}
        >
          {/* 1. Font Family Dropdown */}
          <div className="relative">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => toggleMenu('font')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                activeMenu === 'font'
                  ? 'border-red-500 bg-red-500/10 text-red-500'
                  : 'border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5'
              }`}
              title="Change Font Family"
            >
              <Type className="w-3.5 h-3.5" />
              <span>Font</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {activeMenu === 'font' && (
              <div
                className={`absolute top-full left-0 mt-1.5 w-48 rounded-xl border shadow-xl p-1.5 z-30 flex flex-col gap-0.5 ${
                  isDarkMode ? 'bg-[#1e1e24] border-white/20' : 'bg-white border-black/15'
                }`}
              >
                {FONT_OPTIONS.map((f) => (
                  <button
                    key={f.name}
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => execCmd('font', f.value)}
                    className="text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-red-500/10 hover:text-red-500 transition-colors"
                    style={{ fontFamily: f.family }}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 2. Heading / Size Dropdown */}
          <div className="relative">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => toggleMenu('size')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                activeMenu === 'size'
                  ? 'border-red-500 bg-red-500/10 text-red-500'
                  : 'border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5'
              }`}
              title="Heading & Text Size"
            >
              <Heading1 className="w-3.5 h-3.5" />
              <span>Size</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {activeMenu === 'size' && (
              <div
                className={`absolute top-full left-0 mt-1.5 w-44 rounded-xl border shadow-xl p-1.5 z-30 flex flex-col gap-1 ${
                  isDarkMode ? 'bg-[#1e1e24] border-white/20' : 'bg-white border-black/15'
                }`}
              >
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => execCmd('size', 'h1')}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-sm font-extrabold hover:bg-red-500/10 hover:text-red-500 transition-colors font-nunito"
                >
                  <Heading1 className="w-4 h-4 text-red-500" />
                  <span>Heading 1</span>
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => execCmd('size', 'h2')}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-bold hover:bg-red-500/10 hover:text-red-500 transition-colors font-nunito"
                >
                  <Heading2 className="w-3.5 h-3.5 text-gold" />
                  <span>Heading 2</span>
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => execCmd('size', 'h3')}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-500/10 hover:text-red-500 transition-colors font-nunito"
                >
                  <Heading3 className="w-3.5 h-3.5 text-blue-500" />
                  <span>Heading 3</span>
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => execCmd('size', 'p')}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-normal hover:bg-red-500/10 hover:text-red-500 transition-colors"
                >
                  <span>Normal Text</span>
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => execCmd('size', 'small')}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] opacity-75 hover:bg-red-500/10 hover:text-red-500 transition-colors"
                >
                  <span>Small Caption</span>
                </button>
              </div>
            )}
          </div>

          <span className="w-px h-5 bg-black/10 dark:bg-white/10 mx-0.5" />

          {/* 3. Bold (Ctrl+B / Cmd+B) */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => execCmd('bold')}
            className={`p-1.5 rounded-lg transition-colors font-bold ${
              activeStates.bold
                ? 'bg-red-600 text-white shadow-sm'
                : 'hover:bg-black/10 dark:hover:bg-white/10'
            }`}
            title="Bold (Cmd+B or Ctrl+B)"
          >
            <Bold className="w-4 h-4" />
          </button>

          {/* 4. Italic (Ctrl+I / Cmd+I) */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => execCmd('italic')}
            className={`p-1.5 rounded-lg transition-colors ${
              activeStates.italic
                ? 'bg-red-600 text-white shadow-sm'
                : 'hover:bg-black/10 dark:hover:bg-white/10'
            }`}
            title="Italic (Cmd+I or Ctrl+I)"
          >
            <Italic className="w-4 h-4" />
          </button>

          {/* 5. Underline (Ctrl+U / Cmd+U) */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => execCmd('underline')}
            className={`p-1.5 rounded-lg transition-colors ${
              activeStates.underline
                ? 'bg-red-600 text-white shadow-sm'
                : 'hover:bg-black/10 dark:hover:bg-white/10'
            }`}
            title="Underline (Cmd+U or Ctrl+U)"
          >
            <Underline className="w-4 h-4" />
          </button>

          {/* 6. Strikethrough */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => execCmd('strikeThrough')}
            className={`p-1.5 rounded-lg transition-colors ${
              activeStates.strike
                ? 'bg-red-600 text-white shadow-sm'
                : 'hover:bg-black/10 dark:hover:bg-white/10'
            }`}
            title="Strikethrough"
          >
            <Strikethrough className="w-4 h-4" />
          </button>

          <span className="w-px h-5 bg-black/10 dark:bg-white/10 mx-0.5" />

          {/* Alignment Tools: Left, Center, Justify, Right */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => execCmd('align-left')}
            className={`p-1.5 rounded-lg transition-colors ${
              activeStates.alignLeft
                ? 'bg-red-600 text-white shadow-sm'
                : 'hover:bg-black/10 dark:hover:bg-white/10'
            }`}
            title="Align Left"
          >
            <AlignLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => execCmd('align-center')}
            className={`p-1.5 rounded-lg transition-colors ${
              activeStates.alignCenter
                ? 'bg-red-600 text-white shadow-sm'
                : 'hover:bg-black/10 dark:hover:bg-white/10'
            }`}
            title="Align Center"
          >
            <AlignCenter className="w-4 h-4" />
          </button>

          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => execCmd('align-justify')}
            className={`p-1.5 rounded-lg transition-colors ${
              activeStates.alignJustify
                ? 'bg-red-600 text-white shadow-sm'
                : 'hover:bg-black/10 dark:hover:bg-white/10'
            }`}
            title="Justify (Align Full)"
          >
            <AlignJustify className="w-4 h-4" />
          </button>

          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => execCmd('align-right')}
            className={`p-1.5 rounded-lg transition-colors ${
              activeStates.alignRight
                ? 'bg-red-600 text-white shadow-sm'
                : 'hover:bg-black/10 dark:hover:bg-white/10'
            }`}
            title="Align Right"
          >
            <AlignRight className="w-4 h-4" />
          </button>

          <span className="w-px h-5 bg-black/10 dark:bg-white/10 mx-0.5" />

          {/* 7. Text Color Picker */}
          <div className="relative">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => toggleMenu('color')}
              className={`p-1.5 rounded-lg flex items-center gap-1 transition-all ${
                activeMenu === 'color'
                  ? 'bg-red-500 text-white'
                  : 'hover:bg-black/10 dark:hover:bg-white/10'
              }`}
              title="Text Color"
            >
              <Palette className="w-4 h-4" />
              <div
                className="w-2.5 h-2.5 rounded-full border border-black/20 shrink-0"
                style={{ backgroundColor: customColor }}
              />
            </button>

            {activeMenu === 'color' && (
              <div
                className={`absolute top-full left-0 mt-1.5 p-3 rounded-2xl border shadow-2xl z-30 w-64 ${
                  isDarkMode ? 'bg-[#1e1e24] border-white/20' : 'bg-white border-black/15'
                }`}
              >
                <div className="text-[11px] font-bold uppercase tracking-wider mb-2 opacity-70">
                  Select Text Color
                </div>
                <div className="grid grid-cols-5 gap-2 mb-3">
                  {TEXT_COLORS.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        setCustomColor(c.value);
                        execCmd('color', c.value);
                      }}
                      title={c.name}
                      className="w-8 h-8 rounded-full border border-black/20 hover:scale-110 active:scale-95 transition-transform flex items-center justify-center shadow-sm"
                      style={{ backgroundColor: c.value === 'inherit' ? (isDarkMode ? '#333' : '#eee') : c.value }}
                    >
                      {c.value === 'inherit' && <span className="text-[9px] font-bold">Auto</span>}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-black/10 dark:border-white/10">
                  <label className="text-[11px] font-semibold opacity-80">Custom:</label>
                  <input
                    type="color"
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    className="w-7 h-7 rounded border cursor-pointer bg-transparent"
                  />
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => execCmd('color', customColor)}
                    className="ml-auto px-2.5 py-1 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 8. Highlight Color Picker */}
          <div className="relative">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => toggleMenu('highlight')}
              className={`p-1.5 rounded-lg flex items-center gap-1 transition-all ${
                activeMenu === 'highlight'
                  ? 'bg-yellow-400 text-black'
                  : 'hover:bg-black/10 dark:hover:bg-white/10'
              }`}
              title="Highlight Background"
            >
              <Highlighter className="w-4 h-4" />
              <div
                className="w-2.5 h-2.5 rounded-sm border border-black/20 shrink-0"
                style={{ backgroundColor: customHighlight }}
              />
            </button>

            {activeMenu === 'highlight' && (
              <div
                className={`absolute top-full left-0 mt-1.5 p-3 rounded-2xl border shadow-2xl z-30 w-64 ${
                  isDarkMode ? 'bg-[#1e1e24] border-white/20' : 'bg-white border-black/15'
                }`}
              >
                <div className="text-[11px] font-bold uppercase tracking-wider mb-2 opacity-70">
                  Highlight Text Color
                </div>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {HIGHLIGHT_COLORS.map((h) => (
                    <button
                      key={h.name}
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        setCustomHighlight(h.value);
                        execCmd('highlight', h.value);
                      }}
                      title={h.name}
                      className="h-7 rounded-lg border border-black/20 hover:scale-105 active:scale-95 transition-transform flex items-center justify-center text-[10px] font-bold shadow-sm"
                      style={{
                        backgroundColor: h.value,
                        color: h.textDark ? '#fff' : '#000'
                      }}
                    >
                      {h.name}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-black/10 dark:border-white/10">
                  <label className="text-[11px] font-semibold opacity-80">Custom:</label>
                  <input
                    type="color"
                    value={customHighlight}
                    onChange={(e) => setCustomHighlight(e.target.value)}
                    className="w-7 h-7 rounded border cursor-pointer bg-transparent"
                  />
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => execCmd('highlight', customHighlight)}
                    className="ml-auto px-2.5 py-1 bg-yellow-500 text-black text-xs font-bold rounded-lg hover:bg-yellow-600"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>

          <span className="w-px h-5 bg-black/10 dark:bg-white/10 mx-0.5" />

          {/* 9. Bullet List */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => execCmd('list-ul')}
            className={`p-1.5 rounded-lg transition-colors ${
              activeStates.ul ? 'bg-red-600 text-white' : 'hover:bg-black/10 dark:hover:bg-white/10'
            }`}
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </button>

          {/* 10. Numbered List */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => execCmd('list-ol')}
            className={`p-1.5 rounded-lg transition-colors ${
              activeStates.ol ? 'bg-red-600 text-white' : 'hover:bg-black/10 dark:hover:bg-white/10'
            }`}
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </button>

          {/* 11. Quote */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => execCmd('quote')}
            className="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            title="Blockquote"
          >
            <Quote className="w-4 h-4" />
          </button>

          {/* 12. Link */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => execCmd('link')}
            className="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            title="Insert Link"
          >
            <LinkIcon className="w-4 h-4" />
          </button>

          {/* 13. Divider */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => execCmd('hr')}
            className="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            title="Horizontal Divider"
          >
            <Minus className="w-4 h-4" />
          </button>

          {/* 14. Clear Formatting */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => execCmd('clear')}
            className="p-1.5 rounded-lg hover:bg-red-500/10 hover:text-red-500 transition-colors ml-auto text-xs flex items-center gap-1 opacity-70 hover:opacity-100"
            title="Clear Formatting from selected text"
          >
            <Eraser className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clear</span>
          </button>
        </div>
      )}

      {/* Astrology Symbol Quick-Insert Bar */}
      {editorTab === 'write' && (
        <div className="flex items-center gap-1 overflow-x-auto py-1 no-scrollbar select-none text-xs opacity-90">
          <span className="text-[10px] font-bold uppercase tracking-wider opacity-60 flex items-center gap-1 shrink-0 mr-1">
            <Sparkles className="w-3 h-3 text-gold" />
            Astro Symbols:
          </span>
          {ASTRO_SYMBOLS.map((s) => (
            <button
              key={s.name}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => execCmd('symbol', s.label)}
              title={s.name}
              className="px-2 py-0.5 rounded-md border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.03] hover:bg-red-500 hover:text-white transition-all text-xs font-semibold shrink-0 active:scale-90"
            >
              {s.label}
            </button>
          ))}
        </div>
      )}

      {/* WYSIWYG Editor Canvas vs Live Preview Canvas */}
      {editorTab === 'write' ? (
        <div className="relative">
          <div
            ref={editorRef}
            contentEditable={true}
            role="textbox"
            aria-multiline="true"
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            onKeyUp={updateActiveStates}
            onMouseUp={updateActiveStates}
            onSelect={updateActiveStates}
            onFocus={updateActiveStates}
            style={{ overscrollBehavior: 'contain' }}
            className={`newsfied-rich-content wysiwyg-editor w-full px-4 py-3.5 rounded-xl border text-sm leading-relaxed transition-all font-mulish min-h-[200px] max-h-[380px] overflow-y-auto custom-scrollbar select-text ${
              isDarkMode
                ? 'bg-black/40 border-white/20 focus:border-gold text-white dark-mode'
                : 'bg-[#FAF9F5] border-[#969000]/40 focus:border-[#A30000] text-black light-mode'
            }`}
          />

          {/* Modern Floating Placeholder when empty */}
          {isEmpty && (
            <div
              onClick={() => editorRef.current && editorRef.current.focus()}
              className="absolute top-3.5 left-4 pointer-events-none text-sm text-stone-400 dark:text-stone-500 italic font-mulish select-none leading-relaxed"
            >
              Write update details here... Select text and press <span className="font-semibold text-stone-500 dark:text-stone-400">Cmd+B</span> for bold, <span className="font-semibold text-stone-500 dark:text-stone-400">Cmd+I</span> for italic, or use toolbar above.
            </div>
          )}
        </div>
      ) : (
        <div
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          style={{ overscrollBehavior: 'contain' }}
          className={`p-4 sm:p-5 rounded-xl border min-h-[200px] max-h-[380px] overflow-y-auto custom-scrollbar transition-all ${
            isDarkMode
              ? 'bg-black/40 border-white/20 text-stone-200'
              : 'bg-[#FAF9F5] border-[#969000]/40 text-stone-900'
          }`}
        >
          {content && content.trim() ? (
            <RichContent content={content} isDarkMode={isDarkMode} />
          ) : (
            <p className="text-xs opacity-50 italic py-6 text-center">
              Nothing to preview yet. Switch to the 'Write' tab to compose your update visually.
            </p>
          )}
        </div>
      )}

      {/* Editor Status Bar & Character Count */}
      <div className="flex items-center justify-between text-[11px] opacity-60 mt-1 px-0.5 select-none">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>Visual WYSIWYG Mode • Shortcuts: Cmd+B Bold, Cmd+I Italic, Cmd+U Underline</span>
        </span>
        <span>{visibleCharCount} characters</span>
      </div>
    </div>
  );
}
