const authReducers = (state, actions) => {
	switch (actions.type) {
		case 'SET_AUTH':
			return {
				...state,
				authLoading: false,
				isAuthenticated: actions.payload.isAuthenticated,
				user: actions.payload.user,
			}

		default:
			return state
	}
}

export default authReducers
