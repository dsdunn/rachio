import React, { Component } from 'react';
import { startZone } from '../fetch';

class Timer extends Component {
  constructor(props){
    super(props);
    this.state = {
      running: false,
      remaining: 60,
      intervalId: ''
    }
  }

  countDown = () => {
    let intervalId = setInterval(() => {
      this.setState({
        remaining: this.state.remaining - 1
      });
      if (this.state.remaining === 0) {
        this.stopCountdown();
      }
    }, 1000)

    this.setState({
      intervalId
    })

  }

  stopCountdown = () => {
    clearInterval(this.state.intervalId)
    this.setState({
      running: false
    })
  }

  secondsToTime = (totalSeconds) => {
    let seconds = totalSeconds % 60 < 9 ? '0' + totalSeconds % 60 : totalSeconds % 60;
    let minutes = (totalSeconds - seconds) / 60;
    let hours;

    if (minutes > 59) {
      let minLeft = minutes % 60;

      hours = (minutes - minLeft) / 60;
      minutes = minLeft;
    } if (minutes < 10) {
      minutes = '0' + minutes;
    }
    return hours ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
  }

  handleChange = (event) => {
    this.setState({
      remaining: parseInt(event.target.value) * 60
    })
  }

  startOrStop = (event) => {
    if(this.props.id === 'master-timer') {
      this.props.startAll();
    }
    let running = !this.state.running;

    this.setState({
      running
    }) 
    if (running) {
      startZone({id: this.props.id , duration: this.state.remaining})
      .then(this.countDown())
    } else {
      this.setState({
        remaining: 60
      })
      startZone({id: this.props.id, duration: 0});
      this.stopCountdown();
    }
  }

  adjustMinutes = (addition) => {
    let remaining = this.state.remaining + addition;
    this.setState({
      remaining
    })
  }

  render() {
    let timeRemaining = this.secondsToTime(this.state.remaining);

    return (
        <div className='timer'>
          <button className='timer-start-button' onClick={this.startOrStop}></button>
          <label htmlFor='timer-remaining'>set timer in minutes</label>
          <input className={`timer-set-time timer-countdown-display ${this.state.running ? 'hidden' : ''}`} type='number' min='0' max='180' value={this.state.remaining / 60} onChange={this.handleChange}/>
          <span className={`timer-countdown-display ${!this.state.running ? 'hidden' : ''}`}>{timeRemaining}</span>
          {/*<form name="edit-time" className='timer-adjust-buttons'>
            <input className='timer-add-minute' />
            <div className='timer-subtract-minute' onClick={() => this.adjustMinutes(-60)}>-</div>
          </form>*/}
        </div>
      )
  }
}
export default Timer;