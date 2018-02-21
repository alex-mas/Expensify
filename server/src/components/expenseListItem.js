import React from 'react';
import { Link } from 'react-router-dom'
import moment from 'moment';
import numeral from 'numeral';

//The amount is in cents not dollars thats why we multiply it by 100
const ExpenseListItem = (props) => {
    return (
        <Link className="list-item" to={`/edit/${props.id}`}>
            <div>
                <h3 className="list-item__title">{props.description}</h3>
                <span className="list-item__sub-title">
                    {moment(props.createdAt).format("MMMM Do,  YYYY")}
                </span>
            </div>
            <h3 className="list-item__data">{numeral((props.amount / 100)).format('$0,0.00')}</h3>
        </Link>
    )
};

export default ExpenseListItem;