const { cadastrarIndicador, listarIndicador, editarIndicador, deletarIndicador , buscarIndicador } = require('../repository/indicador');
const Status = require('http-status')

const cadastrar = (req, res, next) => {
    const idCliente = res.locals.payload.cliente;
    const dados = req.body;
    return cadastrarIndicador(idCliente, dados).then(Indicador => {
        if (!Indicador){
            return res.status(Status.INTERNAL_SERVER_ERROR).end();
        }        
        return res.status(Status.OK).end();
    }).catch(error =>{ 
        next(error)
    });
};


const listar = (req, res, next) => {
    const idCliente = res.locals.payload.cliente;
    return listarIndicador(idCliente).then( Indicadors => res.json(Indicadors)).catch(err => next(err));
};

const buscar = (req, res, next) => {
    const idCliente = res.locals.payload.cliente;
    const {id} = req.params;
    return buscarIndicador(idCliente, id).then(Indicador => res.json(Indicador)).catch(err => next(err));
};


const editar = (req, res, next) => {
    const idCliente = res.locals.payload.cliente;
    const {id} = req.params;
    const Indicador = req.body;
    return editarIndicador(idCliente, id, Indicador).then(Indicador => { 
        if(!Indicador){
            return res.status(Status.INTERNAL_SERVER_ERROR).end(); 
        }
        return res.status(Status.OK).end();

        }).catch(err => next(err))
    
};

const deletar = (req, res, next) => {
    const {id} = req.params;
    return deletarIndicador(id).then(Indicador => { 
        if(!Indicador){
            return res.status(Status.INTERNAL_SERVER_ERROR).end(); 
        }
        return res.status(Status.OK).end();
        }).catch(err => next(err))    
};


module.exports = { cadastrar, listar, buscar, editar, deletar };