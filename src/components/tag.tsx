import React, { useState, useEffect, isValidElement } from 'react'
import { withRouter } from 'react-router-dom'
import '../assets/less/tag.less'
import tagsJson from '../assets/tags/tags.json'

const Tag = ({ history }: any) => {
	const [tags, setTags] = useState(tagsJson)
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
				return value.id == tag.id
			})
		) {
			return
		}
		setNum(num - 1)
		tagList.push(tag)
	}
	const Taglist = () => {
		const li = Object.keys(tags.tag).map((value: any, index: number) => {
			return (
				<li
					className={active == index ? 'active' : ''}
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
		if (tagList.length == 0) {
			return <div></div>
		}
		let tag = tagList.map((value: any) => {
			return <div className="item">{value.name}</div>
		})
		return <div className="selectTag">{tag}</div>
	}
	useEffect(() => {
		if (num == 0) {
			setShow(!show)
		}
	}, [num])
	return (
		<div className="body">
			<Select></Select>
			<div className={`tag ${num == 0 ? 'hide' : ''}`}>
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
				<div className={`dropdown-menu ${show == true ? 'show' : ''}`}>
					<div className="dropdown-header" id="tagDlgHeader">
						还可添加 <span className="tags-left">{num}</span> 个标签
					</div>
					<Taglist></Taglist>
					<TagContent></TagContent>
				</div>
			</div>
		</div>
	)
}
export default withRouter(Tag)
