import { useContext } from 'react'
import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'
import Spinner from 'react-bootstrap/Spinner'
import { AuthContext } from '../contexts/AuthContext'
import { Route, Routes, Navigate } from 'react-router-dom'

const Auth = ({ authRouter }) => {
	const {
		stateAuth: { authLoading, isAuthenticated },
	} = useContext(AuthContext)
	let body = (
		<>
			{authRouter === 'login' && <LoginForm />}
			{authRouter === 'register' && <RegisterForm />}
		</>
	)
	if (authLoading) {
		body = (
			<div className='d-flex justify-content-center mt-2'>
				<Spinner animation='border' variant='info' />
			</div>
		)
	} else if (isAuthenticated) {
		return (
			<Routes>
				<Route
					path='*'
					element={<Navigate to='/dashboard' replace />}
				/>
			</Routes>
		)
	} else
		return (
			<div className='landing'>
				<div className='dark-overlay'>
					<div className='landing-inner'>
						<h1>LearnIt</h1>
						<h4>Keep track of what you are learning</h4>
						{body}
					</div>
				</div>
			</div>
		)
}

export default Auth
