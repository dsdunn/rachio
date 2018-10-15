//get zones (device)
//start zone, stop zone
//start/stop mulitiple zones

import { apiKey } from './apiKey';

const url = 'https://api.rach.io/1/public/';
const options = {
  headers: {
    Authorization: `Bearer ${apiKey}`
  }
}

export const getZones = (id) => {
  return fetch(url + 'device/' + id, options)
  .then(response => response.json())
  .then(results => results.zones.map(zone => ({
    id: zone.id,
    name: zone.name,
    zoneNumber: zone.zoneNumber
  })));
}