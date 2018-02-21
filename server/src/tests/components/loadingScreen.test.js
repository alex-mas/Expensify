import React from 'react';
import toJSON from 'enzyme-to-json';
import {shallow} from 'enzyme';
import LoadingScreen from '../../components/loadingScreen.js';


describe('ErrorNotFound component unit tests', function(){
    test('should render ErrorNotFound correctly',()=>{
        const wrapper = shallow(<LoadingScreen/>);
        expect(wrapper).toMatchSnapshot();
    });
});
