const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
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

// ==========================================
//  PROKERALA V2 Endpoints
// ==========================================

app.post('/api/kundali', async (req, res) => {
    try {
        const { name, dob, tob, lat, lon, tzo } = req.body;
        if (!dob || !tob || !lat || !lon) return res.status(400).json({ error: 'Missing required birth details' });

        const datetime = `${dob}T${tob}:00${tzo || '+05:30'}`;
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
            headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'image/svg+xml' }
        });
        res.set('Content-Type', 'image/svg+xml');
        res.send(response.data);
    } catch (error) {
        handleApiError(res, error, 'Kundali Chart');
    }
});

app.post('/api/panchang', async (req, res) => {
    try {
        const { datetime, lat, lon } = req.body;
        const token = await getAccessToken();
        const response = await axios.get('https://api.prokerala.com/v2/astrology/panchang', {
            params: { datetime, coordinates: `${lat},${lon}`, ayanamsa: 1, la: 'en' },
            headers: { 'Authorization': `Bearer ${token}` }
        });
        res.json(response.data);
    } catch (error) {
        handleApiError(res, error, 'Panchang');
    }
});

app.post('/api/nakshatra', async (req, res) => {
    try {
        const { datetime, lat, lon } = req.body;
        const token = await getAccessToken();
        const response = await axios.get('https://api.prokerala.com/v2/astrology/nakshatra', {
            params: { datetime, coordinates: `${lat},${lon}`, ayanamsa: 1, la: 'en' },
            headers: { 'Authorization': `Bearer ${token}` }
        });
        res.json(response.data);
    } catch (error) {
        handleApiError(res, error, 'Nakshatra');
    }
});

app.post('/api/gemstone', async (req, res) => {
    try {
        const { datetime, lat, lon } = req.body;
        const token = await getAccessToken();
        const response = await axios.get('https://api.prokerala.com/v2/astrology/gemstone-recommendation', {
            params: { datetime, coordinates: `${lat},${lon}`, ayanamsa: 1, la: 'en' },
            headers: { 'Authorization': `Bearer ${token}` }
        });
        res.json(response.data);
    } catch (error) {
        handleApiError(res, error, 'Gemstone Recommendation');
    }
});

app.post('/api/matching', async (req, res) => {
    try {
        const { girl_dob, girl_tob, girl_lat, girl_lon, boy_dob, boy_tob, boy_lat, boy_lon } = req.body;
        const token = await getAccessToken();
        const response = await axios.get('https://api.prokerala.com/v2/astrology/kundli-matching', {
            params: {
                girl_datetime: `${girl_dob}T${girl_tob}:00+05:30`,
                girl_coordinates: `${girl_lat},${girl_lon}`,
                boy_datetime: `${boy_dob}T${boy_tob}:00+05:30`,
                boy_coordinates: `${boy_lat},${boy_lon}`,
                ayanamsa: 1,
                la: 'en'
            },
            headers: { 'Authorization': `Bearer ${token}` }
        });
        res.json(response.data);
    } catch (error) {
        handleApiError(res, error, 'Kundli Matching');
    }
});

// Helper for error handling
function handleApiError(res, error, serviceName) {
    console.error(`PROKERALA ${serviceName.toUpperCase()} ERROR:`, error.response?.status, JSON.stringify(error.response?.data || error.message));
    const msg = error.response?.data?.errors?.[0]?.detail || error.response?.data?.message || error.message;
    res.status(error.response?.status || 500).json({ error: msg, details: error.response?.data });
}

// Update for Railway: Use process.env.PORT
const PORT = process.env.PORT || 5001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
