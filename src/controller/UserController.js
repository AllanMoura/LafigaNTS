const { validationResult } = require('express-validator');
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    //Método POST para criar um novo usuário
    async signup(req, res) {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {username, password} = req.body;
        //Checar para vê se existe algum username igual
        try{
            let user = await User.findOne({username});
            if(user != null){ // significa que ja existe um usuário com este nome
                return res.status(400).json({msg: "Usuário ja existe"});
            } // se passar daqui, significa que não foi encontrado nenhum usuario com o mesmo nome

            user = new User({username, password});//criando um novo usuário onde possui o username e password
            //Gera uma String aleatoria que irá compor a senha do usuário
            const salt = await bcrypt.genSalt(10); 
            //cria a senha através do hash com a senha e o salt gerado
            user.password = await bcrypt.hash(password, salt);
            //Salva o usuário no banco
            await user.save();
            const payload = {user: {id: user.id}};

            jwt.sign(payload, "PINDAMOIANGABA", {expiresIn: 10000}, (err, token) =>{
                if(err){
                    throw err;
                }
                res.status(200).json({token});
            });
        }catch(e) {
            console.log(e.message);
            res.status(500).send("Error ao salvar");
        }
    },
    //Método POST para logar o usuário
    async login(req, res){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        const {username, password} = req.body;
        try{
            let user = await User.findOne({username});
            if(!user){ //caso o usuário seja vazio
                return res.status(400).json({msg: "Usuário não encontrado"});
            }
            //Comparar a senha digitada com a senha salva no banco
            const isMatch = await bcrypt.compare(password, user.password);
            //Se o match não existir
            if(!isMatch){
                return res.status(400).json({msg: "Senha errada"});
            }

            const payload = {
                user: { id: user.id}
            };
            jwt.sign(payload, "PINDAMOIANGABA", {expiresIn: 3600}, (err, token) => {
                if(err) {
                    throw err;
                }
                res.status(200).json({token});
            });
        }catch(e){
            console.log(e.message);
            res.status(500).json({msg: "Erro do servidor"});
        }
    },
    //Método GET para buscar o usuário atualmente logado através do token
    async getUser(req, res){
        try {
            const user = await User.findById(req.user.id);
            res.json(user);
        }catch(e){
            res.send({message: "Erro ao buscar usuário"});
        }
    },
};