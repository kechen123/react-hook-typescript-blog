import React, { useState, useEffect } from 'react'
import { useMappedState } from 'redux-react-hook'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { BackImage } from '../redux/Stores'
import '../assets/less/title.less'
import { withRouter } from 'react-router-dom'
const mapState = (state: BackImage) => ({
	isEdit: state.isEdit,
})
const Title = ({ history }: any) => {
	const { isEdit } = useMappedState(mapState)
	const [active, setActive] = useState('')
	const [showMenu, setShowMenu] = useState(false)
	const toggle = () => {
		setShowMenu(!showMenu)
	}
	const btnClick = (url: string) => {
		return () => {
			setActive(url)
			history.push(url)
		}
	}
	useEffect(() => {
		let router = history.location.pathname
		setActive(router)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [history.location.pathname])
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
					<li className={active.indexOf('/blogList') > -1 ? 'active' : ''} onClick={btnClick('/blogList')}>
						博客
					</li>
					<li className={active.indexOf('/index') > -1 ? 'active' : ''} onClick={btnClick('/index')}>
						联系
					</li>
					<li>
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
						首页
					</div>
					<div
						className={`menu_item ${active.indexOf('/blogList') > -1 ? 'active' : ''}`}
						onClick={btnClick('/blogList')}
					>
						博客
					</div>
					<div
						className={`menu_item ${active.indexOf('/index') > -1 ? 'active' : ''}`}
						onClick={btnClick('/index')}
					>
						关于
					</div>
				</div>
			)
		} else {
			return (
				<TransitionGroup className="page">
					<CSSTransition key={1} classNames="titleFade" timeout={300}>
						<div className="t_body">
							<div className="t_content">
								<div className="t_left" onClick={btnClick('/index')}></div>
								{isEdit ? <div className={`title`}>写文章</div> : ''}

								<RightContent />
								<div className="t_right_l" onClick={toggle}></div>
							</div>
						</div>
					</CSSTransition>
				</TransitionGroup>
			)
		}
	}
	return <IsMobil />
}
export default withRouter(Title)
