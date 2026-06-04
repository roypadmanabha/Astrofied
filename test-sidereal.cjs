const swisseph = require('swisseph');

const date = {year: 2026, month: 6, day: 4, hour: 2.5}; 
swisseph.swe_julday(date.year, date.month, date.day, date.hour, swisseph.SE_GREG_CAL, (julday) => {
    swisseph.swe_set_sid_mode(swisseph.SE_SIDM_LAHIRI, 0, 0);
    
    // 256 = SEFLG_SWIEPH, 64 * 1024 = SEFLG_SIDEREAL = 65536
    const flags = 256 | 65536; 

    swisseph.swe_calc_ut(julday, swisseph.SE_SUN, flags, (sun) => {
        swisseph.swe_calc_ut(julday, swisseph.SE_MOON, flags, (moon) => {
            console.log("Sidereal Sun:", sun.longitude);
            console.log("Sidereal Moon:", moon.longitude);
            const diff = (moon.longitude - sun.longitude + 360) % 360;
            console.log("Tithi number:", Math.floor(diff / 12) + 1);
            console.log("Nakshatra:", Math.floor(moon.longitude / (360/27)) + 1);
        });
    });
});
