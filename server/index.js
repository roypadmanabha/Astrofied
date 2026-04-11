const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PROKERALA_TOKEN_URL = 'https://api.prokerala.com/token';
const PROKERALA_CHART_URL = 'https://api.prokerala.com/v2/astrology/chart';

let accessToken = null;
let tokenExpiry = null;

// Function to get/refresh Prokerala Access Token
async function getAccessToken() {
    // Check if token is still valid (with a 1-minute buffer)
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
        // tokenExpiry is calculated from current time + expires_in seconds
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

        // Format: YYYY-MM-DDTHH:MM:SS+HH:MM
        // tzo is expected as '+HH:MM'
        const datetime = `${dob}T${tob}:00${tzo || '+05:30'}`;
        
        console.log(`Generating Kundali for ${name} at ${datetime} (${lat}, ${lon})`);

        const token = await getAccessToken();

        const response = await axios.get(PROKERALA_CHART_URL, {
            params: {
                ayanamsa: 1, // Lahiri
                chart_type: 'rasi', // Fixed: lowercase 'rasi' is required for V2
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

const PORT = 5005;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
