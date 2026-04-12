const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Modern CORS configuration
const allowedOrigins = [
    'http://localhost:5173',
    'https://roypadmanabha.github.io',
    'https://astrofied-production.up.railway.app'
];

app.use(cors({
    origin: function(origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
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
        console.error('PROKERALA AUTH ERROR:', error.response?.status, error.response?.data || error.message);
        throw new Error('Failed to authenticate with Prokerala');
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
        res.status(error.response?.status || 500).json({ 
            error: 'Failed to generate Kundali',
            details: error.response?.data || error.message 
        });
    }
});

// Update for Railway: Use process.env.PORT
const PORT = process.env.PORT || 5001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
