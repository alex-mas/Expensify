import getExpensesTotal from '../selectors/expensesTotal';
import expenses from './fixtures/expenses';



describe('Expenses total related tests',()=>{
    test('Should return 0 if no expenses are provided',()=>{
        expect(getExpensesTotal()).toBe(0);
        expect(getExpensesTotal([])).toBe(0);
        expect(getExpensesTotal('unexpected spanish iniquisition')).toBe(0);
    });
    test('Should correctly add up a single expense',()=>{
        expect(getExpensesTotal(expenses[0])).toBe(expenses[0].amount);
        expect(getExpensesTotal([expenses[0]])).toBe(expenses[0].amount);
    });
    test('Should correctly add up the value of all expenses',()=>{
        expect(getExpensesTotal(expenses)).toBe(114195);
    });
});