import { createContext, useEffect, useReducer } from 'react'
import axios from 'axios'
import authReducer from '../reducers/authReducer'
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from './constants'
import setAuthToken from '../utils/setAuthToken'

const AuthContext = createContext()
const initialState = {
	authLoading: true,
	isAuthenticated: false,
	user: null,
}

const AuthContextReducer = ({ children }) => {
	const [stateAuth, dispatch] = useReducer(authReducer, initialState)

	// Authenticate user
	const loadUser = async () => {
		if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
			setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
		}

		try {
			const response = await axios.get(`${apiUrl}/auth`)
			if (response.data.success)
				dispatch({
					type: 'SET_AUTH',
					payload: {
						isAuthenticated: true,
						user: response.data.user,
					},
				})
		} catch (error) {
			localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
			setAuthToken(null)
			dispatch({
				type: 'SET_AUTH',
				payload: { isAuthenticated: false, user: null },
			})
		}
	}
	useEffect(() => {
		loadUser()
	}, [])

	const loginUser = async (userForm) => {
		try {
			const response = await axios.post(`${apiUrl}/auth/login`, userForm)
			if (response.data.success) {
				localStorage.setItem(
					LOCAL_STORAGE_TOKEN_NAME,
					response.data.accessToken
				)
			}
			await loadUser()
			return response.data
		} catch (err) {
			if (err.response.data) return err.response.data
			else
				return {
					success: false,
					message: err.message,
				}
		}
	}
	// register
	const registerUser = async (userForm) => {
		try {
			const response = await axios.post(
				`${apiUrl}/auth/register`,
				userForm
			)
			if (response.data.success) {
				localStorage.setItem(
					LOCAL_STORAGE_TOKEN_NAME,
					response.data.accessToken
				)
			}
			await loadUser()
			return response.data
		} catch (err) {
			if (err.response.data) return err.response.data
			else
				return {
					success: false,
					message: err.message,
				}
		}
	}
	// Logout
	const logoutUser = () => {
		localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
		dispatch({
			type: 'SET_AUTH',
			payload: {
				isAuthenticated: false,
				user: null,
			},
		})
	}
	// Context data
	const authContextData = { loginUser, registerUser, logoutUser, stateAuth }
	//Return provider
	return (
		<AuthContext.Provider value={authContextData}>
			{children}
		</AuthContext.Provider>
	)
}
export { AuthContext }
export default AuthContextReducer
