const Post = require('../models/Post')

class PostController {
	// [POST] post
	index(req, res, next) {
		const { title, description, url, status } = req.body

		// Simple Validation
		if (!title) {
			return res
				.status(400)
				.json({ success: false, message: 'Title is required' })
		}

		const newPost = new Post({
			title,
			description,
			url: url.startsWith('https://') ? url : `https://${url}`,
			status: status || 'TO LEARN',
			user: req.userId,
		})
		newPost
			.save()
			.then((newPost) =>
				res.json({
					success: true,
					message: 'Happy Learning',
					post: newPost,
				})
			)
			.catch(() => {
				console.log(err)
				res.status(500).json({
					success: false,
					message: 'Internal server error',
				})
			})
	}
	// [GET] /post
	show(req, res, next) {
		Post.find({ user: req.userId })
			.populate('user', ['username']) //populate() chỉ lấy username trong connection user
			.then((posts) => res.json({ success: true, posts }))
			.catch(next)
	}
	// [PUT] /post/:id
	update(req, res, next) {
		const { title, description, url, status } = req.body

		// Simple Validation
		if (!title) {
			return res
				.status(400)
				.json({ success: false, message: 'Title is required' })
		}
		Post.updateOne(
			{ _id: req.params.id, user: req.userId },
			{
				title,
				description: description || '',
				url:
					(url.startsWith('https://') ? url : `https://${url}`) || '',
				status: status || 'TO LEARN',
			}
		)
			.then((post) =>
				res.json({
					success: true,
					message: 'Excellent progress!!!',
					post,
				})
			)
			.catch(() =>
				res.status(401).json({
					success: false,
					message: 'Post not found or user not authorized',
				})
			)
	}
	// [DELETE] /post/:id
	delete(req, res, next) {
		Post.deleteOne({ _id: req.params.id, user: req.userId })
			.then((post) =>
				res.json({
					success: true,
					post,
				})
			)
			.catch(() =>
				res.status(401).json({
					success: false,
					message: 'Post not found or user not authorized',
				})
			)
	}
}

module.exports = new PostController()
