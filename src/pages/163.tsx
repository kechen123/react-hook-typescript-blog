import React, { useState, useEffect, useContext, useDebugValue } from 'react'
import Lyrics from '../components/lyrics'
import SongList from '../components/songList'
import '../less/music163.less'
import { getData } from '../request'
import storage from '../common/cookie.js'
import { song } from '../common/interfaceList'

const Music163 = () => {
	const [user, setUser] = useState({
		wyy_head: '',
		wyy_name: '',
		wyy_id: '',
	})
	//当前播放列表
	const [songList, setSongList] = useState([])
	//当前播放歌曲信息
	const [songDetail, setSongDetail] = useState({
		lyric: {},
		picUrl: '',
	})
	//日推
	const [recommend, setRecommend] = useState([])
	useEffect(() => {
		getData('163/login/status', {})
			.then(result => {
				console.log(result)
			})
			.catch(err => {
				Login(111)
			})
	}, [])

	function formatDuring(mss: any) {
		var minutes = parseInt(((mss % (1000 * 60 * 60)) / (1000 * 60)).toString())
		var seconds = parseInt(((mss % (1000 * 60)) / 1000).toString())
		return minutes + ' 分 ' + seconds + ' 秒 '
	}
	// 日推
	const recommendClick = () => {
		if (recommend.length == 0) {
			const _ = storage.getStorage('_')
			console.log(_)
			getData('163/recommend/songs', { _: _ }).then(result => {
				let data = result.data.recommend
				let ritui: any = []
				for (let i = 0; i < data.length; i++) {
					let reason = data[i].reason.replace('根据你可能喜欢的单曲 ', '')
					let playtime

					if (data[i].bMusic != null) {
						playtime = data[i].bMusic.playTime
					} else {
						if (data[i].hMusic && data[i].hMusic != null) {
							playtime = data[i].hMusic.playTime
						} else {
							playtime = data[i].mMusic.playTime
						}
					}
					let o = {
						id: data[i].id, //id
						index: i + 1, //索引
						name: data[i].name, //歌名
						singer: data[i].artists[0].name, //歌手名
						album: data[i].album.name, //专辑
						reason: data[i].reason, //来自
						picUrl: data[i].album.picUrl, //封面
						playTime: formatDuring(playtime), //时长
					}
					ritui.push(o)
				}
				setRecommend(ritui)
				setSongList(ritui)
			})
		} else {
			setSongList(recommend)
		}
	}
	const Login = (phone: number, pwd?: string) => {
		let param
		if (phone === 111) {
			param = { isme: 1 }
		} else {
			param = { phone: phone, password: pwd }
		}
		storage.removeStorage('wyy_head')
		storage.removeStorage('wyy_name')
		storage.removeStorage('wyy_id')
		storage.removeStorage('_')
		getData('163/login/cellphone', param)
			.then(data => {
				const result = data.data
				if (result._) {
					storage.setStorage('_', result._)
					storage.setStorage('wyy_head', result.profile.avatarUrl)
					storage.setStorage('wyy_name', result.profile.nickname)
					storage.setStorage('wyy_id', result.profile.userId)
					setUser({
						wyy_head: result.profile.avatarUrl,
						wyy_name: result.profile.nickname,
						wyy_id: result.profile.userId,
					})
					recommendClick()
					// 			this.updateUser(result);
					// 			this.getUserDetail();
					// //              this.playlist();
					// 			this.recommendClick();
				} else {
					alert('登录失败,请检查您的账号密码是否正确')
					return
				}
			})
			.catch(err => {
				alert('登录失败:::' + err)
			})
	}
	//默认点击第一个
	const itemClick = (song: song) => {
		setSongDetail(song)
	}
	//加入播放列表
	const addSongList = (song: song) => {
		console.log(song)
	}
	return (
		<div>
			<div className="m163_body">
				<div className="m163_menu">
					<div className="btn btn-navy btn-border-rev-o m163_menu_item_active">日推-{user.wyy_name}</div>

					<div className="btn btn-navy btn-border-rev-o">播放列表</div>

					<div className="btn btn-navy btn-border-rev-o">听歌排行</div>

					<div className="btn btn-navy btn-border-rev-o">我的歌单</div>
				</div>
				<div className="m163_content">
					<div className="m163_music">
						{songList.length > 0 ? (
							<SongList data={songList} itemClick={itemClick} addFavourite={addSongList} />
						) : (
							''
						)}
					</div>
					<div className="m163_lyrics">
						<div className="songs_lyrics">
							{JSON.stringify(songDetail.lyric) !== '{}' ? (
								<Lyrics lyrics={songDetail.lyric} picUrl={songDetail.picUrl}></Lyrics>
							) : (
								''
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Music163
