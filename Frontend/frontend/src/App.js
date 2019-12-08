import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      country: "",
      key: "",
      weather: [],
      icon: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Assigning the names and values of each form element, re-renders as form is filled out so state will always represent what is in the form
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // Async API call, async to ensure responses are handles if there is a delay.
  async callApi() {
    try {
      // Response is calling the back-end server endpoint on /weather and passing in query params from the form
      const response = await axios.get("http://localhost:5000/weather", {
        params: {
          city: this.state.city,
          country: this.state.country,
          key: this.state.key
        }
      });
      // This is checking for a response that isnt 200 'OK' and popping that message up on screen as an alert.
      if (response.data.data.cod !== 200) {
        return alert(response.data.data.message);
      } else {
        // Else we are setting the OK response to state.
        this.setState({
          weather: response.data,
          icon: response.data.data.weather.map(m => m.icon)
        });
      }
      // console.log("GET response", response);
    } catch (err) {
      return alert(
        `${err}.\n\nIf Error 429, your Key has been used too many times.\n\nA list of status codes can be found here.\n\nhttps://en.wikipedia.org/wiki/List_of_HTTP_status_codes`
      );
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    // This is invoking the API call when ever the form is submitted
    this.callApi();
  }

  render = () => {
    const { weather, icon } = this.state;
    return (
      <div className="App">
        <div>
          <h1>Weather Search</h1>
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="formFields">
              <input
                type="text"
                name="city"
                placeholder="City"
                onChange={this.handleChange}
                required
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                onChange={this.handleChange}
                required
              />
            </div>
            <label>
              Key Selection
              <select name="key" onChange={this.handleChange}>
                <option>Select a key from the list</option>
                <option value="KEY1">Key 1</option>
                <option value="KEY2">Key 2</option>
                <option value="KEY3">Key 3</option>
                <option value="KEY4">Key 4</option>
                <option value="KEY5">Key 5</option>
              </select>
            </label>
            <input className="submitButton" type="submit" value="Search" />
          </form>

          {/* Displaying the weather data from state, Mapping is used because it can often be part of an array */}
          <div className="responseContainer">
            <h1>Weather Response</h1>
            <div className="searchResponse">
              {weather.length === 0 ? (
                <br />
              ) : (
                <ul>
                  {weather.data.weather.map(w => (
                    <li key={w.id}>{w.description}</li>
                  ))}
                </ul>
              )}
              <div className="responseIcons">
                {icon === "" ? null : (
                  <img
                    alt="Weather Icon"
                    src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
}
export default App;
