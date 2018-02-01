import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import toJSON from 'enzyme-to-json';
import {shallow} from 'enzyme';
import Dashboard from '../../components/dashboard';


describe('Header component unit tests', function(){
    test('should render header correctly',()=>{
        const wrapper = shallow(<Dashboard/>);
        expect(wrapper).toMatchSnapshot();
    });
});
