import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Clock, Download } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { jsPDF } from 'jspdf';
import logo from '../assets/logo.png';

const TERMS_TEXT =
  '1. Payment Agreement: You solely agree to bear the full cost and make the complete payment for the gemstone. ' +
  '2. Voluntary Decision: The gemstone was suggested by our astrologer, and you confirm that you are purchasing it voluntarily, with absolute personal consent and without any force or obligation. ' +
  '3. Realisation of Remedies: There is no guarantee that a gemstone can resolve your life\'s problems instantly or within a fraction of a second; astrological remedies work gradually over time. ' +
  '4. Planetary Energy: Our gemstones are designed to provide positive energy and strengthen your planetary influences. ' +
  '5. Lab Certified Authenticity: All our gemstones are lab-certified, tested, and guaranteed to be 100% authentic. ' +
  '6. Personal Use Only: These gemstones are sold for personal use only and are strictly not intended for resale or commercial purposes.';

export default function PaymentConfirmation({ orderInfo, onDone }) {
  const amount = '₹' + (parseInt(orderInfo.amountToPay) || 0).toLocaleString('en-IN');
  const numericAmount = orderInfo.amountToPay || '0';
  const formattedAmount = parseFloat(numericAmount).toFixed(2);
  const transactionRef = `ASTRO_${(orderInfo.name || '').replace(/[^a-zA-Z0-9]/g, '')}_${Date.now()}`;
  const upiLink = `upi://pay?pa=prasantachakraborty.udp@okicici&pn=Prasanta%20Chakraborty&am=${formattedAmount}&cu=INR&mc=8999&tr=${transactionRef}&tn=Astrofied%20Gemstone%20Payment`;

  const [timeLeft, setTimeLeft] = useState(900);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [paymentDateTime, setPaymentDateTime] = useState(null);

  // Ref used to load logo as base64 for jsPDF
  const logoRef = useRef(null);

  useEffect(() => {
    const clockTimer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(clockTimer);
  }, []);

  const formatDateTime = (date) => {
    const days = date.getDate().toString().padStart(2, '0');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${days}-${month}-${year}, ${hours.toString().padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;
  };

  useEffect(() => {
    if (paymentConfirmed) return; // Stop countdown after payment confirmed
    if (timeLeft <= 0) { window.location.reload(); return; }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, paymentConfirmed]);

  useEffect(() => {
    if (showWarningModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showWarningModal]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Called when user taps "PAY" — on mobile opens UPI deep link, on desktop shows alert; both mark confirmed
  const handlePay = () => {
    const confirmedAt = new Date();
    setPaymentDateTime(confirmedAt);
    setPaymentConfirmed(true);

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = upiLink;
    }
  };

  const handleConfirmCancel = () => { setShowWarningModal(false); onDone(); };
  const handleDismissWarning = () => setShowWarningModal(false);

  // ─── PDF Bill Generator ───────────────────────────────────────────────────
  const handleDownloadPDF = async () => {
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const W = doc.internal.pageSize.getWidth();
    const brandRed = [163, 0, 0];
    const darkGray = [40, 40, 40];
    const midGray = [100, 100, 100];
    const lightGray = [200, 200, 200];
    const cream = [245, 245, 221];

    // ── Header background band ──────────────────────────────────────────────
    doc.setFillColor(...cream);
    doc.rect(0, 0, W, 42, 'F');

    // ── Logo (load from img element as dataURL via canvas) ──────────────────
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = logo;
      await new Promise((res, rej) => { img.onload = res; img.onerror = rej; });
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      canvas.getContext('2d').drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL('image/png');
      const logoH = 18;
      const logoW = (img.naturalWidth / img.naturalHeight) * logoH;
      doc.addImage(dataURL, 'PNG', 14, 10, logoW, logoH);
    } catch (_) { /* if logo fails, skip gracefully */ }

    // ── Brand name ──────────────────────────────────────────────────────────
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(...brandRed);
    doc.text('ASTROFIED GEMSTONES', W / 2, 22, { align: 'center' });

    doc.setFontSize(9);
    doc.setTextColor(...midGray);
    doc.setFont('helvetica', 'normal');
    doc.text('Certified Vedic Gemstone Remedies', W / 2, 29, { align: 'center' });

    // ── Divider ─────────────────────────────────────────────────────────────
    doc.setDrawColor(...brandRed);
    doc.setLineWidth(0.6);
    doc.line(14, 38, W - 14, 38);

    // ── PAYMENT RECEIPT label ───────────────────────────────────────────────
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(...darkGray);
    doc.text('PAYMENT RECEIPT', W / 2, 48, { align: 'center' });

    let y = 58;

    // ── Section helper ──────────────────────────────────────────────────────
    const sectionTitle = (label) => {
      doc.setFillColor(...cream);
      doc.roundedRect(14, y - 4, W - 28, 9, 1, 1, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(...brandRed);
      doc.text(label.toUpperCase(), 17, y + 2);
      y += 10;
    };

    const row = (label, value, highlight = false) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(...midGray);
      doc.text(label, 17, y);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(highlight ? brandRed : darkGray);
      doc.text(String(value || '—'), W - 17, y, { align: 'right' });
      y += 7;
    };

    const divider = () => {
      doc.setDrawColor(...lightGray);
      doc.setLineWidth(0.2);
      doc.line(14, y - 1, W - 14, y - 1);
      y += 2;
    };

    // ── Customer Details ────────────────────────────────────────────────────
    sectionTitle('Customer Details');
    row('Customer Name:', orderInfo.name);
    row('Mobile No.:', orderInfo.mobile ? `+91 ${orderInfo.mobile}` : '—');
    row('Full Address:', '');
    // Wrap address
    if (orderInfo.address) {
      const addrLines = doc.splitTextToSize(orderInfo.address, W - 34);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(...darkGray);
      doc.text(addrLines, W - 17, y - 6, { align: 'right' });
      y += (addrLines.length - 1) * 6;
    }
    y += 2;
    divider();

    // ── Order Details ───────────────────────────────────────────────────────
    sectionTitle('Order Details');
    row('Payment Type:', orderInfo.paymentType);
    if (orderInfo.gemstone) row('Gemstone:', orderInfo.gemstone);
    if (orderInfo.size) row('Size:', `${orderInfo.size} mm`);
    if (orderInfo.totalAmount && parseInt(orderInfo.totalAmount) > 0) {
      row('Total Order Value:', `Rs. ${parseInt(orderInfo.totalAmount).toLocaleString('en-IN')}`);
      row('Advance Amount:', `Rs. ${parseInt(orderInfo.advanceAmount || 0).toLocaleString('en-IN')}`);
      row('Pending Amount:', `Rs. ${parseInt(orderInfo.pendingAmount || 0).toLocaleString('en-IN')}`);
    }
    y += 2;
    divider();

    // ── Payment Summary ─────────────────────────────────────────────────────
    sectionTitle('Payment Summary');
    row('Amount Paid:', `Rs. ${parseInt(numericAmount).toLocaleString('en-IN')}`, true);
    row(
      'Payment Date & Time:',
      paymentDateTime ? formatDateTime(paymentDateTime) : formatDateTime(new Date())
    );
    row('UPI Merchant:', 'prasantachakraborty.udp@okicici');
    y += 2;
    divider();

    // ── Terms Agreement ─────────────────────────────────────────────────────
    sectionTitle('Customer Agreement');

    const agreeLabel = `${orderInfo.name} has agreed to the following Terms & Conditions:`;
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(...midGray);
    const agreeLabelLines = doc.splitTextToSize(agreeLabel, W - 28);
    doc.text(agreeLabelLines, 17, y);
    y += agreeLabelLines.length * 5 + 2;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...darkGray);
    const termsLines = doc.splitTextToSize(TERMS_TEXT, W - 28);
    // Check if we need a new page
    if (y + termsLines.length * 4.5 > doc.internal.pageSize.getHeight() - 20) {
      doc.addPage();
      y = 20;
    }
    doc.text(termsLines, 17, y);
    y += termsLines.length * 4.5 + 4;

    divider();

    // ── Footer ──────────────────────────────────────────────────────────────
    const footerY = doc.internal.pageSize.getHeight() - 18;
    doc.setFillColor(...cream);
    doc.rect(0, footerY - 4, W, 22, 'F');
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(...midGray);
    doc.text('This is a computer-generated receipt. No signature is required.', W / 2, footerY + 2, { align: 'center' });
    doc.setTextColor(...brandRed);
    doc.setFont('helvetica', 'bold');
    doc.text('Astrofied | contact.astrofied@gmail.com | +91 96127 36566', W / 2, footerY + 8, { align: 'center' });

    const safeName = (orderInfo.name || 'Customer').replace(/[^a-zA-Z0-9]/g, '_');
    doc.save(`Astrofied_Gemstone_Receipt_${safeName}.pdf`);
  };
  // ─── End PDF Generator ────────────────────────────────────────────────────

  return (
    <section id="payment-confirmation" className="py-16 md:py-24 bg-white border-t border-[#E5DFC2] min-h-[80vh] flex items-center justify-center transition-colors duration-300">
      <div className="w-full max-w-md mx-auto px-4 sm:px-6 py-6">

        <AnimatePresence mode="wait">

          {/* ── PAYMENT SUCCESS STATE ─────────────────────────────────────── */}
          {paymentConfirmed ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="relative bg-[#f5f5dd] rounded-3xl border border-[#E5DFC2] p-6 sm:p-10 shadow-xl shadow-black/[0.04] text-center flex flex-col items-center gap-6"
            >
              {/* Logo top-right */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                <img src={logo} alt="Astrofied Logo" className="h-6 sm:h-8 w-auto object-contain select-none pointer-events-none" style={{ mixBlendMode: 'multiply' }} draggable={false} />
              </div>

              {/* Green tick */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
                className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-lg shadow-emerald-200"
              >
                <CheckCircle size={44} strokeWidth={2} />
              </motion.div>

              {/* Heading */}
              <div className="flex flex-col gap-1.5">
                <h3 className="text-2xl font-mulish font-black text-black">Payment Successful!</h3>
                <p className="text-sm text-[#5A5A5A] leading-relaxed max-w-xs mx-auto font-mulish">
                  Thank you, <strong className="text-black">{orderInfo.name}</strong>. Your payment of <strong className="text-[#A30000]">{amount}</strong> has been received. Our team will contact you shortly.
                </p>
              </div>

              {/* Summary card */}
              <div className="w-full bg-white rounded-2xl p-4 border border-[#E5DFC2] text-left text-xs flex flex-col gap-2.5 font-mulish">
                <div className="flex justify-between">
                  <span className="text-[#5A5A5A]">Customer Name:</span>
                  <span className="font-bold text-black">{orderInfo.name}</span>
                </div>
                {orderInfo.mobile && (
                  <div className="flex justify-between">
                    <span className="text-[#5A5A5A]">Mobile No.:</span>
                    <span className="font-bold text-black">+91 {orderInfo.mobile}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[#5A5A5A]">Payment Type:</span>
                  <span className="font-bold text-[#A30000]">{orderInfo.paymentType}</span>
                </div>
                {orderInfo.gemstone && (
                  <div className="flex justify-between border-t border-[#E5DFC2]/30 pt-2">
                    <span className="text-[#5A5A5A]">Gemstone:</span>
                    <span className="font-bold text-black">{orderInfo.gemstone}</span>
                  </div>
                )}
                {orderInfo.size && (
                  <div className="flex justify-between">
                    <span className="text-[#5A5A5A]">Size:</span>
                    <span className="font-bold text-black">{orderInfo.size} mm</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-[#E5DFC2]/50 pt-2.5">
                  <span className="font-extrabold text-[#A30000] uppercase tracking-[0.1em] text-[10px]">Amount Paid:</span>
                  <span className="font-black text-[#A30000] text-sm">{amount}</span>
                </div>
                {paymentDateTime && (
                  <div className="flex justify-between">
                    <span className="text-[#5A5A5A]">Date & Time:</span>
                    <span className="font-bold text-black text-right">{formatDateTime(paymentDateTime)}</span>
                  </div>
                )}
              </div>

              {/* Download Bill PDF button */}
              <button
                onClick={handleDownloadPDF}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-black text-white font-mulish font-bold text-sm tracking-wide hover:bg-[#1a1a1a] active:scale-95 transition-all cursor-pointer border-none shadow-lg"
              >
                <Download size={18} />
                Download Bill PDF
              </button>

              {/* Go Back */}
              <button
                onClick={() => setShowWarningModal(true)}
                className="text-xs text-[#5A5A5A] hover:text-black font-semibold underline font-mulish transition-colors"
              >
                Go Back
              </button>
            </motion.div>

          ) : (

            /* ── QR / PRE-PAYMENT STATE ─────────────────────────────────── */
            <motion.div
              key="qr"
              id="printable-bill"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="relative bg-[#f5f5dd] rounded-3xl border border-[#E5DFC2] p-6 sm:p-10 shadow-xl shadow-black/[0.04] text-center flex flex-col items-center gap-6"
            >
              {/* Astrofied Logo in Top Right */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                <img src={logo} alt="Astrofied Logo" className="h-6 sm:h-8 w-auto object-contain select-none pointer-events-none" style={{ mixBlendMode: 'multiply' }} draggable={false} />
              </div>

              {/* Success Header Icon */}
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <CheckCircle size={36} />
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-xl md:text-2xl font-mulish font-extrabold text-black">Order Submitted!</h3>
                <p className="text-sm text-[#5A5A5A] leading-relaxed max-w-sm mx-auto font-mulish">
                  Your details have been saved. Please scan the QR code below to complete the payment and share the screenshot in the WhatsApp chat at{' '}
                  <a href="https://wa.me/919612736566" target="_blank" rel="noopener noreferrer" className="text-[#A30000] hover:underline font-bold">9612736566</a>.
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
                  imageSettings={{ src: logo, x: undefined, y: undefined, height: 28, width: 28, excavate: true }}
                />
              </div>

              {/* Live Date and Time & Download PDF */}
              <div className="flex flex-col items-center gap-1 font-mulish">
                <span className="text-[11px] text-[#5A5A5A] font-bold">{formatDateTime(currentTime)}</span>
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
                {orderInfo.gemstone && (
                  <div className="flex justify-between border-t border-[#E5DFC2]/30 pt-2">
                    <span className="text-[#5A5A5A]">Gemstone:</span>
                    <span className="font-bold text-black">{orderInfo.gemstone}</span>
                  </div>
                )}
                {orderInfo.size && (
                  <div className="flex justify-between">
                    <span className="text-[#5A5A5A]">Size:</span>
                    <span className="font-bold text-black">{orderInfo.size} mm</span>
                  </div>
                )}
                {orderInfo.totalAmount && (
                  <>
                    <div className={`flex justify-between ${orderInfo.gemstone ? '' : 'border-t border-[#E5DFC2]/30 pt-2'}`}>
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
          )}
        </AnimatePresence>

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
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                </svg>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-lg font-extrabold text-black font-mulish leading-tight">Cancel Payment Session?</h4>
                <p className="text-xs sm:text-sm text-[#5A5A5A] leading-relaxed font-medium">
                  If you go back, your ongoing payment session and order details will be cancelled. Are you sure you want to cancel?
                </p>
              </div>
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
