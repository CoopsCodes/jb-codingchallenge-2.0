const express = require("express");
const axios = require("axios").default;
const app = express();
const port = 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const key1 = process.env.API_KEY1;
const url = `http://api.openweathermap.org/data/2.5/weather?q=Melbourne,Australia&appid=7627c7ef2c6d05dc55f2076ceae3b282`;

// app.post("/", (req, res) => {
//   const url = `http://api.openweathermap.org/data/2.5/weather?q=${req.body.city},${req.body.country}${key1}`;
//   console.log(req.body);
// });

app.get("/", (req, res) => {
  axios
    .get(url)
    .then(res => {
      console.log("Axios response", res.data);
      return res.data;
    })
    .catch(error => {
      console.log("error", error);
    });
  // const url = `http://api.openweathermap.org/data/2.5/weather?q=${req.body.city},${req.body.country}${key1}`;
});

// app.get("http://localhost:3000", (req, res) => {
//   const url = "http://api.openweathermap.org/data/2.5/weather?q=";
//   const key1 = process.env.API_KEY1;
//   const key2 = process.env.API_KEY2;
//   const key3 = process.env.API_KEY3;
//   const key4 = process.env.API_KEY4;
//   const key5 = process.env.API_KEY5;

//   const locationData = (url1, city, country, key) => {
//     let newUrl = url1 + city + "," + country + key1;
//     return newUrl;
//   };

//   const apiUrl = locationData(url, city, country, key);

//   axios.get(apiUrl).then(res => {
//     console.log("Axios response", res.data);
//   });
// });

app.listen(port, err => {
  if (err) {
    console.log(err);
  }
  console.log("Listening on port " + port);
});
