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
      weather: []
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
        this.setState({ weather: response.data });
      }
      // console.log("GET response", response);
    } catch (err) {
      return alert(`${err}.\n\nIf Error 429, your Key has been used too many times.\n\nA list of status codes can be found here.\n\nhttps://en.wikipedia.org/wiki/List_of_HTTP_status_codes`);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    // This is invoking the API call when ever the form is submitted
    this.callApi();
  }

  render = () => {
    const { weather } = this.state;
    return (
      <div>
        <div className="App">
          {/* <h1>Weather Search</h1> */}
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="formFields">
              <label>City</label>
              <input
                type="text"
                name="city"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="formFields">
              <label>Country</label>
              <input
                type="text"
                name="country"
                onChange={this.handleChange}
                required
              />
            </div>
            <label>
              Key Selections
              <select name="key" onChange={this.handleChange}>
                <option>Select a key from the list below</option>
                <option value="KEY1">Key 1</option>
                <option value="KEY2">Key 2</option>
                <option value="KEY3">Key 3</option>
                <option value="KEY4">Key 4</option>
                <option value="KEY5">Key 5</option>
              </select>
            </label>
            <input type="submit" value="Submit" />
          </form>

          {/* Displaying the weather data from state, Mapping is used because it can often be part of an array */}
          <div>
            {/* <h2>Weather Response</h2> */}
            {weather.length === 0 ? (
              <p>Search:</p>
            ) : (
                <ul>
                  <p>Results:</p>
                  {weather.data.weather.map(w => (
                    <li key={w.id}>{w.description}</li>
                  ))}
                </ul>
              )}
          </div>
        </div>
      </div>
    );
  };
}
export default App;
