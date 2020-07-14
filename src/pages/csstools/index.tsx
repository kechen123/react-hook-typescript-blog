import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import styles from '@less/csstools/index.module.less'
const CssTools = ({ history }: any) => {
	const [text, setText] = useState('')
	return (
		<section>
			<div className={styles.body}>
				<div className={styles.list}></div>
				<div className={styles.content}></div>
			</div>
		</section>
	)
}
export default withRouter(CssTools)
