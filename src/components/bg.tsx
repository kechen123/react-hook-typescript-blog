import React, { useState } from 'react'
import '../less/bg.less'
const BgUrl = () => {
	const [bgurl] = useState('http://kedachen.com:3000/bg/a430d4a01577686900000.jpg')
	const [imagesize] = useState('cover')
	const [imageposition] = useState('center center')
	return (
		<div className="maincontent">
			<div
				className="fixedbg"
				style={{
					backgroundImage: 'url(' + bgurl + ')',
					backgroundSize: imagesize,
					backgroundPosition: imageposition,
				}}
			>
				<div
					className="mask-fixedbg"
					style={{
						background:
							'-webkit-radial-gradient(50% 50%, ellipse closest-corner, rgba(0, 0, 0, 0) 10%, rgb(34, 45, 57) 90%) ',
						opacity: '0.9',
					}}
				></div>
			</div>
		</div>
	)
}

export default BgUrl
