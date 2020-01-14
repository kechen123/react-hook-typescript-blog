import React, { useState, useEffect } from 'react'
import BlogItem from '../components/blog_item'
import '../less/blogList.less'
import { useGetPage } from '../request'
import axios from 'axios'
const BlogList = () => {
	const blog = {
		title: '111',
		introduction: 'string',
		create_time: 'string',
		comment_count: 'string',
	}
	const [currentPage, setCurrentPage] = useState(0)
	const [pageSize] = useState(10)
	const [{ data, isLoading, isError }, setParams] = useGetPage('ke/blog', {
		page: currentPage + 1,
		size: pageSize,
	})
	let result: any[] = []
	if (JSON.stringify(data) !== '{}') {
		if (data.code == 200) {
			for (let i = 0; i < data.data.length; i++) {
				//if(result.data[i].title.length>15){
				//    result.data[i].title=result.data[i].title.substring(0,15);
				//}
				if (data.data[i].introduction && data.data[i].introduction.length > 50) {
					data.data[i].introduction = data.data[i].introduction.substring(0, 50) + '...'
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
			console.log(blogList)
			return <div className="b_content">{blogList}</div>
		} else {
			return <div className="b_content"></div>
		}
	}

	return (
		<div className="b_html">
			<div className="b_body">
				<List />
				<div className="b_type"></div>
			</div>
		</div>
	)
}

export default BlogList
