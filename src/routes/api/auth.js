const Router = require('express').Router();

const { autenticarRequisicao } = require('../../middleware/auth');
const controller = require('../../controllers/auth');

Router.post('/login', controller.login);
Router.post('/forgot_password', controller.forgot_password);
Router.get('/recuperarsenha', controller.validarRecuperacaoSenha)
Router.post('/logout', autenticarRequisicao, controller.logout);


module.exports = Router;