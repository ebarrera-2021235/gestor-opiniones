//Clase que tiene como objetivo validar los datos duplicados, encriptar la contraseña y crear el usuario en la base de datos
// Tambien maneja los errores que puedan surgir durante el proceso de registro y devuelve respuestas adecuadas al cliente.
//Respuestas HTTP

const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");


const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        //Validacion si existe usuario o correo
        const userExists = await User.findOne({
            $or: [{ email }, { username }]
        })
        if (userExists) {
            return res.status(400).json({
                msg: "El usuario o correo ya existe"
            });
        }

        //Hash de la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        //Creacion del usuario
        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({
            message: "Usuario registrado correctamente"
        });
    } catch (error) {
        console.error("Error en el registro:", error);
        res.status(500).json({
            message: "Error en el servidor"
        });
    }

}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        //Buscar usuario por correo o nombre de usuario
        const user = await User.findOne({
            $or: [{ email: username }, { username: username }]
        });
        if (!user) {
            return res.status(400).json({
                message: "Usuario de correo o nombre de usuario no encontrado"
            });
        }

        //Validar contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Contraseña incorrecta"
            });
        }

        //Generar token
        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "Inicio de sesion exitoso",
            token
        });
    } catch (error) {
        console.error("Error en el inicio de sesion:", error);
        res.status(500).json({
            message: "Error en el servidor"
        });
    }
}

module.exports = { register, login };