const { Router } = require("express");
const router = Router();

// Rutas de comentarios
router.get("/", (req, res) => res.send("Rutas de comentarios funcionando"));

module.exports = router;