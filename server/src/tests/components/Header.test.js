import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import toJSON from 'enzyme-to-json';
import {shallow} from 'enzyme';
import Header from '../../components/header';


describe('Header component unit tests', function(){
    test('should render header correctly',()=>{
        const wrapper = shallow(<Header/>);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('h1').length).toBe(1);
        expect(wrapper.find('h1').text()).toBe('Expensify App');
        /*const renderer = new ReactShallowRenderer();
        renderer.render(<Header/>);
        expect(renderer.getRenderOutput()).toMatchSnapshot();*/
    });
});
