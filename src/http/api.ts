/**
 * Created by kechen on 2019/2/15.
 * 一直不喜欢阴天，灰蒙蒙的天空就像模糊了的眼睛，透露给我的永远是迷惘
 */
import axios from 'axios'
import config from '../config.json'
import storage from '../common/cookie'
import Cookies from 'js-cookie'

// 使用vuex做全局loading时使用
// import store from '@/store'

export default function $axios(options: any) {
	return new Promise<any>((resolve, reject) => {
		const instance = axios.create({
			baseURL: config.requestUrl,
			withCredentials: true,
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			transformResponse: [function (data) {}],
		})
		// request 拦截器
		instance.interceptors.request.use(
			(config) => {
				let token = Cookies.get('markToken')
				// 1. 请求开始的时候可以结合 vuex 开启全屏 loading 动画
				// console.log(store.state.loading)
				// console.log('准备发送请求...')
				// 2. 带上token
				if (token) {
					config.headers.accessToken = token
				}
				return config
			},

			(error) => {
				// 请求错误时
				console.log('request:', error)
				// 1. 判断请求超时
				if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
					console.log('timeout请求超时')
					// return service.request(originalRequest);//再重复请求一次
				}
				// 2. 需要重定向到错误页面
				const errorInfo = error.response
				console.log(errorInfo)

				return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
			}
		)

		// response 拦截器
		instance.interceptors.response.use(
			(response) => {
				let data
				// IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
				if (response.data == undefined) {
					data = JSON.parse(response.request.responseText)
				} else {
					data = response
				}

				// 根据返回的code值来做不同的处理
				switch (data.rc) {
					case 1:
						console.log(data.desc)
						break
				}
				// 若不是正确的返回code，且已经登录，就抛出错误
				// const err = new Error(data.desc)
				// err.data = data
				// err.response = response
				// throw err

				return data
			},
			(err) => {
				if (err && err.response) {
					switch (err.response.status) {
						case 400:
							err.message = '请求错误'
							break

						case 401:
							err.message = '未授权，请登录'
							break

						case 403:
							err.message = '拒绝访问'
							break

						case 404:
							err.message = `请求地址出错: ${err.response.config.url}`
							break

						case 408:
							err.message = '请求超时'
							break

						case 500:
							err.message = '服务器内部错误'
							break

						case 501:
							err.message = '服务未实现'
							break

						case 502:
							err.message = '网关错误'
							break

						case 503:
							err.message = '服务不可用'
							break

						case 504:
							err.message = '网关超时'
							break

						case 505:
							err.message = 'HTTP版本不受支持'
							break

						default:
					}
				}
				console.error(err)
				return Promise.reject(err) // 返回接口返回的错误信息
			}
		)

		// 请求处理
		instance(options)
			.then((res) => {
				resolve(res)
				return false
			})
			.catch((error) => {
				reject(error)
			})
	})
}
