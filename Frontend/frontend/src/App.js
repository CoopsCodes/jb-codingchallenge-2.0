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
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // async api call, async to ensure responses are handles if there is a delay
  async callApi() {
    try {
      const response = await axios.get("http://localhost:5000/weather", {
        params: {
          city: this.state.city,
          country: this.state.country,
          key: this.state.key
        }
      })
      if (response.data.data.cod !== 200) {
        return alert(response.data.data.message)
      } else {
        this.setState({ weather: response.data })
      }
    } catch (err) {
      console.log(err)
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    // get our form data out of state
    this.callApi()
  }

  render = () => {
    const { weather } = this.state;
    console.log('weather', weather)
    return (
      <div>
        <div className="App">
          <h1>Weather Search</h1>
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
                <option>
                  Select a key from the list below
              </option>
                <option value="KEY1">Key 1</option>
                <option value="KEY2">Key 2</option>
                <option value="KEY3">Key 3</option>
                <option value="KEY4">Key 4</option>
                <option value="KEY5">Key 5</option>
              </select>
            </label>
            <input type="submit" value="Submit" />
          </form>
          <div>
            {/* Display here */}
            {/* <h1>Weather Response</h1> */}
            {
              weather.length === 0
                ? <p>Search:</p>
                : <ul>
                  <p>Results:</p>{weather.data.weather.map(w => <li key={w.id}>{w.description}</li>)}
                </ul>
            }
          </div>
        </div>
      </div>
    )
  }
}
export default App;
