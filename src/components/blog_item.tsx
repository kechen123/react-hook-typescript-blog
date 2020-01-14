import React from 'react'
import '../less/blog_item.less'
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
				<a href="#">
					<img src={require('../image/card.jpg')} />
				</a>
			</header>
			<div className="card__body">
				<h2 className="card__title">
					<a href="#">{obj.title}</a>
				</h2>
				<p className="card__description">{obj.introduction}</p>
			</div>

			<footer className="card__footer">
				<span className="icon ion-clock"></span> {obj.create_time}
				<span className="icon ion-chatbox"></span>
				<a href="#"> {obj.comment_count} 评论</a>
			</footer>
		</div>
	)
}
export default BlogItem
