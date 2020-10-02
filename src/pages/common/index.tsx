import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import Menu from './menu'
import styles from '@less/common/index.module.less'
import { useDataApi } from '@http/request'
import trigonometric from '@pages/common/trigonometric'
const CssTools = ({ history }: any) => {
	let result: Array<object> = []
	const [{ data }, setParams] = useDataApi('/ke/menu', {}, { data: [] })
	if (data.data && data.data.length > 0) {
		result = data.data
	}
	const goUrl = (item: any) => {
		// debugger
		// history.push(item.url)
	}
	return (
		<section className={styles.body}>
			<Router>
				<div className={styles.list}>
					{result.length > 0 ? <Menu data={result} menuClick={goUrl}></Menu> : ''}
				</div>
				<div className={styles.content}>
					<Switch>
						<Route path="/common/trigonometric" component={trigonometric} />
					</Switch>
				</div>
			</Router>
		</section>
	)
}
export default withRouter(CssTools)
