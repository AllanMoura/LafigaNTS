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
    //Busca a lista de NPCS vinculadas aquele usuário
    async get(req, res) {
        //quero buscar todos os npcs cujo userId seja igual ao id encontrado no token(que acrescenta tal id ao request)
        try {
            const npcs = await Npc.find({userId: req.user.id});
            return res.status(200).json(npcs);
        }catch(e) {
            console.log(e);
            return res.status(500).json({msg: "Erro ao buscar Npcs"})
        }
    },
    
    //Método que retorna um npc para visualização
    async show(req, res) {
        try {
            if(req.params.id == null){
                return res.status(400).json({msg: "Identificador de Npc não compatível"})
            }

            const npc = await Npc.findById(req.params.id);

            if(req.user.id != npc.userId){
                return res.status(401).json({msg: "Acesso de npc não autorizado"});
            }

            return res.status(200).json(npc);
        }catch(e) {
            console.log(e);
            return res.status(500).json({msg: "Erro ao buscar NPC."})
        }
    },
    //Método para atualizar um NPC
    async update(req, res) {

        try {

            if(req.params.id == null){
                return res.status(400).json({msg: "Identificador de npc não compatível"})
            }
            
            let npc = await Npc.findById(req.params.id);
            
            if(req.user.id != npc.userId){
                return res.status(401).json({msg: "Acesso de npc não autorizado"});
            }

            if(req.body.name === ""){
                return res.status(400).json({msg: "Nome não pode ser vazio"});
            }

            npc = await Npc.findByIdAndUpdate(req.params.id, req.body, {new: true, useFindAndModify: false});

            return res.status(200).json(npc);
        }catch(e) {
            console.log(e);
            return res.status(500).json({msg: "Erro ao atualizar NPC."});
        }
    },


};