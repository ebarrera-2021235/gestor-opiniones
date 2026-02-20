const Post = require('../models/Post')

const createPost = async (req, res) => {
    try {
        const { title, category, content } = req.body

        const post = new Post({
            title,
            category,
            content,
            author: req.user._id
        })

        await post.save()

        res.status(201).json(post)

    } catch (error) {
        res.status(500).json({ msg: 'Server error' })
    }
}

const getPosts = async (req, res) => {

    const posts = await Post.find()
        .populate('author', 'username email')
        .sort({ created_at: -1 })

    res.json(posts)
}

const getPostById = async (req, res) => {

    const { id } = req.params

    const post = await Post.findById(id)
        .populate('author', 'username email')

    if (!post) {
        return res.status(404).json({ msg: 'Post not found' })
    }

    res.json(post)
}

const updatePost = async (req, res) => {

    const { id } = req.params
    const { title, category, content } = req.body

    const post = await Post.findById(id)

    if (!post) {
        return res.status(404).json({ msg: 'Post not found' })
    }

    if (post.author.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            msg: 'You are not the author of this post'
        })
    }

    post.title = title
    post.category = category
    post.content = content

    await post.save()

    res.json(post)
}

const deletePost = async (req, res) => {

    const { id } = req.params

    const post = await Post.findById(id)

    if (!post) {
        return res.status(404).json({ msg: 'Post not found' })
    }

    if (post.author.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            msg: 'You are not the author of this post'
        })
    }

    await post.deleteOne()

    res.json({ msg: 'Post deleted successfully' })
}

module.exports = {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost
}
