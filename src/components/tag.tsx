import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import styles from '@less/tag.module.less'
import tagsJson from '../assets/tags/tags.json'

const Tag = (props: any) => {
	const [tags] = useState(tagsJson)
	const [num, setNum] = useState(5)
	const [active, setActive] = useState(0)
	const [tagList] = useState<any>([])
	const [show, setShow] = useState(false)
	const changeTag = (index: number, value: string) => {
		setActive(index)
	}
	const selectTag = (tag: any) => {
		if (
			Object.keys(tagList).some((value: any) => {
				return value === tag.id
			})
		) {
			return
		}
		setNum(num - 1)
		tagList[tag.id] = tag
		props.setTagList(tagList)
	}
	const delTag = (index: number, value: any) => {
		tagList.splice(index, 1)
		props.setTagList(tagList)
		setNum(num + 1)
	}
	const Taglist = () => {
		const li = Object.keys(tags.tag).map((value: any, index: number) => {
			return (
				<li
					className={active === index ? styles.active : ''}
					key={index}
					data-index={index}
					onClick={(e) => {
						changeTag(index, value)
					}}
				>
					{value}
				</li>
			)
		})
		return <ul className={styles.nav}>{li}</ul>
	}
	const TagContent = () => {
		let list = Object.values(tags.tag)[active].map((value: any) => {
			return (
				<div
					className={styles.item}
					key={value.id}
					onClick={(e) => {
						selectTag(value)
					}}
				>
					<i className={`iconfont ${value.icon}`}></i>
					<span>{value.name}</span>
				</div>
			)
		})
		return <div className={styles.tabContent}>{list}</div>
	}

	const Select = () => {
		if (Object.values(props.tagList).length === 0) {
			return <div></div>
		}
		let tag = Object.values(props.tagList).map((value: any, index: number) => {
			return (
				<div className={styles.item} key={index}>
					{value.name}
					<i
						onClick={(e) => {
							delTag(value.id, value)
						}}
						className="iconfont iconshanchu"
					></i>
				</div>
			)
		})
		return <div className={styles.selectTag}>{tag}</div>
	}
	useEffect(() => {
		if (num === 0) {
			setShow(false)
		}
	}, [num])

	const click = (e: any) => {
		//自身区域阻止隐藏
		e.nativeEvent.stopImmediatePropagation()
	}
	useEffect(() => {
		//点击空白区域隐藏
		document.onclick = () => {
			setShow(false)
		}
	}, [])
	return (
		<div className={styles.body}>
			<div
				className={`tag ${num === 0 ? styles.hide : ''}`}
				onClick={(e) => {
					click(e)
				}}
			>
				<button
					className={`${styles.btn} ${styles.btnLight} ${styles.btnSm}`}
					onClick={(e) => {
						setShow(!show)
					}}
					data-toggle="dropdown"
					id="add-tag-btn"
					aria-expanded="false"
				>
					+ 添加标签
				</button>
				<div className={`${styles.dropdownMenu} ${show === true ? styles.show : ''}`}>
					<div className={styles.dropdownHeader} id="tagDlgHeader">
						还可添加 <span className={styles.tagsLeft}>{num}</span> 个标签
					</div>
					<Taglist></Taglist>
					<TagContent></TagContent>
				</div>
			</div>
			<Select></Select>
		</div>
	)
}
export default withRouter(Tag)
