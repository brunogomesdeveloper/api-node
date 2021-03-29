const { cadastrarMenuLateral, listarMenuLateral, buscarMenuLateral, editarMenuLateral, deletarMenuLateral } = require('../repository/menulateral');
const Status = require('http-status')


const cadastrar = (req, res, next) => {
    const idCliente = res.locals.payload.cliente;
    const dados = req.body;
    return cadastrarMenuLateral(idCliente, dados).then(MenuLateral => {
        if (!MenuLateral){
            return res.status(Status.INTERNAL_SERVER_ERROR).end();
        }        
        return res.status(Status.OK).end();
    }).catch(error =>{ 
        next(error)
    });
};


const listar = (req, res, next) => {
    const idCliente = res.locals.payload.cliente;
    return listarMenuLateral(idCliente).then( MenuLaterals => res.json(MenuLaterals)).catch(err => next(err));
};

const buscar = (req, res, next) => {
    const idCliente = res.locals.payload.cliente;
    const {id} = req.params;
    return buscarMenuLateral(idCliente, id).then(MenuLateral => res.json(MenuLateral)).catch(err => next(err));
};


const editar = (req, res, next) => {
    const idCliente = res.locals.payload.cliente;
    const {id} = req.params;
    const MenuLateral = req.body;
    return editarMenuLateral(idCliente, id, MenuLateral).then(MenuLateral => { 
        if(!MenuLateral){
            return res.status(Status.INTERNAL_SERVER_ERROR).end(); 
        }
        return res.status(Status.OK).end();

        }).catch(err => next(err))
    
};

const deletar = (req, res, next) => {
    const {id} = req.params;
    return deletarMenuLateral(id).then(MenuLateral => { 
        if(!MenuLateral){
            return res.status(Status.INTERNAL_SERVER_ERROR).end(); 
        }
        return res.status(Status.OK).end();
        }).catch(err => next(err))    
};

module.exports = { cadastrar, listar, buscar, editar, deletar };