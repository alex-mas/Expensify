import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './expenseForm';
import { editExpense } from '../actions/expenses';
import { removeExpense } from '../actions/expenses';


export class EditExpensePage extends React.Component {
    onSubmit = (expense) => {
        this.props.editExpense(this.props.expense.id, expense);
        this.props.history.push('/');
    }
    onRemove = () => {
        this.props.removeExpense({ id: this.props.expense.id });
        this.props.history.push('/');
    }
    render() {
        return (
            <div>
                <ExpenseForm
                    expense={this.props.expense}
                    onSubmit={this.onSubmit}
                />
                {this.props.expense.id ?
                    <button onClick={this.onRemove}>Remove</button> :
                    undefined}

            </div>
        );
    }
}



const mapDispatchToProps  = (dispatch,props) =>({
    editExpense: (id,expense)=> dispatch(editExpense(id,expense)),
    removeExpense: (data)=>dispatch(removeExpense(data))
})

const bootstraper = function (state, props) {
    return {
        //returns the expense if both id matches
        expense: state.expenses.find((expense) => {
            return expense.id === props.match.params.id
        })
    }
}
export default connect(bootstraper,mapDispatchToProps)(EditExpensePage);