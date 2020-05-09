/**
 * Created by kechen on 2019/2/15.
 * 一直不喜欢阴天，灰蒙蒙的天空就像模糊了的眼睛，透露给我的永远是迷惘
 */

import axios from './api'

export const Query = (url: string, params: any) => {
	return axios({
		url: url,
		method: 'get',
		params: params,
	})
}
export const Put = (url: string, params: any) => {
	return axios({
		url: url,
		method: 'put',
		data: params,
	})
}
export const Post = (url: string, params: any) => {
	return axios({
		url: url,
		method: 'post',
		data: params,
	})
}
export const Delete = (url: string, params: any) => {
	return axios({
		url: url,
		method: 'delete',
		data: params,
	})
}
// 默认全部导出
export default {
	Query,
	Put,
	Post,
	Delete,
}
