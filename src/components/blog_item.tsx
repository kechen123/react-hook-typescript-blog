import React, { useState, useEffect } from 'react'
import 'highlight.js/styles/vs2015.css'
import { withRouter } from 'react-router-dom'
import '@less/blog_item.less'
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
				className="card"
				onClick={(e) => {
					goDetail(obj)
				}}
			>
				<header className="card__thumb">
					<a href="#">
						<img src={require('../assets/image/card.jpg')} />
					</a>
					<img alt="博客图片" src={require('../assets/image/card.jpg')} />
				</header>
				<div className="card__body">
					<h2 className="card__title">
						<a href="#">{obj.title}</a>
					</h2>
					<p className="card__description" dangerouslySetInnerHTML={{ __html: introduction }}></p>
				</div>

				<footer className="card__footer">
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
				className="card"
				onClick={(e) => {
					goDetail(obj)
				}}
			>
				<div className="content">
					<header className="card__thumb">
						<div className="header">
							<div className="type">
								<span className="iconfont iconReact"></span>
							</div>

							<div className="link">
								<span className="iconfont iconnodejs"></span>
							</div>
						</div>

						<div className="body">
							<h4 className="title">{obj.title}</h4>
							<p className="describe">{introduction}</p>
						</div>
					</header>

					<footer className="card__footer">
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
