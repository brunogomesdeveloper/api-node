const Router = require('express').Router();

const { autenticarRequisicao } = require('../../middleware/auth');
const controller = require('../../controllers/clientes');

Router.get('/', autenticarRequisicao, controller.listar)
// Router.get('/:id', autenticarRequisicao, controller.buscar)
Router.get('/logado', autenticarRequisicao, controller.buscar)
Router.post('/', autenticarRequisicao, controller.cadastrar)
Router.put('/:id', autenticarRequisicao, controller.editar)
Router.delete('/:id', autenticarRequisicao, controller.deletar)

module.exports = Router;