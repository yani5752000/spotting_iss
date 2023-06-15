const { nextISSTimesForMyLocation } = require('./iss');


const printPasses = (results) => {
  // for(const result of results) {
  //     const date_time = new Date(result.risetime);
  //     console.log(`Next pass at ${date_time} for ${result.duration} seconds!`);
  // }
  for (const pass of results) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
}

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPasses(passTimes);
});