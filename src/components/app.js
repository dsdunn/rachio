import React, { Component } from 'react';
import Timer from './Timer';
import { getZones, startAll } from '../fetch';
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

  componentDidMount() {
    getZones('c96cbfa4-73c2-4bb4-9924-3fb333624862')
    .then(zones => {
      let sortedZones = zones.sort((a,b) => a.zoneNumber - b.zoneNumber);
      let enabledZones = sortedZones.filter(zone => zone.enabled);
      this.setState({zones: enabledZones})
    })
  }

  editTime = (time) => {
    this.setState({
      allTimeLeft: time
    })
    if (time <= 0) {
      this.setState({
        allOn: false,
        allTimeLeft: 0
      })
    }
  }

  startOrStopAll = (running) => {
    if (!running) {
      this.setState({
        allOn: false,
        allTimeLeft: 0
      })
    } else {
      this.setState({
        allOn: true
      })
    }

    let zones = this.state.zones.map(zone => ({
      id: zone.id,
      duration: this.state.allTimeLeft,
      sortOrder: zone.zoneNumber
    }));

    startAll({'zones': zones})
  }

  populateZones = (zones) => {
    return zones.map(zone => {
      return (
        <div id={zone.id} className='zone' key={zone.id}>
          <h3 className='zone-name'>{zone.name}</h3>
          <Timer 
            id={zone.id} 
            allOn={this.state.allOn} 
            allTimeLeft={this.state.allTimeLeft} 
          />
        </div>
      )
    })
  }

  render() {
    return (
      <div className='app'>
        <h1>Control Your Rachio Device</h1>
        <p>Adjust time in minutes and click START to run!</p>
        <section className='controls'>
          <div className='all-zones-control'>
            <div className='zone'>
              <h2 className='zone-name'>All Zones</h2>
              <Timer id='master-timer' startOrStopAll={this.startOrStopAll} editTime={this.editTime}/>
            </div>
          </div>
          <hr/>
          <div className='zones-container'>
            {this.populateZones(this.state.zones)}
          </div>
        </section>
      </div>
    )
  }
}

export default App;