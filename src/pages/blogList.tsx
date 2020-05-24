import React, { useState, Fragment } from 'react'
import { useDispatch } from 'redux-react-hook'
import { withRouter } from 'react-router-dom'
import BlogItem from '@components/blog_item'
import '@assets/icon/iconfont.css'
import '@less/blogList.less'
import { useGetPage } from '../http/request'

const BlogList = ({ history }: any) => {
	const [currentPage] = useState(1)
	const [pageSize] = useState(6)
	const [{ data }, setParams] = useGetPage('/ke/blog', {
		page: currentPage,
		size: pageSize,
	})
	const dispatch = useDispatch()
	console.log('bloglist>>>>>>>>>>>>')
	let result: any[] = []
	if (JSON.stringify(data) !== '{}') {
		if (data.code === 200) {
			for (let i = 0; i < data.data.length; i++) {
				if (data.data[i].introduction && data.data[i].introduction.length > 150) {
					data.data[i].introduction = data.data[i].introduction.substring(0, 150) + '...'
				}
			}
		}
		result = result.concat(data.data)
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
	const getMore = () => {
		setParams({
			page: currentPage + 1,
			size: pageSize,
		})
	}
	return (
		<div className="b_html">
			<div className="b_body">
				<List />
				<button
					onClick={(e) => {
						getMore()
					}}
					className="b_more"
				>
					show more
				</button>
			</div>
			<i onClick={btnClick()} className="iconfont iconshuxie"></i>
		</div>
	)
}
export default withRouter(BlogList)
