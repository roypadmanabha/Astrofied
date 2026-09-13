import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Download, X, Mail, Check, AlertTriangle } from 'lucide-react';
import { jsPDF } from 'jspdf';
import emailjs from '@emailjs/browser';
import logo from '../assets/logo.png';

const TERMS_TEXT =
  '1. Payment Agreement: You solely agree to bear the full cost and make the complete payment for the gemstone. ' +
  '2. Voluntary Decision: The gemstone was suggested by our astrologer, and you confirm that you are purchasing it voluntarily, with absolute personal consent and without any force or obligation. ' +
  '3. Realisation of Remedies: There is no guarantee that a gemstone can resolve your life\'s problems instantly or within a fraction of a second; astrological remedies work gradually over time. ' +
  '4. Planetary Energy: Our gemstones are designed to provide positive energy and strengthen your planetary influences. ' +
  '5. Lab Certified Authenticity: All our gemstones are lab-certified, tested, and guaranteed to be 100% authentic. ' +
  '6. Personal Use Only: These gemstones are sold for personal use only and are strictly not intended for resale or commercial purposes.';

const NOTICE_TEXT =
  'This document is an Order Confirmation paper and NOT a payment realization receipt. ' +
  'It confirms that the customer has willingly chosen to purchase a gemstone from Astrofied with Offline or Cash payment mode and NOT Online payment mode. ' +
  'This is thus NOT an after-purchase bill; the payment confirmation bill will be issued once the full payment is done by the customer.';

// Helper to fetch TTF font file and return base64 string for jsPDF font embedding
let cachedNunitoBase64 = null;
let cachedMulishRegBase64 = null;
let cachedMulishBoldBase64 = null;
let cachedMulishItalicBase64 = null;

const fetchFontAsBase64 = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    const buffer = await response.arrayBuffer();
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  } catch (e) {
    console.warn('[Astrofied] Font fetch warning:', url, e);
    return null;
  }
};

const formatCurrency = (val) => {
  if (val === null || val === undefined || val === '') return '0';
  const num = parseFloat(val);
  if (isNaN(num) || num <= 0) return '0';
  const str = val.toString();
  const parts = str.split('.');
  const intPart = parseInt(parts[0], 10).toLocaleString('en-IN');
  if (parts.length === 2 && parts[1]) {
    const dec = parts[1].padEnd(2, '0').slice(0, 2);
    return `${intPart}.${dec}`;
  }
  return intPart;
};

export default function OfflineReceiptModal({ isOpen, onClose, orderInfo, onDownloadComplete }) {
  const [downloaded, setDownloaded] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Reset modal state whenever a new order confirmation opens
  useEffect(() => {
    if (isOpen) {
      setDownloaded(false);
      setIsProcessing(false);
      setEmailSent(false);
    }
  }, [isOpen, orderInfo]);

  if (!isOpen || !orderInfo) return null;

  const formatDateTime = (dateStr) => {
    const date = dateStr ? new Date(dateStr) : new Date();
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

  const sendEmailToSJ = async () => {
    const formattedDate = formatDateTime(orderInfo.timestamp);
    const templateParams = {
      to_email: 'sj.astrologyservices@gmail.com',
      recipient_email: 'sj.astrologyservices@gmail.com',
      to_name: 'Astrofied Admin',
      first_name: orderInfo.name,
      last_name: '',
      user_name: orderInfo.name,
      customer_name: orderInfo.name,
      mobile: orderInfo.mobile,
      address: orderInfo.address,
      gemstone: orderInfo.gemstone,
      size: orderInfo.size ? `${orderInfo.size} mm` : 'N/A',
      payment_type: orderInfo.paymentType || 'Offline Cash Order',
      total_amount: orderInfo.totalAmount ? `Rs. ${formatCurrency(orderInfo.totalAmount)}` : 'N/A',
      advance_amount: orderInfo.advanceAmount ? `Rs. ${formatCurrency(orderInfo.advanceAmount)}` : 'N/A',
      pending_amount: orderInfo.pendingAmount ? `Rs. ${formatCurrency(orderInfo.pendingAmount)}` : 'N/A',
      transaction_ref: orderInfo.transactionRef,
      purchase_mode: 'Offline / Cash Purchase',
      date_time: formattedDate,
      message: `OFFLINE ORDER CONFIRMATION DETAILED LOG:\n\nCustomer Name: ${orderInfo.name}\nMobile Number: +91 ${orderInfo.mobile}\nAddress: ${orderInfo.address}\nGemstone: ${orderInfo.gemstone} (${orderInfo.size ? orderInfo.size + ' mm' : ''})\nPayment Type: ${orderInfo.paymentType || 'Offline Order'}\nTotal Value: Rs. ${formatCurrency(orderInfo.totalAmount)}\nAdvance Amount: Rs. ${formatCurrency(orderInfo.advanceAmount)}\nPending Amount: Rs. ${formatCurrency(orderInfo.pendingAmount)}\nTransaction Reference: ${orderInfo.transactionRef}\nOrder Date & Time: ${formattedDate}`
    };

    // Channel 1: EmailJS Primary Service (from Kundali / Feedback configs)
    try {
      await emailjs.send('service_zoki18i', 'template_rkgjfst', templateParams, 'BS0KCxakf6y8wGFx-');
      setEmailSent(true);
      console.log('[Astrofied] Offline order confirmation email dispatched via EmailJS Channel 1');
    } catch (err1) {
      console.warn('[Astrofied] EmailJS Channel 1 warning:', err1);
      try {
        await emailjs.send('service_zq8xq7z', 'template_0r8nxcz', templateParams, 'wOEMDGNTN7YJ4O9rb');
        setEmailSent(true);
        console.log('[Astrofied] Offline order confirmation email dispatched via EmailJS Channel 2');
      } catch (err2) {
        console.warn('[Astrofied] EmailJS Channel 2 warning:', err2);
      }
    }
  };

  const handleDownloadReceipt = async () => {
    if (isProcessing || downloaded) return;
    setIsProcessing(true);
    try {
      const doc = new jsPDF({ unit: 'mm', format: 'a4' });
      const W = doc.internal.pageSize.getWidth();

      // Fetch Nunito Rounded (800 ExtraBold) and Mulish (400 Regular & 800 ExtraBold) fonts asynchronously
      if (!cachedNunitoBase64) {
        cachedNunitoBase64 = await fetchFontAsBase64('https://fonts.gstatic.com/s/nunito/v32/XRXI3I6Li01BKofiOc5wtlZ2di8HDDsmRTM.ttf');
      }
      if (!cachedMulishRegBase64 || !cachedMulishBoldBase64) {
        const [reg, bold] = await Promise.all([
          fetchFontAsBase64('https://fonts.gstatic.com/s/mulish/v18/1Ptwg83HX_SGhgqk2hAjQlW_mEuZ0FsSKeOvHg.ttf'),
          fetchFontAsBase64('https://fonts.gstatic.com/s/mulish/v18/1Ptyg83HX_SGhgqO0yLcmjzUAuWexRNWwaA.ttf')
        ]);
        cachedMulishRegBase64 = reg;
        cachedMulishBoldBase64 = bold;
      }

      if (cachedNunitoBase64) {
        doc.addFileToVFS('Nunito-ExtraBold.ttf', cachedNunitoBase64);
        doc.addFont('Nunito-ExtraBold.ttf', 'NunitoRounded', 'bold');
      }
      if (cachedMulishRegBase64) {
        doc.addFileToVFS('Mulish-Regular.ttf', cachedMulishRegBase64);
        doc.addFont('Mulish-Regular.ttf', 'Mulish', 'normal');
      }
      if (cachedMulishBoldBase64) {
        doc.addFileToVFS('Mulish-ExtraBold.ttf', cachedMulishBoldBase64);
        doc.addFont('Mulish-ExtraBold.ttf', 'Mulish', 'bold');
      }

      const fontBrand = cachedNunitoBase64 ? 'NunitoRounded' : 'helvetica';
      const fontBody = cachedMulishRegBase64 ? 'Mulish' : 'helvetica';

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

      // Top brand name in Title Case, Nunito Rounded BOLD (font weight 800)
      doc.setFont(fontBrand, 'bold');
      doc.setFontSize(20);
      doc.setTextColor(209, 0, 0);
      doc.text('Astrofied Gemstones', W / 2, 20, { align: 'center' });

      // Sub-header info in Mulish PLAIN / REGULAR (NO ITALICS AT ALL)
      doc.setFont(fontBody, 'normal');
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.text('Certified Vedic Gemstone Remedies (Offline / Cash Order Confirmation)', W / 2, 28, { align: 'center' });
      doc.text('sj.astrologyservices@gmail.com  |  +91 96127 36566', W / 2, 34, { align: 'center' });

      doc.setDrawColor(209, 0, 0);
      doc.setLineWidth(0.7);
      doc.line(12, 41, W - 12, 41);

      // Title in ALL CAPS, Mulish Bold (font weight 800)
      doc.setFont(fontBody, 'bold');
      doc.setFontSize(14);
      doc.setTextColor(30, 30, 30);
      doc.text('OFFLINE ORDER CONFIRMATION', W / 2, 52, { align: 'center' });

      doc.setDrawColor(210, 210, 210);
      doc.setLineWidth(0.3);
      doc.line(12, 56, W - 12, 56);

      let y = 64;

      // Section Header in Title Case, Nunito Rounded BOLD (weight 800), Red
      const sectionHeader = (label) => {
        doc.setFillColor(245, 245, 221);
        doc.rect(12, y - 5, W - 24, 9, 'F');
        doc.setFont(fontBrand, 'bold');
        doc.setFontSize(9.5);
        doc.setTextColor(209, 0, 0);
        doc.text(label, 15, y + 1);
        y += 11;
      };

      // Row Helper: Left labels in Mulish BOLD ONLY (NO ITALICS), Right values in Mulish BOLD
      const row = (label, value, highlight = false) => {
        if (value === null || value === undefined || value === '') return;
        doc.setFont(fontBody, 'bold');
        doc.setFontSize(9.5);
        doc.setTextColor(30, 30, 30);
        doc.text(String(label), 15, y);

        doc.setFont(fontBody, 'bold');
        doc.setTextColor(highlight ? 209 : 25, highlight ? 0 : 25, highlight ? 0 : 25);
        const lines = doc.splitTextToSize(String(value), 90);
        doc.text(lines, W - 15, y, { align: 'right' });
        y += lines.length > 1 ? lines.length * 5.5 : 7.5;
      };

      const lightDivider = () => {
        doc.setDrawColor(230, 230, 230);
        doc.setLineWidth(0.2);
        doc.line(12, y, W - 12, y);
        y += 5;
      };

      // Customer Information
      sectionHeader('Customer Information');
      row('Full Name:', orderInfo.name);
      row('Mobile Number:', `+91 ${orderInfo.mobile}`);
      if (orderInfo.address) {
        doc.setFont(fontBody, 'bold');
        doc.setFontSize(9.5);
        doc.setTextColor(30, 30, 30);
        doc.text('Delivery Address:', 15, y);

        doc.setFont(fontBody, 'bold');
        doc.setTextColor(25, 25, 25);
        const addrLines = doc.splitTextToSize(orderInfo.address, 100);
        doc.text(addrLines, W - 15, y, { align: 'right' });
        y += Math.max(addrLines.length * 5.5, 7.5);
      }
      lightDivider();

      // Order & Payment Details
      sectionHeader('Order & Payment Details');
      row('Purchase Mode:', 'Offline / Cash Purchase');
      if (orderInfo.paymentType) row('Payment Type:', orderInfo.paymentType);
      if (orderInfo.gemstone) row('Gemstone:', orderInfo.gemstone);
      if (orderInfo.size) row('Gemstone Size:', `${orderInfo.size} mm`);
      if (orderInfo.totalAmount && parseFloat(orderInfo.totalAmount) > 0) {
        row('Total Order Value:', `Rs. ${formatCurrency(orderInfo.totalAmount)}`);
      }
      if (orderInfo.advanceAmount && parseFloat(orderInfo.advanceAmount) > 0) {
        row('Advance Amount (50%):', `Rs. ${formatCurrency(orderInfo.advanceAmount)}`);
      }
      if (orderInfo.pendingAmount && parseFloat(orderInfo.pendingAmount) > 0) {
        row('Pending Amount (50%):', `Rs. ${formatCurrency(orderInfo.pendingAmount)}`);
      }
      row('Transaction Ref:', orderInfo.transactionRef || '—');
      row('Order Date & Time:', formatDateTime(orderInfo.timestamp));
      lightDivider();

      // Important Notice
      sectionHeader('Important Notice');
      doc.setFillColor(254, 242, 242);
      doc.setDrawColor(254, 202, 202);
      doc.setLineWidth(0.3);
      
      const noticeLines = doc.splitTextToSize(NOTICE_TEXT, W - 32);
      const boxHeight = noticeLines.length * 4.2 + 8;
      doc.rect(12, y - 4, W - 24, boxHeight, 'FD');

      doc.setFont(fontBody, 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(185, 28, 28);
      doc.text(noticeLines, 16, y + 1, { align: 'justify', maxWidth: W - 32 });
      y += boxHeight + 4;

      // Customer Declaration (BOLD ONLY, NO ITALICS AT ALL)
      sectionHeader('Customer Declaration');
      doc.setFont(fontBody, 'bold');
      doc.setFontSize(8);
      doc.setTextColor(50, 50, 50);
      const termsLines = doc.splitTextToSize(TERMS_TEXT, W - 27);
      doc.text(termsLines, 15, y);
      y += termsLines.length * 4 + 4;

      // Footer in Mulish (NO ITALICS AT ALL)
      const totalPages = doc.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        const pH = doc.internal.pageSize.getHeight();
        doc.setFillColor(245, 245, 221);
        doc.rect(0, pH - 16, W, 16, 'F');
        doc.setFont(fontBody, 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(120, 120, 120);
        doc.text('This is an official offline order confirmation paper generated by Astrofied.', W / 2, pH - 10, { align: 'center' });
        doc.setFont(fontBody, 'bold');
        doc.setFontSize(7.5);
        doc.setTextColor(209, 0, 0);
        doc.text(`Astrofied  |  sj.astrologyservices@gmail.com  |  Page ${i} of ${totalPages}`, W / 2, pH - 4, { align: 'center' });
      }

      const safeName = (orderInfo.name || 'Customer').replace(/[^a-zA-Z0-9]/g, '_');
      doc.save(`Astrofied_Offline_Order_Confirmation_${safeName}.pdf`);
      setDownloaded(true);

      // Non-blocking background email dispatch to sj.astrologyservices@gmail.com
      sendEmailToSJ().catch((err) => console.warn('[Astrofied] Background email notice:', err));

      // Auto-reset form fields in OrderForm.jsx & trigger smooth animated modal exit
      setTimeout(() => {
        if (onDownloadComplete) {
          onDownloadComplete();
        } else {
          onClose();
        }
      }, 300);
    } catch (err) {
      console.error('Error generating order confirmation PDF:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-[#FAF9F6] border border-[#E5DFC2] rounded-3xl p-5 sm:p-7 shadow-2xl overflow-y-auto max-h-[92vh] font-mulish text-black"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black rounded-full hover:bg-black/5 transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex flex-col items-center text-center gap-2 mb-5">
            <div className="w-12 h-12 rounded-full bg-[#D10000]/10 flex items-center justify-center text-[#D10000]">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-black font-mulish">
              Offline Order Confirmation
            </h3>
            <p className="text-xs sm:text-sm text-[#555555]">
              Explicitly registered for offline or cash purchase of remedies & gemstones.
            </p>
          </div>

          {/* Details Card */}
          <div className="bg-[#f5f5dd] border border-[#E5DFC2] rounded-2xl p-4 space-y-2 mb-4 text-xs sm:text-sm">
            <div className="flex justify-between border-b border-black/5 pb-1.5">
              <span className="text-[#666666] font-medium">Customer:</span>
              <span className="font-bold text-black">{orderInfo.name}</span>
            </div>
            <div className="flex justify-between border-b border-black/5 pb-1.5">
              <span className="text-[#666666] font-medium">Mobile:</span>
              <span className="font-bold text-black">+91 {orderInfo.mobile}</span>
            </div>
            {orderInfo.paymentType && (
              <div className="flex justify-between border-b border-black/5 pb-1.5">
                <span className="text-[#666666] font-medium">Payment Type:</span>
                <span className="font-bold text-[#D10000]">{orderInfo.paymentType}</span>
              </div>
            )}
            {orderInfo.gemstone && (
              <div className="flex justify-between border-b border-black/5 pb-1.5">
                <span className="text-[#666666] font-medium">Gemstone:</span>
                <span className="font-bold text-black">{orderInfo.gemstone} {orderInfo.size ? `(${orderInfo.size} mm)` : ''}</span>
              </div>
            )}
            {orderInfo.totalAmount && parseFloat(orderInfo.totalAmount) > 0 && (
              <div className="flex justify-between border-b border-black/5 pb-1.5">
                <span className="text-[#666666] font-medium">Total Order Value:</span>
                <span className="font-bold text-black">₹{formatCurrency(orderInfo.totalAmount)}</span>
              </div>
            )}
            {orderInfo.advanceAmount && parseFloat(orderInfo.advanceAmount) > 0 && (
              <div className="flex justify-between border-b border-black/5 pb-1.5">
                <span className="text-[#666666] font-medium">Advance Amount (50%):</span>
                <span className="font-bold text-[#D10000]">₹{formatCurrency(orderInfo.advanceAmount)}</span>
              </div>
            )}
            {orderInfo.pendingAmount && parseFloat(orderInfo.pendingAmount) > 0 && (
              <div className="flex justify-between border-b border-black/5 pb-1.5">
                <span className="text-[#666666] font-medium">Pending Amount (50%):</span>
                <span className="font-bold text-black">₹{formatCurrency(orderInfo.pendingAmount)}</span>
              </div>
            )}
            <div className="flex justify-between border-b border-black/5 pb-1.5">
              <span className="text-[#666666] font-medium">Transaction Ref:</span>
              <span className="font-mono text-[11px] font-bold text-gray-700">{orderInfo.transactionRef}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#666666] font-medium">Mode:</span>
              <span className="font-bold text-[#D10000] uppercase text-[10px] tracking-wider bg-[#D10000]/10 px-2 py-0.5 rounded">
                Cash / Offline
              </span>
            </div>
          </div>

          {/* Action Buttons & Status */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleDownloadReceipt}
              disabled={isProcessing || downloaded}
              className="w-full py-3.5 px-6 bg-[#D10000] hover:bg-[#D61E00] active:scale-98 text-white rounded-2xl font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg transition-all disabled:opacity-50"
            >
              {isProcessing ? (
                <span>Downloading Receipt...</span>
              ) : downloaded ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Receipt Downloaded</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  <span>Download Receipt</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="w-full py-2 text-xs font-bold text-gray-600 hover:text-black transition-colors"
            >
              Close Window
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
