const express = require("express");
const rateLimit = require("express-rate-limit");
const fetch = require("node-fetch");
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

app.get('/', (req, res) => {
  res.send('Oh hai Mark, I didnt see you there')
})

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: {
    error: "Too many requests"
  }
});

// the get request processing the URL request
app.get("/weather", cors(), limiter, async (req, res, next) => {
  let city = req.query.city;
  let country = req.query.country;
  let keyParam = req.query.key
  switch (keyParam) {
    case "KEY1":
      key = process.env.API_KEY1
      break;
    case "KEY2":
      key = process.env.API_KEY2
      break;
    case "KEY3":
      key = process.env.API_KEY3
      break;
    case "KEY4":
      key = process.env.API_KEY4
      break;
    case "KEY5":
      key = process.env.API_KEY5
      break;
    default:
      key = "NA"
  }
  // console.log('key', key)
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}${key}`;
  const fetchData = fetch(url)
    .then(res => res.json())
    .then(data => {
      res.send({ data });
    })
    .catch(err => {
      console.log('Error', err)
      res.send({ err })
    });
  return fetchData
})

app.listen(port, err => {
  if (err) {
    console.log(err);
  }
  console.log("Listening on port " + port);
});
