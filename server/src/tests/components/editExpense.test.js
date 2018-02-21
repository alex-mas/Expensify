
import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/editExpense';
import expenses from '../fixtures/expenses';

let editExpense, removeExpense, history, wrapper;

beforeEach(() => {
    editExpense = jest.fn();
    removeExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(
        <EditExpensePage
            editExpense={editExpense}
            removeExpense={removeExpense}
            history={history}
            expense={expenses[2]}
        />
    )
});


test('should render EditExpensePage', ()=>{
    expect(wrapper).toMatchSnapshot();
});


test('Should handle  editExpense', ()=>{
    wrapper.find('Connect').prop('onSubmit')(expenses[2]);
    expect(history.push).toHaveBeenLastCalledWith('/dashboard');
    expect(editExpense).toHaveBeenLastCalledWith(expenses[2].id, expenses[2]);
})

