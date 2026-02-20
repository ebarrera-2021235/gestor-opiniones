const moongose = require("mongoose");

const connectDB = async () => {
    try{
        await moongose.connect(process.env.MONGO_URI)
        console.log("MongoDB conectado correctamente");
    }catch(error){
        console.error("Error al conectar a MongoDB:", error);
        process.exit(1);
    }
}

module.exports = connectDB;