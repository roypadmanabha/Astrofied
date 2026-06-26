import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Clock, Download, Loader2 } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { jsPDF } from 'jspdf';
import logo from '../assets/logo.png';

const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL ||
  'https://script.google.com/macros/s/AKfycbxzy6lXEbLmAsDw1fDdhRXRB1Lqum4fFo_oMFlkY9i8XpnY7gYSoxuciy4c69rejUI/exec';

const POLL_INTERVAL_MS = 5000; // check every 5 seconds

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

  // Use the transactionRef that was generated at order submission and passed via orderInfo
  const transactionRef = orderInfo.transactionRef;

  const upiLink = `upi://pay?pa=prasantachakraborty.udp@okicici&pn=Prasanta%20Chakraborty&am=${formattedAmount}&cu=INR&mc=8999&tr=${transactionRef}&tn=Astrofied%20Gemstone%20Payment`;

  const [timeLeft, setTimeLeft] = useState(900);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [paymentDateTime, setPaymentDateTime] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [pdfAutoDownloaded, setPdfAutoDownloaded] = useState(false);
  const [showContactPrompt, setShowContactPrompt] = useState(false); // appears after 60s if still unpaid
  const pollRef = useRef(null);
  const waitTimerRef = useRef(null);

  // ── Clock ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // ── Countdown timer ────────────────────────────────────────────────────────
  useEffect(() => {
    if (paymentConfirmed) return;
    if (timeLeft <= 0) { window.location.reload(); return; }
    const t = setInterval(() => setTimeLeft(p => p - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft, paymentConfirmed]);

  // ── Scroll lock for modal ──────────────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = showWarningModal ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showWarningModal]);

  const formatTime = (s) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  const formatDateTime = (date) => {
    const d = date.getDate().toString().padStart(2, '0');
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const m = months[date.getMonth()];
    const y = date.getFullYear();
    let h = date.getHours();
    const min = date.getMinutes().toString().padStart(2, '0');
    const sec = date.getSeconds().toString().padStart(2, '0');
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return `${d}-${m}-${y}, ${h.toString().padStart(2, '0')}:${min}:${sec} ${ampm}`;
  };

  // ── Confirm payment (transition to success) ────────────────────────────────
  const confirmPayment = useCallback(() => {
    if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null; }
    setPaymentDateTime(new Date());
    setIsVerifying(false);
    setPaymentConfirmed(true);
  }, []);

  // ── Poll Google Apps Script every 5 s for payment status (JSONP — bypasses CORS) ──
  useEffect(() => {
    if (!transactionRef || paymentConfirmed) return;

    const checkPayment = () => {
      const cbName = `__astrofied_cb_${Date.now()}`;
      // Register global callback that the script tag will invoke
      window[cbName] = (data) => {
        delete window[cbName];
        console.log('[Astrofied] Payment poll response (JSONP):', data);
        if (data && data.status === 'paid') {
          setIsVerifying(true);
          setTimeout(() => confirmPayment(), 1800);
        }
      };
      // Create script tag — JSONP bypasses CORS entirely
      const script = document.createElement('script');
      script.src = `${SCRIPT_URL}?action=checkPayment&ref=${encodeURIComponent(transactionRef)}&callback=${cbName}`;
      script.onerror = () => {
        delete window[cbName];
        console.warn('[Astrofied] JSONP poll: script load error');
      };
      // Auto-cleanup after 10 s (in case callback never fires)
      const cleanup = setTimeout(() => {
        delete window[cbName];
        if (script.parentNode) script.parentNode.removeChild(script);
      }, 10000);
      script.onload = () => {
        clearTimeout(cleanup);
        if (script.parentNode) script.parentNode.removeChild(script);
      };
      document.head.appendChild(script);
    };

    pollRef.current = setInterval(checkPayment, POLL_INTERVAL_MS);
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, [transactionRef, paymentConfirmed, confirmPayment]);

  // ── Show WhatsApp contact prompt after 60 s (NON-interactive — not a confirm button) ──
  // This is ONLY a help message. The ONLY way to reach the success screen is
  // via backend polling (admin marking column Q as 'paid' in the sheet).
  useEffect(() => {
    if (paymentConfirmed) return;
    waitTimerRef.current = setTimeout(() => setShowContactPrompt(true), 60000);
    return () => { if (waitTimerRef.current) clearTimeout(waitTimerRef.current); };
  }, [paymentConfirmed]);

  // ── Auto-download PDF once payment confirmed ───────────────────────────────
  useEffect(() => {
    if (paymentConfirmed && !pdfAutoDownloaded) {
      setPdfAutoDownloaded(true);
      // Small delay so the success animation has time to play
      setTimeout(() => handleDownloadPDF(), 1200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentConfirmed]);

  const handleConfirmCancel = () => { setShowWarningModal(false); onDone(); };
  const handleDismissWarning = () => setShowWarningModal(false);

  // ─── PDF Bill Generator ────────────────────────────────────────────────────
  const handleDownloadPDF = async () => {
    try {
      const doc = new jsPDF({ unit: 'mm', format: 'a4' });
      const W = doc.internal.pageSize.getWidth();

      // Load logo via fetch → FileReader (CORS-safe)
      let logoDataURL = null;
      try {
        const res = await fetch(logo);
        const blob = await res.blob();
        logoDataURL = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      } catch (_) {}

      // Header band
      doc.setFillColor(245, 245, 221);
      doc.rect(0, 0, W, 45, 'F');

      if (logoDataURL) {
        try { doc.addImage(logoDataURL, 'PNG', 12, 8, 22, 22); } catch (_) {}
      }

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(20);
      doc.setTextColor(163, 0, 0);
      doc.text('ASTROFIED GEMSTONES', W / 2, 20, { align: 'center' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.text('Certified Vedic Gemstone Remedies', W / 2, 28, { align: 'center' });
      doc.text('prasantachakraborty.udp@okicici  |  +91 96127 36566', W / 2, 34, { align: 'center' });

      doc.setDrawColor(163, 0, 0);
      doc.setLineWidth(0.7);
      doc.line(12, 41, W - 12, 41);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(30, 30, 30);
      doc.text('PAYMENT RECEIPT', W / 2, 52, { align: 'center' });

      doc.setDrawColor(210, 210, 210);
      doc.setLineWidth(0.3);
      doc.line(12, 56, W - 12, 56);

      let y = 66;

      const sectionHeader = (label) => {
        doc.setFillColor(245, 245, 221);
        doc.rect(12, y - 5, W - 24, 10, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(163, 0, 0);
        doc.text(label.toUpperCase(), 15, y + 1);
        y += 12;
      };

      const row = (label, value, highlight = false) => {
        if (value === null || value === undefined || value === '') return;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(90, 90, 90);
        doc.text(String(label), 15, y);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(highlight ? 163 : 25, highlight ? 0 : 25, highlight ? 0 : 25);
        const lines = doc.splitTextToSize(String(value), 90);
        doc.text(lines, W - 15, y, { align: 'right' });
        y += lines.length > 1 ? lines.length * 6 : 8;
      };

      const lightDivider = () => {
        doc.setDrawColor(220, 220, 220);
        doc.setLineWidth(0.2);
        doc.line(12, y - 2, W - 12, y - 2);
        y += 4;
      };

      const pageCheck = (needed = 20) => {
        if (y + needed > doc.internal.pageSize.getHeight() - 25) {
          doc.addPage(); y = 20;
        }
      };

      // SECTION 1 — CUSTOMER DETAILS
      sectionHeader('Customer Details');
      row('Customer Name:', orderInfo.name);
      row('Mobile No.:', orderInfo.mobile ? `+91 ${orderInfo.mobile}` : null);
      if (orderInfo.address) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(90, 90, 90);
        doc.text('Full Address:', 15, y);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(25, 25, 25);
        const addrLines = doc.splitTextToSize(orderInfo.address, 100);
        doc.text(addrLines, W - 15, y, { align: 'right' });
        y += Math.max(addrLines.length * 6, 8);
      }
      y += 2; lightDivider();

      // SECTION 2 — ORDER DETAILS
      pageCheck(50);
      sectionHeader('Order Details');
      row('Payment Type:', orderInfo.paymentType);
      if (orderInfo.gemstone) row('Gemstone:', orderInfo.gemstone);
      if (orderInfo.size) row('Gemstone Size:', `${orderInfo.size} mm`);
      if (orderInfo.totalAmount && parseInt(orderInfo.totalAmount) > 0) {
        row('Total Order Value:', `Rs. ${parseInt(orderInfo.totalAmount).toLocaleString('en-IN')}`);
        row('Advance Amount (50%):', `Rs. ${parseInt(orderInfo.advanceAmount || 0).toLocaleString('en-IN')}`);
        row('Pending Amount (50%):', `Rs. ${parseInt(orderInfo.pendingAmount || 0).toLocaleString('en-IN')}`);
      }
      y += 2; lightDivider();

      // SECTION 3 — PAYMENT SUMMARY
      pageCheck(40);
      sectionHeader('Payment Summary');
      row('Amount Paid:', `Rs. ${parseInt(numericAmount).toLocaleString('en-IN')}`, true);
      const paidAt = paymentDateTime || new Date();
      row('Payment Date & Time:', formatDateTime(paidAt));
      row('Transaction Ref:', transactionRef || '—');
      row('UPI Merchant ID:', 'prasantachakraborty.udp@okicici');
      y += 2; lightDivider();

      // SECTION 4 — CUSTOMER AGREEMENT
      pageCheck(60);
      sectionHeader('Customer Agreement');
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9);
      doc.setTextColor(90, 90, 90);
      const agreeLine = `${orderInfo.name || 'Customer'} has agreed to the following Terms & Conditions of Astrofied at the time of order:`;
      const agreeLines = doc.splitTextToSize(agreeLine, W - 27);
      doc.text(agreeLines, 15, y);
      y += agreeLines.length * 5 + 4;

      pageCheck(30);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(60, 60, 60);
      const termsLines = doc.splitTextToSize(TERMS_TEXT, W - 27);
      let remaining = [...termsLines];
      while (remaining.length > 0) {
        const pH = doc.internal.pageSize.getHeight();
        const linesPerPage = Math.floor((pH - y - 25) / 5);
        const chunk = remaining.splice(0, Math.max(1, linesPerPage));
        doc.text(chunk, 15, y);
        y += chunk.length * 5;
        if (remaining.length > 0) { doc.addPage(); y = 20; }
      }
      y += 6; lightDivider();

      // Footer on every page
      const totalPages = doc.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        const pH = doc.internal.pageSize.getHeight();
        doc.setFillColor(245, 245, 221);
        doc.rect(0, pH - 18, W, 18, 'F');
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(7.5);
        doc.setTextColor(130, 130, 130);
        doc.text('This is a computer-generated receipt. No signature required.', W / 2, pH - 11, { align: 'center' });
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7.5);
        doc.setTextColor(163, 0, 0);
        doc.text(`Astrofied  |  contact.astrofied@gmail.com  |  Page ${i} of ${totalPages}`, W / 2, pH - 5, { align: 'center' });
      }

      const safeName = (orderInfo.name || 'Customer').replace(/[^a-zA-Z0-9]/g, '_');
      doc.save(`Astrofied_Receipt_${safeName}.pdf`);
    } catch (err) {
      console.error('PDF generation error:', err);
    }
  };
  // ─── End PDF Generator ────────────────────────────────────────────────────

  return (
    <section id="payment-confirmation" className="py-16 md:py-24 bg-white border-t border-[#E5DFC2] min-h-[80vh] flex items-center justify-center transition-colors duration-300">
      <div className="w-full max-w-md mx-auto px-4 sm:px-6 py-6">

        <AnimatePresence mode="wait">

          {/* ── VERIFYING STATE (brief transition) ────────────────────────── */}
          {isVerifying && !paymentConfirmed && (
            <motion.div
              key="verifying"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="relative bg-[#f5f5dd] rounded-3xl border border-[#E5DFC2] p-10 shadow-xl text-center flex flex-col items-center gap-6"
            >
              <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center">
                <Loader2 size={44} className="text-blue-500 animate-spin" />
              </div>
              <div>
                <h3 className="text-xl font-mulish font-black text-black">Verifying Payment…</h3>
                <p className="text-sm text-[#5A5A5A] mt-2 font-mulish">Please wait a moment.</p>
              </div>
            </motion.div>
          )}

          {/* ── SUCCESS STATE ─────────────────────────────────────────────── */}
          {paymentConfirmed && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="relative bg-[#f5f5dd] rounded-3xl border border-[#E5DFC2] p-6 sm:p-10 shadow-xl shadow-black/[0.04] text-center flex flex-col items-center gap-6"
            >
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                <img src={logo} alt="Astrofied Logo" className="h-6 sm:h-8 w-auto object-contain select-none pointer-events-none" style={{ mixBlendMode: 'multiply' }} draggable={false} />
              </div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
                className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-lg shadow-emerald-200"
              >
                <CheckCircle size={44} strokeWidth={2} />
              </motion.div>

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

              {/* Download Bill PDF button (also auto-downloaded on mount) */}
              <button
                onClick={handleDownloadPDF}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-black text-white font-mulish font-bold text-sm tracking-wide hover:bg-[#1a1a1a] active:scale-95 transition-all cursor-pointer border-none shadow-lg"
              >
                <Download size={18} />
                Download Bill PDF
              </button>
            </motion.div>
          )}

          {/* ── QR / WAITING STATE ───────────────────────────────────────── */}
          {!isVerifying && !paymentConfirmed && (
            <motion.div
              key="qr"
              id="printable-bill"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="relative bg-[#f5f5dd] rounded-3xl border border-[#E5DFC2] p-6 sm:p-10 shadow-xl shadow-black/[0.04] text-center flex flex-col items-center gap-6"
            >
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                <img src={logo} alt="Astrofied Logo" className="h-6 sm:h-8 w-auto object-contain select-none pointer-events-none" style={{ mixBlendMode: 'multiply' }} draggable={false} />
              </div>

              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <CheckCircle size={36} />
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-xl md:text-2xl font-mulish font-extrabold text-black">Order Submitted!</h3>
                <p className="text-sm text-[#5A5A5A] leading-relaxed max-w-sm mx-auto font-mulish">
                  Please scan the QR code below with Google Pay, PhonePe, or any UPI app to complete your payment. The receipt will appear automatically once payment is confirmed.
                </p>
              </div>

              {/* Countdown Timer */}
              <div className="w-full flex items-center justify-center gap-2 bg-[#A30000]/5 border border-[#A30000]/10 px-4 py-3 rounded-2xl text-[11px] font-mulish font-extrabold text-[#A30000]">
                <Clock size={14} className="animate-spin" style={{ animationDuration: '6s' }} />
                <span>PAYMENT SESSION EXPIRES IN: <span className="font-mono text-xs">{formatTime(timeLeft)}</span></span>
              </div>

              {/* QR Code */}
              <div className="p-3 bg-white rounded-2xl border border-[#E5DFC2] shadow-md flex items-center justify-center overflow-hidden w-[200px] h-[200px]">
                <QRCodeSVG
                  value={upiLink}
                  size={176}
                  level="H"
                  includeMargin={false}
                  imageSettings={{ src: logo, x: undefined, y: undefined, height: 28, width: 28, excavate: true }}
                />
              </div>

              {/* Waiting for payment indicator */}
              <div className="flex flex-col items-center gap-2 font-mulish">
                <div className="flex items-center gap-2 text-[11px] text-[#5A5A5A] font-bold">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Waiting for payment confirmation…
                </div>
                <span className="text-[10px] text-[#5A5A5A]">{formatDateTime(currentTime)}</span>
              </div>

              {/* Order details */}
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

              {/* Go Back */}
              <button
                onClick={() => setShowWarningModal(true)}
                className="text-xs text-[#5A5A5A] hover:text-black font-semibold underline font-mulish transition-colors"
              >
                Go Back
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Cancel Warning Modal */}
      <AnimatePresence>
        {showWarningModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
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
                <h4 className="text-lg font-extrabold text-black leading-tight">Cancel Payment Session?</h4>
                <p className="text-xs sm:text-sm text-[#5A5A5A] leading-relaxed font-medium">
                  If you go back, your payment session will be cancelled. Are you sure?
                </p>
              </div>
              <div className="flex w-full gap-3 mt-1">
                <button onClick={handleConfirmCancel} className="flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-[#A30000] text-white hover:bg-[#800000] transition-colors cursor-pointer border-none">
                  Yes, Cancel
                </button>
                <button onClick={handleDismissWarning} className="flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-white text-[#5A5A5A] hover:text-black hover:bg-gray-50 border border-[#E5DFC2] transition-colors cursor-pointer">
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
