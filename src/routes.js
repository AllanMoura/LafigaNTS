const express = require('express');
const { check, validationResult} = require('express-validator');
const auth = require('./middleware/auth');
const routes = express.Router();

const userController = require('./controller/UserController');

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

module.exports = routes;