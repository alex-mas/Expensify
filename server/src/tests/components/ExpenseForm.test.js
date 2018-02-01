import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/expenseForm';
import expenses from '../fixtures/expenses';
import moment from 'moment';

describe('ExpenseFrom component tests', function () {
    test('Should render ExpenseForm correctly', () => {
        const wrapper = shallow(<ExpenseForm />);
        expect(wrapper).toMatchSnapshot();
    });
    test('Should render ExpenseForm with data correctly', function () {
        const wrapper = shallow(<ExpenseForm expense={expenses[1]} />);
        expect(wrapper).toMatchSnapshot();
    });

    test('should render error for invalid form submission', function () {
        const wrapper = shallow(<ExpenseForm />);
        expect(wrapper).toMatchSnapshot();
        //simulate simulates an event
        wrapper.find('form').simulate('submit', {
            preventDefault: () => { }
        });
        //wrapper.state(string) takes the string that's the property on the state object. Ex: If we want to query for state.guns then we say --> wrapper.state('guns');
        expect(wrapper.state('submitError').length).toBeGreaterThan(0);
        expect(wrapper).toMatchSnapshot();
    });

    test('should set description on input change', () => {
        const value = "description of the obj"
        const wrapper = shallow(<ExpenseForm />);
        //.at used when there are multiple elements of the same type, we define then which one we want via a number
        wrapper.find('input').at(0).simulate('change', {
            target: { value }
        });
        expect(wrapper.state('description')).toBe(value);
    });
    test('should set note on input change', () => {
        const value = "note of the obj"
        const wrapper = shallow(<ExpenseForm />);
        wrapper.find('textarea').simulate('change', {
            target: { value }
        });
        expect(wrapper.state('note')).toBe(value);
    });
    test('should set amount on valid input change', () => {
        const value = '23.50';
        const wrapper = shallow(<ExpenseForm />);
        wrapper.find('input').at(1).simulate('change', {
            target: { value }
        });
        expect(wrapper.state('amount')).toBe(value);
    });
    test('shouldn\'t set amount on valid input change', () => {
        const value = '12.122';
        const wrapper = shallow(<ExpenseForm />);
        wrapper.find('input').at(1).simulate('change', {
            target: { value }
        });
        expect(wrapper.state('amount')).not.toBe(value);
        expect(wrapper.state('amount')).toBe('');
    });

    test('should call onSubmit prop for valid form submission',()=>{
        //this creates an spy, which will provide some utilities to check what happened inside the execution of the event it is faking
        //for example, with what args have certain functions been called
        const onSubmitSpy = jest.fn();
        const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>);
        wrapper.find('form').simulate('submit', {
            preventDefault: () => { }
        });
        expect(wrapper.state('submitError')).toBe('');
        expect(onSubmitSpy).toHaveBeenLastCalledWith({
            description: expenses[0].description,
            amount: expenses[0].amount,
            note: expenses[0].note,
            createdAt: expenses[0].createdAt
        });
    });

    test('should set new date onn date change',()=>{
        const now = moment();
        const wrapper = shallow(<ExpenseForm />);
        wrapper.find('SingleDatePicker').prop('onDateChange')(now);
        expect(wrapper.state('createdAt')).toEqual(now);
        
    });
    test('should set calendar focus on change',()=>{
        const focused = true;
        const wrapper = shallow(<ExpenseForm />);
        wrapper.find('SingleDatePicker').prop('onFocusChange')({focused});
        expect(wrapper.state('calendarFocused')).toEqual(focused);
    });
});

