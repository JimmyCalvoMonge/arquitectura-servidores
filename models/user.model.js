const mongoose = require("mongoose");

// En sql esto sería como el tipo y nombre de columnas de una tabla. En Mongo es un esquema para los documentos.
const schema = new mongoose.Schema(
    
    {
        email : {
            type: String,
            required: true,
            unique : true,
        },
        name: {
            type: String,
            required: true,
        },
        bio: {
            type: String,
            maxlength: 200,
        },
        avatar: {
            type: String,
            required: true,
            default: "https://via.placeholder.com/100x100",
        },
        password : {
            type: String,
            required: true,
            match: /^.{8,}$/, //8 caracteres o más...
        }
    },
    
    {
    timestamps: true, // createdAt & updatedAt
    //Eliminar otras keys del body
    // toJSON: (obj, ret) =>{
    // },
    },

    
);

module.exports = mongoose.model("User",schema);