import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './expenseForm';
import { addExpense } from '../actions/expenses';


export class CreateExpensePage extends React.Component {
    onSubmit = (expense) => {
        this.props.addExpense(expense);
        //redirect user back to base route
        this.props.history.push('/dashboard');
    }
    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Add Expense</h1>
                    </div> 
                </div>
                <div className="content-container">
                    <ExpenseForm onSubmit={this.onSubmit} mode={'Add'} />
                </div>
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