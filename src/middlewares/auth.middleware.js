const jwt = require("jsonwebtoken");

const validateJWT = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token)
        return res.status(401).json({ message: "Acceso no autorizado, token no proporcionado" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Token inválido" });
    }
};

module.exports = { validateJWT };