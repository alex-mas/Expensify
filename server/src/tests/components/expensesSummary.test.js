import React from 'react';
import {shallow } from 'enzyme';
import {ExpensesSummary} from '../../components/expensesSummary';

describe('ExpensesSummary component unit tests',function(){
    test('Should properly render expenses summary with the data provided',()=>{
        const wrapper = shallow(<ExpensesSummary expenseCount={5} expensesTotal={25000}/>);
        expect(wrapper).toMatchSnapshot();
    });

    test('Should properly render expenses summary displying the error message',()=>{
        const wrapper = shallow(<ExpensesSummary />);
        expect(wrapper).toMatchSnapshot();
    })
});