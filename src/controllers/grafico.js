const { cadastrarGrafico, listarGrafico, editarGrafico} = require('../repository/grafico');
const Status = require('http-status')

const cadastrar = (req, res, next) => {
    const idCliente = res.locals.payload.cliente;
    const dados = req.body;
    console.log(dados);
    return cadastrarGrafico(idCliente, dados).then(grafico => {
        if (!grafico){
            return res.status(Status.INTERNAL_SERVER_ERROR).end();
        }        
        return res.status(Status.OK).end();
    }).catch(error =>{ 
        next(error)
    });
};

const listar = (req, res, next) => {
    const idCliente = res.locals.payload.cliente;
    return listarGrafico(idCliente).then( dados => res.json(dados)).catch(err => next(err));
};

const editar = (req, res, next) => {
    const idCliente = res.locals.payload.cliente;
    const {id} = req.params;
    const dados = req.body;
    return editarGrafico(idCliente, id, dados).then(Item => { 
        if(!Item){
            return res.status(Status.INTERNAL_SERVER_ERROR).end(); 
        }
        return res.status(Status.OK).end();

        }).catch(err => next(err))
    
};


module.exports = { cadastrar, listar, editar};