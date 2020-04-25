import React, { useState } from 'react'
import { withRouter, Prompt } from 'react-router-dom'
import { useDispatch } from 'redux-react-hook'
import EditMarkDown from '../components/edit_markdown'
import Tag from '../components/tag'
import '../assets/less/createBlog.less'
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
	const [text, setText] = useState(txt)
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
			<div className="c_type">
				<Tag></Tag>
			</div>
			<div className="createContent">
				<EditMarkDown text={text} setText={setText}></EditMarkDown>
			</div>
			<Prompt message={leaveMessage}></Prompt>
		</div>
	)
}
export default withRouter(CreateBlog)
