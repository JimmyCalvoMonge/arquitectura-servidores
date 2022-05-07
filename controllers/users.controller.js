const User = require('../models/user.model');
const createError = require("http-errors");
const jwt = require('jsonwebtoken');

module.exports.list = (req,res,next) =>{
    User.find()
    .then((users) => {
        res.json(users);
    })
    .catch(next);
};

module.exports.detail = (req,res,next) =>{
    User.findById(req.params.id)
    .then((user)=>{

        if(user){
            res.json(user);
        }else{
            res.status(404).json({message:'user not found'});
        }
    })
    .catch(next);
};

module.exports.create = (req,res,next) =>{
    const data = ({name,email,password,bio,active} = req.body);
    User.create(data)
    .then(user => {
        res.status(201).json(user);
    })
    .catch(next);
};

module.exports.update = (req,res,next) =>{
    const data = ({name,email,password,bio,active} = req.body);
    User.findByIdAndUpdate(req.params.id, data, {new: true})
    .then((user)=>{
        if(user){
            res.json(user);
        }else{
            res.status(404).json({message:"user not found"});
        }
    })
    .catch(next);
};

module.exports.delete = (req,res,next) =>{

    User.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.status(204).send();
    })
    .catch(next);
};

// Actividad Semana 03 //
module.exports.login = (req,res,next) =>{

    User.findOne({email: req.body.email})
    .then( user =>{
        if(user){
            user.checkPassword(req.body.password)
            .then( match =>{
                if(match){

                    // Sesión de usuario
                    const token = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60), // Dentro de 1 hora.
                        sub : user.id,
                      }, process.env.SUPER_SECRET);

                      res.json({access_token: token});

                }else{
                    next(createError(401,"invalid credentials"));
                }
            })
            .catch(next);
        }else{
            next(createError(401,"invalid credentials"));
        }
    }
    )
    .catch(next);
}