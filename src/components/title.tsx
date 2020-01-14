import React, { useState } from 'react'
import '../less/title.less'
import { withRouter } from 'react-router-dom'
const Title = ({ history }: any) => {
	const [myname] = useState('柯大晨')
	const [showMenu, setShowMenu] = useState(false)
	const toggle = () => {
		setShowMenu(!showMenu)
	}
	const btnClick = (url: string) => {
		return () => {
			history.push(url)
		}
	}
	const IsMobil = () => {
		if (showMenu) {
			return (
				<div className="t_menus" onClick={toggle}>
					<div className="menu_item" onClick={btnClick('/index')}>
						首页
					</div>
					<div className="menu_item" onClick={btnClick('/blogList')}>
						博客
					</div>
					<div className="menu_item" onClick={btnClick('/163')}>
						网易云
					</div>
					<div className="menu_item" onClick={btnClick('/index')}>
						联系
					</div>
				</div>
			)
		} else {
			return (
				<div className="t_body">
					<div className="t_content">
						<div className="t_left" onClick={btnClick('/index')}>
							{myname}
						</div>
						<div className="tabs">
							{/* <li onClick={btnClick('/index')}>首页</li> */}
							<li onClick={btnClick('/blogList')}>博客</li>
							<li onClick={btnClick('/163')}>网易云</li>
							{/* <li onClick={btnClick('/index')}>联系</li> */}
							<li>
								<a href="https://github.com/kechen123" target="view_window">
									GitHub
								</a>
							</li>
						</div>
						<div className="t_right_l" onClick={toggle}></div>
					</div>
				</div>
			)
		}
	}
	return <IsMobil />
}
export default withRouter(Title)
