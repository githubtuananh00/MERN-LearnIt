import {
	ADD_NEW_POST,
	DELETE_POST,
	FIND_POST,
	POSTS_LOADED_FAIL,
	POSTS_LOADED_SUCCESS,
	UPDATE_POST,
} from '../contexts/constants'

const postReducer = (state, action) => {
	switch (action.type) {
		case POSTS_LOADED_SUCCESS:
			return {
				...state,
				posts: action.payload,
				postLoading: false,
			}
		case POSTS_LOADED_FAIL:
			return {
				...state,
				posts: [],
				postLoading: false,
			}
		case ADD_NEW_POST:
			return {
				...state,
				posts: [...state.posts, action.payload],
				postLoading: false,
			}
		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter(
					(post) => post._id !== action.payload
				),
			}
		case FIND_POST:
			return {
				...state,
				post: action.payload,
			}
		case UPDATE_POST:
			const newPosts = state.posts.map((post) =>
				post._id === action.payload._id ? action.payload : post
			)

			return {
				...state,
				posts: newPosts,
			}
		default:
			return state
	}
}

export default postReducer
