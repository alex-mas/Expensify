import { addExpense, editExpense, removeExpense } from '../actions/expenses';


describe('Expense related actions', () => {
    describe('removeExpense Tests: ', () => {
        test('should properly set up the action object', () => {
            const action = removeExpense({ id: 'whatever123' });
            expect(action).toEqual({
                id: 'whatever123',
                type: 'REMOVE_EXPENSE'
            });
        });
    });
    describe('editExpense Tests: ', () => {
        test('should properly set up the action object', () => {
            const action = editExpense('whatever123', { note: 'whatever new value' });
            expect(action).toEqual({
                id: 'whatever123',
                type: 'EDIT_EXPENSE',
                updates: {
                    note: 'whatever new value'
                }
            });
        });
    });
    describe('addExpense Tests: ', () => {
        test('should properly set up the action object', () => {
            const obj = {
                description: 'string', 
                note: 'whatever new value',
                amount: 150,
                createdAt: 250
            };
            const action = addExpense(obj);
            expect(action).toEqual({
                type: 'ADD_EXPENSE',
                expense: {
                    id: expect.anything(),
                    ...obj
                }
            });

        });
        test('Empty constructor should set up default values',()=>{
            const action = addExpense();
            expect(action).toEqual({
                type: 'ADD_EXPENSE',
                expense:{
                    id: expect.anything(),
                    description: '',
                    note: '',
                    amount: 0,
                    createdAt: 0
                }
            });
        })
    });




});