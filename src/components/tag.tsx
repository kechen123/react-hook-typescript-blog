import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import '../assets/less/tag.less'
import tagsJson from '../assets/tags/tags.json'

const Tag = ({ history }: any) => {
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
			tagList.some((value: any) => {
				return value.id === tag.id
			})
		) {
			return
		}
		setNum(num - 1)
		tagList.push(tag)
	}
	const delTag = (index: number, value: any) => {
		tagList.splice(index, 1)
		setNum(num + 1)
	}
	const Taglist = () => {
		const li = Object.keys(tags.tag).map((value: any, index: number) => {
			return (
				<li
					className={active === index ? 'active' : ''}
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
		return <ul className="nav">{li}</ul>
	}
	const TagContent = () => {
		let list = Object.values(tags.tag)[active].map((value: any) => {
			return (
				<div
					className="item"
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
		return <div className="tab-content ">{list}</div>
	}

	const Select = () => {
		if (tagList.length === 0) {
			return <div></div>
		}
		let tag = tagList.map((value: any, index: number) => {
			return (
				<div className="item">
					{value.name}
					<i
						onClick={(e) => {
							delTag(index, value)
						}}
						className="iconfont iconshanchu"
					></i>
				</div>
			)
		})
		return <div className="selectTag">{tag}</div>
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
		<div className="body">
			<div
				className={`tag ${num === 0 ? 'hide' : ''}`}
				onClick={(e) => {
					click(e)
				}}
			>
				<button
					className="btn btn-light btn-sm"
					onClick={(e) => {
						setShow(!show)
					}}
					data-toggle="dropdown"
					id="add-tag-btn"
					aria-expanded="false"
				>
					+ 添加标签
				</button>
				<div className={`dropdown-menu ${show === true ? 'show' : ''}`}>
					<div className="dropdown-header" id="tagDlgHeader">
						还可添加 <span className="tags-left">{num}</span> 个标签
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
