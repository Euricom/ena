import React from 'react';
import { useHistory } from 'react-router-dom';

function Overview() {
    const history = useHistory();

    const items = Array(10)
        .fill(null)
        .map((value, index) => index.toString());

    function expenseClick(id: string) {
        history.push(`/expenses/${id}`);
    }

    return (
        <>
            <h1>Expenses Overview Component</h1>

            <ul>
                {
                    items && items.map(item => (
                        <li key={item} onClick={() => expenseClick(item)}>{item}</li>
                    ))
                }
            </ul>
        </>
    );

}

export default Overview;
