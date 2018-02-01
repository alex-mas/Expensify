import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import toJSON from 'enzyme-to-json';
import {shallow} from 'enzyme';
import ErrorNotFound from '../../components/notFound.js';


describe('ErrorNotFound component unit tests', function(){
    test('should render ErrorNotFound correctly',()=>{
        const wrapper = shallow(<ErrorNotFound/>);
        expect(wrapper).toMatchSnapshot();
    });
});
