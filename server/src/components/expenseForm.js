import React from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import { SingleDatePicker } from 'react-dates';
import { removeExpense } from '../actions/expenses';
import 'react-dates/lib/css/_datepicker.css';




//Form to create expenses + input validation/sanitization
export class ExpenseForm extends React.Component {

    constructor(props) {
        super(props);
        const exists = Boolean(props.expense);
        this.state = {
            description: exists ? props.expense.description : '',
            note: exists ? props.expense.note : '',
            //format the property so it matches regexp requirements
            amount: exists ? (props.expense.amount / 100).toString() : '',
            createdAt: exists ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            submitError: '',
            mode: props.mode ? props.mode : 'create'
        };
    }

    /* Event handlers*/
    //listining usually on onChange/onSubmit={methodname} or other change methods provided by third party components
    //for example: onDateChange={methodname} in the case of SingleDatePicker
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    };
    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note }));
    };
    onAmountChange = (e) => {
        const amount = e.target.value;
        //check that the value is either an empty string or a number that can have up to 2 decimals via regexp
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }));
        }
    };
    onDateChange = (createdAt) => {
        //check that user hasn't deleted the date
        if (createdAt) {
            this.setState(() => ({ createdAt }));
        }

    };
    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }));
    };
    onSubmit = (e) => {
        e.preventDefault();
        //check for missing properties
        if (!this.state.description || !this.state.amount) {
            this.setState(() => ({
                submitError: 'Please provide amount and description before submiting'
            }));
        } else {
            //clear error message as the provided props are correct
            this.setState(() => ({
                submitError: ''
            }));
            //pass the event up to the parent element who decides what to do with it
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100,
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note

            })

        }
    }
    onRemove = (e) => {
        e.preventDefault();
        this.props.removeExpense({ id: this.props.expense.id });
        this.props.history.push('/dashboard');
    }
    /* Component rendering */
    render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
                {this.state.submitError ?
                    <p className="form__error">{this.state.submitError}</p>
                    : undefined}
                <input
                    className="text-input"
                    type="text"
                    placeholder="description"
                    autoFocus
                    value={this.state.description}
                    onChange={this.onDescriptionChange}
                />
                <input
                    className="text-input"
                    type="text"
                    placeholder="Amount"
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                />
                <SingleDatePicker
                    date={this.state.createdAt}
                    onDateChange={this.onDateChange}
                    focused={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                />
                <textarea
                    className="text-area"
                    placeholder="Add a note for your expense(optional)"
                    value={this.state.note}
                    onChange={this.onNoteChange}
                >

                </textarea>

                <div className="spaced__content">
                    <button className="button">{this.props.mode} Expense</button>
                    {this.props.mode === 'Edit' ?
                        <button className="button button__link__dark" onClick={this.onRemove} type="button">Remove</button> :
                        undefined}
                </div>




            </form>
        );
    }
}



const mapDispatchToProps = (dispatch, props) => ({
    removeExpense: (data) => dispatch(removeExpense(data))
})

const bootstraper = function (state, props) {
    return state;
}
export default connect(bootstraper, mapDispatchToProps)(ExpenseForm);