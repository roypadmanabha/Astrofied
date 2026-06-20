import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, AlertCircle } from 'lucide-react';
import { isValidIndianMobile } from '../lib/constants';

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
  const [paymentType, setPaymentType] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [country, setCountry] = useState('INDIA');
  const [consent, setConsent] = useState(false);

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

  // Autocomplete suggestions state
  const [pincodeSuggestions, setPincodeSuggestions] = useState([]);
  const [isSearchingPincode, setIsSearchingPincode] = useState(false);

  // Focus/Blur validation indicators
  const [nameTouched, setNameTouched] = useState(false);
  const [mobileTouched, setMobileTouched] = useState(false);
  const [streetAddressTouched, setStreetAddressTouched] = useState(false);
  const [districtTouched, setDistrictTouched] = useState(false);
  const [cityTouched, setCityTouched] = useState(false);
  const [stateTouched, setStateTouched] = useState(false);
  const [pincodeTouched, setPincodeTouched] = useState(false);

  // Error States
  const [nameError, setNameError] = useState('');
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

  // Validate Name
  useEffect(() => {
    if (nameTouched) {
      if (!name.trim()) {
        setNameError('Name is required');
      } else {
        setNameError('');
      }
    }
  }, [name, nameTouched]);

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
  const handleNameChange = (e) => {
    const filtered = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    setName(filtered);
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
      totalAmount && !totalAmountError
    )) &&
    name.trim() && !nameError &&
    mobile && isValidIndianMobile(mobile) && !mobileError &&
    streetAddress.trim() && !streetAddressError &&
    district && !districtError &&
    city.trim() && !cityError &&
    state && !stateError &&
    pincode && pincode.length === 6 && !pincodeError &&
    consent;

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
      name: name.trim(),
      mobile: `+91 ${mobile}`,
      address: formattedAddress,
      totalAmount: totalAmount || '0',
      advanceAmount: advanceAmount || '0',
      pendingAmount: calculatedPendingAmount.toString(),
      consent: consent ? 'Yes' : 'No',
      timestamp: new Date().toISOString()
    };

    try {
      const url = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
      
      if (!url) {
        throw new Error('Google Apps Script URL is missing. Please configure VITE_GOOGLE_SCRIPT_URL in your .env file.');
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
        paymentType: formData.paymentType,
        totalAmount: formData.totalAmount,
        advanceAmount: formData.advanceAmount,
        pendingAmount: formData.pendingAmount,
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
    <section id="order-form" className="py-16 md:py-24 bg-[#FAF7E8] border-t border-[#E5DFC2] transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-x-16 gap-y-12 items-start lg:items-center justify-between">
          
          {/* Left Column: Heading Text */}
          <motion.div
            initial={{ opacity: 0.8, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full lg:w-5/12 text-center lg:text-left space-y-6"
          >
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black font-nunito leading-[1.1] text-[#A30000]">
              Complete Your <span className="text-black">Purchase</span>
            </h2>
            <p className="text-lg md:text-xl opacity-80 leading-relaxed text-[#555555] font-mulish">
              Please fill in your prescription details to complete your gemstone order. Our support team will confirm and assist you.
            </p>
          </motion.div>

          {/* Right Column: Form Panel Card */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full lg:w-6/12 bg-white rounded-3xl border border-[#E5DFC2] p-6 sm:p-10 shadow-xl shadow-black/[0.03]"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 font-mulish">
              
              {/* Payment Type */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A30000] font-nunito">
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
                  }}
                  className="w-full bg-[#FAF7E8] border border-[#E5DFC2] text-black rounded-xl px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-[#A30000] transition-all cursor-pointer font-bold"
                >
                  <option value="" disabled>Select one</option>
                  <option value="Advance Payment">Advance Payment</option>
                  <option value="Pending Payment">Pending Payment</option>
                </select>
              </div>

              {/* Conditional Amount Fields */}
              {(paymentType === 'Advance Payment' || paymentType === 'Pending Payment') && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-[fadeIn_0.3s_ease-out]">
                  {/* Total Amount */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A30000] font-nunito">
                      Total Amount
                    </label>
                    <div className="flex rounded-xl bg-[#FAF7E8] border border-[#E5DFC2] focus-within:ring-2 focus-within:ring-[#A30000] transition-all overflow-hidden">
                      <span className="bg-[#E5DFC2]/50 border-r border-[#E5DFC2] text-[#555555] px-3.5 py-3.5 text-base font-extrabold select-none flex items-center justify-center font-nunito">
                        ₹
                      </span>
                      <input
                        type="text"
                        placeholder="0"
                        value={totalAmount ? parseInt(totalAmount).toLocaleString('en-IN') : ''}
                        onChange={handleTotalAmountChange}
                        onBlur={() => setTotalAmountTouched(true)}
                        className="w-full bg-transparent text-black px-4 py-3.5 text-base focus:outline-none border-none font-extrabold"
                      />
                    </div>
                    {totalAmountError && (
                      <div className="flex items-center gap-1 text-[#A30000] text-[10px] font-bold font-nunito mt-0.5">
                        <AlertCircle size={12} />
                        <span>{totalAmountError}</span>
                      </div>
                    )}
                  </div>

                  {/* Advance Payment Amount */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A30000] font-nunito">
                      Advance Payment Amount
                    </label>
                    <div className="flex rounded-xl bg-[#FAF7E8] border border-[#E5DFC2] overflow-hidden">
                      <span className="bg-[#E5DFC2]/50 border-r border-[#E5DFC2] text-[#555555] px-3.5 py-3.5 text-base font-extrabold select-none flex items-center justify-center font-nunito">
                        ₹
                      </span>
                      <input
                        type="text"
                        placeholder="0"
                        value={advanceAmount ? parseInt(advanceAmount).toLocaleString('en-IN') : '0'}
                        readOnly
                        disabled
                        className="w-full bg-transparent text-black px-4 py-3.5 text-base focus:outline-none border-none font-extrabold cursor-not-allowed"
                      />
                    </div>
                  </div>

                  {/* Pending Payment Amount */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A30000] font-nunito">
                      Pending Payment Amount
                    </label>
                    <div className="flex rounded-xl bg-[#FAF7E8] border border-[#E5DFC2] overflow-hidden">
                      <span className="bg-[#E5DFC2]/50 border-r border-[#E5DFC2] text-[#555555] px-3.5 py-3.5 text-base font-extrabold select-none flex items-center justify-center font-nunito">
                        ₹
                      </span>
                      <input
                        type="text"
                        value={calculatedPendingAmount ? parseInt(calculatedPendingAmount).toLocaleString('en-IN') : '0'}
                        readOnly
                        disabled
                        className="w-full bg-transparent text-black px-4 py-3.5 text-base focus:outline-none border-none font-extrabold cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Name & Mobile Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A30000] font-nunito">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Full name"
                    value={name}
                    onChange={handleNameChange}
                    onBlur={() => setNameTouched(true)}
                    onPaste={(e) => e.preventDefault()}
                    autoComplete="name"
                    className="w-full bg-[#FAF7E8] border border-[#E5DFC2] text-black rounded-xl px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-[#A30000] transition-all font-bold"
                  />
                  {nameError && (
                    <div className="flex items-center gap-1 text-[#A30000] text-[10px] font-bold font-nunito mt-0.5">
                      <AlertCircle size={12} />
                      <span>{nameError}</span>
                    </div>
                  )}
                </div>

                {/* Mobile Number */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A30000] font-nunito">
                    Mobile No.
                  </label>
                  <div className="flex rounded-xl bg-[#FAF7E8] border border-[#E5DFC2] focus-within:ring-2 focus-within:ring-[#A30000] transition-all overflow-hidden">
                    <span className="bg-[#E5DFC2]/50 border-r border-[#E5DFC2] text-[#555555] px-3.5 py-3.5 text-base font-extrabold select-none flex items-center justify-center font-nunito">
                      +91
                    </span>
                    <input
                      type="tel"
                      placeholder="10-digit number"
                      value={mobile}
                      onChange={handleMobileChange}
                      onBlur={() => setMobileTouched(true)}
                      className="w-full bg-transparent text-black px-4 py-3.5 text-base focus:outline-none border-none font-extrabold"
                    />
                  </div>
                  {mobileError && (
                    <div className="flex items-center gap-1 text-[#A30000] text-[10px] font-bold font-nunito mt-0.5">
                      <AlertCircle size={12} />
                      <span>{mobileError}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Address (Max 500 chars) */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A30000] font-nunito">
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
                  className="w-full bg-[#FAF7E8] border border-[#E5DFC2] text-black rounded-xl px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-[#A30000] transition-all resize-none leading-relaxed font-bold"
                />
                {streetAddressError && (
                  <div className="flex items-center gap-1 text-[#A30000] text-[10px] font-bold font-nunito mt-0.5">
                    <AlertCircle size={12} />
                    <span>{streetAddressError}</span>
                  </div>
                )}
              </div>

              {/* State & District Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* State Dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A30000] font-nunito">
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
                    className="w-full bg-[#FAF7E8] border border-[#E5DFC2] text-black rounded-xl px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-[#A30000] transition-all cursor-pointer font-bold"
                  >
                    <option value="">Select State</option>
                    {indianStatesAndUTs.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {stateError && (
                    <div className="flex items-center gap-1 text-[#A30000] text-[10px] font-bold font-nunito mt-0.5">
                      <AlertCircle size={12} />
                      <span>{stateError}</span>
                    </div>
                  )}
                </div>

                {/* District Dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A30000] font-nunito">
                    District
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    onBlur={() => setDistrictTouched(true)}
                    disabled={!state}
                    className={`w-full bg-[#FAF7E8] border border-[#E5DFC2] text-black rounded-xl px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-[#A30000] transition-all font-bold ${!state ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
                  >
                    <option value="">Select District</option>
                    {districtsList.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                  {districtError && (
                    <div className="flex items-center gap-1 text-[#A30000] text-[10px] font-bold font-nunito mt-0.5">
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
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A30000] font-nunito">
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
                    className="w-full bg-[#FAF7E8] border border-[#E5DFC2] text-black rounded-xl px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-[#A30000] transition-all font-bold"
                  />
                  {pincodeError && (
                    <div className="flex items-center gap-1 text-[#A30000] text-[10px] font-bold font-nunito mt-0.5">
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
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A30000] font-nunito">
                    City/Town/Village
                  </label>
                  <input
                    type="text"
                    placeholder="City"
                    value={city}
                    readOnly
                    className="w-full bg-[#FAF7E8] border border-[#E5DFC2] text-black rounded-xl px-4 py-3.5 text-base font-bold cursor-not-allowed opacity-100 focus:outline-none"
                  />
                  {cityError && (
                    <div className="flex items-center gap-1 text-[#A30000] text-[10px] font-bold font-nunito mt-0.5">
                      <AlertCircle size={12} />
                      <span>{cityError}</span>
                    </div>
                  )}
                </div>

                {/* Country */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A30000] font-nunito">
                    Country
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-[#FAF7E8] border border-[#E5DFC2] text-black rounded-xl px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-[#A30000] transition-all cursor-not-allowed font-bold"
                    disabled
                  >
                    <option value="INDIA">INDIA</option>
                  </select>
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
                <label className="text-xs text-[#555555] leading-relaxed cursor-pointer select-none">
                  I hereby agree to the <a href="#terms" onClick={(e) => { e.preventDefault(); alert("Terms & Conditions: All gemstone shipments are handled with secure packaging. Certified authenticity is guaranteed. No reseller commercialization allowed."); }} className="text-[#A30000] font-extrabold underline hover:opacity-80 transition-opacity">Terms and Conditions</a> of Astrofied. I confirm that I am purchasing this gemstone strictly based on my own informed decision and the recommendation provided by my consulting astrologer, and that no one has influenced, pressured, or obligated me to make this purchase.
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
                className="btn btn-primary w-full mt-4 flex items-center justify-center gap-2 h-14 font-nunito"
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
