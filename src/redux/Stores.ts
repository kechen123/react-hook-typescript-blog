import { createStore } from 'redux'
import reducer from './reducer'

export interface BackImage {
	image: string
	Content: Content
	isEdit: boolean
}

export interface Content {
	title: string
	type: string
	content: string
}

export type Action =
	| {
			type: 'add_image'
			todo: string
	  }
	| {
			type: 'change_title'
			boo: boolean
	  }
	| {
			type: 'set_content'
			content: JSON
	  }

export const INITIAL_STATE: BackImage = {
	image:
		'https://cn.bing.com/th?id=OHR.UnicornoftheSea_ZH-CN2949385175_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp',
	Content: {
		title: '',
		type: '',
		content: '',
	},
	isEdit: false,
}
export function makeStore() {
	return createStore(reducer, INITIAL_STATE)
}
