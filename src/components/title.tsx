import React, { useState, useEffect } from 'react'
import { useMappedState } from 'redux-react-hook'
import { CSSTransition } from 'react-transition-group'
import { BackImage } from '@redux/Stores'
import { throttle } from '@common/util'
import '@less/title.less'
import { withRouter } from 'react-router-dom'
const mapState = (state: BackImage) => ({
	isEdit: state.isEdit,
})
interface Iprops {
	scrollDirection: string
	firstPageEnd: boolean
	setFirstPageEnd: Function
}
const Title = ({ history, scrollDirection, firstPageEnd, setFirstPageEnd }: any) => {
	const { isEdit } = useMappedState(mapState)
	const [active, setActive] = useState(history.location.pathname)
	const [showMenu, setShowMenu] = useState(false)
	const toggle = () => {
		setShowMenu(!showMenu)
	}
	const btnClick = (url: string) => {
		return () => {
			setFirstPageEnd(true)
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
		if (isEdit) {
			return (
				<div className="save_btn">
					<div className="btn">发布</div>
				</div>
			)
		} else {
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
						onClick={btnClick('/lifecycle')}
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
	}

	const IsMobil = () => {
		if (isEdit) {
			return <div></div>
		}
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
			console.log('渲染title>>>>>>>>>>>>>' + scrollDirection)
			return (
				<div
					className={`t_body
				 ${scrollDirection == 'down' ? 'title_hide' : ''}
				 ${scrollDirection == 'up' ? 'title_show' : ''}
				 `}
				>
					<div className="t_content">
						<div className="t_left" onClick={btnClick('/index')}></div>
						{isEdit ? <div className={`title`}>写文章</div> : ''}
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
