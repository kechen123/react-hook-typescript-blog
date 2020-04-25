import React from 'react'
import '../assets/less/blog_item.less'
interface Blog {
	title: string
	introduction: string
	create_time: string
	comment_count: string
}
const BlogItem = (Blog: any) => {
	const obj = Blog.Blog
	return (
		<div className="card">
			<header className="card__thumb">
				<img alt="博客图片" src={require('../assets/image/card.jpg')} />
			</header>
			<div className="card__body">
				<h2 className="card__title">{obj.title}</h2>
				<p className="card__description">{obj.introduction}</p>
			</div>

			<footer className="card__footer">
				<span className="icon ion-clock">{obj.create_time}</span>
				<span className="icon ion-chatbox"></span>
				<span className="icon "> {obj.comment_count} 评论</span>
			</footer>
		</div>
	)
}
export default BlogItem
