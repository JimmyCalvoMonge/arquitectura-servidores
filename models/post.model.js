const mongoose = require("mongoose");

// En sql esto sería como el tipo y nombre de columnas de una tabla. En Mongo es un esquema para los documentos.
const schema = new mongoose.Schema(
    
    {
        author : {
            type: String,
            required: true,
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
        }
    },
    
    {
        timestamps: true, // createdAt & updatedAt
        toJSON : { // Esto lo agregamos viendo la clase 3
            transform: (doc,ret)=>{
                delete ret._v;
                ret.id=ret._id;
                delete ret._id;
                return ret;
            },
        }
    },
      
);

module.exports = mongoose.model("Post",schema);