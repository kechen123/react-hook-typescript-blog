import React from 'react'
import BgUrl from '../components/bg'
import Title from '../components/title'
import index from '../pages/index'
import blogList from '../pages/blogList'
import createBlog from '../pages/createBlog'
import '../assets/less/layout.less'
import { Route } from 'react-router-dom'
import AnimatedSwitch from './AnimatedSwitch'
import { StoreContext } from 'redux-react-hook'
import { makeStore } from '../redux/Stores'
const store = makeStore()
const Layout = () => {
	return (
		<StoreContext.Provider value={store}>
			<div className="app" style={{ overflow: 'scroll', overflowY: 'hidden' }}>
				<BgUrl></BgUrl>
				<Title></Title>
				<AnimatedSwitch>
					<Route exact path="/" component={index} />
					<Route path="/index" component={index} />
					<Route path="/blogList" component={blogList} />
					<Route path="/createBlog" component={createBlog} />
				</AnimatedSwitch>
			</div>
		</StoreContext.Provider>
	)
}

export default Layout
