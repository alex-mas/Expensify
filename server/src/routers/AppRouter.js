/* React */
import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';

/* External components*/
import { Router, Route, Switch} from 'react-router-dom'

/* Custom components */

import Dashboard from './../components/dashboard';
import EditExpensePage from './../components/editExpense';
import CreateExpensePage from './../components/createExpense';
import HelpPage from './../components/help';
import ErrorNotFound from './../components/notFound';
import LoginPage from './../components/login';
import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoute';

export const history = createHistory();


const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" component={LoginPage} exact={true}/>
                <PrivateRoute path="/dashboard" component={Dashboard} />
                <PrivateRoute path="/create" component={CreateExpensePage} />
                <PrivateRoute path="/edit/:id" component={EditExpensePage} />
                <Route path="/help" component={HelpPage} />
                <Route component={ErrorNotFound} />
            </Switch>
        </div>
    </Router>
);


export default AppRouter;