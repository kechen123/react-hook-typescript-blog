import React from 'react'
import Nav from '@components/nav'
import index from '@pages/index'
import blogList from '@pages/blogList'
import createBlog from '@pages/createBlog'
import blogDetail from '@pages/blogDetail'
import Lifecycle from '@pages/lifecycleParent'
import csstools from '@pages/csstools/index'

import { Route } from 'react-router-dom'
import AnimatedSwitch from './AnimatedSwitch'
import { StoreContext } from 'redux-react-hook'
import { makeStore } from '@redux/Stores'
const store = makeStore()
const Layout = () => {
	console.log('layout>>>>>>>>>>>')
	return (
		<StoreContext.Provider value={store}>
			{/* <BgUrl></BgUrl> */}
			<Nav></Nav>
			<AnimatedSwitch>
				<Route exact path="/" component={index} />
				<Route path="/index" component={index} />
				<Route path="/blogList" component={blogList} />
				<Route path="/blogDetail/:id" component={blogDetail} />
				<Route path="/createBlog" component={createBlog} />
				<Route path="/lifecycle" component={Lifecycle} />
				<Route path="/csstools" component={csstools} />
			</AnimatedSwitch>
		</StoreContext.Provider>
	)
}

export default Layout
