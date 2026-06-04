const swisseph = require('swisseph');

// Test swisseph
console.log("SwissEph loaded");
const date = {year: 2026, month: 6, day: 4, hour: 2.5}; // approx
swisseph.swe_julday(date.year, date.month, date.day, date.hour, swisseph.SE_GREG_CAL, (julday) => {
    console.log("Julday:", julday);
    swisseph.swe_calc_ut(julday, swisseph.SE_SUN, swisseph.SEFLG_SWIEPH, (body) => {
        console.log("Sun:", body);
    });
});
