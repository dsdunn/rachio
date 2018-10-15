import React, { Component } from 'react';
import Timer from './timer';
import { getZones, startAll } from '../fetch';
import './styles.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      zones: [],
      allTimeLeft: 60,
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

  editTime = (time) => {
    this.setState({
      allTimeLeft: time
    })
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

  render() {
    return (
      <div className='app'>
        <h1>Rachio App</h1>
        <section className='controls'>
          <div className='all-zones-control'>
            <Timer id='master-timer' startOrStopAll={this.startOrStopAll} editTime={this.editTime}/>
          </div>
          {this.populateZones(this.state.zones)}
        </section>
      </div>
    )
  }
}

export default App;