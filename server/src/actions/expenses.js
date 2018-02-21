import uuid from 'uuid';
import {database} from '../firebase/firebase';


export const resetExpenses = ()=>{
    return {
        type: 'RESET_EXPENSES'
    }
}

export const _addExpense = (expense) => {
    return {
        type: 'ADD_EXPENSE',
        expense
    };
};

export const addExpense = (expenseData = {})=>{
    return (dispatch, getState)=>{
        const uid = getState().auth.uid;
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0
        } = expenseData;
        const expense = {description, note, amount, createdAt};
        return database.ref(`users/${uid}/expenses`).push(expense).then((ref)=>{
        dispatch(_addExpense({
            id: ref.key,
            ...expense
        }));
        });
    };
};

export const _removeExpense = ({ id = '' } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

export const removeExpense = ({id = ''} = {})=>{
    return (dispatch, getState)=>{
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses/${id}`).remove().then(()=>{
            dispatch(_removeExpense({id}));
        }).catch((e)=>console.log(e));
    }
};

export const _editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});


export const editExpense = (id, updates)=>{
    return (dispatch, getState)=>{
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses/${id}`).set(updates).then(()=>{
            dispatch(_editExpense(id,updates));
        }).catch((e)=>{
            console.log(e);
        });
    };
}



export const setExpenses = (expenses)=>{
    return{
        type: 'SET_EXPENSES',
        expenses
    }
};


export const setInitialExpenses = ()=>{
    return (dispatch, getState)=>{
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses`)
        .once('value')
        .then((snapshot) => {
            const expenses = snapshot.val();
            for (let expense in expenses) {
                if (expenses.hasOwnProperty(expense)) {
                    dispatch(_addExpense({
                        id: expense,
                        ...expenses[expense]
                    }));
                }
            }
        })
        .catch((e) => console.log(e));
    };
}