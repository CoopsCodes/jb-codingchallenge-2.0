const express = require("express");
const fetch = require("node-fetch");
const moment = require("moment");
const cors = require("cors");
const app = express();
const port = 5000;

// .env use to abstract the keys
const dotenv = require("dotenv");
const result = dotenv.config();
if (result.error) {
  throw result.error;
}
const { parsed: envs } = result;
module.exports = envs;

// express initialisation
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Default unused homepage
app.get("/", (req, res) => {
  res.send("Oh hai Mark, I didnt see you there");
});

// apiKeyStore is passing the Keys through and assigning each a counter and an initial call time adding an hour to signify the time it is able to be called again.
const apiKeyStore = {};
exceededApiUsage = key => {
  const now = moment().format("LLL")

  if (apiKeyStore[key] === undefined) {
    apiKeyStore[key] = {
      count: 0,
      timeout: moment().add(15, "seconds").format("LLL")
    }
  }

  // checking if the count is greather than 5 and the time has lapsed resetting the counter and timer
  if (apiKeyStore[key].count >= 5 && apiKeyStore[key].timeout < now) {
    apiKeyStore[key] = {
      count: 0,
      timeout: moment().add(15, "seconds").format("LLL")
    }
  }

  if (apiKeyStore[key].count >= 5) {
    // States the counter is greater than 5 and therefore cant be called
    return true;
  } else {
    // Finally stating the counter isnt over its limit and increments the counter
    apiKeyStore[key].count += 1;
    console.log(apiKeyStore[key])
    return false;
  }
}

// the get request processing the URL request
app.get("/weather", async (req, res, next) => {
  let city = req.query.city;
  let country = req.query.country;
  let keyParam = req.query.key;
  // Keys are assigned and passes through the Switch statement assigning the private keys in the env file.  This was not required as the keys are public and not dangerous, but i wanted to demonstrate this fro security reasons.
  switch (keyParam) {
    case "KEY1":
      key = process.env.API_KEY1;
      break;
    case "KEY2":
      key = process.env.API_KEY2;
      break;
    case "KEY3":
      key = process.env.API_KEY3;
      break;
    case "KEY4":
      key = process.env.API_KEY4;
      break;
    case "KEY5":
      key = process.env.API_KEY5;
      break;
    default:
      key = "NA";
  }
  // This checks the True/False statement to check if the keys have been used and returns the 429 Status
  if (exceededApiUsage(key)) {
    res.status(429).send({ err: "Exceeded API Usage Amount" });
    return;
  }

  // Fetch is making the call wiht the data send from the front end form, appending the correct key after running all the logic and sending it back to the Website.
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}${key}`;
  const fetchData = fetch(url)
    .then(res => res.json())
    .then(data => {
      res.send({ data });
    })
    .catch(err => {
      console.log(err);
      res.send({ err: "Exceeded API Usage Amount" });
    });
  return fetchData;
});

// This is ExpressJS running the server
app.listen(port, err => {
  if (err) {
    console.log(err);
  }
  console.log("Listening on port " + port);
});
