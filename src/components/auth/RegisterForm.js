import { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMess from '../layout/AlertMess'

const RegisterForm = () => {
	// Context
	const { registerUser } = useContext(AuthContext)
	// local state
	const [registerFrom, setRegisterFrom] = useState({
		username: '',
		password: '',
		confirmPassword: '',
	})

	// Alert
	const [alert, setAlert] = useState(null)

	//
	const { username, password, confirmPassword } = registerFrom
	const onChangeRegisterForm = (e) =>
		setRegisterFrom({ ...registerFrom, [e.target.name]: e.target.value })

	// register
	const register = async (e) => {
		e.preventDefault()
		if (password !== confirmPassword) {
			setAlert({ type: 'danger', message: 'Password do not match' })
			setTimeout(() => {
				setAlert(null)
			}, 2000)
			return
		}
		const registerData = await registerUser(registerFrom)
		if (!registerData.success) {
			setAlert({ type: 'danger', message: registerData.message })
			setTimeout(() => {
				setAlert(null)
			}, 2000)
		}
	}
	return (
		<>
			<Form onSubmit={register}>
				<AlertMess info={alert} />
				<Form.Group className='mt-4'>
					<Form.Control
						type='text'
						placeholder='Username'
						name='username'
						required
						value={username}
						onChange={onChangeRegisterForm}
					/>
				</Form.Group>
				<Form.Group className='mt-3'>
					<Form.Control
						type='password'
						placeholder='Password'
						name='password'
						required
						value={password}
						onChange={onChangeRegisterForm}
					/>
				</Form.Group>
				<Form.Group className='mt-3'>
					<Form.Control
						type='password'
						placeholder='Confirm Password'
						name='confirmPassword'
						required
						value={confirmPassword}
						onChange={onChangeRegisterForm}
					/>
				</Form.Group>
				<Button variant='success' type='submit' className='mt-4'>
					Register
				</Button>
			</Form>
			<p className='mt-4'>
				Already an account?
				<Link to='/login'>
					<Button variant='info' size='sm' className='ml-2'>
						Login
					</Button>
				</Link>
			</p>
		</>
	)
}

export default RegisterForm
