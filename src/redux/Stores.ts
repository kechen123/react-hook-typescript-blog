import { createStore } from 'redux'
import reducer from './reducer'

export interface BackImage {
	lastUpdated: number
	image: string
}

export type Action = {
	type: 'add_image'
	todo: string
}

export function makeStore() {
	return createStore(reducer, {
		lastUpdated: 0,
		image:
			'https://cn.bing.com/th?id=OHR.UnicornoftheSea_ZH-CN2949385175_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp',
	})
}
