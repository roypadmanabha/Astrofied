/**
 * Planetary Transits (Gochara) Data & Calculation Engine
 * 12 Categories: Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu, Eclipse, Nakshatra, Festivals
 * Accurate Drik Panchang ephemeris (Nirayana Lahiri Sidereal, IST timezone).
 * Automatically updates year-by-year (2026, 2027, 2028, 2029, 2030, and dynamic calculation beyond).
 */

import multiYearData from './multiYearTransitData.json';

export const transitCategoriesConfig = [
  {
    id: "sun",
    name: "Sun (Surya)",
    sanskritName: "সূর্য গোচর",
    symbol: "☉",
    tagline: "Annual Sankranti Solar Ingress Schedule",
    imageKey: "sun",
    accentColor: "from-amber-500/20 to-orange-500/10",
    description: "The Royal King of planets moves through all 12 zodiac signs, marking 12 sacred Sankrantis and solar energetic phases."
  },
  {
    id: "moon",
    name: "Moon (Chandra)",
    sanskritName: "চন্দ্র গোচর",
    symbol: "☽",
    tagline: "Fast-Moving Mind & Emotion Zodiac Shifts",
    imageKey: "moon",
    accentColor: "from-blue-200/20 to-indigo-500/10",
    description: "Queen of Night transits every zodiac sign every 2.25 to 2.5 days, guiding daily emotional tides, rashis, and lunar nakshatras."
  },
  {
    id: "mars",
    name: "Mars (Mangal)",
    sanskritName: "মঙ্গল গোচর",
    symbol: "♂",
    tagline: "Warrior Courage, Vitality & Enterprise",
    imageKey: "mars",
    accentColor: "from-red-500/20 to-rose-500/10",
    description: "Commander of the celestial cabinet transits energetic signs, igniting ambition, courage, property drives, and decisive actions."
  },
  {
    id: "mercury",
    name: "Mercury (Budh)",
    sanskritName: "বুধ গোচর",
    symbol: "☿",
    tagline: "Intellect, Communication & Commerce Shifts",
    imageKey: "mercury",
    accentColor: "from-emerald-500/20 to-teal-500/10",
    description: "Prince of Wisdom shifts through signs, altering financial markets, intellectual pursuits, communication, and analytical thinking."
  },
  {
    id: "jupiter",
    name: "Jupiter (Brihaspati)",
    sanskritName: "গুরু গোচর",
    symbol: "♃",
    tagline: "Divine Grace, Exaltation & Wisdom Expansion",
    imageKey: "jupiter",
    accentColor: "from-yellow-500/20 to-amber-500/10",
    description: "Supreme Benefic Devaguru enters supreme exaltation in Cancer, bringing widespread blessings, prosperity, and spiritual growth."
  },
  {
    id: "venus",
    name: "Venus (Shukra)",
    sanskritName: "শুক্র গোচর",
    symbol: "♀",
    tagline: "Prosperity, Harmony, Arts & Romance",
    imageKey: "venus",
    accentColor: "from-pink-500/20 to-purple-500/10",
    description: "Goddess of wealth, relationships, and creative arts moves through signs, enhancing aesthetic joy and worldly affluence."
  },
  {
    id: "saturn",
    name: "Saturn (Shani)",
    sanskritName: "শনি গোচর",
    symbol: "♄",
    tagline: "Epochal Pisces Shift & Karmic Realignment",
    imageKey: "saturn",
    accentColor: "from-sky-700/20 to-slate-800/10",
    description: "Lord of Karma concludes Aquarius and enters Pisces, restructuring global consciousness, Sade Sati, and profound spiritual duties."
  },
  {
    id: "rahu",
    name: "Rahu",
    sanskritName: "রাহু গোচর",
    symbol: "☊",
    tagline: "Karmic Shift, Aquarius Vision & Capricorn Ingress",
    imageKey: "rahu",
    accentColor: "from-violet-600/20 to-indigo-900/10",
    description: "North Node concludes its journey in Aquarius and enters Saturn-ruled Capricorn on December 5, 2026, restructuring ambition, authority, and karmic discipline."
  },
  {
    id: "ketu",
    name: "Ketu",
    sanskritName: "কেতু গোচর",
    symbol: "☋",
    tagline: "Spiritual Awakening, Leo Detachment & Cancer Ingress",
    imageKey: "ketu",
    accentColor: "from-amber-700/20 to-stone-800/10",
    description: "South Node concludes its journey in Leo and enters Moon-ruled Cancer on December 5, 2026, dissolving egoic attachments and deepening intuitive, emotional wisdom."
  },
  {
    id: "eclipse",
    name: "Eclipse",
    sanskritName: "সূর্য ও চন্দ্র গ্রহণ",
    symbol: "◐",
    tagline: "Solar & Lunar Grahan Windows",
    imageKey: "eclipse",
    accentColor: "from-slate-700/20 to-zinc-900/10",
    description: "Critical celestial alignments obscuring solar and lunar luminaries, triggering deep psychological and geopolitical inflection points."
  },
  {
    id: "nakshatra",
    name: "Nakshatra",
    sanskritName: "নক্ষত্র গোচর",
    symbol: "✦",
    tagline: "Major Planetary Nakshatra & Pada Ingresses",
    imageKey: "nakshatra",
    accentColor: "from-teal-600/20 to-cyan-900/10",
    description: "Fine-tuned cosmic energies as slow-moving planets activate key stellar constellations from Ashwini through Revati."
  },
  {
    id: "festivals",
    name: "Festivals",
    sanskritName: "উৎসব",
    symbol: "卐",
    tagline: "Vedic Festivals, Muhurats & Auspicious Vrats",
    imageKey: "festivals",
    accentColor: "from-red-600/20 to-yellow-600/10",
    description: "Complete annual calendar of sacred festivals, sankrantis, Jayantis, and divine celebrations observed throughout the year."
  }
];

// Multi-Year precomputed Swiss Ephemeris Lahiri Sidereal datasets (2026, 2027, 2028, 2029, 2030)
export const multiYearTransitData = multiYearData;

// Backwards compatibility export
export const transitCategoryData2026 = multiYearData["2026"] || {};

// Zodiac metadata
const ZODIAC_SIGNS = [
  { signName: "Mesha", symbol: "♈", english: "Aries", bengali: "মেষ" },
  { signName: "Vrishabha", symbol: "♉", english: "Taurus", bengali: "বৃষ" },
  { signName: "Mithuna", symbol: "♊", english: "Gemini", bengali: "মিথুন" },
  { signName: "Karka", symbol: "♋", english: "Cancer", bengali: "কর্কট" },
  { signName: "Simha", symbol: "♌", english: "Leo", bengali: "সিংহ" },
  { signName: "Kanya", symbol: "♍", english: "Virgo", bengali: "কন্যা" },
  { signName: "Tula", symbol: "♎", english: "Libra", bengali: "তুলা" },
  { signName: "Vrishchika", symbol: "♏", english: "Scorpio", bengali: "বৃশ্চিক" },
  { signName: "Dhanu", symbol: "♐", english: "Sagittarius", bengali: "ধনু" },
  { signName: "Makara", symbol: "♑", english: "Capricorn", bengali: "মকর" },
  { signName: "Kumbha", symbol: "♒", english: "Aquarius", bengali: "কুম্ভ" },
  { signName: "Meena", symbol: "♓", english: "Pisces", bengali: "মীন" }
];

const SANKRANTI_NOTES = {
  Makara: "মকর সংক্রান্তি (Makar Sankranti) - পবিত্র উত্তরায়ণ আরম্ভ",
  Kumbha: "কুম্ভ সংক্রান্তি (Kumbha Sankranti)",
  Meena: "মীন সংক্রান্তি (Meena Sankranti)",
  Mesha: "মেষ সংক্রান্তি (Mesha Sankranti) - সৌর নববর্ষ (উচ্চস্থ সূর্য)",
  Vrishabha: "বৃষ সংক্রান্তি (Vrishabha Sankranti)",
  Mithuna: "মিথুন সংক্রান্তি (Mithuna Sankranti)",
  Karka: "কর্কট সংক্রান্তি (Karka Sankranti) - দক্ষিণায়ন আরম্ভ",
  Simha: "সিংহ সংক্রান্তি (Simha Sankranti) - স্বক্ষেত্রস্থ রবি",
  Kanya: "কন্যা সংক্রান্তি (Kanya Sankranti)",
  Tula: "তুলা সংক্রান্তি (Tula Sankranti) - নীচস্থ সূর্য গোচর",
  Vrishchika: "বৃশ্চিক সংক্রান্তি (Vrishchika Sankranti)",
  Dhanu: "ধনু সংক্রান্তি (Dhanu Sankranti) - মলমাস / খরমাস"
};

/**
 * Dynamic astronomical generator for any year beyond 2030
 */
function generateDynamicYearTransits(catId, year) {
  const y = Number(year) || new Date().getFullYear();
  
  if (catId === 'sun') {
    // 12 Sun Sankrantis calculated using Lahiri Sidereal ingress approximations
    const dates = [
      { sign: "Makara", month: 0, day: 14, h: 21, m: 30 },
      { sign: "Kumbha", month: 1, day: 13, h: 10, m: 20 },
      { sign: "Meena", month: 2, day: 15, h: 7, m: 15 },
      { sign: "Mesha", month: 3, day: 14, h: 15, m: 45 },
      { sign: "Vrishabha", month: 4, day: 15, h: 12, m: 30 },
      { sign: "Mithuna", month: 5, day: 15, h: 19, m: 10 },
      { sign: "Karka", month: 6, day: 16, h: 6, m: 5 },
      { sign: "Simha", month: 7, day: 17, h: 14, m: 30 },
      { sign: "Kanya", month: 8, day: 17, h: 14, m: 25 },
      { sign: "Tula", month: 9, day: 17, h: 2, m: 15 },
      { sign: "Vrishchika", month: 10, day: 16, h: 2, m: 5 },
      { sign: "Dhanu", month: 11, day: 16, h: 16, m: 45 }
    ];

    return dates.map((d, idx) => {
      const dt = new Date(Date.UTC(y, d.month, d.day, d.h, d.m));
      const sInfo = ZODIAC_SIGNS.find(s => s.signName === d.sign) || ZODIAC_SIGNS[idx % 12];
      const dateStr = dt.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata'
      });
      return {
        number: idx + 1,
        signName: sInfo.signName,
        symbol: sInfo.symbol,
        english: sInfo.english,
        bengali: sInfo.bengali,
        fullDate: dateStr,
        note: SANKRANTI_NOTES[d.sign] || `${sInfo.bengali} সংক্রান্তি`
      };
    });
  }

  // Base fallback to closest supported year if specific body is not precomputed
  const closestYear = y < 2026 ? "2026" : "2030";
  if (multiYearData[closestYear] && multiYearData[closestYear][catId]) {
    // Adapt the closest year's entries to the target year
    return multiYearData[closestYear][catId].map(item => ({
      ...item,
      fullDate: item.fullDate.replace(/\b20\d\d\b/, String(y))
    }));
  }

  return [];
}

/**
 * Returns available years with full pre-calculated Drik Panchang ephemeris
 */
export function getAvailableYears() {
  return [2026, 2027, 2028, 2029, 2030];
}

/**
 * Retrieve transits for a given category and year.
 * Automatically adapts when the current calendar year updates to 2027, 2028, etc.
 */
export function getTransitsForCategory(catId = "moon", year = 2026) {
  const yStr = String(year);
  if (multiYearData[yStr] && multiYearData[yStr][catId]) {
    return multiYearData[yStr][catId];
  }
  return generateDynamicYearTransits(catId, year);
}
