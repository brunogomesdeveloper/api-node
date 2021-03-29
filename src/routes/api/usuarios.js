const Router = require('express').Router();

const { autenticarRequisicao } = require('../../middleware/auth');
const { validarUsuario, validarSenha } = require('../../middleware/validacao');
const controller = require('../../controllers/usuarios');



Router.get('/', autenticarRequisicao, controller.listar);
Router.get('/logado', autenticarRequisicao, controller.buscarLogado);
Router.get('/:id', autenticarRequisicao, controller.buscar);
Router.delete('/:id', autenticarRequisicao, controller.deletar);
Router.put('/:id', autenticarRequisicao, controller.editar);

Router.use(validarUsuario);
Router.post('/', validarSenha, controller.cadastro);






module.exports = Router;
