import React, { useState } from 'react'
import { useMappedState } from 'redux-react-hook'
import { BackImage } from '../redux/Stores'
import '../assets/less/bg.less'
const mapState = (state: BackImage) => ({
	image: state.image,
})

const BgUrl = () => {
	const { image } = useMappedState(mapState)
	const [imagesize] = useState('cover')
	const [imageposition] = useState('center center')
	return (
		<div className="maincontent">
			<div
				className="fixedbg"
				style={{
					backgroundImage: 'url(' + image + ')',
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
