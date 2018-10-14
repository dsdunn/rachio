import React, { Component } from 'react';
import Timer from './timer';

class App extends Component {
  constructor(){
    super();
    this.state = {
      allTimeLeft: 0,
      allOn: false
    }
  }
  render() {
    return (
      <div className='app'>
        <h1>Rachio App</h1>
        <section className='controls'>
          <div className='all-zones-control'>
            <Timer/>
          </div>
        </section>
      </div>
      )
  }
}

export default App;