import React from 'react';
import { shallow } from 'enzyme';
import App from '../components/App';
import getZones from '../fetch';

jest.mock('../fetch')

window.fetch = jest.fn(() => Promise.resolve({'all': 'good'}))

describe.only('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App/>)
  })

  it.skip('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should call getZones on mount', () => {
    expect(getZones).toBeCalled();
  })
})