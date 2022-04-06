import Button from 'react-bootstrap/Button'
import playIcon from '../../resources/play-btn.svg'
import editIcon from '../../resources/pencil.svg'
import deleteIcon from '../../resources/trash.svg'
import { useContext } from 'react'
import { PostContext } from '../../contexts/PostContext'

const ActionButtons = ({ url, _id }) => {
	const { deletePost, findPost, setShowUpdateModal } = useContext(PostContext)
	const choosePost = (postId) => {
		findPost(postId)
		setShowUpdateModal(true)
	}
	return (
		<>
			<Button className='post-button' href={url} target='_blank'>
				<img src={playIcon} alt='' width='32' height='32' />
			</Button>
			<Button className='post-button' onClick={() => choosePost(_id)}>
				<img src={editIcon} alt='' width='24' height='24' />
			</Button>
			<Button className='post-button' onClick={() => deletePost(_id)}>
				<img src={deleteIcon} alt='' width='24' height='24' />
			</Button>
		</>
	)
}

export default ActionButtons
