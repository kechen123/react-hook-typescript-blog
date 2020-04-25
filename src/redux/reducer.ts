import { Action, BackImage } from './Stores'

export default function reducer(state: BackImage | null | undefined, action: Action) {
	if (!state) {
		return null
	}

	switch (action.type) {
		case 'add_image': {
			return {
				...state,
				image: action.todo,
			}
		}
		case 'change_title': {
			return {
				...state,
				isEdit: action.boo,
			}
		}
		case 'set_content': {
			return {
				...state,
				Content: {
					title: state.Content.title,
					type: state.Content.type,
					content: state.Content.content,
				},
			}
		}
		default:
			return state
	}
}
