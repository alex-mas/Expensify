import React from 'react';
import { Link } from 'react-router-dom'

//remember the amount is in cents not dollars thats why we multiply it by 100
const ExpenseListItem = ({ description, amount, createdAt, dispatch, id, note }) => (
    <div>
        <Link to={`/edit/${id}`}>
            <h3>{description}</h3>
        </Link>
        {note ?
            <p>{note}</p> :
            undefined}
        <p>{amount} - {createdAt}</p>

    </div>
);

export default ExpenseListItem;