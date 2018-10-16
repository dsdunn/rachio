import React from 'react';
import { shallow } from 'enzyme';
import App from '../components/App';
import { getZones, startAll } from '../fetch';

jest.mock('../fetch')

window.fetch = jest.fn(() => Promise.resolve({'all': 'good'}))

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App/>)
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should call getZones on mount', () => {
    expect(getZones).toBeCalled();
  })

  it('should update allTimeLeft when editTime is called', () => {
    wrapper.instance().editTime(43);
    expect(wrapper.state('allTimeLeft')).toEqual(43);
  })

  it('should update allOn to false when editTime is called with 0', () => {
    wrapper.setState({
      allOn: true
    })
    expect(wrapper.state('allOn')).toEqual(true);
    wrapper.instance().editTime(0);
    expect(wrapper.state('allOn')).toEqual(false);
  })

  it('should update the state when startOrStopAll is called', () => {
    expect(wrapper.state('allOn')).toEqual(false);
    wrapper.instance().startOrStopAll(true);
    expect(wrapper.state('allOn')).toEqual(true);
    wrapper.instance().startOrStopAll(false);
    expect(wrapper.state('allOn')).toEqual(false);
  })

  it('should call startAll when startOrStopAll is called', () => {
    wrapper.instance().startOrStopAll();
    expect(startAll).toBeCalled();
  })

  it('should return an array of zone divs when populate zones is called', () => {
    const mockZones = [{id: '123', name:'cool'},{id: '456', name:'lame'}];
    const spy = jest.spyOn(wrapper.instance(), 'populateZones')

    expect(wrapper.find('.zone').length).toEqual(1);
    wrapper.setState({zones: mockZones});
    expect(spy).toBeCalled();
    expect(wrapper.find('.zone').length).toEqual(3);
  })
})