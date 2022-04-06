import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState } from 'react'
import { PostContext } from '../../contexts/PostContext'

const AddPostModal = () => {
	// Context PostContext
	const { showAddModal, setShowAddModal, addPost, setShowToast } =
		useContext(PostContext)

	// State AddNewPost
	const [newPost, setNewPost] = useState({
		title: '',
		description: '',
		url: '',
		status: 'TO LEARN',
	})
	// Submit Form
	const onSubmit = async (e) => {
		e.preventDefault()
		const { success, message } = await addPost(newPost)
		resetPostData()
		setShowToast({
			show: true,
			message,
			type: success ? 'success' : 'danger',
		})
	}
	const resetPostData = () => {
		setNewPost({
			title: '',
			description: '',
			url: '',
			status: 'TO LEARN',
		})
		setShowAddModal(false)
	}
	const { title, description, url } = newPost
	const handleChangText = (e) => {
		setNewPost({ ...newPost, [e.target.name]: e.target.value })
	}
	return (
		<Modal show={showAddModal} onHide={resetPostData}>
			<Modal.Header closeButton>
				<Modal.Title>What do you want to learn?</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
				<Modal.Body>
					<Form.Group>
						<Form.Control
							type='text'
							placeholder='Title'
							name='title'
							required
							aria-describedby='title-help'
							value={title}
							onChange={handleChangText}
						/>
						<Form.Text
							id='title-help'
							muted
							style={{ marginTop: 15 }}
						>
							Required
						</Form.Text>
					</Form.Group>
					<Form.Group style={{ marginTop: 10 }}>
						<Form.Control
							as='textarea'
							rows={4}
							placeholder='Description'
							name='description'
							value={description}
							onChange={handleChangText}
						/>
					</Form.Group>
					<Form.Group style={{ marginTop: 15 }}>
						<Form.Control
							type='text'
							placeholder='Youtube Tutorial URL'
							name='url'
							value={url}
							onChange={handleChangText}
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={resetPostData}>
						Cancel
					</Button>
					<Button variant='primary' type='submit'>
						LearnIt!
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	)
}

export default AddPostModal
