import React, { useState, useEffect } from 'react'
import '@less/index.less'

const Index = () => {
	const [sign, setSign] = useState('')
	const [k, setK] = useState(0)
	var signString = '从你叫什么名字开始<br/><br/>后来<br/><br/>有了一切'
	const typing = () => {
		setTimeout(() => {
			const str = signString.slice(k, k + 1)
			if (str === '<') {
				setK(k + 10)
			} else {
				setK(k + 1)
			}
		}, 200)
	}
	useEffect(() => {
		setSign(signString.slice(0, k))
		if (k < signString.length) typing()
	}, [k])
	return (
		<div className="h_body">
			<div className="h_content">
				{/* <div className="h_name ">柯大晨</div> */}
				{/* <div className="h_sign" dangerouslySetInnerHTML={{ __html: sign }}></div> */}
			</div>
		</div>
	)
}
export default Index
