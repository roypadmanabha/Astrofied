const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

async function test() {
    try {
        const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');
        params.append('client_id', process.env.PROKERALA_CLIENT_ID);
        params.append('client_secret', process.env.PROKERALA_CLIENT_SECRET);

        const tokenRes = await axios.post('https://api.prokerala.com/token', params);
        const token = tokenRes.data.access_token;
        
        console.log("Testing inauspicious-period...");
        try {
            const inausp = await axios.get('https://api.prokerala.com/v2/astrology/inauspicious-period', {
                params: { ayanamsa: 1, datetime: new Date().toISOString(), coordinates: '28.6139,77.2090' },
                headers: { 'Authorization': `Bearer ${token}` }
            });
            console.log("INAUSPICIOUS:");
            console.log(JSON.stringify(inausp.data, null, 2));
        } catch(e) { console.error("inauspicious error", e.response?.status); }

        console.log("Testing auspicious-period...");
        try {
            const ausp = await axios.get('https://api.prokerala.com/v2/astrology/auspicious-period', {
                params: { ayanamsa: 1, datetime: new Date().toISOString(), coordinates: '28.6139,77.2090' },
                headers: { 'Authorization': `Bearer ${token}` }
            });
            console.log("AUSPICIOUS:");
            console.log(JSON.stringify(ausp.data, null, 2));
        } catch(e) { console.error("auspicious error", e.response?.status); }

        console.log("Testing choghadiya...");
        try {
            const chog = await axios.get('https://api.prokerala.com/v2/astrology/choghadiya', {
                params: { ayanamsa: 1, datetime: new Date().toISOString(), coordinates: '28.6139,77.2090' },
                headers: { 'Authorization': `Bearer ${token}` }
            });
            console.log("CHOGHADIYA:");
            console.log(JSON.stringify(chog.data, null, 2));
        } catch(e) { console.error("chog error", e.response?.status); }
    } catch (e) {
        console.error("Token error", e.message);
    }
}

test();
