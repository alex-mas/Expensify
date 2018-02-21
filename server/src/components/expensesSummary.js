import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';
import getExpensesTotal from '../selectors/expensesTotal';
import { Link } from 'react-router-dom';



export const ExpensesSummary = (props) => {
    const expensesWord = props.expensesCount > 1 ? 'expenses' : 'expense';
    const hiddenDescription = props.hiddenExpensesCount > 1 ? ['are', 'expenses', 'them'] : ['is', 'expense', 'it'];
    return (
        <div className="page-header">
            <div className="content-container">
                {
                    props.expensesCount > 0 ? (
                        <h1 className="page-header__title">Viewing <span>{props.expensesCount}</span> {expensesWord} totaling <span>{numeral((props.expensesTotal / 100)).format('$0,0.00')}</span> ({props.hiddenExpensesCount} hidden)</h1>
                    ) : props.hiddenExpensesCount > 0 ?
                            (<h1 className="page-header__title">There {hiddenDescription[0]} <span>{props.hiddenExpensesCount}</span> hidden {hiddenDescription[1]}, change the filters to see {hiddenDescription[2]}</h1>)
                            : (<h1 className="page-header__title">No expenses found, add some to get the party started!</h1>)
                }
                <div className="page-header__actions">
                    <Link className="button" to="/create">Add Expense</Link>
                </div>
            </div>

        </div>
    );
};


//bootstraps data from the state into the component properties
const bootstraper = (state) => {
    const expenses = selectExpenses(state.expenses, state.filters);
    const expensesCount = state.expenses.length;
    return {
        hiddenExpensesCount: expensesCount - expenses.length,
        expensesCount: expenses.length,
        expensesTotal: getExpensesTotal(expenses)
    };
}
export default connect(bootstraper)(ExpensesSummary);

