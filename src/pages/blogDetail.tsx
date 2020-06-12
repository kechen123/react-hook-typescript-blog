import React, { useState, useEffect, Fragment } from 'react'
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
		<div className="detailcontent">
			<div className="blogDetail">
				{blog ? (
					<Fragment>
						<div className="title">{blog.title}</div>

						<div className="detail">
							<div dangerouslySetInnerHTML={{ __html: converter.makeHtml(blog.introduction) }}></div>
						</div>
					</Fragment>
				) : (
					''
				)}
			</div>
		</div>
	)
}
export default withRouter(BlogDetail)
