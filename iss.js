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


  
  
  module.exports = { fetchMyIP, fetchCoordsByIP };