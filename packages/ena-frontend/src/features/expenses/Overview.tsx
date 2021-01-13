import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../../components/button/Button';

import './Overview.css';

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
            <header className="header">
                <div className="header__left">
                    <Button icon="add">Add expense</Button>
                </div>

                <div className="header__title">
                    <h1>Expenses</h1>
                </div>

                <div className="header__right">filters</div>
            </header>

            <div className="list">
                {
                    items && items.map(item => (
                        <div className="list__item" key={item} onClick={() => expenseClick(item)}>{item}</div>
                    ))
                }
            </div>
        </>
    );

}

export default Overview;
