const express = require("express");
const router = express.Router();

const getWeather = require("../lib/getWeather");
const convertTime = require("../lib/convertTime");

router.get("/:CITY/:CODE", async (req, res) => {
  let city = req.params.city;
  let code = req.params.code;
  const data = await getWeather(CITY, CODE);

  if (data.cod == "404") {
    res.render("weather", {
      err: "The provided location doesn't exist",
    });
    return;
  }

  const name = data.name;
  const description = data.weather[0].description;
  const temp = `${Math.floor(data.main.temp)}°C`;
  const feels_like = `Feels like ${data.main.feels_like}°C`;
  const wind = `${data.wind.speed} meter/sec`;
  const sunrise = convertTime(data.sys.sunrise);
  const sunset = convertTime(data.sys.sunset);

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
    let code = req.body.code;
  const data = await getWeather(city, code);

  if (data.cod == "404") {
    res.render("weather", {
      err: "The provided location doesn't exist",
    });
    return;
  }
  const name = data.name;
  const description = data.weather[0].description;
  const temp = `${Math.floor(data.main.temp)}°C`;
  const feels_like = `Feels like ${data.main.feels_like}°C`;
  const wind = `${data.wind.speed} meter/sec`;
  const sunrise = convertTime(data.sys.sunrise);
  const sunset = convertTime(data.sys.sunset);

  res.render("weather", {
    name,
    data1: { temp, description, feels_like },
    data2: { wind, sunrise, sunset },
    listExists: true,
  });
});

module.exports = router;
