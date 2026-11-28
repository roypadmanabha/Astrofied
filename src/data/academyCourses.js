/**
 * Comprehensive Course Catalog for Astrofied Learning Academy
 * Taught by Shri Prasanta Chakraborty (Founder & Chief Astrologer)
 */

export const ACADEMY_STATS = [
  { label: 'Astrology Learners Trained', value: '500+', subtext: 'Across Tripura, WB & Pan-India' },
  { label: 'Real Kundalis Analyzed Live', value: '1,200+', subtext: 'Hands-on practical chart dissection' },
  { label: 'Student Satisfaction Rate', value: '4.9/5', subtext: 'Based on 320+ course reviews' },
  { label: 'Lifetime Vault Access', value: '100%', subtext: 'HD class recordings & study materials' }
];

export const ACADEMY_CATEGORIES = [
  { id: 'all', label: 'All Disciplines' },
  { id: 'vedic', label: 'Vedic (Parashari)' },
  { id: 'kp', label: 'KP Astrology (Cuspal)' },
  { id: 'bnn', label: 'BNN (Nadi System)' },
  { id: 'nakshatra', label: 'Nakshatra & Medical' },
  { id: 'numerology', label: 'Numerology & Vastu' },
];

export const ACADEMY_COURSES = [
  {
    id: 'vedic-mastery',
    title: 'Vedic Astrology: Parashari Foundation to Advanced Predictive Mastery',
    category: 'vedic',
    categoryLabel: 'Vedic Astrology',
    badge: 'MOST POPULAR',
    level: 'Beginner to Advanced',
    duration: '3 Months (12 Weeks)',
    sessions: '24 Live Interactive Classes (48 Hours)',
    schedule: 'Every Sat & Sun • 7:30 PM - 9:30 PM IST',
    languages: ['Bengali', 'Hindi', 'English Terminology'],
    shortDescription: 'Master the timeless Parashari system with complete mathematical clarity, planetary dignity, house combinations, and dasha-transit event timing.',
    overview: 'This flagship masterclass takes you from the foundational grammar of Vedic astrology to sophisticated predictive artistry. Designed by Shri Prasanta Chakraborty, the course removes myths and superstition, replacing them with systematic logic, astronomical precision, and reproducible predictive rules.',
    outcomes: [
      'Decode any Janma Kundali confidently within 10 minutes of inspection',
      'Accurately identify Raj Yogas, Dhana Yogas, and Vipreet Raj Yogas in real charts',
      'Time life events (marriage, job changes, child birth, relocation) using Vimshottari Dasha & Gochar',
      'Analyze Bhavat Bhavam (house-from-house principles) and functional benefic/malefic natures',
      'Prescribe authentic Vedic & practical remedial measures without unnecessary fear'
    ],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Astronomical Foundations & Zodiac Geometry',
        topics: [
          'The 12 Signs (Rashis) — Elements, Modalities, Gunas, and Body Mapping',
          'Astronomical movement of the 9 Grahas and their internal psychological drives',
          'Lagna (Ascendant) calculation and the physics of the houses (Bhavas)'
        ]
      },
      {
        moduleNumber: 2,
        title: 'Planetary Strengths, Dignities & Relationships',
        topics: [
          'Exaltation, Debilitation, Moolatrikona, and Swakshetra mechanics',
          'Natural vs. Functional Benefics and Malefics for each Lagna',
          'Planetary Aspects (Drishti) — Special aspects of Mars, Jupiter, and Saturn'
        ]
      },
      {
        moduleNumber: 3,
        title: 'The 12 Bhavas: Lifepaths, Career, Wealth & Family',
        topics: [
          'Kendra, Trikona, Dusthana (6, 8, 12), and Upachaya houses breakdown',
          'Bhavat Bhavam principles (5th from 5th, 9th from 9th) for layered insights',
          'House lords placed in various houses and their compounding manifestations'
        ]
      },
      {
        moduleNumber: 4,
        title: 'Major Classical Yogas & Combustions',
        topics: [
          'Pancha Mahapurusha Yogas (Ruchaka, Bhadra, Hamsa, Malavya, Sasa)',
          'Gajakesari, Budhaditya, Neechabhanga Raj Yoga, and Kemadruma Yoga',
          'Combustion (Asta), Retrograde (Vakri) planets, and Rahu-Ketu Eclipse impacts'
        ]
      },
      {
        moduleNumber: 5,
        title: 'Vimshottari Dasha System & Predictive Timing',
        topics: [
          'Mahadasha, Antardasha, and Pratyantardasha hierarchy calculation',
          'Synthesizing Dasha lord with natal house placement and natural significator (Karaka)',
          'Double Transit phenomenon (Jupiter & Saturn triggers) for landmark life events'
        ]
      },
      {
        moduleNumber: 6,
        title: 'Live Case Studies & Ethical Client Counseling',
        topics: [
          'Real chart analysis: Career rise vs. stagnation, relationship delays, health vulnerability',
          'Navamsha (D9) essentials: Confirming planetary strength and marriage outcomes',
          'Professional ethics, compassionate client dialogue, and certified practical exam'
        ]
      }
    ],
    practicalTraining: 'Analyze 50+ anonymous real-life birth charts with live instructor evaluation.',
    certification: 'Astrofied Certified Vedic Astrologer (ACVA)',
    mentor: 'Shri Prasanta Chakraborty',
    seatsAvailable: 'Limited to 20 Students / Batch',
    nextBatch: '1st December 2026',
    priceOriginal: '₹14,999',
    priceCurrent: '₹8,999',
    offerBadge: 'Early Bird 40% Off'
  },
  {
    id: 'kp-specialist',
    title: 'KP Astrology (Krishnamurti Paddhati): Pinpoint Precision & Event Timing',
    category: 'kp',
    categoryLabel: 'KP Astrology',
    badge: 'HIGH ACCURACY',
    level: 'Intermediate to Professional',
    duration: '2.5 Months (10 Weeks)',
    sessions: '20 Live Masterclasses (40 Hours)',
    schedule: 'Every Tue & Thu • 8:00 PM - 10:00 PM IST',
    languages: ['Bengali', 'English', 'Hindi'],
    shortDescription: 'Discover the scientific world of Placidus house division, Nakshatra Lords, and Cuspal Sub-Lords to predict YES/NO answers and exact timing without ambiguity.',
    overview: 'KP Astrology is renowned worldwide for taking the guesswork out of astrological consultations. Created by Prof. K.S. Krishnamurti and mastered by Shri Prasanta Chakraborty, this course teaches the exact mathematics of Cuspal Sub-Lords and Ruling Planets to deliver definitive, date-specific predictions.',
    outcomes: [
      'Understand Placidus (KP) Cusp chart generation and how it differs from traditional Rashi charts',
      'Master the 249 Sub-Lord table and its application to house cusps and planets',
      'Predict clear YES/NO answers for job recruitment, government exams, property purchase, and visa',
      'Determine timing of marriage and divorce using the 2nd, 7th, and 11th house sub-lord rules',
      'Conduct Horary (Prashna Kundali 1-249) when the client does not have birth time'
    ],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'The Philosophy & Mathematics of KP System',
        topics: [
          'Limitations of classical methods and the invention of Sub-Lord theory',
          'Western Placidus House Division adapted with KP Ayanamsha (KPA)',
          'Sign Lord vs. Star Lord vs. Sub-Lord hierarchy'
        ]
      },
      {
        moduleNumber: 2,
        title: 'House Significations (Scripting Rules)',
        topics: [
          'Significator levels: Level A, B, C, D calculation for all 12 houses',
          'Favorable vs. detrimental houses for specific questions (4, 11 for vehicles; 2, 7, 11 for marriage)',
          'Role of Cuspal Sub-Lord as the primary decider of promise (Yes or No)'
        ]
      },
      {
        moduleNumber: 3,
        title: 'Career, Finance & Government Job Timing',
        topics: [
          'Combinations for Service (2, 6, 10, 11) vs. Independent Business (2, 7, 10)',
          'Government job indicators (Sun, Mars connected to 6th & 10th Sub-Lord)',
          'Predicting promotion, job loss, transfer, and financial gains'
        ]
      },
      {
        moduleNumber: 4,
        title: 'Marriage, Relationships & Childbirth',
        topics: [
          '7th Cusp Sub-Lord inspection: Promised or denied marriage',
          'Timing marriage through Dasha of 2, 7, 11 significators',
          'Childbirth assessment using the 5th Cuspal Sub-Lord and 2, 5, 11 houses'
        ]
      },
      {
        moduleNumber: 5,
        title: 'KP Horary (Prashna Kundali 1-249)',
        topics: [
          'How to take a Horary Number (1-249) from the querent',
          'Constructing instant Prashna charts for lost items, missing persons, and medical queries',
          'Ruling Planets (RP) verification and instantaneous verification of the question'
        ]
      }
    ],
    practicalTraining: '30+ Live Horary & Natal consultations analyzed under teacher supervision.',
    certification: 'Astrofied Certified KP Specialist (ACKS)',
    mentor: 'Shri Prasanta Chakraborty',
    seatsAvailable: 'Limited to 15 Students / Batch',
    nextBatch: '5th December 2026',
    priceOriginal: '₹16,499',
    priceCurrent: '₹9,999',
    offerBadge: 'Save ₹6,500'
  },
  {
    id: 'bnn-fast-track',
    title: 'Bhrigu Nandi Nadi (BNN): Rapid Intuitive Predictive Technique',
    category: 'bnn',
    categoryLabel: 'BNN System',
    badge: 'FAST-TRACK',
    level: 'All Levels (Beginner Friendly)',
    duration: '6 Weeks (12 Masterclasses)',
    sessions: '12 Intensive Classes (24 Hours)',
    schedule: 'Every Wednesday & Friday • 8:00 PM - 10:00 PM IST',
    languages: ['Bengali', 'Hindi'],
    shortDescription: 'Predict without calculating Lagna or complex Vimshottari mathematics. Learn planetary groupings, trinal linkages (1-5-9), and transit triggers.',
    overview: 'Bhrigu Nandi Nadi is the most direct, practical, and rapid predictive system in traditional Indian astrology. You will learn how planets speak to each other across 1, 5, 9, 2, 12, and 7th positions, unlocking instant portraits of career, wealth, siblings, and marital destiny.',
    outcomes: [
      'Learn how to read a chart without looking at Lagna (using Jupiter for self, Saturn for profession)',
      'Analyze the 1-5-9 Trinal planetary combinations and directional alignments',
      'Identify ancestral debts (Pitrudosha, Sarpa dosha) and their practical resolutions',
      'Predict marriage prospects using Venus (for males) and Mars/Jupiter (for females)',
      'Use the 12-year Jupiter transit and 30-year Saturn transit to pinpoint life milestones'
    ],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'BNN Philosophy & Planetary Karakatwas',
        topics: [
          'Planets as living entities: Jupiter (Jeeva), Saturn (Karma), Mars (Bhratri), Venus (Kalatra/Dhana)',
          'Directional groupings of Rashis: East (1, 5, 9), South (2, 6, 10), West (3, 7, 11), North (4, 8, 12)',
          'Planetary friendships, enmity, and mutual reception in BNN'
        ]
      },
      {
        moduleNumber: 2,
        title: 'Crucial Planetary Combinations (Yogas in BNN)',
        topics: [
          'Jupiter + Saturn (Dharma-Karmadhipati combination in Nadi)',
          'Jupiter + Rahu (Guru Chandal and foreign journeys)',
          'Saturn + Rahu / Ketu (Karma obstacles and spiritual liberation)',
          'Venus + Mercury / Mars (Wealth, luxury, and relationship dynamics)'
        ]
      },
      {
        moduleNumber: 3,
        title: 'Career & Professional Mapping',
        topics: [
          'Saturns associations with other planets to determine vocation without D10',
          'Saturn + Sun (Government / Administration / Authority)',
          'Saturn + Moon (Travel / Liquids / Fluctuating profession)',
          'Saturn + Mercury (Commerce, Accounts, Law, Teaching, IT)'
        ]
      },
      {
        moduleNumber: 4,
        title: 'Nadi Transits & Instant Predictions',
        topics: [
          'Transit of Jupiter over natal planets to spark expansion and auspicious events',
          'Transit of Saturn over natal planets to trigger accountability, marriage, or job change',
          '10-second chart reading live drill with class participants'
        ]
      }
    ],
    practicalTraining: 'Rapid-fire 5-minute chart interpretation drill on 40 real horoscopes.',
    certification: 'Astrofied Certified Nadi Practitioner (ACNP)',
    mentor: 'Shri Prasanta Chakraborty',
    seatsAvailable: 'Limited to 25 Students',
    nextBatch: '10th December 2026',
    priceOriginal: '₹11,999',
    priceCurrent: '₹6,499',
    offerBadge: 'Best Value'
  },
  {
    id: 'nakshatra-medical',
    title: 'Advanced Medical & Nakshatra Nadi Astrology',
    category: 'nakshatra',
    categoryLabel: 'Nakshatra & Medical',
    badge: 'SPECIALIZED',
    level: 'Advanced',
    duration: '2 Months (8 Weeks)',
    sessions: '16 In-Depth Sessions (32 Hours)',
    schedule: 'Every Monday & Wednesday • 7:30 PM - 9:30 PM IST',
    languages: ['Bengali', 'English', 'Hindi'],
    shortDescription: 'Discover the profound predictive depths of the 27 Nakshatras and 108 Padas. Apply medical astrology principles to detect health vulnerabilities and organ sensitivities.',
    overview: 'Taught by an astrologer with a formal academic background in Human Physiology (B.Sc.), this specialized course bridges modern anatomical understanding with the 27 cosmic lunar mansions (Nakshatras) and the critical medical houses (6th, 8th, and 12th).',
    outcomes: [
      'Master the 27 Nakshatras, their presiding deities, planetary rulers, and 4 Padas (Navamsha mapping)',
      'Map the human anatomy to the 12 houses and Nakshatra divisions',
      'Diagnose chronic disease markers (diabetes, cardiac strain, thyroid, neurological imbalances)',
      'Analyze the timing of surgeries and health recovery using D6 (Shashtamsha) and D30 (Trimsamsha)',
      'Prescribe Ayurvedic dietary guidance, metal grounding, and planetary sound therapy (Mantras)'
    ],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'The 27 Cosmic Constellations (Nakshatra Deep Dive)',
        topics: [
          'Ashwini to Revati: Mythological symbolism, cosmic energies, and psychological temperaments',
          'Nakshatra Ganas (Deva, Manushya, Rakshasa) and animal totems (Yoni)',
          'The 4 Padas and their specific elemental manifestations in Navamsha'
        ]
      },
      {
        moduleNumber: 2,
        title: 'Medical Astrology Principles & Anatomical Mapping',
        topics: [
          'Human body mapped through the 12 Bhavas: Head to Feet',
          'Role of 6th house (Roga), 8th house (Chronic / Surgery), and 12th house (Hospitalization)',
          'Sun (Vitality, Bones, Heart), Moon (Mind, Body Fluids), and Mars (Blood, Muscles)'
        ]
      },
      {
        moduleNumber: 3,
        title: 'Disease Diagnostic Rules & Divisional Charts',
        topics: [
          'Cardiac & Circulatory afflictions: Sun, 4th house, and Leo evaluation',
          'Neurological and psychological distress: Moon-Mercury-Rahu combinations',
          'Metabolic and digestive imbalances: Jupiter-Mars interactions with 5th & 6th houses',
          'Cross-verifying illness severity using the D30 (Trimsamsha) chart'
        ]
      },
      {
        moduleNumber: 4,
        title: 'Surgical Timings & Holistic Remedial Science',
        topics: [
          'Selecting auspicious Muhurta for surgery (avoiding Full Moon / New Moon / afflicted Mars)',
          'Ayurvedic Doshas (Vata, Pitta, Kapha) correlated with planetary predominance',
          'Ethical medical counseling: Never giving diagnostic prognosis as a substitute for doctors'
        ]
      }
    ],
    practicalTraining: 'Review 35 medical case studies with verified hospital diagnostic reports.',
    certification: 'Astrofied Certified Medical Astrologer (ACMA)',
    mentor: 'Shri Prasanta Chakraborty (B.Sc. Human Physiology)',
    seatsAvailable: 'Limited to 15 Students',
    nextBatch: '15th December 2026',
    priceOriginal: '₹14,499',
    priceCurrent: '₹8,499',
    offerBadge: 'Advanced Clinic'
  },
  {
    id: 'numerology-vastu',
    title: 'Professional Vedic & Chaldean Numerology Mastery',
    category: 'numerology',
    categoryLabel: 'Numerology & Vastu',
    badge: 'CAREER BOOSTER',
    level: 'All Levels (Zero Prior Knowledge Needed)',
    duration: '4 Weeks (8 Comprehensive Classes)',
    sessions: '8 Interactive Classes (16 Hours)',
    schedule: 'Every Friday & Saturday • 6:30 PM - 8:30 PM IST',
    languages: ['Bengali', 'Hindi', 'English'],
    shortDescription: 'Calculate Mulank, Bhagyank, Lo-Shu Grids, and master Name Spelling Correction for individuals and brands to maximize luck, harmony, and prosperity.',
    overview: 'Numbers are the vibrational frequency of the universe. This dynamic, practical course equips you with the tools of Vedic and Chaldean numerology to conduct professional numerological consultations, name alterations, mobile number selections, and commercial brand alignments.',
    outcomes: [
      'Calculate Psychic Number (Mulank) and Destiny Number (Bhagyank) with precision',
      'Construct and interpret the 3x3 Lo-Shu Grid (Will Plane, Thought Plane, Action Plane)',
      'Perform scientific Name Correction without legally changing official documents',
      'Identify friendly, enemy, and neutral numbers for career, marriage, and wealth',
      'Choose auspicious mobile numbers, bank account numbers, vehicle license plates, and house numbers'
    ],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Number Vibrations 1 through 9',
        topics: [
          'Planetary associations of Numbers 1 to 9 (Sun to Mars)',
          'Mulank (Birth Date) psychology and career inclination',
          'Bhagyank (Full Date Sum) and life purpose roadmap'
        ]
      },
      {
        moduleNumber: 2,
        title: 'The Lo-Shu Grid & Missing Number Remedies',
        topics: [
          'Drawing the 3x3 ancient Chinese Lo-Shu Grid',
          'The 8 Yogas/Planes: Mental, Emotional, Practical, Thought, Will, Action, Golden Arrows',
          'Remedies for missing numbers using colors, crystals, and directional placement'
        ]
      },
      {
        moduleNumber: 3,
        title: 'Chaldean Name Correction & Brand Alignment',
        topics: [
          'The Chaldean alphabet conversion chart (A=1, B=2, etc.)',
          'Balancing personal name spelling to match Destiny/Mulank harmony',
          'Business, brand, and company name numerology for commercial prosperity'
        ]
      },
      {
        moduleNumber: 4,
        title: 'Mobile, Vehicle & Residential Numerology',
        topics: [
          'Selecting auspicious mobile phone number sums for sales & relationships',
          'Vehicle registration number harmony',
          'Setting up a profitable professional numerology consultation practice'
        ]
      }
    ],
    practicalTraining: 'Conduct 20 name optimizations and Lo-Shu grid consultations in class.',
    certification: 'Astrofied Certified Numerologist (ACN)',
    mentor: 'Shri Prasanta Chakraborty',
    seatsAvailable: 'Open for 25 Students',
    nextBatch: '2nd December 2026',
    priceOriginal: '₹8,999',
    priceCurrent: '₹4,999',
    offerBadge: 'Beginner Friendly'
  },
  {
    id: 'practical-remedies',
    title: 'Authentic Vedic Upayas, Gemology & Yantra Workshop',
    category: 'remedies',
    categoryLabel: 'Remedies & Gemstones',
    badge: 'PRACTICAL REMEDIES',
    level: 'All Levels',
    duration: '3 Weeks (6 Workshops)',
    sessions: '6 Intensive Weekend Sessions (12 Hours)',
    schedule: 'Every Sunday • 10:00 AM - 12:00 PM IST',
    languages: ['Bengali', 'Hindi'],
    shortDescription: 'Learn ethical, result-driven remedies: Gemstone testing, Rudraksha therapy, Vedic Daan, Yantra activation, and planetary Mantras without superstition.',
    overview: 'Remedies are the prescription of an astrologer. Prescribing the wrong gemstone or an unsuitable ritual can aggravate planetary maleficence. This scientific workshop teaches the precise rules of when to prescribe gemstones, when to use Daan (charity), and how to harness planetary energy cleanly.',
    outcomes: [
      'Know when to strengthen a planet vs. when to pacify it through charity (Daan)',
      'Understand the optical and crystal parameters of natural unheated gemstones',
      'Learn the metal setting (Gold, Silver, Panchadhatu, Asthadhatu) and finger rules',
      'Select authentic 1 to 14 Mukhi Rudraksha for specific astrological combinations',
      'Guide clients with simple, budget-friendly lifestyle remedies that yield genuine results'
    ],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'The Philosophy of Karmic Remediation',
        topics: [
          'Dridha Karma (Fixed) vs. Adridha Karma (Changeable) in classical texts',
          'The 3 Pillars of Remediation: Mani (Gems), Mantra (Sound), Aushadha (Herbal/Charity)',
          'Debunking common astrological myths and commercial exploitation'
        ]
      },
      {
        moduleNumber: 2,
        title: 'Gemstone Science & Astrological Prescriptions',
        topics: [
          'Primary gems (Ruby, Pearl, Coral, Emerald, Yellow Sapphire, Diamond, Blue Sapphire, Hessonite, Cat’s Eye)',
          'Identifying natural vs. synthetic, glass-filled, and heat-treated gemstones',
          'Correct finger, weight (Ratti/Carat), metal, day, and Prana Pratishtha ritual'
        ]
      },
      {
        moduleNumber: 3,
        title: 'Mantra Therapy, Yantras & Practical Upayas',
        topics: [
          'Beej Mantras and their physiological resonance on the human chakra system',
          'Vedic Daan guidelines (what items to donate, to whom, and on which day)',
          'Lal Kitab and traditional household Vastu fixes for planetary harmony'
        ]
      }
    ],
    practicalTraining: 'Review and solve 25 challenging client remedy case studies live.',
    certification: 'Astrofied Certified Remedial Astrologer (ACRA)',
    mentor: 'Shri Prasanta Chakraborty',
    seatsAvailable: 'Limited to 20 Students',
    nextBatch: '6th December 2026',
    priceOriginal: '₹7,499',
    priceCurrent: '₹3,999',
    offerBadge: 'Hands-on Lab'
  }
];

export const ACADEMY_PERKS = [
  {
    icon: 'Video',
    title: 'Live Interactive Lectures',
    description: 'No boring pre-recorded videos. Learn live in small batches via Google Meet with direct two-way microphone access.'
  },
  {
    icon: 'Layers',
    title: 'Real Chart Breakdown',
    description: 'Bring birth charts of family, friends, or clients to class. Master predictive application on authentic live charts.'
  },
  {
    icon: 'HardDrive',
    title: 'Lifetime HD Vault Access',
    description: 'Missed a class? Every session is recorded in 1080p and placed in your student portal with lifetime downloadable PDFs.'
  },
  {
    icon: 'Award',
    title: 'Certified by Astrofied',
    description: 'Receive an officially verified, numbered certificate signed by Shri Prasanta Chakraborty upon course completion.'
  },
  {
    icon: 'Users',
    title: 'Private Astrologers’ Guild',
    description: 'Join our exclusive Telegram community of practitioners. Share transit alerts, discuss complex charts, and grow together.'
  },
  {
    icon: 'Languages',
    title: 'Bilingual & Simplified',
    description: 'Taught with warmth and clarity in Bengali and Hindi, incorporating modern English astrological and technical terms.'
  }
];

export const ACADEMY_REVIEWS = [
  {
    name: 'Debasish Bhattacharjee',
    location: 'Agartala, Tripura',
    course: 'Vedic Astrology Mastery',
    rating: 5,
    date: 'Batch 2026',
    comment: 'Prasanta Sir explains the toughest Dasha calculations with such scientific simplicity! Within 2 months, I was able to predict my sister’s job change and my friend’s property purchase with pinpoint accuracy. Astrofied Learning Academy is undoubtedly Tripura’s pride!'
  },
  {
    name: 'Ananya Sengupta',
    location: 'Kolkata, West Bengal',
    course: 'KP Astrology Specialist',
    rating: 5,
    date: 'Batch 2026',
    comment: 'I was always confused between Parashari and KP until I joined Sir’s KP class. The Sub-Lord rules are crystal clear. His Horary technique gave me 100% correct results in a real-life medical query. Highly recommended for serious learners.'
  },
  {
    name: 'Rajat Roy',
    location: 'Udaipur, Gomati, Tripura',
    course: 'BNN Nadi System',
    rating: 5,
    date: 'Batch 2026',
    comment: 'The BNN fast-track method is unbelievable. No complicated Lagna math needed — just looking at Jupiter and Saturn alignments reveals the person’s career and karma within seconds. Best investment of my time.'
  },
  {
    name: 'Pooja Sharma',
    location: 'Guwahati, Assam',
    course: 'Numerology & Vastu',
    rating: 5,
    date: 'Batch 2026',
    comment: 'The Name Correction and Lo-Shu grid sessions were life-changing. Sir teaches ethically without instilling fear or selling overpriced remedies. I am now doing paid numerology consultations with full confidence.'
  }
];

export const ACADEMY_FAQS = [
  {
    question: 'Do I need any prior knowledge of astrology to join?',
    answer: 'No prior background is required for our Vedic Foundation, BNN, and Numerology courses! We begin from the absolute fundamentals of the zodiac, planets, and houses before advancing to complex predictive techniques. For the Advanced KP and Medical courses, basic knowledge of signs and planets is helpful.'
  },
  {
    question: 'How are the classes conducted?',
    answer: 'All classes are conducted live online via Google Meet. You can attend comfortably from your smartphone, tablet, laptop, or desktop computer. The sessions are fully interactive with screen sharing, whiteboards, and live chart demonstrations.'
  },
  {
    question: 'What if I miss a live class due to work or emergencies?',
    answer: 'Don’t worry! Every live class is recorded in high definition and uploaded to your student vault within 12 hours. You will have lifetime access to rewatch the recordings, class notes, and downloadable PDF slides anytime.'
  },
  {
    question: 'Will I receive a verified certificate upon completion?',
    answer: 'Yes! Upon completing the course modules and attending the final practical chart evaluation, you will receive an official, framed digital certificate of completion verified and signed by Shri Prasanta Chakraborty, Founder of Astrofied.'
  },
  {
    question: 'How do I enroll and make the course fee payment?',
    answer: 'You can click on "Enroll via WhatsApp" on any course card or contact our official academy desk at +91 9612736566. Our team will share the batch registration form, syllabus PDF, and secure UPI/Bank transfer payment details.'
  },
  {
    question: 'Can I ask personal or client chart doubts during class?',
    answer: 'Yes! Unlike pre-recorded portals, Shri Prasanta Chakraborty reserves dedicated time in every single class for live chart analysis. Students regularly bring real-world charts of family members and clients to solve collaboratively.'
  }
];
