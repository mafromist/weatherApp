const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const path = require("path");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
require("dotenv").config();

const indexRouter = require('./routes/indexRouter');
const weatherRouter = require('./routes/weatherRouter');
const errRouter = require('./routes/errRouter');

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.engine(
  "hbs",
  hbs({
    extname: ".hbs",
  })
);

app.set("view engine", ".hbs");

app.use("/", indexRouter);
app.use("/weather", weatherRouter);
app.use("*", errRouter);

app.get("*", (req, res) => {
  res.render("404");
});

app.listen(3000, () => {
  console.log("Listening to port 3000");
});
