const { validationResult } = require('express-validator');
const Npc = require('../model/Npc');

module.exports = {
    //Método POST para receber as informações de um Npc e adiciona-lo ao usuário
    async store(req, res) {
        const errors = validationResult(req);
        //caso errors não seja vazio, houve erro na hora da validação
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        //Buscará no req.body qualquer parametro que possua os nomes: name, race...
        const {name = "", race = "", occupation = "", location = "", description = ""} = req.body;
        const userId = req.user.id;

        try {
            //cria o NPC através das variaveis que possuem o mesmo nome dos atributos do modelo
            let npc = new Npc({name, race, occupation, location, description, userId});
            await npc.save();
            return res.status(200).json(npc);
        }catch(e) {
            console.log(e);
            return res.status(500).json({msg: "Erro ao salvar usuário"});
        }
    },
};