import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Route, Switch } from 'react-router-dom'
import styles from '@less/AnimatedSwitch.module.less'

const AnimatedSwitch = (props: any) => {
	const { children } = props
	console.log(children)
	console.log('AnimatedSwitch>>>>>...')
	return (
		<Route
			render={({ location }) => (
				<TransitionGroup className={styles.page}>
					<CSSTransition key={location.key} classNames="fade" timeout={props.duration || 300}>
						<Switch location={location}>{children}</Switch>
					</CSSTransition>
				</TransitionGroup>
			)}
		/>
	)
}

export default AnimatedSwitch
