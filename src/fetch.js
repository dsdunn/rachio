//get zones (device)
//start zone, stop zone
//start/stop mulitiple zones

import { apiKey } from './apiKey';

const url = 'https://api.rach.io/1/public/';
const options = (method = 'GET', body) => ({
  method,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`
  },
  body
})

export const getZones = (id) => {
  return fetch(url + 'device/' + id, options())
  .then(response => response.json())
  .then(results => results.zones);
}

export const startZone = (body) => {
  return fetch(url + 'zone/start' , options('PUT', JSON.stringify(body)));
}

export const startAll = (body) => {
  console.log(options("PUT", body))
  return fetch(url + 'zone/start_multiple', options('PUT', JSON.stringify(body)));
}