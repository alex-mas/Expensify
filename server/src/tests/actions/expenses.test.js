import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
    addExpense,
    editExpense,
    removeExpense,
    _addExpense,
    _editExpense,
    _removeExpense,
    setExpenses
} from '../../actions/expenses';
import expenses from './../fixtures/expenses';
import { database } from '../../firebase/firebase';


const uid = 'whateverid';
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);



beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expensesData[id] = { description, note, amount, createdAt };
    });
    database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
});


describe('Expense related actions', () => {
    describe('removeExpense Tests: ', () => {
        test('should properly set up the action object', () => {
            const action = _removeExpense({ id: 'whatever123' });
            expect(action).toEqual({
                id: 'whatever123',
                type: 'REMOVE_EXPENSE'
            });
        });

        test('should remove expense from firebase', (done) => {
            const store = createMockStore(defaultAuthState);
            const id = expenses[2].id;
            store.dispatch(removeExpense({ id })).then(() => {
                const actions = store.getActions();
                expect(actions[0]).toEqual({
                    type: 'REMOVE_EXPENSE',
                    id
                });
                return database.ref(`users/${uid}/expenses/${id}`).once('value');
            }).then((snapshot) => {
                expect(snapshot.val()).toBeFalsy();
                done();
            });
        });
    });
    describe('editExpense Tests: ', () => {
        test('should properly set up the action object', () => {
            const action = _editExpense('whatever123', { note: 'whatever new value' });
            expect(action).toEqual({
                id: 'whatever123',
                type: 'EDIT_EXPENSE',
                updates: {
                    note: 'whatever new value'
                }
            });
        });
        test('should properly edit the expenses of the database', (done) => {
            const store  = createMockStore(defaultAuthState);
            const id = expenses[1].id;
            const editedData = {
                description:'edited rent', 
                amount: 50,
                note: 'this should be changed'
            }
            store.dispatch(editExpense(id,editedData)).then(()=>{
                const actions = store.getActions();
                expect(actions[0]).toEqual({
                    type: 'EDIT_EXPENSE',
                    id,
                    updates: editedData
                });
                return database.ref(`users/${uid}/expenses/${id}`).once('value');
            }).then((snapshot)=>{
                const obj = snapshot.val();
                expect(obj.amount).toBe(editedData.amount);
                expect(obj.description).toBe(editedData.description);
                expect(obj.note).toBe(editedData.note);
                done();
            })
        });
    });
    describe('setExpenses tests: ', () => {
        test('should set expense action object with data', () => {
            const action = setExpenses(expenses);
            expect(action).toEqual({
                type: 'SET_EXPENSES',
                expenses
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
            const action = _addExpense(obj);
            expect(action).toEqual({
                type: 'ADD_EXPENSE',
                expense: {
                    id: undefined,
                    ...obj
                }
            });

        });
        test('Empty constructor should set up default values', () => {
            const action = _addExpense();
            expect(action).toEqual({
                type: 'ADD_EXPENSE',
                expense: undefined
            });
        });

        test('Should properly add expense to the database and store', (done) => {
            const store = createMockStore(defaultAuthState);
            const expenseData = {
                description: 'mouse',
                amount: 3000,
                note: 'this one is better',
                createdAt: 1000
            }
            store.dispatch(addExpense(expenseData)).then((data) => {
                const actions = store.getActions();
                expect(actions[0]).toEqual({
                    type: 'ADD_EXPENSE',
                    expense: {
                        id: expect.any(String),
                        ...expenseData
                    }
                });
                database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value').then((snapshot) => {
                    expect(snapshot.val()).toEqual(expenseData);
                    done();
                });

            });
        });
    });
});