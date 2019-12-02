const express = require("express");
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

// .env key allocations
const key1 = process.env.API_KEY1;
const key2 = process.env.API_KEY2;
const key3 = process.env.API_KEY3;
const key4 = process.env.API_KEY4;
const key5 = process.env.API_KEY5;

app.get('/', (req, res) => {
  res.send('Oh hai Mark, I didnt see you there')
})

// the get request processing the URL request
app.get("/weather", cors(), async (req, res) => {
  let city = req.query.city;
  let country = req.query.country;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}${key1}`;
  const fetchData = fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log('res data', data)
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
