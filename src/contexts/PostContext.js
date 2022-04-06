import { createContext, useReducer, useState } from 'react'
import axios from 'axios'
import postReducer from '../reducers/postReducer'
import {
	ADD_NEW_POST,
	apiUrl,
	DELETE_POST,
	FIND_POST,
	POSTS_LOADED_FAIL,
	POSTS_LOADED_SUCCESS,
	UPDATE_POST,
} from './constants'

const PostContext = createContext()
const initialState = {
	post: null,
	posts: [],
	postLoading: true,
}

const PostContextProvider = ({ children }) => {
	const [statePost, dispatch] = useReducer(postReducer, initialState)

	// State AddModal
	const [showAddModal, setShowAddModal] = useState(false)
	const [showUpdateModal, setShowUpdateModal] = useState(false)
	const [showToast, setShowToast] = useState({
		show: false,
		message: '',
		type: null,
	})

	// Get all posts
	const getPosts = async () => {
		try {
			const response = await axios.get(`${apiUrl}/posts`)
			if (response.data.success) {
				dispatch({
					type: POSTS_LOADED_SUCCESS,
					payload: response.data.posts,
				})
			}
		} catch (err) {
			dispatch({ type: POSTS_LOADED_FAIL })
		}
	}
	// AddNewPost
	const addPost = async (newPost) => {
		try {
			const response = await axios.post(`${apiUrl}/posts`, newPost)
			if (response.data.success) {
				dispatch({ type: ADD_NEW_POST, payload: response.data.post })
			}
			return response.data
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server Error' }
		}
	}
	// Delete Post
	const deletePost = async (postId) => {
		try {
			const response = await axios.delete(`${apiUrl}/posts/${postId}`)
			if (response.data.success) {
				dispatch({ type: DELETE_POST, payload: postId })
			}
		} catch (error) {
			console.log(error)
		}
	}
	// Find post where user is updating post
	const findPost = (postId) => {
		const post = statePost.posts.find((post) => post._id === postId)
		dispatch({ type: FIND_POST, payload: post })
	}
	// Update Post
	const updatePost = async (updatePost) => {
		try {
			const response = await axios.put(
				`${apiUrl}/posts/${updatePost._id}`,
				updatePost
			)
			if (response.data.success) {
				dispatch({ type: UPDATE_POST, payload: response.data.post })
			}
			return response.data
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server Error' }
		}
	}
	const postContextData = {
		statePost,
		getPosts,
		showAddModal,
		setShowAddModal,
		addPost,
		showToast,
		setShowToast,
		deletePost,
		updatePost,
		findPost,
		showUpdateModal,
		setShowUpdateModal,
	}
	return (
		<PostContext.Provider value={postContextData}>
			{children}
		</PostContext.Provider>
	)
}

export { PostContext }
export default PostContextProvider
