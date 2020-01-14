import React, { useState, useEffect } from 'react'
import '../less/lyrics.less'
interface song {
	picUrl: any
	lyrics: string[]
}

const Lyrics = (audio: song) => {
	return (
		<div className="lyrics_body">
			<div className="song_img">
				<img src={audio.picUrl} />
				<span className="msk"></span>
			</div>
			<div className="lyric-content">
				{audio.lyrics.map(item => {
					return <p className="song_item">{{ item }}</p>
				})}
			</div>
		</div>
	)
}
export default Lyrics
