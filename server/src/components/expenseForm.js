import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';



/*

Form component that implements the logic to create new expenses and also adds
the logic required to ensure that the input of the form is in line with what
we expect in our data moldel

TL:DR Form to create expenses + input validation/sanitization

*/
export default class ExpenseForm extends React.Component {

    constructor(props){
        super(props);
        const exists = Boolean(props.expense);
        this.state = {
            description: exists ? props.expense.description : '',
            note: exists ? props.expense.note : '',
            //format the property so it matches regexp requirements
            amount: exists ? (props.expense.amount / 100).toString() : '',
            createdAt: exists ? moment(props.expense.createdAt)  : moment(),
            calendarFocused: false,
            submitError: ''
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
        if(createdAt){
            this.setState(() => ({ createdAt }));
        }
       
    };
    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }));
    };
    onSubmit = (e)=>{
        e.preventDefault();
        //check for missing properties
        if(!this.state.description || !this.state.amount){
            this.setState(()=>({
                submitError:'Please provide amount and description before submiting'
            }));
        }else{
            //clear error message as the provided props are correct
            this.setState(()=>({
                submitError:''
            }));
            //pass the event up to the parent element who decides what to do with it
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10)*100,
                createdAt: this.state.createdAt.valueOf(),
                note:this.state.note

            })
            
        }
    }
    /* Component rendering */
    render() {
        return (
            <div>
                {this.state.submitError ?
                <p>{this.state.submitError}</p>
                : undefined}
                <form onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        placeholder="description"
                        autoFocus
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />
                    <input
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
                        placeholder="Add a note for your expense(optional)"
                        value={this.state.note}
                        onChange={this.onNoteChange}
                    >

                    </textarea>
                    <button>Add Expense</button>
                </form>
            </div>
        );
    }
}