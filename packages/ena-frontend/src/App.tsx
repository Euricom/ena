import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Expenses from './features/expenses/Expenses';

import './App.css';

function App() {
    return (
        <>
            <header className="app-header">
                <span className="app-header__title">ENA</span>
                <span className="app-header__avatar"></span>
            </header>

            <div className="app-content">
                <Router>
                    <Switch>
                        <Route path="/expenses">
                            <Expenses />
                        </Route>

                        <Route path="*">
                            <Redirect to="expenses" />
                        </Route>
                    </Switch>
                </Router>
            </div>
        </>
    );
}

export default App;
