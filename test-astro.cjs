const Astronomy = require('astronomy-engine');

const date = new Date();
const time = new Astronomy.AstroTime(date);
const sun = Astronomy.GeoVector(Astronomy.Body.Sun, time, true);
const moon = Astronomy.GeoVector(Astronomy.Body.Moon, time, true);

// Get Ecliptic coordinates
const sunEcl = Astronomy.Equator(Astronomy.Body.Sun, time, null, true, true);
const sunLon = sunEcl.ra * 15; // simplistic
const moonEcl = Astronomy.Equator(Astronomy.Body.Moon, time, null, true, true);
const moonLon = moonEcl.ra * 15; 

console.log("Sun Lon:", sunLon);
console.log("Moon Lon:", moonLon);
