import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './components/layout/Landing'
import Auth from './view/Auth'
import AuthContextReducer from './contexts/AuthContext'
import Dashboard from './view/Dashboard'
import ProtectedRoute from './components/routing/ProtectedRoute'
import About from './view/About'
import PostContextProvider from './contexts/PostContext'

function App() {
	return (
		<AuthContextReducer>
			<PostContextProvider>
				<Router>
					<Routes>
						<Route path='/' element={<Landing />} />
						<Route
							path='/login/*'
							element={<Auth authRouter='login' />}
						/>
						<Route
							path='/register'
							element={<Auth authRouter='register' />}
						/>
						<Route
							path='/dashboard/*'
							element={<ProtectedRoute component={Dashboard} />}
						/>
						<Route
							path='/about/*'
							element={<ProtectedRoute component={About} />}
						/>
					</Routes>
				</Router>
			</PostContextProvider>
		</AuthContextReducer>
	)
}

export default App
