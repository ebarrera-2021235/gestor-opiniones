const { Router } = require("express");
const router = Router();
const {updateUser} = require("../controllers/user.controller");
const { validateJWT } = require("../middlewares/auth.middleware");

//Esta ruta se pueda usar nada mas el usario este autenticado
router.put("/:id", validateJWT, updateUser);

module.exports = router;