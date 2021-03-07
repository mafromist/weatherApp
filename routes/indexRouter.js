const express = require("express");
const router = express.Router();

const getWeather = require("../lib/getWeather");
const convertTime = require("../lib/convertTime");

router.get("/", async (req, res) => {
  let data = await getWeather(process.env.CITY, process.env.CODE)
  let name = data.name;
  let description = data.weather[0].description;
  let temp = `${Math.floor(data.main.temp)}°C`;
  let feels_like = `Feels like ${data.main.feels_like}°C`;
  let wind = `${data.wind.speed} meter/sec`;
  let sunrise = convertTime(data.sys.sunrise);
  let sunset = convertTime(data.sys.sunset);

  res.render("index", { name, data: { description, temp, feels_like, wind, sunrise, sunset } });
});

module.exports = router;
