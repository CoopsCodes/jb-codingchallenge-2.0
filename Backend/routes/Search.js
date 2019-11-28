const axios = require("axios").default;

app.get("/search-weather", (req, res) => {
  const url = "http://api.openweathermap.org/data/2.5/weather?q=";
  const key1 = process.env.API_KEY1;
  const key2 = process.env.API_KEY2;
  const key3 = process.env.API_KEY3;
  const key4 = process.env.API_KEY4;
  const key5 = process.env.API_KEY5;

  const locationData = (url1, city, country, key) => {
    let newUrl = url1 + city + "," + country + key1;
    return newUrl;
  };

  const apiUrl = locationData(url, city, country, key);

  axios.get(apiUrl).then(res => {
    console.log("Axios response", res.data);
  });
});
