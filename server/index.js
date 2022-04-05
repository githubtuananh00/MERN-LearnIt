const express = require('express')
const routes = require('./routes')
const cors = require('cors')
require('dotenv').config()
const app = express()

const port = process.env.PORT || 5000
app.use(express.json())
app.use(cors())
//
routes(app)
// Connect DB
const db = require('./config/db')
db.connectDB()
app.listen(port, () => {
	console.log(`App listening on port ${port}`)
})
