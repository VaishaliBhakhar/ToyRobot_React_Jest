import React from 'react';
import Robo from './Robo';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


configure({adapter: new Adapter()});
describe("Robo challenge", () => {

  let wrapper;
  it('Should disable button report if robot not placed',()=> {
    wrapper = shallow(<Robo/>);
    wrapper.find('[data-testid="input-x"]').simulate('change', {target: {name: 'input-x', value: 0}});
    wrapper.find('[data-testid="input-y"]').simulate('change', {target: {name: 'input-y', value: 0}});
    wrapper.find('[data-testid="select-direction"]').simulate('change', {target: {value: 'North'}});
    expect(wrapper.find('.report').props().disabled).toBe(true);
  })

  it('Should enable move if robot is placed',()=> {
    wrapper = shallow(<Robo/>);
    wrapper.find('[data-testid="input-x"]').simulate('change', {target: {name: 'input-x', value: 0}});
    wrapper.find('[data-testid="input-y"]').simulate('change', {target: {name: 'input-y', value: 0}});
    wrapper.find('[data-testid="select-direction"]').simulate('change', {target: {value: 'North'}});
    wrapper.find('.place').simulate('click');
    expect(wrapper.find('.move').props().disabled).toBe(false);
  })

  it('Place robot at 0 0 North',()=> {
    wrapper = shallow(<Robo/>);
    wrapper.find('[data-testid="input-x"]').simulate('change', {target: {name: 'input-x', value: 0}});
    wrapper.find('[data-testid="input-y"]').simulate('change', {target: {name: 'input-y', value: 0}});
    wrapper.find('[data-testid="select-direction"]').simulate('change', {target: {value: 'North'}});
    wrapper.find('.place').simulate('click');
    wrapper.find('.report').simulate('click');
    expect(wrapper.find('.chip-msg').render().text()).toBe('Robot is at 0 0 North');
  })

  it('Move robot to 0 2 North',()=> {
    wrapper = shallow(<Robo/>);
    wrapper.find('[data-testid="input-x"]').simulate('change', {target: {name: 'input-x', value: 0}});
    wrapper.find('[data-testid="input-y"]').simulate('change', {target: {name: 'input-y', value: 1}});
    wrapper.find('[data-testid="select-direction"]').simulate('change', {target: {value: 'North'}});
    wrapper.find('.move').simulate('click');
    wrapper.find('.report').simulate('click');
    
    expect(wrapper.find('.chip-msg').render().text()).toBe('Robot is at 0 2 North');
  })
  

});

