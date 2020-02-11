const express = require('express');
const { check, validationResult} = require('express-validator');
const auth = require('./middleware/auth');
const routes = express.Router();

const userController = require('./controller/UserController');
const npcController = require('./controller/NpcController');

//Criar um usuario e gerar o token de login
routes.post('/user/signup', [
    check("username", "Insira um nome de usuário válido").not().isEmpty(),
    check("password", "Insira uma senha válida").isLength({min: 6})
], userController.signup);
//Checar se username e senha são compativeis e gerar um token de login
routes.post('/user/login', [
    check("username", "Insira um nome de usuário válido").not().isEmpty(),
    check("password", "Insira uma senha válida").isLength({min: 6})
], userController.login);
//Buscar o usuário através do token
routes.get('/user/me', auth, userController.getUser);

// --------------------------------- Rotas para NPC ---------------------------------------
//Método para armazenar um novo NPC - precisa estar logado para usar
routes.post('/npcs', auth, [
    check("name", "É necessário possuir ao menos o nome do NPC").not().isEmpty()    
], npcController.store);
//Metodo para buscar os npcs de um usuário específico;
routes.get('/npcs', auth, npcController.get);
//Método para buscar um único NPC
routes.get('/npcs/:id', auth, npcController.show);
//Método para atualizar npc
routes.put('/npcs/:id', auth, npcController.update);

module.exports = routes;