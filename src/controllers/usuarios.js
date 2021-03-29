const { cadastrarUsuario, listarUsuario, buscarUsuario, deletarUsuario, editarUsuario } = require('../repository/usuarios');
const Status = require('http-status');

const cadastro = (req, res, next) => {
    const dadosUsuario = req.body;
    return cadastrarUsuario(dadosUsuario)
        .then(usuario => {
            if (!usuario) {
                return res.status(409).end();
            }
            
            return res.status(200).end();
        })
        .catch(error => next(error));
};

const listar = (req, res, next) => {
    return listarUsuario().then( usuarios => res.json(usuarios)).catch(err => next(err));
};

const buscar = (req, res, next) => {
    const {id} = req.params;
    return buscarUsuario(id).then(usuario => res.json(usuario)).catch(err => next(err));
};

const buscarLogado = (req, res, next) => {
    const id = res.locals.payload.id;
    return buscarUsuario(id).then(usuario => res.json(usuario)).catch(err => next(err));
};


const deletar = (req, res, next) => {
    console.log('1');
    const {id} = req.params;
    return deletarUsuario(id).then(usuario => { 
        if(!usuario){
            return res.status(Status.INTERNAL_SERVER_ERROR).end(); 
        }
        return res.status(Status.OK).end();
        }).catch(err => next(err))    
};


const editar = (req, res, next) => {
    const {id} = req.params;
    const usuario = req.body;
    return editarUsuario(id,usuario).then(resposta => { 
        if(!resposta){
            return res.status(Status.INTERNAL_SERVER_ERROR).end(); 
        }
        return res.status(Status.OK).end();

        }).catch(err => next(err))
    
};



module.exports = { cadastro, listar, buscar, deletar, editar, buscarLogado};
