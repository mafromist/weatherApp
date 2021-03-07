const express = require("express");
const router = express.Router();

const getWeather = require("../lib/getWeather");
const convertTime = require("../lib/convertTime");

router.get("/:city", async (req, res) => {
  let city = req.params.city;
  let code = req.params.code;
  let data = await getWeather(city);

  if (data.cod == "404") {
    res.render("weather", {
      err: "The provided location doesn't exist",
    });
    return;
  }

  let name = data.name;
  let description = data.weather[0].description;
  let temp = `${Math.floor(data.main.temp)}°C`;
  let feels_like = `Feels like ${data.main.feels_like}°C`;
  let wind = `${data.wind.speed} meter/sec`;
  let sunrise = convertTime(data.sys.sunrise);
  let sunset = convertTime(data.sys.sunset);

  res.render("weather", {
    name,
    data1: { description, temp, feels_like },
    data2: { wind, sunrise, sunset },
    listExists: true,
  });
});

router.get("/", (req, res) => {
  res.render("weather");
});

router.post("/", async (req, res) => {
  let city = req.body.city;
  let data = await getWeather(city);

  if (data.cod == "404") {
    res.render("weather", {
      err: "The provided location doesn't exist",
    });
    return;
  }
  let name = data.name;
  let description = data.weather[0].description;
  let temp = `${Math.floor(data.main.temp)}°C`;
  let feels_like = `Feels like ${data.main.feels_like}°C`;
  let wind = `${data.wind.speed} meter/sec`;
  let sunrise = convertTime(data.sys.sunrise);
  let sunset = convertTime(data.sys.sunset);

  res.render("weather", {
    name,
    data1: { temp,description,feels_like },
    data2: { wind, sunrise, sunset },
    listExists: true,
  });
});

module.exports = router;
