import axios from './api'
import { useState, useEffect } from 'react'
import { requestUrl } from '../config.json'

export const useGetPage = (initialUrl: string, initialParams: any) => {
	const [data, setData] = useState({})
	const [params, setParams] = useState(initialParams)
	const [isLoading, setIsLoading] = useState(true)
	const [isError, setIsError] = useState(false)
	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)
			try {
				const result = await axios({
					url: requestUrl + initialUrl,
					method: 'get',
					params: params,
				})
				// const result = await axios.get(requestUrl + initialUrl, { params: params })
				setData(result)
			} catch (error) {
				setIsError(true)
			}
			setIsLoading(false)
		}
		fetchData()
	}, [params])
	return [{ data, isLoading, isError } as any, setParams]
}

export const getData = async (initialUrl: string, initialParams?: any) => {
	return await axios({
		url: requestUrl + initialUrl,
		method: 'get',
		params: initialParams,
	})
	// return await axios.get(requestUrl + initialUrl, { params: initialParams })
}
export const putData = async (initialUrl: string, initialParams: any) => {
	return await axios({
		url: requestUrl + initialUrl,
		method: 'put',
		data: initialParams,
	})
	// return await axios.put(requestUrl + initialUrl, initialParams)
}
export const postData = async (initialUrl: string, initialParams: any) => {
	return await axios({
		url: requestUrl + initialUrl,
		method: 'post',
		data: initialParams,
	})
	// return await axios.post(requestUrl + initialUrl, initialParams)
}
// export const usePudddt = (initialUrl, initialData) => {
// 	const [data, setData] = useState(initialData)
// 	const [url, setUrl] = useState(initialUrl)
// 	const [isLoading, setIsLoading] = useState(true)
// 	const [isError, setIsError] = useState(false)
// 	useEffect(() => {
// 		const fetchData = async () => {
// 			setIsError(false)
// 			setIsLoading(true)
// 			try {
// 				const result = await axios(url)
// 				setData(result.data)
// 			} catch (error) {
// 				setIsError(true)
// 			}
// 			setIsLoading(false)
// 		}
// 		fetchData()
// 	}, [url])
// 	return [{ data, isLoading, isError } as any, setUrl]
// }
