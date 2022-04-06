import Alert from 'react-bootstrap/Alert'

import React from 'react'

const AlertMess = ({ info }) => {
	return info === null ? null : (
		<Alert variant={info.success}>{info.message}</Alert>
	)
}

export default AlertMess
