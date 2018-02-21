import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './expenseForm';
import { editExpense } from '../actions/expenses';



export class EditExpensePage extends React.Component {
    onSubmit = (expense) => {
        this.props.editExpense(this.props.expense.id, expense);
        this.props.history.push('/dashboard');
    }
    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Edit Expense</h1>
                    </div>
                </div>
                <div className="content-container">
                    <ExpenseForm
                        history={this.props.history}
                        expense={this.props.expense}
                        onSubmit={this.onSubmit}
                        mode={'Edit'}
                    />
                </div>
            </div>
        );
    }
}



const mapDispatchToProps = (dispatch, props) => ({
    editExpense: (id, expense) => dispatch(editExpense(id, expense)),
})

const bootstraper = function (state, props) {
    return {
        //returns the expense if both id matches
        expense: state.expenses.find((expense) => {
            return expense.id === props.match.params.id
        })
    }
}
export default connect(bootstraper, mapDispatchToProps)(EditExpensePage);