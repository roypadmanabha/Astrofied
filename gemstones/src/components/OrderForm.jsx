import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { isValidIndianMobile } from '../lib/constants';
import LegalModal from './LegalModal';

const TERMS_CONTENT = `
<ol class="list-decimal pl-4 sm:pl-5 space-y-3 sm:space-y-4 text-justify font-mulish text-[#0A1931]/90">
  <li><strong>Payment Agreement:</strong> You solely agree to bear the full cost and make the complete payment for the gemstone.</li>
  <li><strong>Voluntary Decision:</strong> The gemstone was suggested by our astrologer, and you confirm that you are purchasing it voluntarily, with absolute personal consent and without any force or obligation.</li>
  <li><strong>Realisation of Remedies:</strong> There is no guarantee that a gemstone can resolve your life's problems instantly or within a fraction of a second; astrological remedies work gradually over time.</li>
  <li><strong>Planetary Energy:</strong> Our gemstones are designed to provide positive energy and strengthen your planetary influences.</li>
  <li><strong>Lab Certified Authenticity:</strong> All our gemstones are lab-certified, tested, and guaranteed to be 100% authentic.</li>
  <li><strong>Personal Use Only:</strong> These gemstones are sold for personal use only and are strictly not intended for resale or commercial purposes.</li>
</ol>
`;

import statesAndDistrictsData from '../lib/states-districts.json';

// Dynamic list of all Indian States & Union Territories from database JSON
const indianStatesAndUTs = statesAndDistrictsData.states.map(s => s.state);

// Local fallback and partial-search database for Tripura pincodes
const localPincodeDatabase = [
  { pincode: '799001', office: 'Agartala', district: 'West Tripura', state: 'Tripura' },
  { pincode: '799002', office: 'Agartala Bazar', district: 'West Tripura', state: 'Tripura' },
  { pincode: '799003', office: 'Abhoynagar', district: 'West Tripura', state: 'Tripura' },
  { pincode: '799004', office: 'Agartala Aerodrome', district: 'West Tripura', state: 'Tripura' },
  { pincode: '799005', office: 'Arundhatinagar', district: 'West Tripura', state: 'Tripura' },
  { pincode: '799006', office: 'Kunjaban', district: 'West Tripura', state: 'Tripura' },
  { pincode: '799007', office: 'Ramnagar', district: 'West Tripura', state: 'Tripura' },
  { pincode: '799008', office: 'Banamalipur', district: 'West Tripura', state: 'Tripura' },
  { pincode: '799009', office: 'Dukli', district: 'West Tripura', state: 'Tripura' },
  { pincode: '799010', office: 'Sidhai', district: 'West Tripura', state: 'Tripura' },
  { pincode: '799011', office: 'Agartala College', district: 'West Tripura', state: 'Tripura' },
  { pincode: '799012', office: 'ONGC Agartala', district: 'West Tripura', state: 'Tripura' },
  { pincode: '799114', office: 'Melaghar', district: 'Sepahijala', state: 'Tripura' },
  { pincode: '799115', office: 'Sonamura', district: 'Sepahijala', state: 'Tripura' },
  { pincode: '799120', office: 'Udaipur', district: 'Gomati', state: 'Tripura' },
  { pincode: '799125', office: 'Amarpur', district: 'Gomati', state: 'Tripura' },
  { pincode: '799130', office: 'Belonia', district: 'South Tripura', state: 'Tripura' },
  { pincode: '799131', office: 'Hrishyamukh', district: 'South Tripura', state: 'Tripura' },
  { pincode: '799144', office: 'Sabroom', district: 'South Tripura', state: 'Tripura' },
  { pincode: '799201', office: 'Dharmanagar', district: 'North Tripura', state: 'Tripura' },
  { pincode: '799250', office: 'Kailashahar', district: 'Unakoti', state: 'Tripura' },
  { pincode: '799251', office: 'Kumarghat', district: 'Unakoti', state: 'Tripura' },
  { pincode: '799205', office: 'Khowai', district: 'Khowai', state: 'Tripura' },
  { pincode: '799210', office: 'Kamalpur', district: 'Dhalai', state: 'Tripura' },
  { pincode: '799277', office: 'Ambassa', district: 'Dhalai', state: 'Tripura' }
];

export default function OrderForm({ onSubmitSuccess }) {
  // Form Field States
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [paymentType, setPaymentType] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [country, setCountry] = useState('INDIA');
  const [consent, setConsent] = useState(false);
  const [secretCode, setSecretCode] = useState('');
  const [showSecretCode, setShowSecretCode] = useState(false);

  // Dynamic districts list computed based on active state selection
  const districtsList = React.useMemo(() => {
    if (!state) return [];
    const stateObj = statesAndDistrictsData.states.find(s =>
      s.state === state ||
      s.state.replace(/\s*\(ut\)\s*|\s*\(nct\)\s*/gi, '') === state.replace(/\s*\(ut\)\s*|\s*\(nct\)\s*/gi, '')
    );
    return stateObj ? [...stateObj.districts, 'Others'] : ['Others'];
  }, [state]);

  // New Payment Fields States
  const [totalAmount, setTotalAmount] = useState('');
  const [advanceAmount, setAdvanceAmount] = useState('');
  const [totalAmountTouched, setTotalAmountTouched] = useState(false);
  const [advanceAmountTouched, setAdvanceAmountTouched] = useState(false);
  const [totalAmountError, setTotalAmountError] = useState('');
  const [advanceAmountError, setAdvanceAmountError] = useState('');

  // Gemstone and Size state
  const [gemstone, setGemstone] = useState('');
  const [size, setSize] = useState('');
  const [gemstoneTouched, setGemstoneTouched] = useState(false);
  const [sizeTouched, setSizeTouched] = useState(false);
  const [gemstoneError, setGemstoneError] = useState('');
  const [sizeError, setSizeError] = useState('');

  // Autocomplete suggestions state
  const [pincodeSuggestions, setPincodeSuggestions] = useState([]);
  const [isSearchingPincode, setIsSearchingPincode] = useState(false);

  // Focus/Blur validation indicators
  const [firstNameTouched, setFirstNameTouched] = useState(false);
  const [lastNameTouched, setLastNameTouched] = useState(false);
  const [mobileTouched, setMobileTouched] = useState(false);
  const [streetAddressTouched, setStreetAddressTouched] = useState(false);
  const [districtTouched, setDistrictTouched] = useState(false);
  const [cityTouched, setCityTouched] = useState(false);
  const [stateTouched, setStateTouched] = useState(false);
  const [pincodeTouched, setPincodeTouched] = useState(false);

  // Error States
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [streetAddressError, setStreetAddressError] = useState('');
  const [districtError, setDistrictError] = useState('');
  const [cityError, setCityError] = useState('');
  const [stateError, setStateError] = useState('');
  const [pincodeError, setPincodeError] = useState('');
  const [submitError, setSubmitError] = useState('');

  // Loading state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle suggestion click/selection (Auto-fill remaining fields)
  const handlePincodeSelect = (suggestion) => {
    setPincode(suggestion.pincode);
    setCity(suggestion.office);

    // Find matching state object dynamically
    const stateObj = statesAndDistrictsData.states.find(s =>
      s.state.toLowerCase() === suggestion.state.toLowerCase() ||
      s.state.toLowerCase().replace(/\s*\(ut\)\s*|\s*\(nct\)\s*/g, '') === suggestion.state.toLowerCase().replace(/\s*\(ut\)\s*|\s*\(nct\)\s*/g, '')
    );

    if (stateObj) {
      setState(stateObj.state);

      // Find matching district in this state's district list
      const foundDistrict = stateObj.districts.find(d =>
        d.toLowerCase() === suggestion.district.toLowerCase() ||
        d.toLowerCase().includes(suggestion.district.toLowerCase()) ||
        suggestion.district.toLowerCase().includes(d.toLowerCase())
      );
      if (foundDistrict) {
        setDistrict(foundDistrict);
      } else {
        setDistrict('Others');
      }
    } else {
      setState(suggestion.state);
      setDistrict('Others');
    }

    // Clear suggestion lists
    setPincodeSuggestions([]);

    // Reset individual error states since we auto-filled valid coordinates
    setPincodeError('');
    setCityError('');
    setDistrictError('');
    setStateError('');
  };

  // Real-time PIN Code autocomplete logic
  useEffect(() => {
    if (pincode.length < 6) {
      // Clear auto-populated fields while editing pincode to prevent stale address components
      setCity('');
      setState('');
      setDistrict('');
    }

    if (pincode.length < 3) {
      setPincodeSuggestions([]);
      return;
    }

    // Filter local database first for instant suggestions
    const localMatches = localPincodeDatabase.filter(item =>
      item.pincode.startsWith(pincode)
    ).map(item => ({
      pincode: item.pincode,
      office: item.office,
      district: item.district,
      state: item.state,
      isLocal: true
    }));

    if (pincode.length < 6) {
      setPincodeSuggestions(localMatches);
    } else if (pincode.length === 6) {
      // Trigger live Indian Post API lookup
      setIsSearchingPincode(true);
      fetch(`https://api.postalpincode.in/pincode/${pincode}`)
        .then(res => res.json())
        .then(data => {
          if (data && data[0] && data[0].Status === 'Success') {
            const liveMatches = data[0].PostOffice.map(po => ({
              pincode: po.Pincode,
              office: po.Name,
              district: po.District,
              state: po.State,
              isLocal: false
            }));
            setPincodeSuggestions(liveMatches);

            // Auto-populate the first option immediately on complete 6-digit match
            if (liveMatches.length > 0) {
              handlePincodeSelect(liveMatches[0]);
            }
          } else {
            setPincodeSuggestions(localMatches);
            if (localMatches.length > 0) {
              handlePincodeSelect(localMatches[0]);
            }
          }
        })
        .catch(err => {
          console.error("Live PIN lookup failed, fallback to local matches", err);
          setPincodeSuggestions(localMatches);
          if (localMatches.length > 0) {
            handlePincodeSelect(localMatches[0]);
          }
        })
        .finally(() => {
          setIsSearchingPincode(false);
        });
    }
  }, [pincode]);

  // Validate First Name
  useEffect(() => {
    if (firstNameTouched) {
      if (!firstName.trim()) {
        setFirstNameError('First name is required');
      } else {
        setFirstNameError('');
      }
    }
  }, [firstName, firstNameTouched]);

  // Validate Last Name
  useEffect(() => {
    if (lastNameTouched) {
      if (!lastName.trim()) {
        setLastNameError('Last name is required');
      } else {
        setLastNameError('');
      }
    }
  }, [lastName, lastNameTouched]);

  // Validate Mobile
  useEffect(() => {
    if (mobileTouched) {
      if (!mobile) {
        setMobileError('Mobile number is required');
      } else if (!isValidIndianMobile(mobile)) {
        setMobileError('Enter a valid 10-digit number');
      } else {
        setMobileError('');
      }
    }
  }, [mobile, mobileTouched]);

  // Validate Street Address (Max 500 chars)
  useEffect(() => {
    if (streetAddressTouched) {
      if (!streetAddress.trim()) {
        setStreetAddressError('Address is required');
      } else if (streetAddress.length > 500) {
        setStreetAddressError('Maximum 500 characters allowed');
      } else {
        setStreetAddressError('');
      }
    }
  }, [streetAddress, streetAddressTouched]);

  // Validate District
  useEffect(() => {
    if (districtTouched) {
      if (!district) {
        setDistrictError('District selection is required');
      } else {
        setDistrictError('');
      }
    }
  }, [district, districtTouched]);

  // Validate City
  useEffect(() => {
    if (cityTouched) {
      if (!city.trim()) {
        setCityError('City/Town/Village is required');
      } else {
        setCityError('');
      }
    }
  }, [city, cityTouched]);

  // Validate State
  useEffect(() => {
    if (stateTouched) {
      if (!state) {
        setStateError('State selection is required');
      } else {
        setStateError('');
      }
    }
  }, [state, stateTouched]);

  // Validate Pincode (Exactly 6 digits)
  useEffect(() => {
    if (pincodeTouched) {
      if (!pincode) {
        setPincodeError('PIN Code is required');
      } else if (pincode.length !== 6) {
        setPincodeError('Must be exactly 6 digits');
      } else {
        setPincodeError('');
      }
    }
  }, [pincode, pincodeTouched]);

  // Validate Total Amount
  useEffect(() => {
    if (totalAmountTouched) {
      if (!totalAmount) {
        setTotalAmountError('Total Amount is required');
      } else if (parseInt(totalAmount) <= 0) {
        setTotalAmountError('Must be greater than 0');
      } else {
        setTotalAmountError('');
      }
    }
  }, [totalAmount, totalAmountTouched]);

  // Validate Gemstone Dropdown
  useEffect(() => {
    if (gemstoneTouched) {
      if (!gemstone) {
        setGemstoneError('Gemstone selection is required');
      } else {
        setGemstoneError('');
      }
    }
  }, [gemstone, gemstoneTouched]);

  // Validate Size Input
  useEffect(() => {
    if (sizeTouched) {
      if (!size) {
        setSizeError('Size is required');
      } else {
        const num = parseFloat(size);
        if (isNaN(num) || num <= 0) {
          setSizeError('Enter a valid size');
        } else {
          setSizeError('');
        }
      }
    }
  }, [size, sizeTouched]);

  // Calculate Advance Amount (50% of Total) dynamically
  useEffect(() => {
    const total = parseInt(totalAmount) || 0;
    const half = Math.round(total * 0.5);
    setAdvanceAmount(half > 0 ? half.toString() : '');
  }, [totalAmount]);

  // Derived calculated pending amount
  const calculatedPendingAmount = React.useMemo(() => {
    const total = parseInt(totalAmount) || 0;
    const advance = parseInt(advanceAmount) || 0;
    const pending = total - advance;
    return pending >= 0 ? pending : 0;
  }, [totalAmount, advanceAmount]);

  // Key filtering inputs on keystroke
  const handleFirstNameChange = (e) => {
    const val = e.target.value;
    const clean = val.replace(/[^a-zA-Z\s]/g, '');
    const formatted = clean.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    setFirstName(formatted);
  };

  const handleLastNameChange = (e) => {
    const val = e.target.value;
    const clean = val.replace(/[^a-zA-Z\s]/g, '');
    const formatted = clean.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    setLastName(formatted);
  };

  const handleAmountChange = (e, setter) => {
    const input = e.target;
    const rawValue = input.value.replace(/\D/g, ''); // get only digits
    if (rawValue.length > 7) return;

    // Calculate cursor offset before state change
    const cursorPosition = input.selectionStart;
    const valueBeforeCursor = input.value.substring(0, cursorPosition);
    const digitsBeforeCursor = valueBeforeCursor.replace(/\D/g, '').length;

    // Calculate new formatted value
    const formattedValue = rawValue ? parseInt(rawValue).toLocaleString('en-IN') : '';

    // Update State
    setter(rawValue);

    // Keep cursor aligned after rerender
    requestAnimationFrame(() => {
      let newCursorPosition = 0;
      let digitsFound = 0;
      for (let i = 0; i < formattedValue.length; i++) {
        if (/\d/.test(formattedValue[i])) {
          digitsFound++;
        }
        newCursorPosition = i + 1;
        if (digitsFound === digitsBeforeCursor) {
          break;
        }
      }
      input.setSelectionRange(newCursorPosition, newCursorPosition);
    });
  };

  const handleTotalAmountChange = (e) => {
    handleAmountChange(e, setTotalAmount);
  };

  const handleSizeChange = (e) => {
    const val = e.target.value;
    // Allow digits and at most one decimal point
    const clean = val.replace(/[^0-9.]/g, '');
    const parts = clean.split('.');
    if (parts.length > 2) return;
    
    let beforeDecimal = parts[0] || '';
    let afterDecimal = parts[1] || '';
    
    // Enforce max 2 digits before decimal
    if (beforeDecimal.length > 2) {
      beforeDecimal = beforeDecimal.slice(0, 2);
    }
    // Enforce max 2 digits after decimal
    if (afterDecimal.length > 2) {
      afterDecimal = afterDecimal.slice(0, 2);
    }
    
    const finalVal = parts.length === 2 ? `${beforeDecimal}.${afterDecimal}` : beforeDecimal;
    setSize(finalVal);
  };

  const handleSizeBlur = () => {
    setSizeTouched(true);
    if (!size) {
      setSizeError('Size is required');
      return;
    }
    const num = parseFloat(size);
    if (isNaN(num) || num <= 0) {
      setSizeError('Please enter a valid size');
    } else {
      const parts = num.toFixed(2).split('.');
      const before = parts[0].padStart(2, '0');
      const after = parts[1];
      if (before.length > 2) {
        setSizeError('Size cannot exceed 99.99 mm');
      } else {
        setSize(`${before}.${after}`);
        setSizeError('');
      }
    }
  };

  const handleMobileChange = (e) => {
    const val = e.target.value.replace(/\D/g, '');
    if (val.length <= 10) {
      setMobile(val);
    }
  };

  const handleCityChange = (e) => {
    // Exclude numbers (0-9) and commas (,) in real-time
    const val = e.target.value.replace(/[0-9,]/g, '');
    setCity(val);
  };

  const handlePincodeChange = (e) => {
    const val = e.target.value.replace(/\D/g, '');
    if (val.length <= 6) {
      setPincode(val);
    }
  };

  const isFormValid =
    paymentType && paymentType !== '' &&
    (!['Advance Payment', 'Pending Payment'].includes(paymentType) || (
      totalAmount && !totalAmountError &&
      gemstone && !gemstoneError &&
      size && !sizeError
    )) &&
    firstName.trim() && !firstNameError &&
    lastName.trim() && !lastNameError &&
    mobile && isValidIndianMobile(mobile) && !mobileError &&
    streetAddress.trim() && !streetAddressError &&
    district && !districtError &&
    city.trim() && !cityError &&
    state && !stateError &&
    pincode && pincode.length === 6 && !pincodeError &&
    consent &&
    secretCode.trim() === 'Astrofied154';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);
    setSubmitError('');

    // Combine split address fields to a single clean string for sheet backward compatibility
    const formattedAddress = [
      streetAddress.trim(),
      city.trim(),
      district,
      state,
      pincode,
      country
    ].filter(Boolean).join(', ');

    const formData = {
      paymentType,
      name: `${firstName.trim()} ${lastName.trim()}`,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      mobile: mobile.trim(),
      address: formattedAddress,
      streetAddress: streetAddress.trim(),
      city: city.trim(),
      district: district,
      state: state,
      pincode: pincode,
      totalAmount: totalAmount || '0',
      advanceAmount: advanceAmount || '0',
      pendingAmount: calculatedPendingAmount.toString(),
      gemstone: gemstone,
      size: size ? `${size} mm` : '',
      consent: consent ? 'Yes' : 'No',
      timestamp: new Date().toISOString()
    };

    try {
      const url = import.meta.env.VITE_GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbwW0El1KSmoNWRGEeTAbBYd3FcTXiEL1luTtMHjFNozbfJ1SOPvHObA26jcXJWehsg/exec';

      if (!url) {
        throw new Error('Google Apps Script URL is missing. Please configure VITE_GOOGLE_SCRIPT_URL in your env settings.');
      }

      const formBody = new URLSearchParams(formData).toString();

      await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formBody,
      });

      onSubmitSuccess({
        name: formData.name,
        mobile: formData.mobile,
        address: formattedAddress,
        paymentType: formData.paymentType,
        totalAmount: formData.totalAmount,
        advanceAmount: formData.advanceAmount,
        pendingAmount: formData.pendingAmount,
        gemstone: gemstone,
        size: size,
        amountToPay: formData.paymentType === 'Advance Payment' ? formData.advanceAmount : formData.pendingAmount
      });
    } catch (err) {
      console.error('Order submission failed:', err);
      setSubmitError(err.message || 'Network error occurred. Please check your internet connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="order-form" className="py-10 sm:py-16 md:py-24 bg-white border-t border-[#E5DFC2] transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-12 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-x-8 xl:gap-x-16 gap-y-6 sm:gap-y-12 items-start lg:items-center justify-between">

          {/* Left Column: Heading Text */}
          <motion.div
            initial={{ opacity: 0.8, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full lg:w-5/12 text-center lg:text-left space-y-6"
          >
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-black font-mulish leading-[1.1] text-black">
              <span className="text-[#A30000]">Complete</span> Your Purchase
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl opacity-80 leading-relaxed text-[#555555] font-mulish">
              Please fill in your personal details to complete your gemstone order. Our support team will confirm and assist you.
            </p>
            <div className="bg-[#FAF9F6] border border-[#E5DFC2]/60 rounded-2xl p-5 text-left space-y-2 shadow-sm">
              <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#A30000] font-mulish">
                Payment Policy
              </h4>
              <p className="text-xs sm:text-sm leading-relaxed text-[#666666] font-mulish font-medium text-justify">
                We offer a flexible split-payment option for the convenience of our clients. You must pay <strong>50% of the total amount</strong> of a prescribed gemstone as an advance payment, while the remaining <strong>50%</strong> is due just before receiving the gemstone.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Form Panel Card */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full lg:w-6/12 bg-[#f5f5dd] rounded-2xl sm:rounded-3xl border border-[#E5DFC2] p-4 sm:p-8 md:p-10 shadow-xl shadow-black/[0.03]"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5 font-mulish">

              {/* Payment Type */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A30000] font-mulish">
                  Payment Type
                </label>
                <select
                  value={paymentType}
                  onChange={(e) => {
                    setPaymentType(e.target.value);
                    // Reset amount inputs on type change to clean state
                    setTotalAmount('');
                    setAdvanceAmount('');
                    setTotalAmountTouched(false);
                    setAdvanceAmountTouched(false);
                    setTotalAmountError('');
                    setAdvanceAmountError('');
                    // Also reset gemstone and size fields
                    setGemstone('');
                    setSize('');
                    setGemstoneTouched(false);
                    setSizeTouched(false);
                    setGemstoneError('');
                    setSizeError('');
                  }}
                  className="w-full bg-white border border-[#E5DFC2] text-black rounded-xl px-3 py-2.5 sm:px-4 sm:py-3.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#A30000] transition-all cursor-pointer font-bold"
                >
                  <option value="" disabled>Select one</option>
                  <option value="Advance Payment">Advance Payment</option>
                  <option value="Pending Payment">Pending Payment</option>
                </select>
              </div>

              {/* Conditional Amount & Gemstone Fields */}
              {(paymentType === 'Advance Payment' || paymentType === 'Pending Payment') && (
                <div className="flex flex-col gap-4 sm:gap-5 animate-[fadeIn_0.3s_ease-out]">
                  {/* Amount Fields Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Total Amount */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A30000] font-mulish">
                        Total Amount
                      </label>
                      <div className="flex rounded-xl bg-white border border-[#E5DFC2] focus-within:ring-2 focus-within:ring-[#A30000] transition-all overflow-hidden">
                        <span className="bg-[#E5DFC2]/50 border-r border-[#E5DFC2] text-[#555555] px-3 py-2.5 sm:px-3.5 sm:py-3.5 text-sm sm:text-base font-extrabold select-none flex items-center justify-center font-mulish">
                          ₹
                        </span>
                        <input
                          type="text"
                          placeholder="0"
                          value={totalAmount ? parseInt(totalAmount).toLocaleString('en-IN') : ''}
                          onChange={handleTotalAmountChange}
                          onBlur={() => setTotalAmountTouched(true)}
                          className="w-full bg-transparent text-black px-3.5 py-2.5 sm:px-4 sm:py-3.5 text-sm sm:text-base focus:outline-none border-none font-extrabold"
                        />
                      </div>
                      {totalAmountError && (
                        <div className="flex items-center gap-1 text-[#A30000] text-[10px] font-bold font-mulish mt-0.5">
                          <AlertCircle size={12} />
                          <span>{totalAmountError}</span>
                        </div>
                      )}
                    </div>

                    {/* Advance Amount */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A30000] font-mulish">
                        Advance Amount
                      </label>
                      <div className="flex rounded-xl bg-white border border-[#E5DFC2] overflow-hidden">
                        <span className="bg-[#E5DFC2]/50 border-r border-[#E5DFC2] text-[#555555] px-3 py-2.5 sm:px-3.5 sm:py-3.5 text-sm sm:text-base font-extrabold select-none flex items-center justify-center font-mulish">
                          ₹
                        </span>
                        <input
                          type="text"
                          placeholder="0"
                          value={advanceAmount ? parseInt(advanceAmount).toLocaleString('en-IN') : '0'}
                          readOnly
                          disabled
                          className="w-full bg-transparent text-black px-3.5 py-2.5 sm:px-4 sm:py-3.5 text-sm sm:text-base focus:outline-none border-none font-extrabold cursor-not-allowed"
                        />
                      </div>
                    </div>

                    {/* Pending Amount */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A30000] font-mulish">
                        Pending Amount
                      </label>
                      <div className="flex rounded-xl bg-white border border-[#E5DFC2] overflow-hidden">
                        <span className="bg-[#E5DFC2]/50 border-r border-[#E5DFC2] text-[#555555] px-3 py-2.5 sm:px-3.5 sm:py-3.5 text-sm sm:text-base font-extrabold select-none flex items-center justify-center font-mulish">
                          ₹
                        </span>
                        <input
                          type="text"
                          value={calculatedPendingAmount ? parseInt(calculatedPendingAmount).toLocaleString('en-IN') : '0'}
                          readOnly
                          disabled
                          className="w-full bg-transparent text-black px-3.5 py-2.5 sm:px-4 sm:py-3.5 text-sm sm:text-base focus:outline-none border-none font-extrabold cursor-not-allowed"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Gemstone & Size Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Gemstone Dropdown */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A30000] font-mulish">
                        Gemstone
                      </label>
                      <select
                        value={gemstone}
                        onChange={(e) => setGemstone(e.target.value)}
                        onBlur={() => setGemstoneTouched(true)}
                        className="w-full bg-white border border-[#E5DFC2] text-black rounded-xl px-3 py-2.5 sm:px-4 sm:py-3.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#A30000] transition-all cursor-pointer font-bold"
                      >
                        <option value="" disabled>Select Gemstone</option>
                        <option value="Ruby">Ruby</option>
                        <option value="Mukta">Mukta</option>
                        <option value="Prabal">Prabal</option>
                        <option value="Panna">Panna</option>
                        <option value="Pukhraj">Pukhraj</option>
                        <option value="Opal">Opal</option>
                        <option value="Neelam">Neelam</option>
                        <option value="Gomed">Gomed</option>
                        <option value="Cat's Eye">Cat's Eye</option>
                      </select>
                      {gemstoneError && (
                        <div className="flex items-center gap-1 text-[#A30000] text-[10px] font-bold font-mulish mt-0.5">
                          <AlertCircle size={12} />
                          <span>{gemstoneError}</span>
                        </div>
                      )}
                    </div>

                    {/* Size Input */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A30000] font-mulish">
                        Size (mm)
                      </label>
                      <div className="flex rounded-xl bg-white border border-[#E5DFC2] focus-within:ring-2 focus-within:ring-[#A30000] transition-all overflow-hidden">
                        <input
                          type="text"
                          placeholder="00.00"
                          value={size}
                          onChange={handleSizeChange}
                          onBlur={handleSizeBlur}
                          className="w-full bg-transparent text-black px-3.5 py-2.5 sm:px-4 sm:py-3.5 text-sm sm:text-base focus:outline-none border-none font-extrabold"
                        />
                        <span className="bg-[#E5DFC2]/50 border-l border-[#E5DFC2] text-[#555555] px-3 py-2.5 sm:px-3.5 sm:py-3.5 text-sm sm:text-base font-extrabold select-none flex items-center justify-center font-mulish">
                          mm
                        </span>
                      </div>
                      {sizeError && (
                        <div className="flex items-center gap-1 text-[#A30000] text-[10px] font-bold font-mulish mt-0.5">
                          <AlertCircle size={12} />
                          <span>{sizeError}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* First Name & Last Name Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* First Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A30000] font-mulish">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={handleFirstNameChange}
                    onBlur={() => setFirstNameTouched(true)}
                    onPaste={(e) => e.preventDefault()}
                    autoComplete="given-name"
                    className="w-full bg-white border border-[#E5DFC2] text-black rounded-xl px-3 py-2.5 sm:px-4 sm:py-3.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#A30000] transition-all font-bold"
                  />
                  {firstNameError && (
                    <div className="flex items-center gap-1 text-[#A30000] text-[10px] font-bold font-mulish mt-0.5">
                      <AlertCircle size={12} />
                      <span>{firstNameError}</span>
                    </div>
                  )}
                </div>

                {/* Last Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A30000] font-mulish">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={handleLastNameChange}
                    onBlur={() => setLastNameTouched(true)}
                    onPaste={(e) => e.preventDefault()}
                    autoComplete="family-name"
                    className="w-full bg-white border border-[#E5DFC2] text-black rounded-xl px-3 py-2.5 sm:px-4 sm:py-3.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#A30000] transition-all font-bold"
                  />
                  {lastNameError && (
                    <div className="flex items-center gap-1 text-[#A30000] text-[10px] font-bold font-mulish mt-0.5">
                      <AlertCircle size={12} />
                      <span>{lastNameError}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Number */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A30000] font-mulish">
                  Mobile No.
                </label>
                <div className="flex rounded-xl bg-white border border-[#E5DFC2] focus-within:ring-2 focus-within:ring-[#A30000] transition-all overflow-hidden">
                  <span className="bg-[#E5DFC2]/50 border-r border-[#E5DFC2] text-[#555555] px-3 py-2.5 sm:px-3.5 sm:py-3.5 text-sm sm:text-base font-extrabold select-none flex items-center justify-center font-mulish">
                    +91
                  </span>
                  <input
                    type="tel"
                    placeholder="10-digit number"
                    value={mobile}
                    onChange={handleMobileChange}
                    onBlur={() => setMobileTouched(true)}
                    className="w-full bg-transparent text-black px-3.5 py-2.5 sm:px-4 sm:py-3.5 text-sm sm:text-base focus:outline-none border-none font-extrabold"
                  />
                </div>
                {mobileError && (
                  <div className="flex items-center gap-1 text-[#A30000] text-[10px] font-bold font-mulish mt-0.5">
                    <AlertCircle size={12} />
                    <span>{mobileError}</span>
                  </div>
                )}
              </div>

              {/* Address (Max 500 chars) */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A30000] font-mulish">
                    Address
                  </label>
                  <span className="text-[9px] font-bold text-gray-400">
                    {streetAddress.length}/500
                  </span>
                </div>
                <textarea
                  placeholder="Flat, House No., Building, Street address"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value.slice(0, 500))}
                  onBlur={() => setStreetAddressTouched(true)}
                  rows={2}
                  maxLength={500}
                  className="w-full bg-white border border-[#E5DFC2] text-black rounded-xl px-3 py-2.5 sm:px-4 sm:py-3.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#A30000] transition-all resize-none leading-relaxed font-bold"
                />
                {streetAddressError && (
                  <div className="flex items-center gap-1 text-[#A30000] text-[10px] font-bold font-mulish mt-0.5">
                    <AlertCircle size={12} />
                    <span>{streetAddressError}</span>
                  </div>
                )}
              </div>

              {/* State & District Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* State Dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A30000] font-mulish">
                    State
                  </label>
                  <select
                    value={state}
                    onChange={(e) => {
                      setState(e.target.value);
                      // Reset district selection when state changes
                      setDistrict('');
                      setDistrictTouched(false);
                    }}
                    onBlur={() => setStateTouched(true)}
                    className="w-full bg-white border border-[#E5DFC2] text-black rounded-xl px-3 py-2.5 sm:px-4 sm:py-3.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#A30000] transition-all cursor-pointer font-bold"
                  >
                    <option value="">Select State</option>
                    {indianStatesAndUTs.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {stateError && (
                    <div className="flex items-center gap-1 text-[#A30000] text-[10px] font-bold font-mulish mt-0.5">
                      <AlertCircle size={12} />
                      <span>{stateError}</span>
                    </div>
                  )}
                </div>

                {/* District Dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A30000] font-mulish">
                    District
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    onBlur={() => setDistrictTouched(true)}
                    disabled={!state}
                    className={`w-full bg-white border border-[#E5DFC2] text-black rounded-xl px-3 py-2.5 sm:px-4 sm:py-3.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#A30000] transition-all font-bold ${!state ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
                  >
                    <option value="">Select District</option>
                    {districtsList.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                  {districtError && (
                    <div className="flex items-center gap-1 text-[#A30000] text-[10px] font-bold font-mulish mt-0.5">
                      <AlertCircle size={12} />
                      <span>{districtError}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* PIN Code, City/Town/Village, Country Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* PIN Code with Autocomplete suggestions */}
                <div className="flex flex-col gap-1.5 relative">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A30000] font-mulish">
                      PIN Code
                    </label>
                    {isSearchingPincode && (
                      <Loader2 className="w-3 h-3 animate-spin text-[#A30000]" />
                    )}
                  </div>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="6 digits"
                    value={pincode}
                    onChange={handlePincodeChange}
                    onBlur={() => {
                      // Delay clear slightly to ensure mouse selection registers
                      setTimeout(() => setPincodeSuggestions([]), 200);
                      setPincodeTouched(true);
                    }}
                    className="w-full bg-white border border-[#E5DFC2] text-black rounded-xl px-3 py-2.5 sm:px-4 sm:py-3.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#A30000] transition-all font-bold"
                  />
                  {pincodeError && (
                    <div className="flex items-center gap-1 text-[#A30000] text-[10px] font-bold font-mulish mt-0.5">
                      <AlertCircle size={12} />
                      <span>{pincodeError}</span>
                    </div>
                  )}

                  {/* Realtime Autocomplete Suggestion Dropdown */}
                  {pincodeSuggestions.length > 0 && (
                    <div className="absolute z-50 left-0 right-0 top-full mt-2 border border-[#E5DFC2] rounded-xl overflow-hidden shadow-2xl bg-white max-h-48 overflow-y-auto">
                      {pincodeSuggestions.map((s, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onMouseDown={(e) => {
                            // Prevent blur from closing the list before choice registration
                            e.preventDefault();
                            handlePincodeSelect(s);
                          }}
                          className="w-full text-left px-4 py-3 text-xs font-semibold transition-all border-b border-[#E5DFC2]/50 last:border-0 text-black hover:bg-[#A30000]/10 hover:text-[#A30000]"
                        >
                          <span className="font-extrabold text-[#A30000]">{s.pincode}</span>
                          <span className="text-gray-500 font-medium"> - {s.office}, {s.district}, {s.state}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* City/Town/Village Input (Read-only) */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A30000] font-mulish">
                    City/Town/Village
                  </label>
                  <input
                    type="text"
                    placeholder="City"
                    value={city}
                    readOnly
                    className="w-full bg-white border border-[#E5DFC2] text-black rounded-xl px-3 py-2.5 sm:px-4 sm:py-3.5 text-sm sm:text-base font-bold cursor-not-allowed opacity-100 focus:outline-none"
                  />
                  {cityError && (
                    <div className="flex items-center gap-1 text-[#A30000] text-[10px] font-bold font-mulish mt-0.5">
                      <AlertCircle size={12} />
                      <span>{cityError}</span>
                    </div>
                  )}
                </div>

                {/* Country */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A30000] font-mulish">
                    Country
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-white border border-[#E5DFC2] text-black rounded-xl px-3 py-2.5 sm:px-4 sm:py-3.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#A30000] transition-all cursor-not-allowed font-bold"
                    disabled
                  >
                    <option value="INDIA">INDIA</option>
                  </select>
                </div>
              </div>

              {/* Enter Secret Code (Manual OTP) */}
              <div className="flex flex-col gap-1.5 mt-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A30000] font-mulish">
                  Enter Secret Code
                </label>
                <div className="relative w-full">
                  <input
                    type={showSecretCode ? 'text' : 'password'}
                    placeholder="Enter secret code to enable payment"
                    value={secretCode}
                    onChange={(e) => setSecretCode(e.target.value)}
                    className="w-full bg-white border border-[#E5DFC2] text-black rounded-xl pl-3 pr-10 py-2.5 sm:pl-4 sm:pr-12 sm:py-3.5 text-sm sm:text-base font-bold focus:outline-none focus:ring-2 focus:ring-[#A30000] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSecretCode(!showSecretCode)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black focus:outline-none transition-colors"
                  >
                    {showSecretCode ? (
                      <EyeOff className="w-4 h-4 sm:w-5 h-5" />
                    ) : (
                      <Eye className="w-4 h-4 sm:w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Consent Checkbox */}
              <div className="flex items-start gap-3 mt-2">
                <div
                  onClick={() => setConsent(!consent)}
                  className={`custom-checkbox mt-1 shrink-0 ${consent ? 'checked' : ''}`}
                  role="checkbox"
                  aria-checked={consent}
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); setConsent(!consent); } }}
                >
                  {consent && (
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                <label className="text-xs text-[#555555] leading-relaxed cursor-pointer select-none text-justify">
                  I hereby agree to the <a href="#terms" onClick={(e) => { e.preventDefault(); setIsTermsModalOpen(true); }} className="text-[#A30000] font-extrabold underline hover:opacity-80 transition-opacity">Terms and Conditions</a> of Astrofied. I confirm that I am purchasing this gemstone strictly based on my own informed decision and the recommendation provided by my consulting astrologer, and that no one has influenced, pressured, or obligated me to make this purchase.
                </label>
              </div>

              {/* Submission error */}
              {submitError && (
                <div className="p-4 rounded-xl bg-[#A30000]/5 border border-[#A30000]/20 text-[#A30000] text-sm flex items-start gap-3 mt-2 leading-relaxed font-semibold">
                  <AlertCircle size={20} className="shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className="btn btn-primary w-full mt-4 flex items-center justify-center gap-2 h-11 sm:h-14 text-sm sm:text-base font-mulish"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin shrink-0" />
                    <span className="whitespace-nowrap text-sm sm:text-base">Processing...</span>
                  </>
                ) : (
                  <span className="whitespace-nowrap text-sm sm:text-base">Proceed to Pay</span>
                )}
              </button>

            </form>
          </motion.div>

        </div>
      </div>

      <LegalModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
        title="Terms and Conditions"
        content={TERMS_CONTENT}
      />

      <style>{`
        .custom-checkbox {
          width: 20px;
          height: 20px;
          border: 2px solid var(--brand-red);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          background-color: transparent;
        }
        .custom-checkbox.checked {
          background-color: var(--brand-red);
        }
        .custom-checkbox:focus-visible {
          outline: 2px solid var(--brand-red);
          outline-offset: 2px;
        }
      `}</style>
    </section>
  );
}
