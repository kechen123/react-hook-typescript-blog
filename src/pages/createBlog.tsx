import React, { useState, useEffect } from 'react'
import { withRouter, Prompt } from 'react-router-dom'
import { useDispatch } from 'redux-react-hook'
import EditMarkDown from '../components/edit_markdown'
import '../assets/less/createBlog.less'

const CreateBlog = ({ history }: any) => {
	const dispatch = useDispatch()
	const [text, setText] = useState('')
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
	return (
		<div className="createBody">
			<div className="c_title">
				<input placeholder="请输入标题"></input>
			</div>
			<div className="c_type"></div>
			<div className="createContent">
				<EditMarkDown></EditMarkDown>
			</div>
			<Prompt message={leaveMessage}></Prompt>
		</div>
	)
}
export default withRouter(CreateBlog)
