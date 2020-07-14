import React, { useState, useRef } from 'react'
import { withRouter, Prompt } from 'react-router-dom'
import { useDispatch } from 'redux-react-hook'
import EditMarkDown from '@components/edit_markdown'
import { postData, getData } from '@http/request'
import Tag from '@components/tag'
import styles from '@less/createBlog.module.less'
import txt from '@mock/blogdetail'
const CreateBlog = ({ history }: any) => {
	const dispatch = useDispatch()
	const inputRef = useRef<HTMLInputElement | null>(null)
	const [text, setText] = useState(txt)
	const [html, setHtml] = useState(null)
	const [title, setTitle] = useState('')
	const [tagList, setTagList] = useState<any>({})
	const leaveMessage = () => {
		let leave = window.confirm('离开页面数据将不会保存，确定离开吗?')
		if (leave) {
			dispatch({
				type: 'change_title',
				boo: false,
			})
		}
		return leave
	}
	const saveData = () => {
		const data = { introductionHtml: html, introductionText: text, title, tag_id_json: JSON.stringify(tagList) }
		postData('/ke/blog', JSON.stringify(data)).then((res) => {
			debugger
		})
	}
	const onblur = () => {
		setTitle(inputRef.current?.value || '')
	}
	const btnClick = (url: string) => {
		return () => {
			history.push(url)
		}
	}
	return (
		<div className={styles.createHtml}>
			<div className={styles.createTitle}>
				<div className={styles.tLeft} onClick={btnClick('/index')}></div>
				<div className={`title`}>写文章</div>
				<div
					className={styles.saveBtn}
					onClick={(e) => {
						saveData()
					}}
				>
					<div className={styles.btn}>发布</div>
				</div>
			</div>
			<div className={styles.createBody}>
				<div className={styles.cTitle}>
					<input
						placeholder="请输入标题"
						ref={inputRef}
						onBlur={(ev) => {
							onblur()
						}}
					></input>
				</div>
				<div className={styles.cType}>
					<Tag tagList={tagList} setTagList={setTagList}></Tag>
				</div>
				<div className={styles.createContent}>
					<EditMarkDown text={text} setHtml={setHtml} setText={setText}></EditMarkDown>
				</div>
				<Prompt message={leaveMessage}></Prompt>
			</div>
		</div>
	)
}
export default withRouter(CreateBlog)
