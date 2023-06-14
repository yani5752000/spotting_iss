// const {fetchMyIP} = require("./iss");

// fetchMyIP((error, ip) => {
//     if(error) {
//         console.log("Error fetch details: ", error);
//     } else {
//         console.log("ip is: ", ip);
//     }
// })

const { CookieJar } = require('tough-cookie');
const { fetchMyIP, fetchCoordsByIP } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
  console.log("type of ip is: ", typeof ip);
//   fetchCoordsByIP(ip, (error, coordinates) => {
//     if (error) {
//         console.log("Fetching the coordinates did not work!", error);
//         return;
//     }

//     console.log('It worked! Returned coordinates!');
//     console.log("Latitude: ", coordinates.latitude);
//     console.log("Longitude: ", coordinates.longitude);
//     console.log("type of cooridinates is: ", typeof coordinates);
//   })
});

// fetchCoordsByIP("174.112.35.107", (error, coordinates) => {
//     if (error) {
//         console.log("Fetching the coordinates did not work!", error);
//         return;
//     }

//     console.log('It worked! Returned coordinates:', coordinates);
//     console.log("Latitude: ", coordinates.latitude);
//     console.log("Longitude: ", coordinates.longitude);
//     console.log("type of cooridinates is: ", typeof coordinates);
//   })