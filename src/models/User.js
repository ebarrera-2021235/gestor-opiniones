const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "El nombre de usuario es obligatorio"],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, "El correo electronico es obligatorio"],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"],
        minLength: [6, "La contraseña debe tener al menos 6 caracteres"]
    },
    status: {
        type: Boolean, 
        default: true
    }
}, { timestamps: true }); 

module.exports = model("User", UserSchema);