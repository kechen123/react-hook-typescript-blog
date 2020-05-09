import React, { useState } from 'react'
import { useMappedState, useDispatch } from 'redux-react-hook'
import { BackImage } from '../redux/Stores'
import { getData } from '../http/request'
import { imageUrl } from '../config.json'
import storage from '../common/cookie'
import util from '../common/util'
import '../assets/less/bg.less'
const mapState = (state: BackImage) => ({
	image: state.image,
})

const BgUrl = () => {
	const { image } = useMappedState(mapState)
	const dispatch = useDispatch()
	const img = storage.getStorage('backGroundImage')
	if (!image) {
		if (!img) {
			getData('/bg/bing').then((res) => {
				if (JSON.stringify(res) !== '{}') {
					storage.setStorage('backGroundImage', res.url, 86400000)
					dispatch({
						type: 'add_image',
						todo: res.url,
					})
				}
			})
		} else {
			dispatch({
				type: 'add_image',
				todo: img,
			})
		}
	}

	const [imagesize] = useState('cover')
	const [imageposition] = useState('center center')
	return (
		<div className="maincontent">
			<div
				className="fixedbg"
				style={{
					backgroundImage: 'url(' + imageUrl + image + ')',
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
