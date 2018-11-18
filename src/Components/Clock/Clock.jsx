import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';

class Clock extends Component {

  handleTime(){
    if(parseInt(this.props.hours) === 23 &&
    parseInt(this.props.minutes) === 59 &&
    parseInt(this.props.seconds) === 59){
      this.props.dispatch({type: "NEW_DAY"});
    } else {
      if(parseInt(this.props.seconds) < 59){
        this.props.dispatch({type: "INCREMENT_SECONDS"});
      } else if(parseInt(this.props.seconds) === 59) {
        if(parseInt(this.props.minutes) === 59) {
          this.props.dispatch({type: "INCREMENT_HOURS"});
        } else {
          this.props.dispatch({type: "INCREMENT_MINUTES"});
        }
      }
    }
  }

  componentDidMount(){
    this.props.dispatch({type: "INITIAL_TIME"});
    setInterval(() => this.handleTime(), 1000);
  }

  render(){
    let bgColorHours = this.props.hours;
    let bgColorMinutes = this.props.minutes;
    let bgColorSeconds = this.props.seconds;

    let bgColor = ("#" + bgColorHours + bgColorMinutes + bgColorSeconds);
    return(
      <div className="clock" style = {{backgroundColor: bgColor}}>
        <div className = "clock-face">
          #{this.props.hours}{this.props.minutes}{this.props.seconds}
        </div>
        <div className = "clock-date">
          {this.props.date}
        </div>
      </div>
    )
  }

}


const mapStateToProps = (state) => ({
  seconds: state.seconds,
  minutes: state.minutes,
  hours: state.hours,
  date: state.date
})
export default connect(mapStateToProps)(Clock);
