import React, { useState, useRef } from 'react'
import { withRouter, Prompt } from 'react-router-dom'
import { useDispatch } from 'redux-react-hook'
import EditMarkDown from '@components/edit_markdown'
import { postData } from '@http/request'
import Tag from '@components/tag'
import styles from '@less/createBlog.module.less'
import txt from '@mock/blogdetail'
const CreateBlog = ({ history }: any) => {
	const dispatch = useDispatch()
	const inputRef = useRef<HTMLInputElement | null>(null)
	const inputRef1 = useRef<HTMLInputElement | null>(null)
	const [text, setText] = useState(txt)
	const [post, setPost] = useState(false)
	const [introduction, setIntroduction] = useState('')
	const [title, setTitle] = useState('')
	const [tagList, setTagList] = useState<any>({})
	const leaveMessage = () => {
		let leave = false
		if (!post) {
			leave = window.confirm('离开页面数据将不会保存，确定离开吗?')
		}
		if (leave || post) {
			dispatch({
				type: 'change_title',
				boo: false,
			})
		}
		return leave || post
	}
	const saveData = () => {
		const data = {
			content: text,
			title,
			introduction,
			tag_json: JSON.stringify(tagList),
		}
		postData('/rs/blog', data).then((res) => {
			if (res.status == 200) {
				alert('发布成功')
				setPost(true)
				history.push('/blogList')
			} else {
				alert('发布失败')
			}
		})
	}
	const onblur = () => {
		setTitle(inputRef.current?.value || '')
	}
	const onblur1 = () => {
		setIntroduction(inputRef1.current?.value || '')
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
				<div className={styles.cTitle}>
					<input
						placeholder="请输入描述"
						ref={inputRef1}
						onBlur={(ev) => {
							onblur1()
						}}
					></input>
				</div>
				<div className={styles.cType}>
					<Tag tagList={tagList} setTagList={setTagList}></Tag>
				</div>
				<div className={styles.createContent}>
					<EditMarkDown text={text} setText={setText}></EditMarkDown>
				</div>
				<Prompt message={leaveMessage}></Prompt>
			</div>
		</div>
	)
}
export default withRouter(CreateBlog)
