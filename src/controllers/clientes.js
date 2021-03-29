const { cadastrarCliente, listarCliente, buscarCliente, editarCliente, deletarCliente} = require('../repository/cliente');
const Status = require('http-status')


const cadastrar = (req, res, next) => {
    const dados = req.body;
    return cadastrarCliente(dados).then(cliente => {
        if (!cliente){

            return res.status(Status.INTERNAL_SERVER_ERROR).end();
        }        
        return res.status(Status.OK).end();
    }).catch(error =>{  
        next(error)
    });
};

const listar = (req, res, next) => {
    return listarCliente().then( clientes => res.json(clientes)).catch(err => next(err));
};

const buscar = (req, res, next) => {
    const idCliente = res.locals.payload.cliente;
    return buscarCliente(idCliente).then(cliente => res.json(cliente)).catch(err => next(err));
};


const editar = (req, res, next) => {
    const {id} = req.params;
    const cliente = req.body;
    return editarCliente(id,cliente).then(cliente => { 
        if(!cliente){
            return res.status(Status.INTERNAL_SERVER_ERROR).end(); 
        }
        return res.status(Status.OK).end();

        }).catch(err => next(err))
    
};

const deletar = (req, res, next) => {
    const {id} = req.params;
    return deletarCliente(id).then(cliente => { 
        if(!cliente){
            return res.status(Status.INTERNAL_SERVER_ERROR).end(); 
        }
        return res.status(Status.OK).end();
        }).catch(err => next(err))    
};


module.exports = { cadastrar, listar, buscar, editar, deletar }







// module.exports = {


//     async listar(req, res){

//         // const filtro = req.query;
//         const filtro = { nome : "Jeferson"};
        
//         try{
//             clientes = await Cliente.find(filtro)
//             if(clientes.length == 0){
//                 return res.status(Status.NOT_FOUND).send('Nenhum cliente foi encontrado.')
//             }            
//             return res.status(Status.OK).json(clientes);
//         } 
//         catch (erro) {
//             res.status(Status.INTERNAL_SERVER_ERROR).send(erro.message)
//         }   
//     },


//     async buscar(req, res){

//         const {cpf} = req.params;

//         try{
//             cliente = await Cliente.findOne({ cpf: cpf})
//             if(!cliente){
//                 return res.status(Status.NOT_FOUND).send('Nenhum cliente foi encontrado.')
//             }            
//             return res.status(Status.OK).json(cliente);
//         } 
//         catch (erro) {
//             res.status(Status.INTERNAL_SERVER_ERROR).send(erro.message)
//         }   
//     },

//     async salvar(req, res){
//         console.log('teste');
//         var cli = new Cliente(req.body);

//         try{
//             novocli = await Cliente.findOne({ cpf: cli.cpf})

//             if(!novocli){
//                 novocli = await Cliente.create(cli)
//             }

//             return res.json(novocli)
//         } 
//         catch (erro) {
//             res.status(Status.INTERNAL_SERVER_ERROR).send(erro.message)
//         }
            
//     },

    
//     async editar(req, res){

//         const {id} = req.params;       
//         var cli = req.body

//         try{
//             alterado = await Cliente.updateOne({ _id : id}, { $set: cli });


//             res.status(Status.OK).send(`${alterado.nModified}`)
//         } 
//         catch (erro) {
//             res.status(Status.INTERNAL_SERVER_ERROR).send(erro.message)
//         }    
//     },

    
//     async remover(req, res){

            
//         const { cpf } = req.params;
        
//         try{            
//             Cliente.deleteOne({ cpf: cpf}, function (err) {
//                 if (err) return handleError(err);
//                 else return res.status(Status.OK).send('deletado ok')
//             });
//             // return res.send(`${alterados.nModified} registros alterados ${cli}`)
//         } 
//         catch (erro) {
//             res.status(Status.INTERNAL_SERVER_ERROR).send(erro.message)
//         }    
//     }

// }