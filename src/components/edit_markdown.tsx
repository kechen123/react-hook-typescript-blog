import React, { useState, useEffect } from 'react'
import showdown from 'showdown'
import '../assets/less/edit_markdown.less'
const options = {
	omitExtraWLInCodeBlocks: true,
	noHeaderId: true,
	parseImgDimensions: true,
	simplifiedAutoLink: true,
	excludeTrailingPunctuationFromURLs: true,
	literalMidWordUnderscores: true,
	tables: true,
	tasklists: true,
	strikethrough: true,
}
const converter = new showdown.Converter(options)
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
const EditMarkDown = () => {
	const [text, setText] = useState(txt)
	console.log(text)
	return (
		<div className="editBody">
			<div className="edit">
				<textarea
					className="editContent"
					defaultValue={text}
					name="message"
					onBlur={(ev) => {
						console.log(ev.target.value.toString())
						setText(ev.target.value)
					}}
				></textarea>
			</div>

			<div className="show">
				<div className="showContent" dangerouslySetInnerHTML={{ __html: converter.makeHtml(text) }}></div>
			</div>
		</div>
	)
}
export default EditMarkDown
