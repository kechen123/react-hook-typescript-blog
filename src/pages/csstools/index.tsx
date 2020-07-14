import React from 'react'
import { withRouter } from 'react-router-dom'
import styles from '@less/csstools/index.module.less'
const CssTools = ({ history }: any) => {
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
