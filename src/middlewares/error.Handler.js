const errorHandler = (err, req, res, next) => {
    console.error(err)

    if (err.name === 'CastError') {
        return res.status(400).json({ msg: "ID inválido" })
    }

    res.status(500).json({
        msg: "Error interno del servidor"
    })
}

module.exports = errorHandler