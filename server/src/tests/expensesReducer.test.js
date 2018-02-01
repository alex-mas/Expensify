import expensesReducer from '../reducers/expenses';
import expenses from './fixtures/expenses';

describe('Expenses reducer related tests',function(){
    test('should set default state',()=>{
        const state = expensesReducer(undefined,{type: '@@INIT'});
        expect(state).toEqual([]);
    });

    test('should remove expense by id',()=>{
        const action = {
            id: expenses[1].id,
            type: 'REMOVE_EXPENSE'
        }
        const state = expensesReducer(expenses,action);
        expect(state).toEqual([expenses[0],expenses[2]]);
    });
    test('should not remove expenses if id is not found',()=>{
        const action = {
            id: '-1',
            type: 'REMOVE_EXPENSE'
        }
        const state = expensesReducer(expenses,action);
        expect(state).toEqual(expenses);
    });

    test('should add an expense',()=>{
        const action = {
            type: 'ADD_EXPENSE',
            expense:{
                id: '109',
                description: 'Laptop',
                note: '',
                createdAt: 20000,
                amount: 29500
            }
        };

        const state = expensesReducer(expenses,action);

        expect(state).toEqual([...expenses, action.expense]);
    });

    test('should edit an expense',()=>{
        const action = {
            type: 'EDIT_EXPENSE',
            id: expenses[1].id,
            updates: {
                amount: 122000
            }
        };
        const state = expensesReducer(expenses,action);
        expect(state[1].amount).toBe(122000);
    });
    test('should not add edit expense if id is not found',()=>{
        const action = {
            type: 'EDIT_EXPENSE',
            id: '-12312',
            updates: {
                amount: 122000
            }
        };
        const state = expensesReducer(expenses,action);
        expect(state).toEqual(expenses);
    });

})
