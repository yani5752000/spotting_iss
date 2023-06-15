const request = require("request");

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) { 
    // use request to fetch IP address from JSON API
    const url = "https://api.ipify.org/?format=json";
    request(url, (error, response, body) => {
        //console.log('error:', error); // Print the error if one occurred
        if(error) {
            callback(error, null);
            return;
        }

        if(response.statusCode != "200"){
            const message = `returned the status code ${response.statusCode} when 
            fetching IP. Response: ${response}`
            callback(Error(message), null);
            return;
        }

        const data = JSON.parse(body);
        
        callback(null, data.ip);
      });
  }

const fetchCoordsByIP = function(ip, callback) { 
        // use request to fetch IP address from JSON API
        const url = "https://ipwho.is/" + ip;
        request(url, (error, response, body) => {
        //console.log('error:', error); // Print the error if one occurred
        if(error) {
            callback(error, null);
            return;
        }

        if(response.statusCode != "200"){
            const message = `returned the status code ${response.statusCode} when 
            fetching IP. Response: ${response}`
            callback(Error(message), null);
            return;
        }

        const data = JSON.parse(body);

        if(!data.success){
            const message = `Success status was ${data.success}. Server message says: ${data.message} when fetching for IP ${data.ip}`;
            callback(Error(message), null);
            return;
        }

        // 
        const {latitude, longitude} = data;

        callback(null, {latitude, longitude});
        });
    }

  /**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
    const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
    request(url, (error, response, body) => {
        if(error) {
            callback(error, null);
            return;
        }

        if(response.statusCode != "200"){
            // const message = `returned the status code ${response.statusCode} when 
            // fetching flyover times. ${body}`
            callback(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`, null);
            return;
        }
        const data = JSON.parse(body);
        
        callback(null, data.response);
    });
};

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */ 
const nextISSTimesForMyLocation = function(callback) {
    fetchMyIP((error, ip) => {
        if (error) {
          console.log("It didn't work!" , error);
          return;
        }
      
        fetchCoordsByIP(ip, (error, coordinates) => {
          if (error) {
              console.log("Fetching the coordinates did not work!", error);
              return;
          }
      
          fetchISSFlyOverTimes(coordinates, (error, results) => {
            if (error) {
                console.log("Fetching the flyover times did not work!", error);
                return;
            }

            callback(null, results);

            // for(result of results) {
            //     const date_time = new Date(result.risetime);
            //     console.log(`Next pass at ${date_time} for ${result.duration} seconds!`);
            // }
            
          })
        })
      });
      
  }
  
  
  module.exports = { nextISSTimesForMyLocation };