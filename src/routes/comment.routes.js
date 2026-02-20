const { Router } = require('express')
const { check } = require('express-validator')

const { validateJWT } = require('../middlewares/auth.middleware')
const { validateFields } = require('../middlewares/validateFields')

const {
    createComment,
    getCommentsByPost,
    updateComment,
    deleteComment
} = require('../controllers/comment.controller')

const router = Router()

// Crear comentario
router.post('/',
    validateJWT,
    [
        check('content', 'Content is required').not().isEmpty(),
        check('postId', 'PostId is required').not().isEmpty(),
        validateFields
    ],
    createComment
)

// Listar comentarios por publicación
router.get('/post/:postId', getCommentsByPost)

// Editar comentario
router.put('/:id',
    validateJWT,
    [
        check('content', 'Content is required').not().isEmpty(),
        validateFields
    ],
    updateComment
)

// Eliminar comentario
router.delete('/:id',
    validateJWT,
    deleteComment
)

module.exports = router