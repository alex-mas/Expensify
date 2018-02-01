import { createStore, combineReducers } from 'redux';
import cloneDeep from 'lodash.clonedeep';
import uuid from 'uuid';

const addExpense = (
    {
        description = '',
        note = '',
        amount = 0,
        createdAt = 0
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

const removeExpense = ({ id = '' } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});


const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});


const setStartDate = (date) => ({
    type: 'SET_START_DATE',
    date
});

const setEndDate = (date) => ({
    type: 'SET_END_DATE',
    date
});


const defaultExpensesState = [];
const expensesReducer = (state = defaultExpensesState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [...state, action.expense];
        case 'REMOVE_EXPENSE':
            return [...state].filter(expense => expense.id !== action.id);
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id) {
                    let newObj = cloneDeep(expense);
                    for (var key in action.updates) {
                        if (action.updates.hasOwnProperty(key)) {
                            newObj[key] = cloneDeep(action.updates[key]);
                        }
                    }
                    return newObj;
                } else {
                    return expense;
                }
            })

        default:
            return state;
    }
}

const defaultFiltersState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};
const filterReducer = (state = defaultFiltersState, action) => {
    let newState;
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            newState = cloneDeep(state);
            newState.text = action.text;
            return newState;
        case 'SORT_BY_DATE':
            newState = cloneDeep(state);
            newState.sortBy = 'date';
            return newState;
        case 'SORT_BY_AMOUNT':
            newState = cloneDeep(state);
            newState.sortBy = 'amount';
            return newState;
        case 'SET_START_DATE':
            newState = cloneDeep(state);
            newState.startDate = action.date;
            return newState;
        case 'SET_END_DATE':
            newState = cloneDeep(state);
            newState.endDate = action.date;
            return newState;
        default:
            return state;
    }
}


const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate === 'number' && expense.createdAt >= startDate;
        const endDateMatch = typeof endDate === 'number' && expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a,b)=>{
        switch(sortBy){
            case 'date':
                return a.createdAt < b.createdAt ? 1 : -1;
            case 'amount':
                return a.amount < b.amount ? 1 : -1;
            default:
                return -1;
        }
    });
};

const store = createStore(combineReducers({
    expenses: expensesReducer,
    filter: filterReducer
}));


store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filter);
    console.log(visibleExpenses);
});

const zeroExpense = store.dispatch(addExpense({ description: 'rent', amount: 150, createdAt: 0 }));
const firstExpense = store.dispatch(addExpense({ description: 'rent', amount: 500, createdAt: 2 }));
const secondExpense = store.dispatch(addExpense({ description: 'cofee', amount: 100, createdAt: 3 }));
const nopeExpense = store.dispatch(addExpense({ description: 'putas y barcos with ma ReNt', ammount: 600, createdAt: 11 }));


//store.dispatch(removeExpense({ id: firstExpense.expense.id }));

store.dispatch(editExpense(secondExpense.expense.id, { ammount: 150 }));

store.dispatch(setTextFilter('rEnT'));
store.dispatch(setEndDate(10));
store.dispatch(setStartDate(1));
store.dispatch(setEndDate(15));
store.dispatch(setStartDate(0));
store.dispatch(sortByDate());
store.dispatch(sortByAmount());