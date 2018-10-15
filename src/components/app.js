import React, { Component } from 'react';
import Timer from './timer';
import { getZones } from '../fetch';
import './styles.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      allTimeLeft: 0,
      allOn: false
    }
  }

getZones = () => {
  getZones('c96cbfa4-73c2-4bb4-9924-3fb333624862')
  .then(result => console.log(result))
}

  render() {
    return (
      <div className='app'>
        <h1 onClick={this.getZones}>Rachio App</h1>
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