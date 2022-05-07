// POSTS --- actividad semana 02: 
const Post = require('../models/post.model');

module.exports.list = (req,res,next) =>{
    Post.find()
    .then((posts) => {
        res.json(posts);
    })
    .catch(next);
};

module.exports.detail = (req,res,next) =>{
    Post.findById(req.params.id)
    .then((post)=>{

        if(post){
            res.status(200).json(post);
        }else{
            res.status(404).json({message:'post not found'});
        }
    })
    .catch(next);
};

module.exports.create = (req,res,next) =>{
    const data = ({author, title, text} = req.body);
    Post.create(data)
    .then(post => {
        res.status(201).json(post);
    })
    .catch(next);
};

module.exports.update = (req,res,next) =>{

    const data = ({author,title, text} = req.body);
    
    Post.findByIdAndUpdate(req.params.id, data, {new: true})
    .then((post)=>{
        if(post){
            res.json(post);
        }else{
            res.status(404).json({message:"post not found"});
        }
    })
    .catch(next);
};

module.exports.delete = (req,res,next) =>{

    Post.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.status(204).send();
    })
    .catch(next);
};