import React from 'react';
import { shallow } from 'enzyme';
import  Timer  from '../components/Timer';
import { startZone } from '../fetch';

jest.mock('../fetch');

window.fetch = jest.fn(() => Promise.resolve({'all': 'good'}));

describe('Timer', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Timer allOn={false} allTimeLeft={0} startOrStopAll={jest.fn()}/>);
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should update state when props change', () => {
    expect(wrapper.state('running')).toEqual(false);
    wrapper.setProps({allOn: true});
    expect(wrapper.state('running')).toEqual(true);
  })

  it('should set intervalId in state when countdown is called', () => {
    expect(wrapper.state('intervalId')).toEqual('');
    wrapper.instance().countDown();
    expect(wrapper.state('intervalId')).not.toEqual('');
  })

  it('should setInterval when countDown is called', () => {
    jest.useFakeTimers();
    wrapper.instance().countDown();
    expect(setInterval).toHaveBeenCalledTimes(1);
  })

  it('calls stopCountDown when remaining reaches 0', () => {
    let spy = jest.spyOn(wrapper.instance(), 'stopCountDown');

    wrapper.setState({remaining: 2});
    wrapper.instance().countDown();
    expect(spy).not.toBeCalled();
    jest.advanceTimersByTime(2000);
    expect(spy).toBeCalled();
  })

  it('calls mockEditTime when id is "master-timer"', () => {
    let mockEditTime = jest.fn();

    wrapper.setProps({id: 'master-timer', editTime: mockEditTime});
    wrapper.setState({remaining: 2});
    wrapper.instance().countDown();
    jest.advanceTimersByTime(2000);
    expect(mockEditTime).toBeCalled();
  })

  it('resets state on stopCountDown', () => {
    wrapper.setState({running: true});
    wrapper.instance().stopCountDown();
    expect(wrapper.state('running')).toEqual(false);
    expect(wrapper.state('remaining')).toEqual(0);
  })

  it('updates state when input value changes', () => {
    let spy = jest.spyOn(wrapper.instance(), 'handleChange');

    wrapper.find('.timer-set-time').simulate('change', {target: {value: '2'}})
    expect(wrapper.state('remaining')).toEqual(120);
  })

  it('calls mockEditTime with remaining seconds when id is master-timer and input value changes', () => {
    let mockEditTime = jest.fn();

    wrapper.setProps({editTime: mockEditTime, id: 'master-timer'});
    wrapper.instance().handleChange({target: {value: 1}});
    expect(mockEditTime).toBeCalledWith(60);
  })

  it('reverses value of running when startOrStop is called', () => {
    expect(wrapper.state('running')).toEqual(false);
    wrapper.instance().startOrStop();
    expect(wrapper.state('running')).toEqual(true);
  })

  it('calls stopCountDown from startOrStop when running is true', () => {
    let spy = jest.spyOn(wrapper.instance(), 'stopCountDown');

    wrapper.setState({running: true});
    wrapper.instance().startOrStop();
    expect(spy).toBeCalled();
  })

  it('calls handleMasterStartOrStop from startOrStop when id is "master-timer"',() => {
    let spy = jest.spyOn(wrapper.instance(), 'handleMasterStartOrStop');
    wrapper.setProps({id: 'master-timer'});
    wrapper.instance().startOrStop(true);
    expect(spy).toBeCalled();
  })

  it('calls stopCountDown from handleMasterStartOrStop when running is true', () => {
    let spy = jest.spyOn(wrapper.instance(), 'stopCountDown');

    wrapper.setState({running: true});
    wrapper.instance().handleMasterStartOrStop();
    expect(spy).toBeCalled();
  })

  it('calls startOrStopAll when handleMasterStartOrStop is called', () => {
    let mockStartOfStopAll = jest.fn();

    wrapper.setProps({startOrStopAll: mockStartOfStopAll});
    wrapper.instance().handleMasterStartOrStop();
    expect(mockStartOfStopAll).toBeCalled();
  })
})












