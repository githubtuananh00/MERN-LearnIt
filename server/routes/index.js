const authRoute = require('./auth')
const postRouter = require('./post')

const routers = (app) => {
	app.use('/auth', authRoute)
	app.use('/posts', postRouter)
}

module.exports = routers
