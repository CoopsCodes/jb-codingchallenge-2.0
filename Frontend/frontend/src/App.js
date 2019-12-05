import React, { Component } from "react";
import axios from "axios";
import "./App.css";
const moment = require("moment");
moment().format();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      country: "",
      key: "",
      weather: [],
      callsMade1: 0,
      callsMade2: 0,
      callsMade3: 0,
      callsMade4: 0,
      callsMade5: 0,
      keyCalls: [],
      lockOutTime1: '',
      lockOutTime2: '',
      lockOutTime3: '',
      lockOutTime4: '',
      lockOutTime5: '',
      timeNow1: '',
      timeNow2: '',
      timeNow3: '',
      timeNow4: '',
      timeNow5: ''
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
      console.log('GET response', response)
    } catch (err) {
      console.log('catch error', err)
      return alert(err)
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.lockOutTime1 === "") {
      this.setState({
        lockOutTime1: moment().add(1, "hour").format("LLL")
      });
    } else if (this.state.lockOutTime2 === "") {
      this.setState({
        lockOutTime2: moment().add(1, "hour").format("LLL")
      });
    } else if (this.state.lockOutTime3 === "") {
      this.setState({
        lockOutTime3: moment().add(1, "hour").format("LLL")
      });
    } else if (this.state.lockOutTime4 === "") {
      this.setState({
        lockOutTime4: moment().add(1, "hour").format("LLL")
      });
    } else if (this.state.lockOutTime5 === "") {
      this.setState({
        lockOutTime5: moment().add(1, "hour").format("LLL")
      });
    }

    if (this.state.key === "KEY1" && this.state.timeNow1 === '') {
      this.setState({ timeNow1: moment().format("LLL") });
    }
    if (this.state.key === "KEY2" && this.state.timeNow2 === '') {
      this.setState({ timeNow2: moment().format("LLL") });
    }
    if (this.state.key === "KEY3" && this.state.timeNow3 === '') {
      this.setState({ timeNow3: moment().format("LLL") });
    }
    if (this.state.key === "KEY4" && this.state.timeNow4 === '') {
      this.setState({ timeNow4: moment().format("LLL") });
    }
    if (this.state.key === "KEY5" && this.state.timeNow5 === '') {
      this.setState({ timeNow5: moment().format("LLL") });
    }
    // if (
    //   (this.state.key === "KEY1" && this.state.callsMade1 <= 4 &&
    //     this.state.lockOutTime1 === "" &&
    //     this.state.timeNow1 === "") ||
    //   (this.state.key === "KEY1" && this.state.callsMade1 <= 4 && this.state.lockOutTime1 > this.state.timeNow1)
    // ) {
    //   this.callApi()
    //   this.setState(state => ({
    //     callsMade1: state.callsMade1 + 1
    //   }));
    // } else {
    //   alert(`You've used all the key allocations on this selection right now`);
    // }

    if (
      (this.state.key === "KEY1" && this.state.callsMade1 <= 4) || (this.state.key === "KEY1" && this.state.callsMade1 <= 4 && this.state.lockOutTime1 > this.state.timeNow1)
    ) {
      this.callApi()
      this.setState(state => ({
        callsMade1: state.callsMade1 + 1
      }));
    } else {
      alert(`You've used all the key allocations on this selection right now please try again after ${this.state.lockOutTime1}`);
    }

    if (
      (this.state.key === "KEY2" && this.state.callsMade2 <= 4) || (this.state.key === "KEY2" && this.state.callsMade2 <= 4 && this.state.lockOutTime2 > this.state.timeNow2)
    ) {
      this.setState(state => ({
        callsMade2: state.callsMade2 + 1
      }));
    } else {
      alert(`You've used all the key allocations on this selection right now please try again after ${this.state.lockOutTime2}`);
    }

    //   if (
    //     (this.state.callsMade3 <= 4 &&
    //       this.state.lockOutTime3 === "" &&
    //       this.state.timeNow3 === "") ||
    //     (this.state.callsMade3 <= 4 && this.state.lockOutTime3 > this.state.timeNow3)
    //   ) {
    //     this.callApi()
    //     this.setState(state => ({
    //       callsMade3: state.callsMade3 + 1
    //     }));
    //   } else {
    //     alert(`You've used all the key allocations on this selection right now`);
    //   }

    //   if (
    //     (this.state.callsMade4 <= 4 &&
    //       this.state.lockOutTime4 === "" &&
    //       this.state.timeNow4 === "") ||
    //     (this.state.callsMade4 <= 4 && this.state.lockOutTime4 > this.state.timeNow4)
    //   ) {
    //     this.callApi()
    //     this.setState(state => ({
    //       callsMade4: state.callsMade4 + 1
    //     }));
    //   } else {
    //     alert(`You've used all the key allocations on this selection right now`);
    //   }

    //   if (
    //     (this.state.callsMade5 <= 4 &&
    //       this.state.lockOutTime5 === "" &&
    //       this.state.timeNow5 === "") ||
    //     (this.state.callsMade5 <= 4 && this.state.lockOutTime5 > this.state.timeNow5)
    //   ) {
    //     this.callApi()
    //     this.setState(state => ({
    //       callsMade5: state.callsMade5 + 1
    //     }));
    //   } else {
    //     alert(`You've used all the key allocations on this selection right now`);
    //   }
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
