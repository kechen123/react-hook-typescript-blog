import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Route, Switch } from 'react-router-dom'
import '../less/AnimatedSwitch.less'

const AnimatedSwitch = (props: any) => {
	const { children } = props
	return (
		<Route
			render={({ location }) => (
				<TransitionGroup className="page">
					<CSSTransition key={location.key} classNames={props.type || 'fade'} timeout={props.duration || 300}>
						<Switch location={location}>{children}</Switch>
					</CSSTransition>
				</TransitionGroup>
			)}
		/>
	)
}

export default AnimatedSwitch
