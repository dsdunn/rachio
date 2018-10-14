import React, { Component } from 'react';

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
          </div>
        </section>
      </div>
      )
  }
}

export default App;