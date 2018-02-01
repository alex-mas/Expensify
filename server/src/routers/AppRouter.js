/* React */
import React from 'react';
import ReactDOM from 'react-dom';

/* External components*/
import { BrowserRouter, Route, Switch} from 'react-router-dom'

/* Custom components */
import Header from './../components/header';
import Dashboard from './../components/dashboard';
import EditExpensePage from './../components/editExpense';
import CreateExpensePage from './../components/createExpense';
import HelpPage from './../components/help';
import ErrorNotFound from './../components/notFound';





const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path="/" component={Dashboard} exact={true} />
                <Route path="/create" component={CreateExpensePage} />
                <Route path="/edit/:id" component={EditExpensePage} />
                <Route path="/help" component={HelpPage} />
                <Route component={ErrorNotFound} />
            </Switch>
        </div>
    </BrowserRouter>
);


export default AppRouter;