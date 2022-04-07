import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import learnItLogo from '../../resources/logo.svg'
import logoutIcon from '../../resources/logout.svg'
import Button from 'react-bootstrap/Button'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

const NavbarMenu = () => {
	const {
		stateAuth: {
			user: { username },
		},
		logoutUser,
	} = useContext(AuthContext)
	const handleLogout = () => logoutUser()
	return (
		<Navbar bg='primary' expand='lg' variant='dark' className='shadow'>
			<Navbar.Brand className='font-weight-bolder text-white' href='/'>
				<img
					src={learnItLogo}
					alt='learnItLogo'
					width='32'
					height='32'
					className='mr-2'
				/>
				LearnIt
			</Navbar.Brand>
			<Navbar.Toggle aria-controls='basic-navbar-nav' />
			<Navbar.Collapse id='basic-navbar-nav'>
				<Nav className='me-auto'>
					<Nav.Link
						className='font-weight-bolder text-white'
						href='/dashboard'
					>
						Home
					</Nav.Link>
					<Nav.Link
						className='font-weight-bolder text-white'
						href='/about'
					>
						About
					</Nav.Link>
				</Nav>
				<Nav style={{ marginLeft: 950 }}>
					<Nav.Link
						className='font-weight-bolder text-white'
						disabled
					>
						Welcome {username}
					</Nav.Link>
					<Button
						variant='secondary'
						className='font-weight-bolder text-white'
						onClick={handleLogout}
					>
						<img
							src={logoutIcon}
							alt='logoutIcon'
							width='32'
							height='32'
							className='mr-2'
						/>
						Logout
					</Button>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}

export default NavbarMenu
