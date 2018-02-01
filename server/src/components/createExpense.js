import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './expenseForm';
import { addExpense } from '../actions/expenses';


export class CreateExpensePage extends React.Component {
    onSubmit = (expense) => {
        //dispastch an event to modify the state
        this.props.addExpense(expense);
        //redirect user back to base route
        this.props.history.push('/');
    }
    render() {
        return (
            <div>
                <h1>Add Expense</h1>
                <ExpenseForm onSubmit={this.onSubmit} />
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        addExpense: (expense) => dispatch(addExpense(expense))
    }
}
export default connect(undefined, mapDispatchToProps)(CreateExpensePage);