import React from 'react';
import {shallow } from 'enzyme';
import {ExpenseList} from '../../components/expenseList';
import expenses from '../fixtures/expenses';

describe('ExpenseList component unit tests',function(){
    test('It render ExpenseList with expenses',()=>{
        const wrapper = shallow(<ExpenseList expenses={expenses}/>);
        expect(wrapper).toMatchSnapshot();
    });

    test('Should render ExpenseList without expenses',()=>{
        const wrapper = shallow(<ExpenseList expenses={[]}/>);
        expect(wrapper).toMatchSnapshot();
    })
});