const express = require('express')
const router = express.Router()
const verifyToken = require('../app/middleware/auth')

// Lấy Controller
const postController = require('../app/controller/PostController')
// HTTP
router.put('/:id', verifyToken, postController.update)
router.delete('/:id', verifyToken, postController.delete)
router.post('/', verifyToken, postController.index)
router.get('/', verifyToken, postController.show)
// router.get('/login', postController.login)

// exports
module.exports = router
