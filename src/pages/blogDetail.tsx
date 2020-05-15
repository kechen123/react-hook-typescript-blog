import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import showdown from 'showdown'
import 'highlight.js/styles/vs2015.css'
import showdownHighlight from 'showdown-highlight'
import { getData } from '@http/request'
import '@less/blog_detail.less'
const BlogDetail = ({ history }: any) => {
	const pathname = history.location.pathname
	const id = pathname.substring(pathname.lastIndexOf('/') + 1, pathname.length)
	const [blog, setBlog] = useState<any>()
	let converter = new showdown.Converter({
		extensions: [showdownHighlight],
	})
	useEffect(() => {
		getData('/ke/blog?id=' + id).then((res) => {
			if (res.code == 200) {
				setBlog(res.data[0])
			}
		})
	}, [])
	return (
		<div className="blogDetail">
			{blog ? (
				<div className="detail">
					<img alt="博客图片" src={require('../assets/image/card.jpg')} />
					<div dangerouslySetInnerHTML={{ __html: converter.makeHtml(blog.introduction) }}></div>
				</div>
			) : (
				''
			)}
		</div>
	)
}
export default withRouter(BlogDetail)
