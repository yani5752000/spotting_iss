const request = require('request-promise-native');


const fetchMyIP = () => {
    const url = "https://api.ipify.org/?format=json";
    return request(url);
}
const fetchCoords = (ip) => {
    const url = "https://ipwho.is/" + ip;
    return request(url);
}
const fetchPasses = (coords) => {
    const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
    return request(url);

}


module.exports = {fetchMyIP, fetchCoords, fetchPasses};