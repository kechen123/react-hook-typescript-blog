import React, { useState, useEffect } from 'react'
import showdown from 'showdown'
import 'highlight.js/styles/vs2015.css'
import showdownHighlight from 'showdown-highlight'
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
	let converter = new showdown.Converter({
		extensions: [showdownHighlight],
	})
	const goDetail = (obj: any) => {
		history.push('/blogDetail/' + obj.id)
	}
	const Item1111 = () => {
		return (
			<div
				className="blog"
				onClick={(e) => {
					goDetail(obj)
				}}
			>
				<header>{obj.title}</header>
				{showDetail ? (
					<div className="detail">
						<img alt="博客图片" src={require('../assets/image/card.jpg')} />
						<div dangerouslySetInnerHTML={{ __html: converter.makeHtml(obj.introduction) }}></div>
					</div>
				) : (
					<div className="content">
						<div className="cover">
							<div className="cover_inner">
								<img alt="博客图片" src={require('../assets/image/card.jpg')} />
							</div>
						</div>
						<div className="inner">
							<div
								className="text"
								dangerouslySetInnerHTML={{ __html: converter.makeHtml(obj.introduction) }}
							></div>
							<div
								className="btn"
								onClick={(e) => {
									setShowDetail(true)
								}}
							>
								阅读全文 <span className="iconfont iconpinglun"></span>
							</div>
						</div>
					</div>
				)}
				<footer>
					<div>
						<span className="icon iconfont iconshijian"></span>
						发表时间 {obj.create_time}
					</div>
					<div>
						<span className="icon iconfont ion-chatbox"></span>
					</div>
					<div>
						<span className="icon iconfont iconpinglun"> </span>
						{obj.comment} 评论
					</div>
					{showDetail ? (
						<div
							className="retract"
							onClick={(e) => {
								setShowDetail(false)
							}}
						>
							<span className="icon iconfont iconpinglun"> </span>
							收起
						</div>
					) : (
						''
					)}
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
					<p
						className="card__description"
						dangerouslySetInnerHTML={{ __html: converter.makeHtml(obj.introduction) }}
					></p>
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
	return <Item />
}
export default withRouter(BlogItem)
