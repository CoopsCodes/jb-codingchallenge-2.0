const express = require("express");
const axios = require("axios");
var cors = require('cors');
const app = express();
const port = 5000;

// .env use to abstract the keys
const dotenv = require('dotenv');
const result = dotenv.config();
if (result.error) {
  throw result.error;
}
const { parsed: envs } = result;
module.exports = envs;

// express initialisation
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

// .env key allocations
const key1 = process.env.API_KEY1;
const key2 = process.env.API_KEY2;
const key3 = process.env.API_KEY3;
const key4 = process.env.API_KEY4;
const key5 = process.env.API_KEY5;

// the get request processing the URL request
app.get("/", cors(), async (req, res) => {
  let city = req.query.city;
  let country = req.query.country
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}${key1}`;
  axios.get(url)
    .then(res => {
      console.log('get response', res.data.weather)
      return res.data.weather
    })
    .catch(error => {
      console.log("error", error);
    })
})

app.listen(port, err => {
  if (err) {
    console.log(err);
  }
  console.log("Listening on port " + port);
});
