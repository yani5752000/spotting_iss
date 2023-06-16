const {fetchMyIP, fetchCoords, fetchPasses} = require("./iss_promised");

const printPasses = (passes) => {
    for (const pass of passes) {
      const datetime = new Date(0);
      datetime.setUTCSeconds(pass.risetime);
      const duration = pass.duration;
      console.log(`Next pass at ${datetime} for ${duration} seconds!`);
    }
  }


fetchMyIP()
    .then((result) => {
        const ip = JSON.parse(result).ip;
        return fetchCoords(ip);
    })
    .then((result) => {
        const data = JSON.parse(result);
        const {latitude, longitude} = data;
        return fetchPasses({latitude, longitude});
    })
    .then((result) => {
        const data = JSON.parse(result);
        const passes = data.response;
        printPasses(passes);
    })
    .catch((error) => {
        console.log("tyopeOf error = ", typeof error);
        console.log(error);
    })