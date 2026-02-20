const Comment = require('../models/Comment')
const Post = require('../models/Post')

const createComment = async (req, res, next) => {
    try {
        const { content, postId } = req.body

        const postExists = await Post.findById(postId)
        if (!postExists) {
            return res.status(404).json({ msg: "Post no encontrado" })
        }

        const comment = new Comment({
            content,
            author: req.user.id,
            post: postId
        })

        await comment.save()

        res.status(201).json(comment)

    } catch (error) {
        next(error)
    }
}

const getCommentsByPost = async (req, res, next) => {
    try {
        const { postId } = req.params

        const comments = await Comment.find({ post: postId })
            .populate('author', 'username email')
            .sort({ createdAt: -1 })

        res.json(comments)

    } catch (error) {
        next(error)
    }
}

const updateComment = async (req, res, next) => {
    try {
        const { id } = req.params
        const { content } = req.body

        const comment = await Comment.findById(id)

        if (!comment) {
            return res.status(404).json({ msg: "Comentario no encontrado" })
        }

        if (comment.author.toString() !== req.user.id) {
            return res.status(403).json({ msg: "No eres el autor del comentario" })
        }

        comment.content = content
        await comment.save()

        res.json(comment)

    } catch (error) {
        next(error)
    }
}

const deleteComment = async (req, res, next) => {
    try {
        const { id } = req.params

        const comment = await Comment.findById(id)

        if (!comment) {
            return res.status(404).json({ msg: "Comentario no encontrado" })
        }

        if (comment.author.toString() !== req.user.id) {
            return res.status(403).json({ msg: "No eres el autor del comentario" })
        }

        await comment.deleteOne()

        res.json({ msg: "Comentario eliminado" })

    } catch (error) {
        next(error)
    }
}

module.exports = {
    createComment,
    getCommentsByPost,
    updateComment,
    deleteComment
}