import React from 'react';
import ExpenseList from "./expenseList";
import ExpenseListFilters from './expenseListFilters';

const Dashboard = (props) => {
    return (
    <div>
        <h1>Hello world</h1>
        <ExpenseListFilters/>
        <ExpenseList />
    </div>
    );
}

export default Dashboard;