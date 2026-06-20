export const gemstones = [
  {
    id: 1,
    name: 'Pukhraj',
    planet: 'Jupiter',
    description: 'Enhances wisdom, prosperity, and marital harmony. Strengthens decision-making and attracts good fortune in career and finance.',
    imageName: 'pukhraj',
    imagePath: 'gemstones/pukhraj.png'
  },
  {
    id: 2,
    name: 'Ruby',
    planet: 'Sun',
    description: 'Boosts confidence, leadership, and vitality. Strengthens authority, health, and overall life force.',
    imageName: 'manik',
    imagePath: 'gemstones/ruby.png'
  },
  {
    id: 3,
    name: 'Mukta',
    planet: 'Moon',
    description: 'Calms the mind, improves emotional balance, and supports mental peace. Beneficial for stress relief and intuition.',
    imageName: 'moti',
    imagePath: 'gemstones/mukta.png'
  },
  {
    id: 4,
    name: 'Prabal',
    planet: 'Mars',
    description: 'Boosts courage, energy, and willpower. Supports career growth, physical strength, and removes obstacles.',
    imageName: 'moonga',
    imagePath: 'gemstones/prabal.png'
  },
  {
    id: 5,
    name: 'Panna',
    planet: 'Mercury',
    description: 'Sharpens intellect, communication, and analytical skills. Ideal for students, business owners, and professionals.',
    imageName: 'panna',
    imagePath: 'gemstones/panna.png'
  },
  {
    id: 6,
    name: 'Neelam',
    planet: 'Saturn',
    description: 'A powerful, fast-acting stone for discipline, focus, and removing long-standing obstacles. Recommended only after careful chart analysis.',
    imageName: 'neelam',
    imagePath: 'gemstones/neelam.jpg'
  },
  {
    id: 7,
    name: 'Gomed',
    planet: 'Rahu',
    description: 'Helps control confusion and unexpected disruptions. Supports clarity, sudden gains, and protection from deception.',
    imageName: 'gomed',
    imagePath: 'gemstones/gomed.png'
  },
  {
    id: 8,
    name: "Cat's Eye",
    planet: 'Ketu',
    description: 'Protects against hidden enemies and unforeseen losses. Supports spiritual growth and sharp intuition.',
    imageName: 'cats-eye',
    imagePath: 'gemstones/cats-eye.png'
  },
  {
    id: 9,
    name: 'Opal',
    planet: 'Venus',
    description: 'Enhances love, creativity, beauty, and relationship harmony. Favorable for artists and those seeking marital bliss.',
    imageName: 'opal',
    imagePath: 'gemstones/opal.png'
  }
];

/**
 * Validates whether a mobile number is a plausible 10-digit Indian number.
 * @param {string} num - 10 digit number string
 * @returns {boolean}
 */
export function isValidIndianMobile(num) {
  if (!/^\d{10}$/.test(num)) return false;
  if (!/^[6-9]/.test(num)) return false;
  
  const fakePatterns = [
    /^(\d)\1{9}$/,              // all same digit
    /^1234567890$/,
    /^0987654321$/,
    /^9876543210$/,
  ];
  if (fakePatterns.some(re => re.test(num))) return false;
  if (/(\d)\1{4,}/.test(num)) return false; // 5+ repeated digits in a row
  return true;
}

/**
 * Generates dynamic UPI deep link for static/placeholder payments.
 * @param {string} paymentType - Advance Payment or Pending Amount
 * @param {string} name - Customer Name
 * @returns {string}
 */
export function getUPIPaymentLink(paymentType, name) {
  // TODO: replace PLACEHOLDER-UPI-ID and wire actual amount based on selected gemstone/payment type
  const upiId = 'PLACEHOLDER-UPI-ID@bank';
  const amount = paymentType === 'Advance Payment' ? '1500' : '500';
  const note = `Astrofied Gemstones - ${paymentType} for ${name}`;
  return `upi://pay?pa=${upiId}&pn=Astrofied&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;
}
