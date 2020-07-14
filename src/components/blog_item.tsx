import React from 'react'
import 'highlight.js/styles/vs2015.css'
import { withRouter } from 'react-router-dom'
import styles from '@less/blog_item.module.less'
interface Blog {
	title: string
	introduction: string
	create_time: string
	comment_count: string
}
const BlogItem = ({ history, Blog }: any) => {
	const obj = Blog
	const introduction = obj.introduction
	const goDetail = (obj: any) => {
		history.push('/blogDetail/' + obj.id)
	}

	const Item = () => {
		return (
			<div
				className={styles.card}
				onClick={(e) => {
					goDetail(obj)
				}}
			>
				<div className={styles.content}>
					<header className={styles.cardThumb}>
						<div className={styles.header}>
							<div className={styles.type}>
								<span className="iconfont iconReact"></span>
							</div>

							<div className={styles.link}>
								<span className="iconfont iconnodejs"></span>
							</div>
						</div>

						<div className={styles.body}>
							<h4 className={styles.title}>{obj.title}</h4>
							<p className={styles.describe}>{introduction}</p>
						</div>
					</header>

					<footer className={styles.cardFooter}>
						<ul>
							<li>
								<span className="icon ion-clock"></span> {obj.create_time}
							</li>
							<li>
								<span className="icon "> {obj.comment_count} 评论</span>
							</li>
						</ul>
					</footer>
				</div>
			</div>
		)
	}
	return <Item />
}
export default withRouter(BlogItem)
