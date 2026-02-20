const { Schema, model } = require('mongoose')

const PostSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        trim: true
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = model('Post', PostSchema)