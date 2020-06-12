import React, { useState, useRef } from 'react'
import { withRouter, Prompt } from 'react-router-dom'
import { useDispatch } from 'redux-react-hook'
import EditMarkDown from '@components/edit_markdown'
import { postData, getData } from '@http/request'
import Tag from '@components/tag'
import '@less/createBlog.less'
const txt = `
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
*斜体文本*
_斜体文本_
**粗体文本**
__粗体文本__
***粗斜体文本***
___粗斜体文本___
1. 第一项：
    - 第一项嵌套的第一个元素
    - 第一项嵌套的第二个元素
2. 第二项：
    - 第二项嵌套的第一个元素
    - 第二项嵌套的第二个元素
* 第一项
    > 菜鸟教程
    > 学的不仅是技术更是梦想
* 第二项
\`\`\`javascript
\$(document).ready(function () {
    alert('RUNOOB');
});
\`\`\`
这是一个链接 [菜鸟教程](https://www.runoob.com)
`
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
		<div className="createHtml">
			<div className="createTitle">
				<div className="t_left" onClick={btnClick('/index')}></div>
				<div className={`title`}>写文章</div>
				<div
					className="save_btn"
					onClick={(e) => {
						saveData()
					}}
				>
					<div className="btn">发布</div>
				</div>
			</div>
			<div className="createBody">
				<div className="c_title">
					<input
						placeholder="请输入标题"
						ref={inputRef}
						onBlur={(ev) => {
							onblur()
						}}
					></input>
				</div>
				<div className="c_type">
					<Tag tagList={tagList} setTagList={setTagList}></Tag>
				</div>
				<div className="createContent">
					<EditMarkDown text={text} setHtml={setHtml} setText={setText}></EditMarkDown>
				</div>
				<Prompt message={leaveMessage}></Prompt>
			</div>
		</div>
	)
}
export default withRouter(CreateBlog)
