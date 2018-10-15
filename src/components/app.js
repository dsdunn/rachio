import React, { Component } from 'react';
import Timer from './timer';
import { getZones } from '../fetch';
import './styles.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      zones: [],
      allTimeLeft: 0,
      allOn: false
    }
  }

  getZones = () => {
    getZones('c96cbfa4-73c2-4bb4-9924-3fb333624862')
    .then(zones => {
      let sortedZones = zones.sort((a,b) => a.zoneNumber - b.zoneNumber);
      this.setState({zones: sortedZones})
    })
  }

  populateZones = (zones) => {
    return zones.map(zone => {
      return (
        <div id={zone.id} className='zone'>
          <h3 className='zone-name'>{zone.name}</h3>
          <Timer/>
        </div>
        )
    })
  }

  render() {
    return (
      <div className='app'>
        <h1 onClick={this.getZones}>Rachio App</h1>
        <section className='controls'>
          <div className='all-zones-control'>
            <Timer/>
          </div>
          {this.populateZones(this.state.zones)}
        </section>
      </div>
      )
  }
}

export default App;