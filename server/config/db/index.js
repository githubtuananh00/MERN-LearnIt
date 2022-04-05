const mongoose = require('mongoose')

async function connectDB() {
	try {
		await mongoose.connect('mongodb://localhost:27017/MERN-Learnit')
		console.log('Connect success!!!')
	} catch (err) {
		console.log('Connect failure')
	}
}
module.exports = { connectDB }
