import React from 'react'
import styles from '@less/pagination.module.less'

interface Pagination {
	type?: string // 分页类型
	page: number //当前页
	pageNum: number //总页数
	prevFun: Function //上一页
	nextFun: Function //下一页
	firstFun?: Function //首页
	lastFun?: Function //末页
	goFun: Function //跳转指定页
}

const Pagination = (props: Pagination) => {
	const GetPageList = () => {
		let cont = []
		const page = props.page,
			pageNum = props.pageNum,
			showMax = 7
		if (pageNum <= showMax) {
			for (let i = 1; i <= pageNum; i++) {
				cont.push({
					name: props.goFun,
					text: i,
				})
			}
		} else {
			let max = showMax
			let index = 1
			for (let i = 1; i < max; i++) {
				if (index > pageNum) break
				if (i === 1 && page > Math.ceil(showMax / 2)) {
					cont.push({
						name: props.goFun,
						text: i,
					})
					cont.push({
						name: props.prevFun,
						text: '...',
					})
					if (page + Math.ceil(showMax / 2) >= pageNum) {
						index = pageNum - Math.ceil(showMax / 2) - 1
					} else {
						index = page - 2
					}
				} else if (index <= pageNum) {
					cont.push({
						name: props.goFun,
						text: index,
					})
					index++
				}
				if (i === max - 1 && index <= pageNum) {
					if (page + Math.ceil(showMax / 2) <= pageNum) {
						cont.push({
							name: props.nextFun,
							text: '...',
						})
					}
					cont.push({
						name: props.goFun,
						text: pageNum,
					})
				}
			}
		}
		return (
			<>
				{cont.map((item, i) => {
					return (
						<div
							key={i}
							className={`d_item ${page === item.text ? 'active' : ''}`}
							onClick={(e) => {
								if (item.name) item.name(item.text)
							}}
						>
							{item.text}
						</div>
					)
				})}
			</>
		)
	}

	const Detail = () => {
		return (
			<div className={styles.dPagination}>
				<div
					className={`${styles.dBtn} ${styles.dFirst}`}
					onClick={(e) => {
						if (props.firstFun) props.firstFun()
					}}
				>
					首页
				</div>
				<div className={`${styles.dBtn} ${styles.dContent}`}>
					<GetPageList />
				</div>
				<div
					className={`${styles.dBtn} ${styles.dLast}`}
					onClick={(e) => {
						if (props.lastFun) props.lastFun()
					}}
				>
					末页
				</div>
			</div>
		)
	}
	return <Detail />
}
export default Pagination
