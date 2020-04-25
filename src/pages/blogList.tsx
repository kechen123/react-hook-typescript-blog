import React, { useState } from 'react'
import { useDispatch } from 'redux-react-hook'
import { withRouter } from 'react-router-dom'
import BlogItem from '../components/blog_item'
import '../assets/icon/iconfont.css'
import '../assets/less/blogList.less'
import { useGetPage } from '../request'
const BlogList = ({ history }: any) => {
	const [currentPage] = useState(0)
	const [pageSize] = useState(10)
	const [{ data }] = useGetPage('/ke/blog', {
		page: currentPage + 1,
		size: pageSize,
	})
	const dispatch = useDispatch()
	dispatch({
		type: 'add_image',
		todo:
			'https://cn.bing.com/th?id=OHR.UnicornoftheSea_ZH-CN2949385175_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp',
	})
	let result: any[] = []
	if (JSON.stringify(data) !== '{}') {
		console.log(data)
		if (data.code === 200) {
			for (let i = 0; i < data.data.length; i++) {
				if (data.data[i].introduction && data.data[i].introduction.length > 150) {
					data.data[i].introduction = data.data[i].introduction.substring(0, 150) + '...'
				}
			}
		}
		result = data.data
	}

	const List = () => {
		if (result.length > 0) {
			const blogList = result.map((item: any) => {
				return <BlogItem Blog={item} key={item.id}></BlogItem>
			})

			return <div className="b_content">{blogList}</div>
		} else {
			return <div className="b_content"></div>
		}
	}
	const btnClick = () => {
		return () => {
			dispatch({
				type: 'change_title',
				boo: true,
			})
			history.push('/createBlog')
		}
	}
	return (
		<div className="b_html">
			<div className="b_body">
				<List />
				<div className="b_type"></div>
			</div>
			<i onClick={btnClick()} className="iconfont iconshuxie"></i>
		</div>
	)
}
export default withRouter(BlogList)
