import React, { useState, useEffect, useRef } from 'react'
import { song } from '../common/interfaceList'

import { getData } from '../request'
import '../less/songList.less'

interface IProps {
	data: Array<song>
	itemClick(params: object): void
	addFavourite(params: song): void
}

//歌词解析
function parseLrc(lrc: string) {
	if (!lrc) return ''
	const lyrics = lrc.split('\n')
	let lrcObj: any = {}
	for (let i = 0; i < lyrics.length; i++) {
		// 解码
		const lyric = decodeURIComponent(lyrics[i])
		const timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g
		const timeRegExpArr = lyric.match(timeReg)
		if (!timeRegExpArr) continue
		const clause = lyric.replace(timeReg, '')
		for (let k = 0, h = timeRegExpArr.length; k < h; k++) {
			const t = timeRegExpArr[k]
			let min = Number(String(t.match(/\[\d*/i)).slice(1))
			let sec = Number(String(t.match(/\:\d*/i)).slice(1))
			const time = min * 60 + sec
			lrcObj[time] = clause
		}
	}
	return lrcObj
}
//查询歌词
async function getSongLyric(id: number) {
	return getData('163/lyric', { id: id }).then(result => {
		if (result.data.code == 200) {
			let Lrc = {}
			if (result.data.lrc === undefined) {
				Lrc = { '0': '纯音乐,请欣赏' }
			} else {
				Lrc = parseLrc(result.data.lrc.lyric)
			}
			return Lrc
		} else {
			alert('查询歌曲出错')
		}
	})
}
//查询歌曲封面
async function getSongDetail(id: number) {
	return getData('163/song/url', { id: id }).then(result => {
		if (result.data.code == 200) {
			return result.data.data[0].url
		} else {
			alert('查询歌曲出错')
		}
	})
}
const SongList = (props: IProps) => {
	const [active, setActive] = useState(0)
	const [songDetail, setSongDetail] = useState(props.data[0])
	const submit1 = useRef(null)
	console.log(submit1)
	const songClick = (song: song, index: number) => {
		setActive(index)
		setSongDetail(song)
	}
	useEffect(() => {
		const fetchData = async () => {
			const lyric = await getSongLyric(songDetail.id)
			const url = await getSongDetail(songDetail.id)
			const song = {
				...props.data[active],
				lyric: lyric,
				url: url,
			}
			props.itemClick(song)
		}
		fetchData()
		// if (submit1.current != null) {
		// 	var rect = submit1.current.getBoundingClientRect()
		// }
	}, [active])
	return (
		<div className="songs">
			<div className="songs_content" ref={submit1}>
				{props.data.map((song, index) => {
					return (
						<div className="song_item" key={index} onClick={e => songClick(song, index)}>
							<div className="song_index">{index + 1}</div>

							<div className="song_name">
								{/* <span className="song_adddfavourite"></span> */}
								{song.name} - 歌手: {song.singer}
							</div>
							<i className="song_adddfavourite" onClick={e => props.addFavourite(song)}></i>
							{/* <div className="song_artist">{song.playCount}</div> */}
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
