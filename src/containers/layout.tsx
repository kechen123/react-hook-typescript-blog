import React from 'react'
import BgUrl from '../components/bg'
import Title from '../components/title'
import index from '../pages/index'
import blogList from '../pages/blogList'
import music from '../pages/163'
// import Live2d from '../components/live2d/live2d'
import '../less/layout.less'
import { Route } from 'react-router-dom'
import AnimatedSwitch from './AnimatedSwitch'
const Layout = () => {
	return (
		<div className="app" style={{ overflow: 'scroll', overflowY: 'hidden' }}>
			<BgUrl></BgUrl>
			<Title></Title>
			{/* <Live2d></Live2d> */}
			<AnimatedSwitch>
				<Route exact path="/" component={index} />
				<Route path="/index" component={index} />
				<Route path="/blogList" component={blogList} />
				<Route path="/163" component={music} />
			</AnimatedSwitch>
		</div>
	)
}

export default Layout
