const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

async function testPanchang() {
    try {
        const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');
        params.append('client_id', process.env.PROKERALA_CLIENT_ID);
        params.append('client_secret', process.env.PROKERALA_CLIENT_SECRET);

        const tokenRes = await axios.post('https://api.prokerala.com/token', params);
        const token = tokenRes.data.access_token;
        console.log("Token fetched!");

        const panchangRes = await axios.get('https://api.prokerala.com/v2/astrology/panchang', {
            params: {
                ayanamsa: 1,
                datetime: new Date().toISOString(),
                coordinates: '28.6139,77.2090',
                la: 'en'
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(JSON.stringify(panchangRes.data, null, 2));
    } catch (e) {
        console.error(e.response ? e.response.data : e.message);
    }
}

testPanchang();
