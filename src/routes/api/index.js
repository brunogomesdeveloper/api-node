const Router = require('express').Router();

const usuariosRouter = require('./usuarios');
const authRouter = require('./auth');
const clientesRouter = require('./cliente');
const menuLateralRouter = require('./menulateral');
const contentRouter = require('./content');
const indicadorRouter = require('./indicador');
const itemRouter = require('./item');
const graficoRouter = require('./grafico');

const endpoints = {
    message: 'API',
    endpoints: {
        usuarios: {
            caminho: '/usuarios'
        },
        cliente: {
            caminho: '/clientes'
        },
        autenticacao: {
            caminho: '/auth'
        },
        menuLateral: {
            caminho: '/menulateral'
        },
        content :{
            caminho: '/content'
        },
        indicador :{
            caminho: '/indicador'
        },
        item :{
            caminho: '/item'
        },
        grafico:{
            caminho: '/grafico'
        }
    }
};

Router.get('/', (req, res, next) => res.json(endpoints));
Router.use('/usuarios', usuariosRouter);
Router.use('/clientes', clientesRouter);
Router.use('/auth', authRouter);
Router.use('/menulateral', menuLateralRouter);
Router.use('/content', contentRouter);
Router.use('/indicador', indicadorRouter);
Router.use('/item', itemRouter);
Router.use('/grafico', graficoRouter);

module.exports = Router;