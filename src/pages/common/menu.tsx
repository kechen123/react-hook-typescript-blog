import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from '@less/common/menu.module.less'

const Menu = (props: any) => {
	const [active, setActive] = useState()
	const menulist = (list: any) => {
		return list.map((item: any, index: number) => {
			return (
				<div className={styles.menuItem} key={item.id}>
					<div
						className={`${styles.menuContent} ${item.id == active ? styles.menuActive : ''}`}
						onClick={(e) => {
							showColse(item)
						}}
					>
						{item.name}
					</div>
					{item.children && item.children.length > 0 ? (
						<div
							className={`${styles.menuChildren} ${
								item.id == active ? styles.menuShow : styles.menuHide
							}`}
						>
							{MenuChild(item.children)}
						</div>
					) : (
						''
					)}
				</div>
			)
		})
	}
	const MenuChild = (list: any) => {
		return list.map((item: any) => {
			return (
				<div key={item.id} className={styles.menuChild}>
					<Link to={item.url} className="link">
						{item.name}
					</Link>
				</div>
			)
		})
	}
	const showColse = (item: any) => {
		setActive(item.id)
		if (!item.children || item.children.length == 0) {
			props.menuClick(item)
		}
	}

	if (Object.values(props.data).length === 0) {
		return <div></div>
	}

	return <div className={styles.menuBody}>{menulist(props.data)}</div>
}
export default Menu
