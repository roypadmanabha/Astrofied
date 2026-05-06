import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function Feedback() {
    const { isDarkMode } = useTheme();
    const [formData, setFormData] = useState({ name: '', email: '', mobile: '', countryCode: '+91', message: '' });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error, duplicate

    const countryCodes = [
        { code: '+93', flag: '🇦🇫', name: 'Afghanistan' },
        { code: '+355', flag: '🇦🇱', name: 'Albania' },
        { code: '+213', flag: '🇩🇿', name: 'Algeria' },
        { code: '+376', flag: '🇦🇩', name: 'Andorra' },
        { code: '+244', flag: '🇦🇴', name: 'Angola' },
        { code: '+1', flag: '🇦🇬', name: 'Antigua and Barbuda' },
        { code: '+54', flag: '🇦🇷', name: 'Argentina' },
        { code: '+374', flag: '🇦🇲', name: 'Armenia' },
        { code: '+61', flag: '🇦🇺', name: 'Australia' },
        { code: '+43', flag: '🇦🇹', name: 'Austria' },
        { code: '+994', flag: '🇦🇿', name: 'Azerbaijan' },
        { code: '+1', flag: '🇧🇸', name: 'Bahamas' },
        { code: '+973', flag: '🇧🇭', name: 'Bahrain' },
        { code: '+880', flag: '🇧🇩', name: 'Bangladesh' },
        { code: '+1', flag: '🇧🇧', name: 'Barbados' },
        { code: '+375', flag: '🇧🇾', name: 'Belarus' },
        { code: '+32', flag: '🇧🇪', name: 'Belgium' },
        { code: '+501', flag: '🇧🇿', name: 'Belize' },
        { code: '+229', flag: '🇧🇯', name: 'Benin' },
        { code: '+975', flag: '🇧🇹', name: 'Bhutan' },
        { code: '+591', flag: '🇧🇴', name: 'Bolivia' },
        { code: '+387', flag: '🇧🇦', name: 'Bosnia and Herzegovina' },
        { code: '+267', flag: '🇧🇼', name: 'Botswana' },
        { code: '+55', flag: '🇧🇷', name: 'Brazil' },
        { code: '+673', flag: '🇧🇳', name: 'Brunei' },
        { code: '+359', flag: '🇧🇬', name: 'Bulgaria' },
        { code: '+226', flag: '🇧🇫', name: 'Burkina Faso' },
        { code: '+257', flag: '🇧🇮', name: 'Burundi' },
        { code: '+855', flag: '🇰🇭', name: 'Cambodia' },
        { code: '+237', flag: '🇨🇲', name: 'Cameroon' },
        { code: '+1', flag: '🇨🇦', name: 'Canada' },
        { code: '+238', flag: '🇨🇻', name: 'Cape Verde' },
        { code: '+236', flag: '🇨🇫', name: 'Central African Republic' },
        { code: '+235', flag: '🇹🇩', name: 'Chad' },
        { code: '+56', flag: '🇨🇱', name: 'Chile' },
        { code: '+86', flag: '🇨🇳', name: 'China' },
        { code: '+57', flag: '🇨🇴', name: 'Colombia' },
        { code: '+269', flag: '🇰🇲', name: 'Comoros' },
        { code: '+242', flag: '🇨🇬', name: 'Congo' },
        { code: '+506', flag: '🇨🇷', name: 'Costa Rica' },
        { code: '+385', flag: '🇭🇷', name: 'Croatia' },
        { code: '+53', flag: '🇨🇺', name: 'Cuba' },
        { code: '+357', flag: '🇨🇾', name: 'Cyprus' },
        { code: '+420', flag: '🇨🇿', name: 'Czech Republic' },
        { code: '+45', flag: '🇩🇰', name: 'Denmark' },
        { code: '+253', flag: '🇩🇯', name: 'Djibouti' },
        { code: '+1', flag: '🇩🇲', name: 'Dominica' },
        { code: '+1', flag: '🇩🇴', name: 'Dominican Republic' },
        { code: '+593', flag: '🇪🇨', name: 'Ecuador' },
        { code: '+20', flag: '🇪🇬', name: 'Egypt' },
        { code: '+503', flag: '🇸🇻', name: 'El Salvador' },
        { code: '+240', flag: '🇬🇶', name: 'Equatorial Guinea' },
        { code: '+291', flag: '🇪🇷', name: 'Eritrea' },
        { code: '+372', flag: '🇪🇪', name: 'Estonia' },
        { code: '+251', flag: '🇪🇹', name: 'Ethiopia' },
        { code: '+679', flag: '🇫🇯', name: 'Fiji' },
        { code: '+358', flag: '🇫🇮', name: 'Finland' },
        { code: '+33', flag: '🇫🇷', name: 'France' },
        { code: '+241', flag: '🇬🇦', name: 'Gabon' },
        { code: '+220', flag: '🇬🇲', name: 'Gambia' },
        { code: '+995', flag: '🇬🇪', name: 'Georgia' },
        { code: '+49', flag: '🇩🇪', name: 'Germany' },
        { code: '+233', flag: '🇬🇭', name: 'Ghana' },
        { code: '+30', flag: '🇬🇷', name: 'Greece' },
        { code: '+1', flag: '🇬🇩', name: 'Grenada' },
        { code: '+502', flag: '🇬🇹', name: 'Guatemala' },
        { code: '+224', flag: '🇬🇳', name: 'Guinea' },
        { code: '+245', flag: '🇬🇼', name: 'Guinea-Bissau' },
        { code: '+592', flag: '🇬🇾', name: 'Guyana' },
        { code: '+509', flag: '🇭🇹', name: 'Haiti' },
        { code: '+504', flag: '🇭🇳', name: 'Honduras' },
        { code: '+36', flag: '🇭🇺', name: 'Hungary' },
        { code: '+354', flag: '🇮🇸', name: 'Iceland' },
        { code: '+91', flag: '🇮🇳', name: 'India' },
        { code: '+62', flag: '🇮🇩', name: 'Indonesia' },
        { code: '+98', flag: '🇮🇷', name: 'Iran' },
        { code: '+964', flag: '🇮🇶', name: 'Iraq' },
        { code: '+353', flag: '🇮🇪', name: 'Ireland' },
        { code: '+972', flag: '🇮🇱', name: 'Israel' },
        { code: '+39', flag: '🇮🇹', name: 'Italy' },
        { code: '+1', flag: '🇯🇲', name: 'Jamaica' },
        { code: '+81', flag: '🇯🇵', name: 'Japan' },
        { code: '+962', flag: '🇯🇴', name: 'Jordan' },
        { code: '+7', flag: '🇰🇿', name: 'Kazakhstan' },
        { code: '+254', flag: '🇰🇪', name: 'Kenya' },
        { code: '+686', flag: '🇰🇮', name: 'Kiribati' },
        { code: '+965', flag: '🇰🇼', name: 'Kuwait' },
        { code: '+996', flag: '🇰🇬', name: 'Kyrgyzstan' },
        { code: '+856', flag: '🇱🇦', name: 'Laos' },
        { code: '+371', flag: '🇱🇻', name: 'Latvia' },
        { code: '+961', flag: '🇱🇧', name: 'Lebanon' },
        { code: '+266', flag: '🇱🇸', name: 'Lesotho' },
        { code: '+231', flag: '🇱🇷', name: 'Liberia' },
        { code: '+218', flag: '🇱🇾', name: 'Libya' },
        { code: '+423', flag: '🇱🇮', name: 'Liechtenstein' },
        { code: '+370', flag: '🇱🇹', name: 'Lithuania' },
        { code: '+352', flag: '🇱🇺', name: 'Luxembourg' },
        { code: '+261', flag: '🇲🇬', name: 'Madagascar' },
        { code: '+265', flag: '🇲🇼', name: 'Malawi' },
        { code: '+60', flag: '🇲🇾', name: 'Malaysia' },
        { code: '+960', flag: '🇲🇻', name: 'Maldives' },
        { code: '+223', flag: '🇲🇱', name: 'Mali' },
        { code: '+356', flag: '🇲🇹', name: 'Malta' },
        { code: '+692', flag: '🇲🇭', name: 'Marshall Islands' },
        { code: '+222', flag: '🇲🇷', name: 'Mauritania' },
        { code: '+230', flag: '🇲🇺', name: 'Mauritius' },
        { code: '+52', flag: '🇲🇽', name: 'Mexico' },
        { code: '+691', flag: '🇫🇲', name: 'Micronesia' },
        { code: '+373', flag: '🇲🇩', name: 'Moldova' },
        { code: '+377', flag: '🇲🇨', name: 'Monaco' },
        { code: '+976', flag: '🇲🇳', name: 'Mongolia' },
        { code: '+382', flag: '🇲🇪', name: 'Montenegro' },
        { code: '+212', flag: '🇲🇦', name: 'Morocco' },
        { code: '+258', flag: '🇲🇿', name: 'Mozambique' },
        { code: '+95', flag: '🇲🇲', name: 'Myanmar' },
        { code: '+264', flag: '🇳🇦', name: 'Namibia' },
        { code: '+674', flag: '🇳🇷', name: 'Nauru' },
        { code: '+977', flag: '🇳🇵', name: 'Nepal' },
        { code: '+31', flag: '🇳🇱', name: 'Netherlands' },
        { code: '+64', flag: '🇳🇿', name: 'New Zealand' },
        { code: '+505', flag: '🇳🇮', name: 'Nicaragua' },
        { code: '+227', flag: '🇳🇪', name: 'Niger' },
        { code: '+234', flag: '🇳🇬', name: 'Nigeria' },
        { code: '+47', flag: '🇳🇴', name: 'Norway' },
        { code: '+968', flag: '🇴🇲', name: 'Oman' },
        { code: '+92', flag: '🇵🇰', name: 'Pakistan' },
        { code: '+680', flag: '🇵🇼', name: 'Palau' },
        { code: '+507', flag: '🇵🇦', name: 'Panama' },
        { code: '+675', flag: '🇵🇬', name: 'Papua New Guinea' },
        { code: '+595', flag: '🇵🇾', name: 'Paraguay' },
        { code: '+51', flag: '🇵🇪', name: 'Peru' },
        { code: '+63', flag: '🇵🇭', name: 'Philippines' },
        { code: '+48', flag: '🇵🇱', name: 'Poland' },
        { code: '+351', flag: '🇵🇹', name: 'Portugal' },
        { code: '+974', flag: '🇶🇦', name: 'Qatar' },
        { code: '+40', flag: '🇷🇴', name: 'Romania' },
        { code: '+7', flag: '🇷🇺', name: 'Russia' },
        { code: '+250', flag: '🇷🇼', name: 'Rwanda' },
        { code: '+1', flag: '🇰🇳', name: 'Saint Kitts and Nevis' },
        { code: '+1', flag: '🇱🇨', name: 'Saint Lucia' },
        { code: '+1', flag: '🇻🇨', name: 'Saint Vincent and the Grenadines' },
        { code: '+685', flag: '🇼🇸', name: 'Samoa' },
        { code: '+378', flag: '🇸🇲', name: 'San Marino' },
        { code: '+239', flag: '🇸🇹', name: 'Sao Tome and Principe' },
        { code: '+966', flag: '🇸🇦', name: 'Saudi Arabia' },
        { code: '+221', flag: '🇸🇳', name: 'Senegal' },
        { code: '+381', flag: '🇷🇸', name: 'Serbia' },
        { code: '+248', flag: '🇸🇨', name: 'Seychelles' },
        { code: '+232', flag: '🇸🇱', name: 'Sierra Leone' },
        { code: '+65', flag: '🇸🇬', name: 'Singapore' },
        { code: '+421', flag: '🇸🇰', name: 'Slovakia' },
        { code: '+386', flag: '🇸🇮', name: 'Slovenia' },
        { code: '+677', flag: '🇸🇧', name: 'Solomon Islands' },
        { code: '+252', flag: '🇸🇴', name: 'Somalia' },
        { code: '+27', flag: '🇿🇦', name: 'South Africa' },
        { code: '+82', flag: '🇰🇷', name: 'South Korea' },
        { code: '+211', flag: '🇸🇸', name: 'South Sudan' },
        { code: '+34', flag: '🇪🇸', name: 'Spain' },
        { code: '+94', flag: '🇱🇰', name: 'Sri Lanka' },
        { code: '+249', flag: '🇸🇩', name: 'Sudan' },
        { code: '+597', flag: '🇸🇷', name: 'Suriname' },
        { code: '+268', flag: '🇸🇿', name: 'Swaziland' },
        { code: '+46', flag: '🇸🇪', name: 'Sweden' },
        { code: '+41', flag: '🇨🇭', name: 'Switzerland' },
        { code: '+963', flag: '🇸🇾', name: 'Syria' },
        { code: '+886', flag: '🇹🇼', name: 'Taiwan' },
        { code: '+992', flag: '🇹🇯', name: 'Tajikistan' },
        { code: '+255', flag: '🇹🇿', name: 'Tanzania' },
        { code: '+66', flag: '🇹🇭', name: 'Thailand' },
        { code: '+670', flag: '🇹🇱', name: 'Timor-Leste' },
        { code: '+228', flag: '🇹🇬', name: 'Togo' },
        { code: '+676', flag: '🇹🇴', name: 'Tonga' },
        { code: '+1', flag: '🇹🇹', name: 'Trinidad and Tobago' },
        { code: '+216', flag: '🇹🇳', name: 'Tunisia' },
        { code: '+90', flag: '🇹🇷', name: 'Turkey' },
        { code: '+993', flag: '🇹🇲', name: 'Turkmenistan' },
        { code: '+688', flag: '🇹🇻', name: 'Tuvalu' },
        { code: '+256', flag: '🇺🇬', name: 'Uganda' },
        { code: '+380', flag: '🇺🇦', name: 'Ukraine' },
        { code: '+971', flag: '🇦🇪', name: 'United Arab Emirates' },
        { code: '+44', flag: '🇬🇧', name: 'United Kingdom' },
        { code: '+1', flag: '🇺🇸', name: 'United States' },
        { code: '+598', flag: '🇺🇾', name: 'Uruguay' },
        { code: '+998', flag: '🇺🇿', name: 'Uzbekistan' },
        { code: '+678', flag: '🇻🇺', name: 'Vanuatu' },
        { code: '+58', flag: '🇻🇪', name: 'Venezuela' },
        { code: '+84', flag: '🇻🇳', name: 'Vietnam' },
        { code: '+967', flag: '🇾🇪', name: 'Yemen' },
        { code: '+260', flag: '🇿🇲', name: 'Zambia' },
        { code: '+263', flag: '🇿🇼', name: 'Zimbabwe' },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'message' && value.length > 87) return;
        if (name === 'mobile') {
            // Only allow digits and max 10
            const digits = value.replace(/\D/g, '').slice(0, 10);
            setFormData({ ...formData, [name]: digits });
            return;
        }
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Mobile Number Validation
        const mobile = formData.mobile;
        const sequential = "1234567890";
        const reverseSequential = "0987654321";
        const altReverseSequential = "9876543210";
        const repetitive = /^(\d)\1{9}$/;

        if (mobile.length !== 10) {
            setStatus('invalid_mobile');
            return;
        }

        if (mobile === sequential || mobile === reverseSequential || mobile === altReverseSequential || repetitive.test(mobile)) {
            setStatus('invalid_pattern');
            return;
        }

        // 1. Check for Duplicate Email using LocalStorage
        const sentEmails = JSON.parse(localStorage.getItem('astrofied_feedback_emails')) || [];
        const normalizedEmail = formData.email.toLowerCase().trim();

        if (sentEmails.includes(normalizedEmail)) {
            setStatus('duplicate');
            return;
        }

        setStatus('loading');

        try {
            // Using FormSubmit.co for reliable cross-domain mail delivery
            const response = await fetch("https://formsubmit.co/ajax/contact.astrofied@gmail.com", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    mobile: `${formData.countryCode} ${formData.mobile}`,
                    message: formData.message,
                    _replyto: formData.email,
                    _subject: `Feedback from ${formData.name} - Astrofied`,
                    _captcha: "false",
                    _template: "table"
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Save the email to local storage to prevent duplicates
                sentEmails.push(normalizedEmail);
                localStorage.setItem('astrofied_feedback_emails', JSON.stringify(sentEmails));

                setStatus('success');
                setFormData({ name: '', email: '', mobile: '', countryCode: '+91', message: '' });

                // Reset success state after 5 seconds
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                console.error("FormSubmit Error:", data);
                setStatus('error');
            }
        } catch (error) {
            console.error("Submission Error:", error);
            setStatus('error');
        }
    };

    return (
        <section id="feedback" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="flex flex-col lg:flex-row gap-x-16 gap-y-12 items-start justify-between">
                    {/* Left Side: Content */}
                    <motion.div 
                        initial={{ opacity: 0.8, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="w-full lg:w-5/12 lg:pt-12 text-center lg:text-left"
                    >
                        <h2
                            className="text-4xl md:text-5xl font-bold mb-6 font-mulish leading-tight"
                            style={{ color: isDarkMode ? '#D4AF37' : '#4B0082' }}
                        >
                            We Value Your <br className="hidden lg:block" /> Feedback
                        </h2>
                        <p className={`text-lg md:text-xl opacity-80 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Your insights help us improve and serve you better. Share your experience with Astrofied!
                        </p>
                    </motion.div>

                    {/* Right Side: Form in its own Glass Card */}
                    <motion.div 
                        initial={{ opacity: 0.8, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className={`w-full lg:w-6/12 rounded-3xl p-8 md:p-10 shadow-2xl border relative ${
                            isDarkMode ? 'border-white/20 !bg-[#17202A]' : 'glass border-[#4B0082]/20 !bg-[#F3E8FF]/90'
                        }`}
                    >
                        {status === 'invalid_mobile' && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                                className="mb-6 p-4 rounded-xl bg-red-100 border border-red-200 text-red-700 flex items-center gap-3"
                            >
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                <span className="text-sm font-medium">Please enter a valid 10-digit mobile number.</span>
                            </motion.div>
                        )}

                        {status === 'invalid_pattern' && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                                className="mb-6 p-4 rounded-xl bg-red-100 border border-red-200 text-red-700 flex items-center gap-3"
                            >
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                <span className="text-sm font-medium">This number pattern is invalid. Please enter a real mobile number.</span>
                            </motion.div>
                        )}

                        {status === 'duplicate' && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                                className="mb-6 p-4 rounded-xl bg-red-100 border border-red-200 text-red-700 flex items-center gap-3"
                            >
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                <span className="text-sm font-medium">Feedback with your mail id was already sent. Try with a new mail id.</span>
                            </motion.div>
                        )}

                        {status === 'success' && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                                className="mb-6 p-4 rounded-xl bg-green-100 border border-green-200 text-green-700 flex items-center gap-3"
                            >
                                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                                <span className="text-sm font-medium">Thank you! Your feedback has been sent successfully.</span>
                            </motion.div>
                        )}

                        {status === 'error' && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                                className="mb-6 p-4 rounded-xl bg-red-100 border border-red-200 text-red-700 flex items-center gap-3"
                            >
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                <span className="text-sm font-medium">Something went wrong. Please try again later.</span>
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Your Name"
                                className={`w-full px-5 py-3 rounded-xl border focus:outline-none focus:ring-2 bg-transparent transition-all ${isDarkMode 
                                    ? 'border-white text-white placeholder-white focus:ring-white focus:border-white' 
                                    : 'border-black text-gray-900 placeholder-black focus:ring-[#4B0082] focus:border-[#4B0082]'
                                    }`}
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Your Mail Id"
                                className={`w-full px-5 py-3 rounded-xl border focus:outline-none focus:ring-2 bg-transparent transition-all ${isDarkMode 
                                    ? 'border-white text-white placeholder-white focus:ring-white focus:border-white' 
                                    : 'border-black text-gray-900 placeholder-black focus:ring-[#4B0082] focus:border-[#4B0082]'
                                    }`}
                            />

                            {/* Mobile Number with Country Code */}
                            <div className="flex gap-2">
                                <select
                                    name="countryCode"
                                    value={formData.countryCode}
                                    onChange={handleChange}
                                    className={`w-24 px-2 py-3 rounded-xl border focus:outline-none focus:ring-2 bg-transparent transition-all cursor-pointer ${isDarkMode 
                                        ? 'border-white text-white bg-black focus:ring-white focus:border-white' 
                                        : 'border-black text-gray-900 bg-[#F3E8FF] focus:ring-[#4B0082] focus:border-[#4B0082]'
                                        }`}
                                >
                                    {countryCodes.map((c) => (
                                        <option key={c.code + c.flag} value={c.code} className="text-black">
                                            {c.flag} {c.code}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="tel"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    required
                                    maxLength={10}
                                    placeholder="Mobile Number"
                                    className={`flex-1 px-5 py-3 rounded-xl border focus:outline-none focus:ring-2 bg-transparent transition-all ${isDarkMode 
                                        ? 'border-white text-white placeholder-white focus:ring-white focus:border-white' 
                                        : 'border-black text-gray-900 placeholder-black focus:ring-[#4B0082] focus:border-[#4B0082]'
                                        }`}
                                />
                            </div>

                            <div className="relative">
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    maxLength={87}
                                    placeholder="Write your feedback..."
                                    className={`w-full px-5 py-3 rounded-xl border focus:outline-none focus:ring-2 bg-transparent transition-all overflow-hidden resize-none ${isDarkMode 
                                        ? 'border-white text-white placeholder-white focus:ring-white focus:border-white' 
                                        : 'border-black text-gray-900 placeholder-black focus:ring-[#4B0082] focus:border-[#4B0082]'
                                        }`}
                                ></textarea>
                                <div className={`absolute bottom-2 right-4 text-[10px] font-bold ${isDarkMode ? 'text-white/40' : 'text-[#4B0082]/40'}`}>
                                    {formData.message.length}/87
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={status === 'loading'}
                                type="submit"
                                className={`w-full py-4 rounded-xl font-bold flex justify-center items-center gap-2 transition-all shadow-lg ${status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''
                                    } ${isDarkMode
                                        ? 'bg-gold text-black hover:bg-yellow-500 shadow-gold/20'
                                        : 'bg-[#4B0082] text-white hover:bg-[#3A0066] shadow-[#4B0082]/30'
                                    }`}
                            >
                                {status === 'loading' ? 'Sending...' : 'Send Feedback'}
                                {status !== 'loading' && <Send className="w-5 h-5" />}
                            </motion.button>


                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
