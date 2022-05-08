const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

// En sql esto sería como el tipo y nombre de columnas de una tabla. En Mongo es un esquema para los documentos.
const schema = new mongoose.Schema(
    
    {
        name: {
            type: String,
            required: true,
        },
        email : {
            type: String,
            required: true,
            unique : true,
            match:  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, //Validación de formato correcto de correo.
        },
        password : {
            type: String,
            required: true,
            match: /^.{8,}$/, //8 caracteres o más...
        },
        bio: {
            type: String,
            maxlength: 200,
        },
        active: {
            type: Boolean,
            default: false,
        },
        validate: {
            type: Boolean,
            default:false,
        }

    },
    
    {
        timestamps: true, // createdAt & updatedAt
        //Eliminar otras keys del body:
        toJSON: {
            transform : (doc,ret) =>{
                delete ret._v;
                delete ret.password;
                return ret;
            },
        },
    },
);

//Se va a ejecutar siempre antes de haber guardado un usuario nuevo.
//Encriptamos la contraseña.
schema.pre('save',function (next){
    if(this.isModified('password')){
        bcrypt.hash(this.password, 10)
        .then(hash =>{
            this.password=hash;
            next();
        })
        .catch(next)
    }
})

schema.methods.checkPassword = function (pwd) {
    return bcrypt.compare(pwd, this.password);
}

module.exports = mongoose.model("User",schema);