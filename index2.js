const { nextISSTimesForMyLocation } = require("./iss_promised");

const printPasses = (passes) => {
    for (const pass of passes) {
      const datetime = new Date(0);
      datetime.setUTCSeconds(pass.risetime);
      const duration = pass.duration;
      console.log(`Next pass at ${datetime} for ${duration} seconds!`);
    }
  }


nextISSTimesForMyLocation()
    .then(passes => {
        printPasses(passes)
    })
    .catch(error => {
        console.log("It did'nt work.", error.message);
    })

