import React, { useState, useEffect, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import showdown from 'showdown'
import 'highlight.js/styles/vs2015.css'
import showdownHighlight from 'showdown-highlight'
import { getData } from '@http/request'
import styles from '@less/blog_detail.module.less'
import markdown from '@less/markdown.module.less'

const BlogDetail = ({ history }: any) => {
	const pathname = history.location.pathname
	const id = pathname.substring(pathname.lastIndexOf('/') + 1, pathname.length)
	const [blog, setBlog] = useState<any>()
	let converter = new showdown.Converter({
		extensions: [showdownHighlight],
	})
	useEffect(() => {
		getData('/rs/blog/' + id).then((res) => {
			if (res.status === 200) {
				setBlog(res.data[0])
			}
		})
	}, [id])
	return (
		<div className={styles.detailcontent}>
			<div className={styles.blogDetail}>
				{blog ? (
					<Fragment>
						<div className={styles.title}>{blog.title}</div>
						<div className={styles.info}>
							<div className={styles.type}>
								<i className={`iconfont ${blog.tag_json.icon}`}></i>
								<span>{blog.tag_json.name}</span>
							</div>
							<div className={styles.commentCount}>
								<span>{blog.comment_count}</span> 条评论
							</div>
							<div className={styles.createTime}>发布于 {blog.create_time} </div>
							<div className={styles.read}>
								阅读 <span>{blog.read}</span>
							</div>
						</div>
						<div className={`${styles.detail} ${markdown.markdown}`}>
							<div dangerouslySetInnerHTML={{ __html: converter.makeHtml(blog.content) }}></div>
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
