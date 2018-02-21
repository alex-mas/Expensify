import React from 'react';
import ExpenseList from "./expenseList";
import ExpenseListFilters from './expenseListFilters';
import ExpensesSummary from './expensesSummary';
import ExpensesChart from './expensesChart';

const Dashboard = (props) => {
    return (
        <div>
            <ExpensesSummary />
            <ExpenseListFilters />
            <ExpenseList />
            <ExpensesChart/>
        </div>
    );
}

export default Dashboard;