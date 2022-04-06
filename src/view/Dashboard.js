import { useContext, useEffect } from 'react'
import { PostContext } from '../contexts/PostContext'
import Spinner from 'react-bootstrap/Spinner'
import { AuthContext } from '../contexts/AuthContext'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Tooltip from 'react-bootstrap/Tooltip'
import Toast from 'react-bootstrap/Toast'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import SinglePost from '../components/posts/SinglePost'
import AddPostModal from '../components/posts/AddPostModal'
import addIcon from '../resources/plus-circle-fill.svg'
import UpdatePostModal from '../components/posts/UpdatePostModal'

const Dashboard = () => {
	// Context Auth
	const {
		stateAuth: {
			user: { username },
		},
	} = useContext(AuthContext)
	// Context Post
	const {
		statePost: { post, posts, postLoading },
		getPosts,
		setShowAddModal,
		showToast: { show, message, type },
		setShowToast,
	} = useContext(PostContext)
	useEffect(() => {
		getPosts()
	}, [posts])
	let body = null
	if (postLoading) {
		body = (
			<div className='spinner-container'>
				<Spinner animation='border' variant='info' />
			</div>
		)
	} else if (posts.length === 0) {
		body = (
			<>
				<Card className='text-center mx-5 my-5'>
					<Card.Header as='h1'>Hi {username}</Card.Header>
					<Card.Body>
						<Card.Title>Welcome To LearnIt</Card.Title>
						<Card.Text>
							Click the button below to track your first skill
							learn
						</Card.Text>
						<Button
							variant='primary'
							onClick={() => setShowAddModal(true)}
						>
							LearnIt
						</Button>
					</Card.Body>
				</Card>
			</>
		)
	} else {
		body = (
			<>
				<Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
					{posts.map((post) => (
						<Col key={post._id} className='my-2'>
							<SinglePost post={post} />
						</Col>
					))}
				</Row>
				{/* Open button Add Post Modal */}
				<OverlayTrigger
					placement='left'
					overlay={<Tooltip>Add a new to thing to learn</Tooltip>}
				>
					<Button
						className='btn-floating'
						onClick={() => setShowAddModal(true)}
					>
						<img src={addIcon} alt='' width='60' height='60' />
					</Button>
				</OverlayTrigger>
			</>
		)
	}
	return (
		<>
			{body}
			<AddPostModal />
			{post !== null && <UpdatePostModal />}
			{/* After post is added, show toast */}
			<Toast
				show={show}
				style={{ position: 'fixed', top: '20%', right: '10px' }}
				className={`bg-${type} text-white`}
				onClose={() =>
					setShowToast({ show: false, message: '', type: null })
				}
				delay={3000}
				autohide
			>
				{message}
			</Toast>
		</>
	)
}

export default Dashboard