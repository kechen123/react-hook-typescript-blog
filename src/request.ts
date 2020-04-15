import axios from 'axios'
import { useState, useEffect } from 'react'
// const url = 'http://localhost:8080/'
const url = ''

export const useGetPage = (initialUrl: string, initialParams: any) => {
	const [data, setData] = useState({})
	const [params, setParams] = useState(initialParams)
	const [isLoading, setIsLoading] = useState(true)
	const [isError, setIsError] = useState(false)
	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)
			try {
				const result = await axios.get(url + initialUrl, { params: params })
				setData(result.data)
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
	return await axios.get(url + initialUrl, { params: initialParams })
}
export const putData = async (initialUrl: string, initialParams: any) => {
	return await axios.put(url + initialUrl, initialParams)
}
export const postData = async (initialUrl: string, initialParams: any) => {
	return await axios.post(url + initialUrl, initialParams)
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
