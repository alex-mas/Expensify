import React from 'react';
import {shallow } from 'enzyme';
import ExpenseListItem from '../../components/expenseListItem';
import expenses from '../fixtures/expenses';

describe('ExpenseList component unit tests',function(){
    
    test('Should render expenseListItem correctly',()=>{
       const wrapper = shallow(<ExpenseListItem {...expenses[0]}/>);
        expect(wrapper).toMatchSnapshot();
    });
});