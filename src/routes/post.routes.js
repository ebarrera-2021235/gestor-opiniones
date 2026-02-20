const { Router } = require('express')
const { check } = require('express-validator')

const { validateJWT } = require('../middlewares/auth.middleware')
const { validateFields } = require('../middlewares/validateFields')

const {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost
} = require('../controllers/post.controller')

const router = Router()

// Crear publicación (protegido)
router.post('/',
    validateJWT,
    [
        check('title', 'Title is required').not().isEmpty(),
        check('category', 'Category is required').not().isEmpty(),
        check('content', 'Content is required').not().isEmpty(),
        validateFields
    ],
    createPost
)

// Listar publicaciones (público)
router.get('/', getPosts)

// Obtener por ID (público)
router.get('/:id', getPostById)

// Editar publicación (solo autor)
router.put('/:id',
    validateJWT,
    [
        check('title', 'Title is required').not().isEmpty(),
        check('category', 'Category is required').not().isEmpty(),
        check('content', 'Content is required').not().isEmpty(),
        validateFields
    ],
    updatePost
)

// Eliminar publicación (solo autor)
router.delete('/:id',
    validateJWT,
    deletePost
)

module.exports = router