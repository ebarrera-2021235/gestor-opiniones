const User = require("../models/User");
const bcrypt = require("bcryptjs");

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { username, email, password, oldPassword } = req.body;

        // Validar que edite su propio perfil
        if (req.user.id !== userId) {
            return res.status(403).json({
                message: "No tiene el permiso para editar este perfil",
            });
        }

        const updateData = {};

        if (username) updateData.username = username;
        if (email) updateData.email = email;

        // Cambiar contraseña (debe enviar la antigua y la nueva)
        if (password) {
            if (!oldPassword) {
                return res.status(400).json({
                    message: "Debe ingresar la contraseña antigua para poder actualizarla",
                });
            }

            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }

            const isMatch = await bcrypt.compare(oldPassword, user.password); 
            if (!isMatch) {
                return res.status(400).json({
                    message: "Contraseña antigua incorrecta",
                });
            }

            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        // Actualizar usuario en la base de datos
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

        
        res.status(200).json({
            message: "Perfil actualizado correctamente",
            user: updatedUser,
        });

    } catch (error) {
        console.error("Error al actualizar el perfil:", error);
        res.status(500).json({
            message: "Error en el servidor",
        });
    }
};

module.exports = { updateUser };