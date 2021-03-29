const Router = require('express').Router();

const { autenticarRequisicao } = require('../../middleware/auth');
const controller = require('../../controllers/content.js');

Router.post('/', autenticarRequisicao, controller.cadastrar);
Router.get('/', autenticarRequisicao, controller.listar);
Router.get('/:id', autenticarRequisicao, controller.buscar)
Router.get('/itens/:id', autenticarRequisicao, controller.buscarItens)
Router.put('/:id', autenticarRequisicao, controller.editar)
Router.delete('/:id', autenticarRequisicao, controller.deletar)

module.exports = Router;