import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import Spinner from 'react-bootstrap/Spinner'
import { Routes, Route, Navigate } from 'react-router-dom'
import NavbarMenu from '../layout/NavbarMenu'

const ProtectedRoute = ({ component: Component, ...rest }) => {
	const {
		stateAuth: { authLoading, isAuthenticated },
	} = useContext(AuthContext)

	if (authLoading) {
		return (
			<div className='spinner-container'>
				<Spinner animation='border' variant='info' />
			</div>
		)
	}

	if (isAuthenticated) {
		return (
			<>
				<NavbarMenu />
				<Component {...rest} />
			</>
		)
	} else {
		return (
			<Routes>
				<Route path='*' element={<Navigate to='/login' />} />
			</Routes>
		)
	}
	// return (
	// 	<Routes>
	// 		<Route
	// 			path='*'
	// 			element={(props) =>
	// 				isAuthenticated ? (
	// 					<>
	// 						<Component {...rest} {...props} />
	// 					</>
	// 				) : (
	// 					<Auth authRouter='login' />
	// 				)
	// 			}
	// 		/>
	// 	</Routes>
	// )
}

export default ProtectedRoute
