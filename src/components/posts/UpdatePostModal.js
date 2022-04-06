import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useEffect, useState } from 'react'
import { PostContext } from '../../contexts/PostContext'

const UpdatePostModal = () => {
	// Context PostContext
	const {
		statePost: { post },
		showUpdateModal,
		setShowUpdateModal,
		updatePost,
		setShowToast,
	} = useContext(PostContext)

	// State AddNewPost
	const [updatedPost, setUpdatedPost] = useState(post)
	useEffect(() => {
		setUpdatedPost(post)
	}, [post])
	// Submit Form
	const onSubmit = async (e) => {
		e.preventDefault()
		const { success, message } = await updatePost(updatedPost)
		resetPostData()
		setShowToast({
			show: true,
			message,
			type: success ? 'success' : 'danger',
		})
	}
	const resetPostData = () => {
		setUpdatedPost(post)
		setShowUpdateModal(false)
	}
	const { title, description, url, status } = updatedPost
	const handleChangText = (e) => {
		setUpdatedPost({ ...updatedPost, [e.target.name]: e.target.value })
	}
	return (
		<Modal show={showUpdateModal} onHide={resetPostData}>
			<Modal.Header closeButton>
				<Modal.Title>Making progress?</Modal.Title>
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
					<Form.Group style={{ marginTop: 15 }}>
						<Form.Control
							as='select'
							value={status}
							name='status'
							onChange={handleChangText}
						>
							<option value='TO LEARN'>TO LEARN</option>
							<option value='LEARNING'>LEARNING</option>
							<option value='LEARNED'>LEARNED</option>
						</Form.Control>
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

export default UpdatePostModal
