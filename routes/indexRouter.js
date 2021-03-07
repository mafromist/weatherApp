const express = require("express");
const router = express.Router();

const getWeather = require("../lib/getWeather");
const convertTime = require("../lib/convertTime");

router.get("/", async (req, res) => {
  const data = await getWeather(process.env.CITY, process.env.CODE);
  const name = data.name;
  const description = data.weather[0].description;
  const temp = `${Math.floor(data.main.temp)}°C`;
  const feels_like = `Feels like ${data.main.feels_like}°C`;
  const wind = `${data.wind.speed} meter/sec`;
  const sunrise = convertTime(data.sys.sunrise);
  const sunset = convertTime(data.sys.sunset);

  res.render("index", {
    name,
    data: { description, temp, feels_like, wind, sunrise, sunset },
  });
});

module.exports = router;
