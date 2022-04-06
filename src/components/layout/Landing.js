import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

const Landing = () => {
	return (
		<Routes>
			<Route path='*' element={<Navigate to='/login' replace />} />
		</Routes>
	)
}

export default Landing
