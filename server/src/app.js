
import React from 'react';
import moment from 'moment';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import {addExpense} from './actions/expenses';
import {setTextFilter, setStartDate, setEndDate} from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css';
import './styles/styles.scss';


const store = configureStore();

store.dispatch(addExpense({description: 'renta', amount: 50, createdAt: 15}));

store.dispatch(addExpense({description: 'boats', amount: 150,createdAt: 16}));

store.dispatch(addExpense({description: 'bitches', amount: 250,createdAt: 18}));

store.dispatch(addExpense({description: 'boats', amount: 2500,createdAt: 23}));
store.dispatch(addExpense({description: 'boats again', amount: 70,createdAt: 24}));
store.dispatch(addExpense({description: 'boats', amount: 15000,createdAt: 27}));

store.dispatch(setTextFilter('boat'));

store.dispatch(setStartDate(moment(0)));
store.dispatch(setEndDate(moment(16)));

setTimeout(()=>{
    store.dispatch(setEndDate(moment(50000)));
},5000)

const state = store.getState();

const appRoot = document.getElementById('app');


const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, appRoot);