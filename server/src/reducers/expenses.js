import cloneDeep from 'lodash.clonedeep';

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

export default expensesReducer;