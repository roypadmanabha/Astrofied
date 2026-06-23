import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Clock } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import logo from '../assets/logo.png';
 
export default function PaymentConfirmation({ orderInfo, onDone }) {
  const amount = '₹' + (parseInt(orderInfo.amountToPay) || 0).toLocaleString('en-IN');
  const numericAmount = orderInfo.amountToPay || '0';
  
  // Format amount to exactly 2 decimal places as required by NPCI UPI specifications
  const formattedAmount = parseFloat(numericAmount).toFixed(2);
  // Generate a unique transaction reference ID to lock/validate merchant transaction
  const transactionRef = `ASTRO_${(orderInfo.name || '').replace(/[^a-zA-Z0-9]/g, '')}_${Date.now()}`;
  // Properly construct the UPI link with mc, tr, and tn parameters to enforce non-editable payments in GPay/PhonePe
  const upiLink = `upi://pay?pa=prasantachakraborty.udp@okicici&pn=Prasanta%20Chakraborty&am=${formattedAmount}&cu=INR&mc=8999&tr=${transactionRef}&tn=Astrofied%20Gemstone%20Payment`;

  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes = 900 seconds
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showWarningModal, setShowWarningModal] = useState(false);

  useEffect(() => {
    const clockTimer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(clockTimer);
  }, []);

  const formatDateTime = (date) => {
    const days = date.getDate().toString().padStart(2, '0');
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const strTime = hours.toString().padStart(2, '0') + ':' + minutes + ':' + seconds + ' ' + ampm;
    
    return `${days}-${month}-${year}, ${strTime}`;
  };

  useEffect(() => {
    if (timeLeft <= 0) {
      // Refresh the page automatically when timer hits 00:00 to restore default state
      window.location.reload();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Lock body scroll when warning modal is open to prevent background scrolling
  useEffect(() => {
    if (showWarningModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showWarningModal]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePay = () => {
    // Detect mobile device
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    
    if (isMobile) {
      window.location.href = upiLink;
    } else {
      alert(`UPI Payment link is designed for mobile devices. Please scan the QR code shown below with Google Pay or any other UPI app on your phone to complete your payment of ₹${parseInt(numericAmount).toLocaleString('en-IN')}.`);
    }
  };

  const handleConfirmCancel = () => {
    setShowWarningModal(false);
    onDone();
  };

  const handleDismissWarning = () => {
    setShowWarningModal(false);
  };

  return (
    <section id="payment-confirmation" className="py-16 md:py-24 bg-white border-t border-[#E5DFC2] min-h-[80vh] flex items-center justify-center transition-colors duration-300">
      <div className="w-full max-w-md mx-auto px-4 sm:px-6 py-6">
        
        <motion.div
          id="printable-bill"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative bg-[#f5f5dd] rounded-3xl border border-[#E5DFC2] p-6 sm:p-10 shadow-xl shadow-black/[0.04] text-center flex flex-col items-center gap-6"
        >
          {/* Astrofied Logo in Top Right */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
            <img 
              src={logo} 
              alt="Astrofied Logo" 
              className="h-6 sm:h-8 w-auto object-contain select-none pointer-events-none"
              style={{ mixBlendMode: 'multiply' }}
              draggable={false}
            />
          </div>
          {/* Success Header Icon */}
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
            <CheckCircle size={36} />
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-xl md:text-2xl font-mulish font-extrabold text-black">
              Order Submitted!
            </h3>
            <p className="text-sm text-[#5A5A5A] leading-relaxed max-w-sm mx-auto font-mulish">
              Your details have been saved. Please scan the QR code below to complete the payment and share the screenshot in the WhatsApp chat at <a href="https://wa.me/919612736566" target="_blank" rel="noopener noreferrer" className="text-[#A30000] hover:underline font-bold">9612736566</a>.
            </p>
          </div>

          {/* Countdown Timer Badge */}
          <div className="no-print w-full flex items-center justify-center gap-2 bg-[#A30000]/5 border border-[#A30000]/10 px-4 py-3 rounded-2xl text-[11px] font-mulish font-extrabold text-[#A30000]">
            <Clock size={14} className="animate-spin" style={{ animationDuration: '6s' }} />
            <span>PAYMENT SESSION EXPIRES IN: <span className="font-mono text-xs">{formatTime(timeLeft)}</span></span>
          </div>

          {/* QR Code Container */}
          <div className="p-3 bg-white rounded-2xl border border-[#E5DFC2] shadow-md flex items-center justify-center overflow-hidden w-[200px] h-[200px]">
            <QRCodeSVG 
              value={upiLink} 
              size={176}
              level="H"
              includeMargin={false}
              imageSettings={{
                src: logo,
                x: undefined,
                y: undefined,
                height: 28,
                width: 28,
                excavate: true,
              }}
            />
          </div>

          {/* Live Date and Time & Download PDF */}
          <div className="flex flex-col items-center gap-1 font-mulish">
            <span className="text-[11px] text-[#5A5A5A] font-bold">
              {formatDateTime(currentTime)}
            </span>
            <button
              onClick={() => window.print()}
              type="button"
              className="no-print text-[11px] font-black text-black hover:text-[#A30000] underline cursor-pointer uppercase tracking-wider mt-1"
            >
              Download PDF
            </button>
          </div>

          {/* Details list */}
          <div className="w-full bg-white rounded-2xl p-4 border border-[#E5DFC2] text-left text-xs flex flex-col gap-2.5 font-mulish">
            <div className="flex justify-between">
              <span className="text-[#5A5A5A]">Customer Name:</span>
              <span className="font-bold text-black">{orderInfo.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#5A5A5A]">Payment Type:</span>
              <span className="font-bold text-[#A30000]">{orderInfo.paymentType}</span>
            </div>
            
            {orderInfo.totalAmount && (
              <>
                <div className="flex justify-between border-t border-[#E5DFC2]/30 pt-2">
                  <span className="text-[#5A5A5A]">Total Order Value:</span>
                  <span className="font-bold text-black">₹{parseInt(orderInfo.totalAmount).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5A5A5A]">Advance Amount:</span>
                  <span className="font-bold text-black">₹{parseInt(orderInfo.advanceAmount).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5A5A5A]">Pending Amount:</span>
                  <span className="font-bold text-black">₹{parseInt(orderInfo.pendingAmount).toLocaleString('en-IN')}</span>
                </div>
              </>
            )}

            <div className="flex justify-between border-t border-[#E5DFC2]/50 pt-2.5">
              <span className="text-[#5A5A5A] font-extrabold text-[#A30000] uppercase tracking-[0.1em] text-[10px]">Amount to Pay Now:</span>
              <span className="font-black text-[#A30000] text-sm font-mulish">{amount}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="no-print w-full flex flex-col gap-3">
            <button
              onClick={handlePay}
              className="btn btn-primary w-full h-14 font-mulish text-base tracking-wide"
            >
              PAY {amount}
            </button>
            <button
              onClick={() => setShowWarningModal(true)}
              className="text-xs text-[#5A5A5A] hover:text-black font-semibold underline font-mulish transition-colors"
            >
              Go Back
            </button>
          </div>

        </motion.div>

      </div>

      {/* Alert Warning Modal */}
      <AnimatePresence>
        {showWarningModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm no-print">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="w-full max-w-sm bg-[#f5f5dd] border border-[#E5DFC2] rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col items-center gap-5 text-center font-mulish"
            >
              {/* Alert Icon */}
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                </svg>
              </div>

              {/* Text Content */}
              <div className="flex flex-col gap-2">
                <h4 className="text-lg font-extrabold text-black font-mulish leading-tight">
                  Cancel Payment Session?
                </h4>
                <p className="text-xs sm:text-sm text-[#5A5A5A] leading-relaxed font-medium">
                  If you go back, your ongoing payment session and order details will be cancelled. Are you sure you want to cancel?
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex w-full gap-3 mt-1">
                <button
                  onClick={handleConfirmCancel}
                  className="flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-[#A30000] text-white hover:bg-[#800000] transition-colors cursor-pointer border-none shadow-sm shadow-[#A30000]/10"
                >
                  Yes, Cancel
                </button>
                <button
                  onClick={handleDismissWarning}
                  className="flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-white text-[#5A5A5A] hover:text-black hover:bg-gray-50 border border-[#E5DFC2] transition-colors cursor-pointer"
                >
                  No, Keep Payment
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
