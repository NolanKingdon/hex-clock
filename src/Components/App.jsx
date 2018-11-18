import React, { Component } from 'react';
import Clock from './Clock/Clock.jsx';

import { createStore } from 'redux';
import { Provider } from "react-redux";

const initialState = {
  hours: "00",
  minutes: "00",
  seconds: "00"
}

function reducer(state = initialState, action) {
  switch(action.type) {
    case "INITIAL_TIME":
      let timeNow = new Date();
      let seconds = timeNow.getSeconds()<10 ? "0" + timeNow.getSeconds() : timeNow.getSeconds();
      let minutes = timeNow.getMinutes()<10 ? "0" + timeNow.getMinutes() : timeNow.getMinutes();
      let hours = timeNow.getHours()<10 ? "0" + timeNow.getHours() : timeNow.getHours();
      let dateDay = timeNow.getDay();
      let dateMonth = timeNow.getMonth();
      let dateYear = timeNow.getFullYear();
      console.log(`${dateYear}`);
      return {
        hours,
        minutes,
        seconds,
        date: `${dateDay}/${dateMonth}/${dateYear}`
      }
    case "INCREMENT_SECONDS":
    let newSeconds = (parseInt(state.seconds) + 1) < 10 ? "0" + (parseInt(state.seconds) + 1).toString() : parseInt(state.seconds) + 1;
      return {
        hours: state.hours,
        minutes: state.minutes,
        seconds: newSeconds,
        date: state.date
      };
    case "INCREMENT_MINUTES":
      let newMinutes = (parseInt(state.minutes) + 1) < 10 ? "0" + (parseInt(state.minutes) + 1).toString() : parseInt(state.minutes) + 1;
      return {
        hours: state.hours,
        minutes: newMinutes,
        seconds: "00",
        date: state.date
      }
    case "INCREMENT_HOURS":
      let newHours = (parseInt(state.hours) + 1) < 10 ? "0" + (parseInt(state.hours) + 1).toString() : parseInt(state.hours) + 1;
      return {
        hours: newHours,
        minutes: "00",
        seconds: "00",
        date: state.date
      }
    case "NEW_DAY":
      timeNow = new Date();
      dateDay = timeNow.getDay();
      dateMonth = timeNow.getMonth();
      dateYear = timeNow.getFullYear();
      return {
        hours: "00",
        minutes: "00",
        seconds: "00",
        date: `${dateDay}/${dateMonth}/${dateYear}`
      }

    default:
      return state;
  }
}

const store = createStore(reducer);

class App extends Component {
  render() {
    return (
      <Provider store = {store}>
        <div style = {{margin: 0, padding: 0}}>
          <Clock />
        </div>
      </Provider>
    );
  }
}

export default App;
