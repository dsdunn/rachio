import React, { Component } from 'react';

class Timer extends Component {
  constructor(props){
    super(props);
    this.state = {
      running: false,
      remaining: 30,
      intervalId: ''
    }
  }

  countDown = () => {
    console.log('started')
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

  timeToSeconds = (time) => {

  }

  //pause: putDuration(0) unpause: putDuration(this.state.remaining) reset: putDuration(0) setState({remaining: 0})

  handleChange = (event) => {
    this.setState({
      remaining: parseInt(event.target.value)
    })
  }

  startOrStop = (event) => {
    let running = !this.state.running;

    this.setState({
      running
    }) 
    if (running) {
      this.countDown();
    } else {
      this.setState({
        remaining: 30
      })
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
          <label htmlFor='timer-remaining'>hours</label>
          <input className='timer-set-time' defaultValue={timeRemaining} placeholder='h:mm'/>
          <div className='timer-countdown-display'>{timeRemaining}</div>
          <div className='timer-adjust-buttons'>
            <div className='timer-add-minute' onClick={() => this.adjustMinutes(60)}>+</div>
            <div className='timer-subtract-minute' onClick={() => this.adjustMinutes(-60)}>-</div>
          </div>
        </div>
      )
  }
}
export default Timer;