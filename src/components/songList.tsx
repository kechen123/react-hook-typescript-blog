import React, { useState, useEffect } from 'react'
import { song } from '../common/interfaceList'
import '../less/songList.less'

interface IProps {
	data: Array<song>
}
const SongList = (props: IProps) => {
	return (
		<div className="songs">
			<div className="songs_content">
				{props.data.map((song, index) => {
					return (
						<div className="song_item" key={index}>
							<div className="song_index">{index + 1}</div>
							<div className="song_name">
								<span className="song_adddfavourite"></span>
								{song.name} - 歌手: {song.singer}
							</div>
							<div className="song_artist">{song.playCount}</div>
							<div className="song_artist">{song.album}</div>
							<div className="song_duration">{song.playTime}</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
export default SongList
