import React from 'react'
import styles from '@less/svg.module.less'

const MySvg = () => {
	return (
		<svg version="1.1" id="symbol" viewBox="0 0 300 300">
			<path
				className={styles.st0}
				id="path"
				d="M177.8,128.8c-18.7,0-37.3,0-56,0.1l-13.4,14.8l41.4,63.3l41.4-63.4L177.8,128.8z"
			/>
			<polygon
				className={styles.st1}
				id="path"
				points="126.6,134.3 172.9,134.1 183.9,146.2 150,198.1 116.1,146.3 "
			/>
			<polyline className={styles.st0} id="path" points="65.8,64.5 77.9,92.9 106.7,92.8 " />
			<line className={styles.st0} id="path" x1="106" y1="54" x2="100.9" y2="79.8" />
			<polyline className={styles.st1} id="path" points="108.3,117.9 121.7,127.8 89.7,53.9 " />
			<polyline className={styles.st0} id="path" points="234.1,64.4 222,92.8 193.2,92.8 " />
			<line className={styles.st0} id="path" x1="193.9" y1="54" x2="198.9" y2="79.8" />
			<polyline className={styles.st1} id="path" points="191.6,117.9 178.2,127.8 210.1,53.9 " />
		</svg>
	)
}
export default MySvg
