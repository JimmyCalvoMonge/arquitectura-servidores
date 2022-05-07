const jwt = require("jsonwebtoken");

module.exports.checkAuth = (req,res,next) => {

    // Obtener el header de la cabecera 
    const authHeader = req.headers.authorization || "";
    const token = authHeader.split(" ")[1];

    // Verificarlo.

    try {
        const decoded = jwt.verify(token,process.env.SUPER_SECRET);
        console.log(`user ${decoded.sub}`);
        next(); //Todos los controladores que proteja con este middleware solo van a llamar a next si no se da un error.
    } catch (err) {
        res.status(401).json({message:"unauthorized"});
    };



}