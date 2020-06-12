import React from 'react'

import Routes from './Routes'
import { Router, Switch } from 'react-router-dom'
import history from './Routes/history'
import './mock/blog'
class App extends React.Component {
	render() {
		return (
			<Router history={history}>
				<Switch>
					<Routes></Routes>
				</Switch>
			</Router>
		)
	}
}

export default App
