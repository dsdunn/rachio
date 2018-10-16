import React, { Component } from 'react';
import { startZone } from '../fetch';
import { secondsToTime } from '../secondsToTime';

class Timer extends Component {
  constructor(props){
    super(props);
    this.state = {
      running: false,
      remaining: 0,
      intervalId: ''
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.allOn !== this.props.allOn) {
      this.setState({
        running: this.props.allOn,
        remaining: this.props.allTimeLeft
      })
    } 
  }

  countDown = () => {
    let intervalId = setInterval(() => {
      let remaining = this.state.remaining - 1;
      this.setState({
        remaining
      });

      if (this.state.remaining <= 0) {
        this.stopCountDown();
      }

      if (this.props.id === 'master-timer') {
        this.props.editTime(remaining);
      }
    }, 1000)

    this.setState({
      intervalId
    })
  }

  stopCountDown = () => {
    clearInterval(this.state.intervalId)
    this.setState({
      running: false,
      remaining: 0
    })
  }

  handleChange = (event) => {
    let remaining = parseInt(event.target.value) * 60;

    this.setState({
      remaining
    })
    if (this.props.id === 'master-timer') {
      this.props.editTime(remaining);
    }
  }

  startOrStop = (event) => {
    let running = !this.state.running;

    this.setState({
      running
    }) 
    if (this.props.id === 'master-timer') {
      this.handleMasterStartOrStop(running);
      return;
    }
    if (running) {
      startZone({id: this.props.id , duration: this.state.remaining})
      .then(this.countDown())
    } else {
      startZone({id: this.props.id, duration: 0});
      this.stopCountDown();
    }
  }

  handleMasterStartOrStop = (running) => {
    if (running) {  
      this.countDown();
    } else {
      this.stopCountDown();
    }
    this.props.startOrStopAll(running);
  }

  render() {
    let timeRemaining = this.props.allOn ? secondsToTime(this.props.allTimeLeft) : secondsToTime(this.state.remaining);
    let buttonLabel = this.state.running ? 'Reset' : 'Start';

    return (
        <div className='timer'>
          <button className={`timer-start-button ${this.props.allOn ? 'hidden' : ''}`} onClick={this.startOrStop}>{buttonLabel}</button>
          {!this.state.running &&
            <div className='timer-form'>
              <input className='timer-set-time timer-countdown-display' type='number' min='0' max='180' value={this.state.remaining / 60} onChange={this.handleChange}/>
            </div>
          }
          {this.state.running &&
            <span className='timer-countdown-display'>{timeRemaining}</span>
          }
        </div>
      )
  }
}

export default Timer;