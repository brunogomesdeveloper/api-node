const { cadastrarContent, listarContent, buscarContentItens , buscarContent , deletarContent, editarContent} = require('../repository/content');
const Status = require('http-status')

const cadastrar = (req, res, next) => {
    const idCliente = res.locals.payload.cliente;
    const dados = req.body;
    return cadastrarContent(idCliente, dados).then(Content => {
        if (!Content){
            return res.status(Status.INTERNAL_SERVER_ERROR).end();
        }        
        return res.status(Status.OK).end();
    }).catch(error =>{ 
        next(error)
    });
};


const listar = (req, res, next) => {
    const idCliente = res.locals.payload.cliente;
    return listarContent(idCliente).then( Contents => res.json(Contents)).catch(err => next(err));
};

const buscar = (req, res, next) => {
    const idCliente = res.locals.payload.cliente;
    const {id} = req.params;
    return buscarContent(idCliente, id).then(Content => res.json(Content)).catch(err => next(err));
};

const buscarItens = (req, res, next) => {
    const idCliente = res.locals.payload.cliente;
    const {id} = req.params;
    return buscarContentItens(idCliente, id).then(Content => res.json(Content)).catch(err => next(err));
};

const editar = (req, res, next) => {
    const idCliente = res.locals.payload.cliente;
    const {id} = req.params;
    const Content = req.body;
    return editarContent(idCliente, id, Content).then(Content => { 
        if(!Content){
            return res.status(Status.INTERNAL_SERVER_ERROR).end(); 
        }
        return res.status(Status.OK).end();

        }).catch(err => next(err))
    
};

const deletar = (req, res, next) => {
    const {id} = req.params;
    return deletarContent(id).then(Content => { 
        if(!Content){
            return res.status(Status.INTERNAL_SERVER_ERROR).end(); 
        }
        return res.status(Status.OK).end();
        }).catch(err => next(err))    
};

const buscarSubMenu = (req, res, next) => {
    const idCliente = res.locals.payload.cliente;
    const {id} = req.params;
    console.log('buscar');
    console.log(id);
    console.log(req.params);
    return buscarContentSubMenu(idCliente, id)
        .then(MenuContent => res.json(MenuContent))
        .catch(err => next(err));
};


module.exports = { cadastrar, listar, buscar, buscarSubMenu, editar, deletar, buscarItens };