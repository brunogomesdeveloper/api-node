const { cadastrarItem, listarItem, editarItem , deletarItem, buscarItem } = require('../repository/item');
const Status = require('http-status')

const cadastrar = (req, res, next) => {
    const idCliente = res.locals.payload.cliente;
    const dados = req.body;
    return cadastrarItem(idCliente, dados).then(Item => {
        if (!Item){
            return res.status(Status.INTERNAL_SERVER_ERROR).end();
        }        
        return res.status(Status.OK).end();
    }).catch(error =>{ 
        next(error)
    });
};


const listar = (req, res, next) => {
    const idCliente = res.locals.payload.cliente;
    return listarItem(idCliente).then( itens => res.json(itens)).catch(err => next(err));
};

const buscar = (req, res, next) => {
    const idCliente = res.locals.payload.cliente;
    console.log(idCliente);
    const {id} = req.params;
    return buscarItem(idCliente, id).then(Item => res.json(Item)).catch(err => next(err));
};


const editar = (req, res, next) => {
    const idCliente = res.locals.payload.cliente;
    const {id} = req.params;
    const Item = req.body;
    return editarItem(idCliente, id, Item).then(Item => { 
        if(!Item){
            return res.status(Status.INTERNAL_SERVER_ERROR).end(); 
        }
        return res.status(Status.OK).end();

        }).catch(err => next(err))
    
};

const deletar = (req, res, next) => {
    const {id} = req.params;
    return deletarItem(id).then(Item => { 
        if(!Item){
            return res.status(Status.INTERNAL_SERVER_ERROR).end(); 
        }
        return res.status(Status.OK).end();
        }).catch(err => next(err))    
};


module.exports = { cadastrar, listar, buscar , editar, deletar};