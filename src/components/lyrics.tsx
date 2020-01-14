import React, { useState, useEffect } from 'react'
import '../less/lyrics.less'
interface song {
	picUrl: any
	lyrics: object
}

const Lyrics = (audio: song) => {
	const list = Object.values(audio.lyrics)
	return (
		<div className="lyrics_body">
			<div className="song_img">
				<img src={audio.picUrl} />
				<span className="msk"></span>
			</div>
			<div className="lyric-content">
				{list.map((item, index) => {
					return (
						<p className="song_item" key={index}>
							{item}
						</p>
					)
				})}
			</div>
		</div>
	)
}
export default Lyrics
