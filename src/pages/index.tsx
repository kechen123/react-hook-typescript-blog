import React from 'react'
import styles from '@less/index.module.less'
const Index = () => {
	console.log('index>>>>>>>>>>..')
	return (
		<section className={styles.section}>
			<div className={styles.info}>
				<h1>Hey 我是</h1>
				<h2>柯晨</h2>
				<h3> 练习时间长达五年的切图仔</h3>
				<div className={styles.detail}>
					我是一名前端开发工程师，目前在古都西安。在15-20年中做过网站,APP,小程序,微信公众号。主要技能有
					vue，jQuery，react。但是这些都不重要，重点我其实是一个
					<div>大帅比</div>
				</div>
			</div>
		</section>
	)
}
export default Index
