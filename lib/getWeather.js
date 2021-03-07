const fetch = require('node-fetch');
require('dotenv').config();

const getWeather = async(city, code, units="metric") => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${code}&units=${units}&appid=${process.env.APPID}`
    let data = await fetch(url);
    return await data.json();
}

module.exports = getWeather;
