import { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMess from '../layout/AlertMess'

const LoginForm = () => {
	// Context
	const { loginUser } = useContext(AuthContext)
	// local state
	const [loginForm, setLoginForm] = useState({
		username: '',
		password: '',
	})

	// Alert
	const [alert, setAlert] = useState(null)
	// //Route
	// const navigate = useNavigate()

	//
	const { username, password } = loginForm
	const onChangeLoginForm = (e) =>
		setLoginForm({ ...loginForm, [e.target.name]: e.target.value })

	// login
	const login = async (e) => {
		e.preventDefault()
		const loginData = await loginUser(loginForm)
		if (!loginData.success) {
			setAlert({ type: 'danger', message: loginData.message })
			setTimeout(() => {
				setAlert(null)
			}, 2000)
		}
	}
	return (
		<>
			<Form onSubmit={login}>
				<AlertMess info={alert} />
				<Form.Group className='mt-4'>
					<Form.Control
						type='text'
						placeholder='Username'
						name='username'
						required
						value={username}
						onChange={onChangeLoginForm}
					/>
				</Form.Group>
				<Form.Group className='mt-3'>
					<Form.Control
						type='password'
						placeholder='Password'
						name='password'
						required
						value={password}
						onChange={onChangeLoginForm}
					/>
				</Form.Group>
				<Button variant='success' type='submit' className='mt-4'>
					Login
				</Button>
			</Form>
			<p className='mt-4'>
				Don't have an account ?
				<Link to='/register'>
					<Button variant='info' size='sm' className='ml-4'>
						Register
					</Button>
				</Link>
			</p>
		</>
	)
}

export default LoginForm
