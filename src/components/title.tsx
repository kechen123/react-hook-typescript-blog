import React, { useState, useEffect } from 'react'
import { useMappedState } from 'redux-react-hook'
import { CSSTransition } from 'react-transition-group'
import { BackImage } from '@redux/Stores'
import { throttle } from '@common/util'
import styles from '@less/title.module.less'
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
				<div className={styles.saveBtn}>
					<div className={styles.btn}>发布</div>
				</div>
			)
		} else {
			return (
				<div className={styles.tabs}>
					<li
						className={`${!firstPageEnd ? styles.tab1 : ''} ${
							active.indexOf('/blogList') > -1 ? styles.active : ''
						}`}
						onClick={btnClick('/blogList')}
					>
						blog
					</li>
					<li
						className={`${!firstPageEnd ? styles.tab2 : ''} ${
							active.indexOf('/index') > -1 ? styles.active : ''
						}`}
						onClick={btnClick('/csstools')}
					>
						csstools
					</li>
					<li className={`${!firstPageEnd ? styles.tab3 : ''}`}>
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
				<div className={styles.tMenus} onClick={toggle}>
					<div className={styles.menuItem} onClick={btnClick('/index')}>
						index
					</div>
					<div
						className={`${styles.menuItem} ${active.indexOf('/blogList') > -1 ? styles.active : ''}`}
						onClick={btnClick('/blogList')}
					>
						blog
					</div>
					<div
						className={`${styles.menuItem} ${active.indexOf('/index') > -1 ? styles.active : ''}`}
						onClick={btnClick('/index')}
					>
						about
					</div>
				</div>
			)
		} else {
			return (
				<div
					className={`
					${styles.tBody}
				 ${scrollDirection == 'down' ? styles.titleHide : ''}
				 ${scrollDirection == 'up' ? styles.titleShow : ''}
				 `}
				>
					<div className={styles.tContent}>
						<div className={styles.tLeft} onClick={btnClick('/index')}></div>
						{isEdit ? <div className={`${styles.title}`}>写文章</div> : ''}
						<RightContent />
						<div className={styles.tRightL} onClick={toggle}></div>
					</div>
				</div>
			)
		}
	}

	return <IsMobil />
}
export default withRouter(Title)
