import React, { useState, useEffect } from 'react'
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
	const [showDetail, setShowDetail] = useState(false)
	const obj = Blog
	const introduction = obj.introduction
	const goDetail = (obj: any) => {
		history.push('/blogDetail/' + obj.id)
	}
	const Item11 = () => {
		return (
			<div
				className={styles.card}
				onClick={(e) => {
					goDetail(obj)
				}}
			>
				<header className={styles.cardThumb}>
					<a href="#">
						<img src={require('../assets/image/card.jpg')} />
					</a>
					<img alt="博客图片" src={require('../assets/image/card.jpg')} />
				</header>
				<div className={styles.cardBody}>
					<h2 className={styles.cardTitle}>
						<a href="#">{obj.title}</a>
					</h2>
					<p className={styles.cardDescription} dangerouslySetInnerHTML={{ __html: introduction }}></p>
				</div>

				<footer className={styles.cardFooter}>
					<span className="icon ion-clock"></span> {obj.create_time}
					<span className="icon ion-clock">{obj.create_time}</span>
					<span className="icon ion-chatbox"></span>
					<a href="#"> {obj.comment_count} 评论</a>
					<span className="icon "> {obj.comment_count} 评论</span>
				</footer>
			</div>
		)
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
