import React, { useState, useMemo, useEffect } from 'react'
import { useDispatch } from 'redux-react-hook'
import { withRouter } from 'react-router-dom'
import BlogItem from '@components/blog_item'
import '@assets/icon/iconfont.css'
import '@less/blogList.less'
import { useDataApi } from '../http/request'

const BlogList = ({ history }: any) => {
	const [pageSize] = useState(6)
	const [currentPage, setCurrentPage] = useState(1)
	const [pageData, setPageData] = useState<any>([])
	const [{ data, isLoading, isError }, setParams] = useDataApi(
		'/ke/blog',
		{
			page: currentPage,
			size: pageSize,
		},
		{ data: [] }
	)
	let result: Array<any> = []
	const dispatch = useDispatch()
	if (data.code === 200 && data.data.length > 0) {
		if (data.code === 200) {
			for (let i = 0; i < data.data.length; i++) {
				if (data.data[i].introduction && data.data[i].introduction.length > 150) {
					data.data[i].introduction = data.data[i].introduction.substring(0, 150) + '...'
				}
			}
		}
		result = pageData.concat(data.data)
	} else {
		result = pageData
	}

	const List = () => {
		if (result.length > 0) {
			const blogList = result.map((item: any, index: any) => {
				return <BlogItem Blog={item} key={index}></BlogItem>
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
		setCurrentPage(currentPage + 1)
		setParams({
			page: currentPage + 1,
			size: pageSize,
		})
	}
	useEffect(() => {
		setPageData(result)
	}, [currentPage])
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
