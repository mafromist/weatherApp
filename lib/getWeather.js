const fetch = require('node-fetch');
require('dotenv').config();

const url = `http://api.openweathermap.org/data/2.5/weather?q=Liverpool&units=metric&appid=${process.env.APPID}`
console.log(url)

const getWeather = async(city, units="metric") => {
    let data = await fetch(url);
    return await data.json();
}


module.exports = getWeather;
