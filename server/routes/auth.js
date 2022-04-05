const express = require('express')
const router = express.Router()
const verifyToken = require('../app/middleware/auth')

// Lấy Controller
const authController = require('../app/controller/AuthController')
// HTTP
router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/', verifyToken, authController.isAuthenticated)

// exports
module.exports = router
