import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import imgMern from '../resources/mern.jpg'

const About = () => {
	return (
		<Card style={{ width: '18rem', marginTop: 150, marginLeft: 630 }}>
			<Card.Img variant='top' src={imgMern} />
			<Card.Body>
				<Card.Title>App MERN</Card.Title>
				<Card.Text>
					Some quick example text to build on the card title and make
					up the bulk of the card's content.
				</Card.Text>
				<Button variant='primary'>Go somewhere</Button>
			</Card.Body>
		</Card>
	)
}

export default About
