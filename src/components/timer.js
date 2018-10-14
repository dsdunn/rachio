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

  secondsToTime = (seconds) => {
    
  }

  //pause: putDuration(0) unpause: putDuration(this.state.remaining) reset: putDuration(0) setState({remaining: 0})

  handleChange = (event) => {
    this.setState({
      remaining: parseInt(event.target.value)
    })
  }

  handleClick = (event) => {
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

  render() {
    return (
        <div className='timer'>
          <button className='timer-start-button' onClick={this.handleClick}></button>
          <label htmlFor='timer-remaining'>time remaining</label>
          <input className='timer-set-time' type='time' min='0' value={this.state.remaining} onChange={this.handleChange}/>
          <div className='timer-countdown-display'>{this.state.remaining}</div>
        </div>
      )
  }
}
export default Timer;