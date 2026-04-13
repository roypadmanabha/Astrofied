const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();

// Modern CORS configuration
const allowedOrigins = [
    'http://localhost:5173',
    'https://roypadmanabha.github.io',
    'https://astrofied-production.up.railway.app'
];

app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://roypadmanabha.github.io',
        'https://astrofied.netlify.app',
        'https://astrofied-online.netlify.app'
    ],
    credentials: true
}));
app.use(express.json());

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

// OTP Storage (In-memory for session)
const otpStore = new Map();

// Endpoint: Send OTP
app.post('/api/send-otp', (req, res) => {
    const { phoneNumber } = req.body;
    if (!phoneNumber) return res.status(400).json({ error: 'Phone number is required' });

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = Date.now() + 5 * 60 * 1000; // 5 minutes

    otpStore.set(phoneNumber, { otp, expiry });

    const isLocal = process.env.NODE_ENV !== 'production';
    console.log(`[OTP] Sent to ${phoneNumber}: ${otp}`);

    res.json({ message: 'OTP sent successfully', demo: isLocal }); // Share 'demo' flag if local
});

// Endpoint: Verify OTP
app.post('/api/verify-otp', (req, res) => {
    const { phoneNumber, otp } = req.body;
    const record = otpStore.get(phoneNumber);

    if (!record) return res.status(400).json({ error: 'No OTP found for this number' });
    if (Date.now() > record.expiry) {
        otpStore.delete(phoneNumber);
        return res.status(400).json({ error: 'OTP expired' });
    }

    if (record.otp === otp) {
        otpStore.delete(phoneNumber); // Clear after use
        return res.json({ success: true, message: 'Verified successfully' });
    }

    res.status(400).json({ error: 'Invalid OTP code' });
});

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
                chart_style: 'north-indian',
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

// Update for Railway: Use process.env.PORT
const PORT = process.env.PORT || 5001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
