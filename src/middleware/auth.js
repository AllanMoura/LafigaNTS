const jwt = require("jsonwebtoken");

module.exports = function(req, res, next){
    const token = req.header("token");
    if(!token){
        return res.status(401).json({msg: "Erro de autenticação"});
    }

    try{
        const decoded = jwt.verify(token, "PINDAMOIANGABA");
        req.user = decoded.user;
        next();
    }catch(e){
        console.log(e.message);
        res.status(500).send({msg: "Token Inválido"});
    }
}