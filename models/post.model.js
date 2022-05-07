const mongoose = require("mongoose");

// En sql esto sería como el tipo y nombre de columnas de una tabla. En Mongo es un esquema para los documentos.
const schema = new mongoose.Schema(
    
    {
        id : {
            type: String,
            required: true,
            unique : true,
        },
        title : {
            type: String,
            required: true,
            match: /^.{5,}$/, //5 caracteres o más...
        },
        text : {
            type: String,
            required: true,
            match: /^.{5,}$/, //5 caracteres o más...
        },
        author : {
            type: String,
            required: true,
        }
    },
    
    {
    timestamps: true, // createdAt & updatedAt
    },
      
);

module.exports = mongoose.model("Post",schema);