import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from both root and server folder just in case
dotenv.config();
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

// Use fully permissive CORS to eliminate all browser blocks
app.use(cors());
app.use(express.json());

const PROKERALA_TOKEN_URL = 'https://api.prokerala.com/token';
const PROKERALA_CHART_URL = 'https://api.prokerala.com/v2/astrology/chart';

let accessToken = null;
let tokenExpiry = null;

// Essential Health Check Route
app.get('/', (req, res) => {
    res.status(200).send('<h1>Astrofied API</h1><p>Status: <b>Online</b></p><p>Railway Deployment is Working!</p>');
});

// Function to get/refresh Prokerala Access Token
async function getAccessToken() {
    if (accessToken && tokenExpiry && Date.now() < (tokenExpiry - 60000)) {
        return accessToken;
    }

    try {
        console.log('Fetching new Prokerala Access Token...');
        const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');
        params.append('client_id', process.env.PROKERALA_CLIENT_ID);
        params.append('client_secret', process.env.PROKERALA_CLIENT_SECRET);

        const response = await axios.post(PROKERALA_TOKEN_URL, params, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        accessToken = response.data.access_token;
        tokenExpiry = Date.now() + (response.data.expires_in * 1000);
        
        console.log('Access token obtained successfully.');
        return accessToken;
    } catch (error) {
        console.error('PROKERALA AUTH ERROR:', error.response?.status, JSON.stringify(error.response?.data || error.message));
        throw new Error('Prokerala Authentication Failed. Verify CLIENT_ID and CLIENT_SECRET in Railway Variables.');
    }
}

app.post('/api/kundali', async (req, res) => {
    try {
        const { name, dob, tob, lat, lon, tzo } = req.body;
        
        if (!dob || !tob || !lat || !lon) {
            return res.status(400).json({ error: 'Missing birth details (Date, Time, or Location)' });
        }

        const datetime = `${dob}T${tob}:00${tzo || '+05:30'}`;
        console.log(`Generating chart for ${name} [${datetime}]`);

        const token = await getAccessToken();

        const response = await axios.get(PROKERALA_CHART_URL, {
            params: {
                ayanamsa: 1,
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
        res.status(200).send(response.data);
    } catch (error) {
        console.error('CHART GENERATION ERROR:', error.response?.status, JSON.stringify(error.response?.data || error.message));
        res.status(error.response?.status || 500).json({ 
            error: 'Failed to generate chart',
            details: error.response?.data || error.message 
        });
    }
});

// Dynamic Port for Railway
const PORT = process.env.PORT || 5001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend Active: Listening on Port ${PORT}`);
});
