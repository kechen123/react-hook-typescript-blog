import { Action, BackImage } from './Stores'

export default function reducer(state: BackImage | null | undefined, action: Action) {
	if (!state) {
		return null
	}

	switch (action.type) {
		case 'add_image': {
			return {
				...state,
				lastUpdated: Date.now(),
				image: action.todo,
			}
		}

		default:
			return state
	}
}
