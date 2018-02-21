import React from 'react';
import {shallow} from 'enzyme';
import { CreateExpensePage } from '../../components/createExpense';
import expenses from '../fixtures/expenses';


let addExpense, history, wrapper;

beforeEach(()=>{
    addExpense = jest.fn();
    history = {push:jest.fn()};
    wrapper = shallow(<CreateExpensePage addExpense={addExpense} history={history}/>);
})

test('should render CreateExpensePage correctly',()=>{
    expect(wrapper).toMatchSnapshot();
});


test('should handle addExpense',()=>{
    wrapper.find('Connect').prop('onSubmit')(expenses[1]);
    expect(history.push).toHaveBeenLastCalledWith('/dashboard');
    expect(addExpense).toHaveBeenLastCalledWith(expenses[1]);

});