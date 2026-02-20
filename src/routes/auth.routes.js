const {Router} = require('express');
const router = Router();

const {register} = require("../controllers/auth.controller");

//Ruta de registro de usuario
router.post("/register", register);


//Ruta de inicio de sesion
const {login } = require("../controllers/auth.controller");

router.post("/login", login);

module.exports = router;