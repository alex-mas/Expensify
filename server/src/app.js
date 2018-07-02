import moment from 'moment';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import AppRouter,{history} from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense, _addExpense, setInitialExpenses } from './actions/expenses';
import {login, logout } from './actions/auth';
import {resetExpenses} from './actions/expenses';
import getVisibleExpenses from './selectors/expenses';
import { database } from './firebase/firebase';
import {firebase} from './firebase/firebase';
import LoadingScreen from './components/loadingScreen';
import 'normalize.css';
import './styles/styles.scss';

//app initialization
const appRoot = document.getElementById('app');
const store = configureStore();
const App = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

//prevents app from being rendered twice
let hasRendered = false;
const renderApp =()=>{
    if(!hasRendered){
        ReactDOM.render(App, appRoot);
        hasRendered = true;
    }
}


//renders a loading screen until the full page is able to be loaded
ReactDOM.render(<LoadingScreen/>, appRoot);


//We dispatch login and logout here to account for implicit login actions such as when user first enters the page
firebase.auth().onAuthStateChanged((user)=>{
    if(user){
        store.dispatch(login(user.uid));
        store.dispatch(setInitialExpenses()).then(() => {
            renderApp();
            if(history.location.pathname === '/'){
                history.push('/dashboard')
            }
            
        });
    }else{
        store.dispatch(logout());
        store.dispatch(resetExpenses());
        renderApp();
        history.push('/');
    }
});

