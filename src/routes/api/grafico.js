const Router = require('express').Router();

const { autenticarRequisicao } = require('../../middleware/auth');
const controller = require('../../controllers/grafico');

Router.post('/', autenticarRequisicao, controller.cadastrar);
Router.get('/', autenticarRequisicao, controller.listar);
Router.put('/:id', autenticarRequisicao, controller.editar);

module.exports = Router;