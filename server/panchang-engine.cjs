const swisseph = require('swisseph');

// Setup swisseph sidereal mode (Lahiri = 1)
swisseph.swe_set_sid_mode(1, 0, 0);

const FLAGS = swisseph.SEFLG_SWIEPH | swisseph.SEFLG_SIDEREAL;

function getJulDay(dateStr) {
    const d = new Date(dateStr);
    return new Promise((resolve) => {
        const utcHour = d.getUTCHours() + (d.getUTCMinutes()/60) + (d.getUTCSeconds()/3600);
        swisseph.swe_julday(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate(), utcHour, swisseph.SE_GREG_CAL, (julday) => {
            resolve(julday);
        });
    });
}

function getPos(julday, body) {
    return new Promise((resolve) => {
        swisseph.swe_calc_ut(julday, body, FLAGS, (res) => {
            resolve(res.longitude);
        });
    });
}

const TITHI_NAMES = ["Shukla Pratipada","Shukla Dwitiya","Shukla Tritiya","Shukla Chaturthi","Shukla Panchami","Shukla Shashthi","Shukla Saptami","Shukla Ashtami","Shukla Navami","Shukla Dashami","Shukla Ekadashi","Shukla Dwadashi","Shukla Trayodashi","Shukla Chaturdashi","Purnima","Krishna Pratipada","Krishna Dwitiya","Krishna Tritiya","Krishna Chaturthi","Krishna Panchami","Krishna Shashthi","Krishna Saptami","Krishna Ashtami","Krishna Navami","Krishna Dashami","Krishna Ekadashi","Krishna Dwadashi","Krishna Trayodashi","Krishna Chaturdashi","Amavasya"];
const NAKSHATRA_NAMES = ["Ashwini","Bharani","Krittika","Rohini","Mrigashira","Ardra","Punarvasu","Pushya","Ashlesha","Magha","Purva Phalguni","Uttara Phalguni","Hasta","Chitra","Swati","Vishakha","Anuradha","Jyeshtha","Mula","Purva Ashadha","Uttara Ashadha","Shravana","Dhanishta","Shatabhisha","Purva Bhadrapada","Uttara Bhadrapada","Revati"];
const RASHI_NAMES = ["Mesha", "Vrishabh", "Mithun", "Kark", "Simha", "Kanya", "Tula", "Vrishchik", "Dhanu", "Makar", "Kumbh", "Meen"];
const YOGA_NAMES = ["Vishkambha", "Priti", "Ayushman", "Saubhagya", "Shobhana", "Atiganda", "Sukarma", "Dhriti", "Shula", "Ganda", "Vriddhi", "Dhruva", "Vyaghata", "Harshana", "Vajra", "Siddhi", "Vyatipata", "Variyan", "Parigha", "Shiva", "Siddha", "Sadhya", "Shubha", "Shukla", "Brahma", "Indra", "Vaidhriti"];

async function findTransit(startJulDay, body, cycleDeg, maxDays, conditionFn) {
    let jd = startJulDay;
    const step = 0.01; // ~14 mins
    let currentVal = await conditionFn(jd);
    let target = Math.floor(currentVal / cycleDeg) + 1;
    let limit = startJulDay + maxDays;
    
    while (jd < limit) {
        jd += step;
        let val = await conditionFn(jd);
        let curr = Math.floor(val / cycleDeg);
        if (curr === target || curr === target % Math.floor(360/cycleDeg)) {
            // Found crossing, refine
            let jdLeft = jd - step;
            let jdRight = jd;
            for(let i=0; i<10; i++) {
                let mid = (jdLeft + jdRight) / 2;
                let midVal = await conditionFn(mid);
                let midCurr = Math.floor(midVal / cycleDeg);
                if (midCurr === target || midCurr === target % Math.floor(360/cycleDeg)) {
                    jdRight = mid;
                } else {
                    jdLeft = mid;
                }
            }
            return jdRight;
        }
    }
    return null; // Not found within maxDays
}

function jdToDate(jd) {
    if (!jd) return null;
    // Convert julday to UTC timestamp
    // JD 2440587.5 is 1970-01-01T00:00:00Z
    const ms = (jd - 2440587.5) * 86400000;
    return new Date(ms).getTime();
}

async function calculatePanchang(dateStr) {
    const julday = await getJulDay(dateStr);
    
    const getDiff = async (jd) => {
        const sun = await getPos(jd, swisseph.SE_SUN);
        const moon = await getPos(jd, swisseph.SE_MOON);
        return (moon - sun + 360) % 360;
    };
    
    const getSum = async (jd) => {
        const sun = await getPos(jd, swisseph.SE_SUN);
        const moon = await getPos(jd, swisseph.SE_MOON);
        return (moon + sun) % 360;
    };

    const getMoon = async (jd) => await getPos(jd, swisseph.SE_MOON);
    const getSun = async (jd) => await getPos(jd, swisseph.SE_SUN);

    // Current positions
    const diff = await getDiff(julday);
    const sum = await getSum(julday);
    const moonPos = await getMoon(julday);
    const sunPos = await getSun(julday);

    // Calculate elements
    const tithiIdx = Math.floor(diff / 12);
    const nakshatraIdx = Math.floor(moonPos / (360/27));
    const yogaIdx = Math.floor(sum / (360/27));
    const moonSignIdx = Math.floor(moonPos / 30);
    const sunSignIdx = Math.floor(sunPos / 30);
    const karanaIdx = Math.floor(diff / 6);
    function getKaranaName(idx) {
        if (idx === 0) return "Kintughna";
        if (idx === 57) return "Shakuni";
        if (idx === 58) return "Chatushpada";
        if (idx === 59) return "Naga";
        const repeating = ["Bava", "Balava", "Kaulava", "Taitila", "Gara", "Vanija", "Vishti"];
        return repeating[(idx - 1) % 7];
    }
    const karanaName = getKaranaName(karanaIdx);
    
    // Find next transits (countdowns)
    const nextTithiJD = await findTransit(julday, null, 12, 2, getDiff);
    const nextKaranaJD = await findTransit(julday, null, 6, 1, getDiff);
    const nextNakshatraJD = await findTransit(julday, null, 360/27, 2, getMoon);
    const nextYogaJD = await findTransit(julday, null, 360/27, 2, getSum);
    const nextMoonSignJD = await findTransit(julday, null, 30, 3, getMoon);
    const nextSunSignJD = await findTransit(julday, null, 30, 32, getSun);

    const d = new Date(dateStr);
    const varas = ["Ravivara", "Somavara", "Mangalavara", "Budhavara", "Guruvara", "Shukravara", "Shanivara"];
    const samvatsaras = ["Prabhava", "Vibhava", "Shukla", "Pramoda", "Prajapati", "Angirasa", "Shrimukha", "Bhava", "Yuva", "Dhatri", "Ishvara", "Bahudhanya", "Pramathi", "Vikrama", "Vrusha", "Chitrabhanu", "Subhanu", "Tarana", "Parthiva", "Vyaya", "Sarvajit", "Sarvadhari", "Virodhi", "Vikruti", "Khara", "Nandana", "Vijaya", "Jaya", "Manmatha", "Durmukha", "Hevilambi", "Vilambi", "Vikari", "Sharvari", "Plava", "Shubhakrut", "Shobhakrut", "Krodhi", "Vishwavasu", "Parabhava", "Plavanga", "Kilaka", "Saumya", "Sadharana", "Virodhikrut", "Paridhavi", "Pramadi", "Ananda", "Rakshasa", "Nala", "Pingala", "Kalayukti", "Siddharthi", "Raudra", "Durmati", "Dundubhi", "Rudhirodgari", "Raktaksha", "Krodhana", "Kshaya"];
    const LUNAR_MONTHS = ["Chaitra", "Vaishakha", "Jyeshtha", "Ashadha", "Shravana", "Bhadrapada", "Ashwina", "Kartika", "Margashirsha", "Pausha", "Magha", "Phalguna"];

    let isPanchak = "Clear";
    if (moonSignIdx === 10 || moonSignIdx === 11) {
        isPanchak = "Active";
    } else {
        let degToPanchak = (300 - moonPos + 360) % 360;
        let daysToPanchak = Math.max(1, Math.round(degToPanchak / 13.176));
        isPanchak = `in ${daysToPanchak} days`;
    }

    let isBhadra = "Clear";
    if (karanaName === "Vishti") {
        isBhadra = "Active";
    } else {
        let nextVishtiIdx = karanaIdx;
        while (getKaranaName(nextVishtiIdx) !== "Vishti") {
            nextVishtiIdx = (nextVishtiIdx + 1) % 60;
        }
        let karanasAway = (nextVishtiIdx - karanaIdx + 60) % 60;
        let daysToBhadra = Math.max(1, Math.round(karanasAway * 0.5));
        isBhadra = `in ${daysToBhadra} days`;
    }

    return {
        tithi: TITHI_NAMES[tithiIdx],
        nakshatra: NAKSHATRA_NAMES[nakshatraIdx],
        yoga: YOGA_NAMES[yogaIdx],
        karana: karanaName,
        vara: varas[d.getDay()],
        moonSign: RASHI_NAMES[moonSignIdx],
        sunSign: RASHI_NAMES[sunSignIdx],
        paksha: tithiIdx < 15 ? "Shukla Paksha" : "Krishna Paksha",
        
        // Return UTC timestamps for frontend timers
        countdowns: {
            tithi: jdToDate(nextTithiJD),
            nakshatra: jdToDate(nextNakshatraJD),
            yoga: jdToDate(nextYogaJD),
            moon: jdToDate(nextMoonSignJD),
            sun: jdToDate(nextSunSignJD),
            karana: jdToDate(nextKaranaJD)
        },
        
        // Muhurtas would ideally use lat/lon. Providing structure for now.
        muhurtas: {
            sunrise: "05:40 AM",
            sunset: "06:45 PM",
            moonrise: "07:15 AM",
            moonset: "08:00 PM",
            rahuKaal: "03:30 PM - 05:00 PM",
            yamaganda: "09:00 AM - 10:30 AM",
            gulikaKaal: "12:00 PM - 01:30 PM",
            abhijit: "11:55 AM - 12:45 PM",
            brahma: "04:10 AM - 04:58 AM",
            amritKaal: "10:15 AM - 11:50 AM"
        },
        
        status: {
            panchak: isPanchak,
            bhadra: isBhadra
        },
        
        lunarMonth: LUNAR_MONTHS[(sunSignIdx + 1) % 12],
        samvatsara: samvatsaras[(d.getFullYear() - 1987 + 60) % 60]
    };
}

module.exports = { calculatePanchang };
