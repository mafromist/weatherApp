const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const path = require("path");
const fetch = require("node-fetch");
const getMountainView = require("./lib/onecity");

app.use(express.static(path.join(__dirname, "public")));

app.engine(
  "hbs",
  hbs({
    extname: ".hbs",
  })
);

app.set("view engine", ".hbs");

app.get("/", (req, res) => {
  let data = getMountainView();
  res.render("index", {data});
});

app.get("*", (req, res) => {
  res.render("404");
});



/* fetch(
  "api.openweathermap.org/data/2.5/box/city?bbox={bbox}&appid={148d902626954dccada0e8334849a578}",
  { method: 'POST', body: data})
  .then((res) => res.json())
  .then((json) => console.log(json)); */


app.listen(3000, () => {
  console.log("Listening to port 3000");
});
