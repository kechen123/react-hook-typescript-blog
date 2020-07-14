import React, { useState, useMemo, useEffect } from 'react'
import { useDispatch } from 'redux-react-hook'
import { withRouter } from 'react-router-dom'
import BlogItem from '@components/blog_item'
import Pagination from '@components/pagination'
import '@assets/icon/iconfont.css'
import styles from '@less/blogList.module.less'
import { useDataApi } from '../http/request'

const BlogList = ({ history }: any) => {
	const [pageSize] = useState(6)
	const [currentPage, setCurrentPage] = useState(1)
	const [pageData, setPageData] = useState<any>([])
	const [sum, setSum] = useState(0)
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
		// if (data.code === 200) {
		// 	for (let i = 0; i < data.data.length; i++) {
		// 		if (data.data[i].introduction && data.data[i].introduction.length > 150) {
		// 			data.data[i].introduction = data.data[i].introduction.substring(0, 150) + '...'
		// 		}
		// 	}
		// }
		// result = pageData.concat(data.data)
		result = data.data
	} else {
		result = pageData
	}

	const List = () => {
		if (result.length > 0) {
			const blogList = result.map((item: any, index: any) => {
				return <BlogItem Blog={item} key={index}></BlogItem>
			})
			return <div className={styles.bContent}>{blogList}</div>
		} else {
			return <div className={styles.bContent}></div>
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
	const goPage = (page: number) => {
		console.log(page)
		setCurrentPage(page)
		setParams({
			page: page,
			size: pageSize,
		})
	}
	const firstPage = () => {
		goPage(1)
	}
	const lastPage = () => {
		goPage(data.pageNum)
	}
	const prevPage = () => {
		goPage(currentPage - 1)
	}
	const nextPage = () => {
		goPage(currentPage + 1)
	}
	useEffect(() => {
		setPageData(result)
	}, [currentPage])
	return (
		<section>
			<div className={styles.bHtml}>
				<div className={styles.bBody}>
					<List />
					{data.code && data.code == 200 ? (
						<div style={{ marginTop: '30px', width: '100%' }}>
							<Pagination
								page={currentPage}
								pageNum={data.pageNum}
								prevFun={prevPage}
								nextFun={nextPage}
								firstFun={firstPage}
								lastFun={lastPage}
								goFun={goPage}
							/>
						</div>
					) : (
						''
					)}
				</div>
				<i onClick={btnClick()} className="iconfont iconshuxie"></i>
			</div>
		</section>
	)
}
export default withRouter(BlogList)
