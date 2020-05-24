import axios from './api'
import { useReducer, useState, useEffect } from 'react'
import { requestUrl } from '../config.json'

export const useGetPage = (initialUrl: string, initialParams: any, initialData: any) => {
	const [data, setData] = useState(initialData)
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
const dataFetchReducer = (state: any, action: any) => {
	switch (action.type) {
		case 'FETCH_INIT':
			return { ...state, isLoading: true, isError: false }
		case 'FETCH_SUCCESS':
			return {
				...state,
				isLoading: false,
				isError: false,
				data: action.payload,
			}
		case 'FETCH_FAILURE':
			return {
				...state,
				isLoading: false,
				isError: true,
			}
		default:
			throw new Error()
	}
}

export const useDataApi = (initialUrl: string, initialParams: any, initialData: any) => {
	const [url, setUrl] = useState(initialUrl)
	const [params, setParams] = useState(initialParams)
	const [state, dispatch] = useReducer(dataFetchReducer, {
		isLoading: false,
		isError: false,
		data: initialData,
	})

	useEffect(() => {
		let didCancel = false
		const fetchData = async () => {
			dispatch({ type: 'FETCH_INIT' })

			try {
				const result = await axios({
					url: requestUrl + url,
					method: 'get',
					params: params,
				})
				if (!didCancel) {
					dispatch({ type: 'FETCH_SUCCESS', payload: result })
				}
			} catch (error) {
				if (!didCancel) {
					dispatch({ type: 'FETCH_FAILURE' })
				}
			}
		}

		fetchData()

		return () => {
			didCancel = true
		}
	}, [params])

	return [state, setParams]
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
