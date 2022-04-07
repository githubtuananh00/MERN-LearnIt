const apiUrl =
	process.env.NODE_ENV !== 'production'
		? 'http://localhost:5000'
		: 'https://murmuring-savannah-41896.herokuapp.com'
const LOCAL_STORAGE_TOKEN_NAME = 'learnit-mern'

const POSTS_LOADED_SUCCESS = 'POSTS_LOADED_SUCCESS'
const POSTS_LOADED_FAIL = 'POSTS_LOADED_FAIL'
const ADD_NEW_POST = 'ADD_NEW_POST'
const DELETE_POST = 'DELETE_POST'
const UPDATE_POST = 'UPDATE_POST'
const FIND_POST = 'FIND_POST'
const GITHUB_URL = 'https://github.com/githubtuananh00/MERN-LearnIt'
export {
	apiUrl,
	LOCAL_STORAGE_TOKEN_NAME,
	POSTS_LOADED_SUCCESS,
	POSTS_LOADED_FAIL,
	ADD_NEW_POST,
	DELETE_POST,
	UPDATE_POST,
	FIND_POST,
	GITHUB_URL,
}
