import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import toJSON from 'enzyme-to-json';
import {shallow} from 'enzyme';
import {LoginPage} from '../../components/login';


describe('Header component unit tests', function(){
    test('should render header correctly',()=>{
        const wrapper = shallow(<LoginPage/>);
        expect(wrapper).toMatchSnapshot();
    });

    test('should call startLogOut on button click',function(){
        const startLogin = jest.fn();
        const wrapper = shallow(<LoginPage startLogin={startLogin}/>);
        wrapper.find('button').simulate('click');
        expect(startLogin).toHaveBeenCalled();
    });
});
