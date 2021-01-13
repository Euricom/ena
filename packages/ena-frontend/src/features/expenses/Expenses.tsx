import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Overview from './Overview';
import Detail from './Detail';

function Expenses() {
    const { path } = useRouteMatch();

	return (
		<Switch>
			<Route exact path={`${path}/`}>
				<Overview />
			</Route>
			<Route exact path={`${path}/:id`}>
				<Detail />
			</Route>
		</Switch>
	);

}

export default Expenses;
