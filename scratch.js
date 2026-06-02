import axios from 'axios';
axios.post('http://localhost:5001/api/kundali', {
  name: "Test Name",
  dob: "1990-01-01",
  tob: "12:00",
  lat: 28.6139,
  lon: 77.2090,
  tzo: "+05:30"
}).then(res => console.log(res.data.substring(0, 1000))).catch(err => console.error(err.message));
