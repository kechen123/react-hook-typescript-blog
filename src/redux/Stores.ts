import { createStore } from 'redux'
import reducer from './reducer'
import storage from '../common/cookie'

export interface BackImage {
	image: string
	Content: Content
	isEdit: boolean
	firstPage: boolean
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
	| {
			type: 'firstPage'
			first: boolean
	  }

const isEdit = storage.getSession('isEdit') || false
export const INITIAL_STATE: BackImage = {
	image: '',
	Content: {
		title: '',
		type: '',
		content: '',
	},
	isEdit: isEdit,
	firstPage: false,
}
export function makeStore() {
	return createStore(reducer, INITIAL_STATE)
}
