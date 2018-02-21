import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './expenseListItem';
import selectExpenses from '../selectors/expenses';

export const ExpenseList = (props) => {
    return (
        <div className="content-container">
            <div className="list-header">
                <div className="show-for-mobile">
                    Expenses
                </div>
                <div className="show-for-desktop">
                    Expense
                </div>
                <div className="show-for-desktop">
                    Amount
                </div>
            </div>
            <div className="list-body">
                {
                    props.expenses.length === 0 ? (
                        <div className="list-item list-item--message">
                            <h1>No expenses</h1>
                        </div>
                    ) : (
                            props.expenses.map((expense) => {
                                return <ExpenseListItem key={expense.id} {...expense} />
                            })
                        )
                }

            </div>


        </div>
    )
};


//connect is sort of a middleware that returns the state and embeds it into the react element provided as argument in the concatenated call
//if we want to pull limited properties away from the state we need to define a function inside the first call
//that returns an object with the properties we want


const bootstraper = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters)
    };
}
export default connect(bootstraper)(ExpenseList);

