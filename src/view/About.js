import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import imgMern from '../resources/mern.jpg'
import { GITHUB_URL } from '../contexts/constants'

const About = () => {
	return (
		<Card style={{ width: '18rem', marginTop: 100, marginLeft: 630 }}>
			<Card.Img variant='top' src={imgMern} />
			<Card.Body>
				<Card.Title>App MERN</Card.Title>
				<Card.Text>
					<ul>
						<li>
							In my fullstack MERN APP using <b>Node JS</b>,
							<b>React Js</b>, <b>Express</b> and <b>MongoDB</b>.
						</li>
						<li>
							<b>React Js</b>, <b>react-bootstrap</b> and{' '}
							<b>bootstrap</b> build the front end, <b>Node Js</b>{' '}
							for the backend and <b>MongoDB</b> for the Database.
						</li>
					</ul>
				</Card.Text>
				<Button variant='primary' href={GITHUB_URL}>
					Go My Project
				</Button>
			</Card.Body>
		</Card>
	)
}

export default About
