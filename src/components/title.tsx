import React, { useState, useEffect } from 'react'
import { BackImage } from '@redux/Stores'
import '@less/title.less'
import { withRouter } from 'react-router-dom'

let firstPageEnd = false
const Title = ({ history }: any) => {
	const [active, setActive] = useState(history.location.pathname)
	const [showMenu, setShowMenu] = useState(false)
	console.log('title>>>>>>>>>>>.')
	const toggle = () => {
		setShowMenu(!showMenu)
	}
	const btnClick = (url: string) => {
		return () => {
			firstPageEnd = true
			setActive(url)
			history.push(url)
		}
	}
	// useEffect(() => {
	// 	let router = history.location.pathname
	// 	setActive(router)
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [history.location.pathname])
	const RightContent = () => {
		return (
			<div className="tabs">
				<li
					className={`${!firstPageEnd ? 'tab1' : ''} ${active.indexOf('/blogList') > -1 ? 'active' : ''}`}
					onClick={btnClick('/blogList')}
				>
					blog
				</li>
				<li
					className={`${!firstPageEnd ? 'tab2' : ''} ${active.indexOf('/index') > -1 ? 'active' : ''}`}
					onClick={btnClick('/index')}
				>
					message
				</li>
				<li className={`${!firstPageEnd ? 'tab3' : ''}`}>
					<a href="https://github.com/kechen123" target="view_window">
						GitHub
					</a>
				</li>
			</div>
		)
	}

	const IsMobil = () => {
		if (showMenu) {
			return (
				<div className="t_menus" onClick={toggle}>
					<div className="menu_item" onClick={btnClick('/index')}>
						index
					</div>
					<div
						className={`menu_item ${active.indexOf('/blogList') > -1 ? 'active' : ''}`}
						onClick={btnClick('/blogList')}
					>
						blog
					</div>
					<div
						className={`menu_item ${active.indexOf('/index') > -1 ? 'active' : ''}`}
						onClick={btnClick('/index')}
					>
						about
					</div>
				</div>
			)
		} else {
			return (
				<div className="t_body">
					<div className="t_content">
						<div className="t_left" onClick={btnClick('/index')}></div>
						<RightContent />
						<div className="t_right_l" onClick={toggle}></div>
					</div>
				</div>
			)
		}
	}
	return <IsMobil />
}
export default withRouter(Title)
