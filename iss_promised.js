const request = require('request-promise-native');


const fetchMyIP = () => {
    const url = "https://api.ipify.org/?format=json";
    return request(url);
}
const fetchCoords = (body) => {
    const ip = JSON.parse(body).ip;
    const url = `https://ipwho.is/${ip}`;
    return request(url);
}
const fetchPasses = (body) => {
    const {latitude, longitude} = JSON.parse(body)
    const url = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
    return request(url);
}

const nextISSTimesForMyLocation = () => {
    return fetchMyIP()
    .then(result => fetchCoords(result))
    .then(result => fetchPasses(result))
    .then(result => {
        const {response} = JSON.parse(result);
        return response;
    })
}


module.exports = { nextISSTimesForMyLocation };