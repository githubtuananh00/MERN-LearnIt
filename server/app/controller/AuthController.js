const User = require('../models/User')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

class AuthController {
	// [POST] auth/register
	async register(req, res, next) {
		const { username, password } = req.body

		// Simple validation
		if (!username || !password) {
			return res.status(400).json({
				success: false,
				message: 'Missing username and/or password!!!',
			})
		}
		try {
			const user = await User.findOne({ username: username })
			if (user) {
				return res
					.status(400)
					.json({ success: false, message: 'Username already taken' })
			}

			// All good
			const hashPassword = await argon2.hash(password)
			const newUser = new User({
				username,
				password: hashPassword,
			})
			await newUser.save()
			// Return token
			const accessToken = jwt.sign(
				{ userId: newUser._id },
				process.env.ACCESS_TOKEN_SECRET
			)
			res.json({
				success: true,
				message: 'Username create successfully',
				accessToken,
			})
		} catch (err) {
			// next
			console.log(err)
			res.status(500).json({
				success: false,
				message: 'Internal server error',
			})
		}
		// res.send('ok')
	}

	// [POST] auth/login
	async login(req, res, next) {
		const { username, password } = req.body

		// Simple validation
		if (!username || !password) {
			return res.status(400).json({
				success: false,
				message: 'Missing username and/or password!!!',
			})
		}
		try {
			// Check username
			const user = await User.findOne({ username: username })
			if (!user) {
				return res.status(400).json({
					success: false,
					message: 'Incorrect username or password',
				})
			}
			const isPassword = await argon2.verify(user.password, password)
			if (!isPassword) {
				return res.status(400).json({
					success: false,
					message: 'Incorrect username or password',
				})
			}
			const accessToken = jwt.sign(
				{ userId: user._id },
				process.env.ACCESS_TOKEN_SECRET
			)
			res.json({
				success: true,
				message: 'Login successfully',
				accessToken,
			})
		} catch (err) {
			console.log(err)
			res.status(500).json({
				success: false,
				message: 'Internal server error',
			})
		}
	}
	// [GET] /auth
	isAuthenticated(req, res, next) {
		User.findOne({ _id: req.userId })
			.select('-password')
			.then((user) => res.json({ success: true, user }))
			.catch(() =>
				res
					.status(400)
					.json({ success: false, message: 'User not found' })
			)
	}
}

module.exports = new AuthController()
