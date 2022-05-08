const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// Autenticación Actividad Semana 03

module.exports.checkAuth = async (req,res,next) => {

    // Obtener el header de la cabecera 
    const authHeader = req.headers.authorization || "";
    const token = authHeader.split(" ")[1];

    // Verificarlo.

    try {
        const decoded = jwt.verify(token,process.env.SUPER_SECRET);
        const user = await User.findById(decoded.sub);

        if(user && user.validate){
            req.user=user;
            next();
        } else {
            res.status(401).json({message:"unauthorized"});
        }

    } catch (err) {
        res.status(401).json({message:"unauthorized"});
    };



}


// Autenticación Actividad Semana 04