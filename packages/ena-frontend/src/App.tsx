import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Expenses from './features/expenses/Expenses';

import './App.css';

function App() {
  return (
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
  );
}

export default App;
