const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const crypto = require('crypto');
const Razorpay = require('razorpay');
const nodemailer = require('nodemailer');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();

// Modern CORS configuration
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://roypadmanabha.github.io',
    'https://astrofied.netlify.app',
    'https://astrofied-online.netlify.app',
    'https://astrofied-official.netlify.app',
    'https://astrofied-production.up.railway.app'
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.netlify.app')) {
            callback(null, true);
        } else {
            console.log('CORS Blocked for origin:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(express.json());

// ==========================================
//  PROKERALA — Kundali Chart API
// ==========================================

const PROKERALA_TOKEN_URL = 'https://api.prokerala.com/token';
const PROKERALA_CHART_URL = 'https://api.prokerala.com/v2/astrology/chart';

let accessToken = null;
let tokenExpiry = null;

// Root route for health check
app.get('/', (req, res) => {
    res.send('Astrofied Backend is running successfully!');
});

// Function to get/refresh Prokerala Access Token
async function getAccessToken() {
    if (accessToken && tokenExpiry && Date.now() < (tokenExpiry - 60000)) {
        return accessToken;
    }

    try {
        console.log('Attempting to get Prokerala access token...');
        const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');
        params.append('client_id', process.env.PROKERALA_CLIENT_ID);
        params.append('client_secret', process.env.PROKERALA_CLIENT_SECRET);

        const response = await axios.post(PROKERALA_TOKEN_URL, params, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        accessToken = response.data.access_token;
        tokenExpiry = Date.now() + (response.data.expires_in * 1000);
        
        console.log('Successfully obtained new Prokerala access token.');
        return accessToken;
    } catch (error) {
        console.error('PROKERALA AUTH ERROR:', error.response?.status, JSON.stringify(error.response?.data || error.message));
        throw new Error('Failed to authenticate with Prokerala. Please check your Client ID and Secret in the Railway Variables tab.');
    }
}

app.post('/api/kundali', async (req, res) => {
    try {
        const { name, dob, tob, lat, lon, tzo } = req.body;
        
        if (!dob || !tob || !lat || !lon) {
            return res.status(400).json({ error: 'Missing required birth details' });
        }

        const datetime = `${dob}T${tob}:00${tzo || '+05:30'}`;
        console.log(`Generating Kundali for ${name} at ${datetime} (${lat}, ${lon})`);

        const token = await getAccessToken();

        const response = await axios.get(PROKERALA_CHART_URL, {
            params: {
                ayanamsa: 1, // Lahiri
                chart_type: 'rasi',
                chart_style: 'east-indian',
                datetime: datetime,
                coordinates: `${lat},${lon}`,
                la: 'en'
            },
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'image/svg+xml'
            }
        });

        res.set('Content-Type', 'image/svg+xml');
        res.send(response.data);
    } catch (error) {
        console.error('PROKERALA API ERROR:', error.response?.status, JSON.stringify(error.response?.data || error.message));
        
        // Extract the most descriptive error message from Prokerala V2 response
        const prokeralaError = error.response?.data?.errors?.[0]?.detail || 
                              error.response?.data?.message || 
                              error.message;
                              
        res.status(error.response?.status || 500).json({ 
            error: prokeralaError,
            details: error.response?.data
        });
    }
});

// ==========================================
//  RAZORPAY — Payment Gateway
// ==========================================

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create Razorpay Order
app.post('/api/create-order', async (req, res) => {
    try {
        const { amount, service, customerDetails } = req.body;

        if (!amount || !service || !customerDetails) {
            return res.status(400).json({ error: 'Missing required order details' });
        }

        const options = {
            amount: Math.round(amount * 100), // Razorpay expects amount in paise
            currency: 'INR',
            receipt: `astrofied_${Date.now()}`,
            notes: {
                service: service,
                customerName: customerDetails.name,
                customerPhone: customerDetails.phone,
                customerEmail: customerDetails.email || '',
                dob: customerDetails.dob || '',
                pob: customerDetails.pob || '',
                tob: customerDetails.tob || ''
            }
        };

        const order = await razorpay.orders.create(options);
        console.log(`✅ Razorpay Order Created: ${order.id} | Service: ${service} | Amount: ₹${amount}`);

        res.json({
            success: true,
            order,
            key_id: process.env.RAZORPAY_KEY_ID
        });
    } catch (error) {
        console.error('❌ Razorpay Order Error:', error);
        res.status(500).json({ error: 'Failed to create payment order. Please try again.' });
    }
});

// Verify Payment & Send Notifications
app.post('/api/verify-payment', async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, customerDetails, service, amount } = req.body;

        // Verify Razorpay signature
        const sign = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(sign)
            .digest('hex');

        if (razorpay_signature !== expectedSign) {
            console.error('❌ Payment signature mismatch!');
            return res.status(400).json({ error: 'Invalid payment signature. Payment could not be verified.' });
        }

        // Payment verified successfully
        console.log('═══════════════════════════════════════════');
        console.log('✅ PAYMENT VERIFIED — NEW BOOKING RECEIVED');
        console.log('═══════════════════════════════════════════');
        console.log(`Service     : ${service}`);
        console.log(`Amount      : ₹${amount}`);
        console.log(`Payment ID  : ${razorpay_payment_id}`);
        console.log(`Order ID    : ${razorpay_order_id}`);
        console.log(`Address     : ${customerDetails.address}`);
        console.log('═══════════════════════════════════════════');

        // Send email notification (non-blocking — don't let email failure break the response)
        sendBookingEmail(customerDetails, service, amount, razorpay_payment_id).catch(err => {
            console.error('⚠️ Email notification failed (non-critical):', err.message);
        });

        // Build WhatsApp notification URL
        const whatsappMessage = buildWhatsAppMessage(customerDetails, service, amount, razorpay_payment_id);
        const whatsappUrl = `https://wa.me/${process.env.NOTIFY_PHONE}?text=${encodeURIComponent(whatsappMessage)}`;

        res.json({
            success: true,
            message: 'Payment verified and booking confirmed!',
            paymentId: razorpay_payment_id,
            whatsappUrl
        });

    } catch (error) {
        console.error('❌ Payment Verification Error:', error);
        res.status(500).json({ error: 'Payment verification failed. Please contact support.' });
    }
});

// ==========================================
//  NOTIFICATIONS — Email & WhatsApp
// ==========================================

async function sendBookingEmail(customer, service, amount, paymentId) {
    // Configure nodemailer transporter
    // NOTE: For Gmail, you need to enable 2FA and create an App Password
    // Set GMAIL_APP_PASSWORD in your .env file to enable email notifications
    if (!process.env.GMAIL_APP_PASSWORD) {
        console.log('ℹ️  Email notifications disabled (GMAIL_APP_PASSWORD not set in .env)');
        return;
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.NOTIFY_EMAIL,
            pass: process.env.GMAIL_APP_PASSWORD
        }
    });

    let birthDetailsText = '';
    if (service === 'Horoscope Matching') {
        birthDetailsText = `
👦 BOY'S BIRTH DETAILS:
   Name       : ${customer.boyName}
   Date       : ${customer.boyDob}
   Place      : ${customer.boyPob}
   Time       : ${customer.boyTob}

👧 GIRL'S BIRTH DETAILS:
   Name       : ${customer.girlName}
   Date       : ${customer.girlDob}
   Place      : ${customer.girlPob}
   Time       : ${customer.girlTob}
        `;
    } else {
        birthDetailsText = `
🗓️ BIRTH DETAILS:
   Date       : ${customer.dob}
   Place      : ${customer.pob}
   Time       : ${customer.tob}
        `;
    }

    const emailBody = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ NEW ASTROFIED BOOKING — PAYMENT RECEIVED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 SERVICE: ${service}
💰 AMOUNT PAID: ₹${amount}
🧾 PAYMENT ID: ${paymentId}

👤 CUSTOMER DETAILS:
   Name       : ${service === 'Horoscope Matching' ? `${customer.boyName} & ${customer.girlName}` : customer.name}
   Phone      : ${customer.phone}
   Email      : ${customer.email || 'Not provided'}
   Address    : ${customer.address}

${birthDetailsText}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Booking received at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `.trim();

    await transporter.sendMail({
        from: `"Astrofied Ltd." <${process.env.NOTIFY_EMAIL}>`,
        to: process.env.NOTIFY_EMAIL,
        subject: `🔔 New Booking: ${service} — ${service === 'Horoscope Matching' ? customer.boyName : customer.name} (₹${amount})`,
        text: emailBody
    });

    console.log('📧 Booking email sent successfully to', process.env.NOTIFY_EMAIL);
}

function buildWhatsAppMessage(customer, service, amount, paymentId) {
    let birthDetails = '';
    if (service === 'Horoscope Matching') {
        birthDetails = `👦 *Boy's Details:*
• Name: ${customer.boyName}
• DOB: ${customer.boyDob}
• Place: ${customer.boyPob}
• Time: ${customer.boyTob}

👧 *Girl's Details:*
• Name: ${customer.girlName}
• DOB: ${customer.girlDob}
• Place: ${customer.girlPob}
• Time: ${customer.girlTob}`;
    } else {
        birthDetails = `🗓️ *Birth Details:*
• DOB: ${customer.dob}
• Place: ${customer.pob}
• Time: ${customer.tob}`;
    }

    return `🔔 *NEW ASTROFIED BOOKING*

📋 *Service:* ${service}
💰 *Amount Paid:* ₹${amount}
🧾 *Payment ID:* ${paymentId}

👤 *Customer Details:*
• Name: ${service === 'Horoscope Matching' ? `${customer.boyName} & ${customer.girlName}` : customer.name}
• Phone: ${customer.phone}
• Email: ${customer.email || 'N/A'}
• Address: ${customer.address}

${birthDetails}

📅 _${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}_`;
}

// Update for Railway: Use process.env.PORT
const PORT = process.env.PORT || 5001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
