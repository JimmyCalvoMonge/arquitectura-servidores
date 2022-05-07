const User = require('../models/user.model');

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
    const data = ({email, name, bio, avatar, password} = req.body);
    User.create(data)
    .then(user => {
        res.status(201).json(user);
    })
    .catch(next);
};

module.exports.update = (req,res,next) =>{

    const data = ({email, name, bio, avatar, password} = req.body);
    
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