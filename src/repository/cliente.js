const Cliente = require('../models/Cliente');

const cadastrarCliente = dados => {
    let filtro;     
    if (dados.tipo == 1){
        filtro = { cpf : dados.cpf }
        dados.cnpj = "";
    }else{
        filtro = { cnpj : dados.cnpj }
        dados.cpf = "";
    }
    
    return Cliente.find(filtro).then(data => {
        if (data.length > 0) {
            return false;
        }        
        const cliente = new Cliente({ ...dados}); 
        cliente.save();
        return true;
    });
};

const listarCliente = () => {
    return Cliente.find();
};

const buscarCliente = id => {
    return Cliente.findOne({_id : id});
};

const editarCliente = (id,dados) => {
   
    if (dados.tipo == 1){
        dados.cnpj = "";
    }else{
        dados.cpf = "";
    }
    
    return Cliente.find({_id : id}).then(data => {
        if (data.length == 0) {
            return false;
        }
        return Cliente.updateOne({ _id : id}, { $set: dados }).then(registro => {
            if(registro.n == 0){          
                return false;
            } 
            return true;         
        });       
    });
};

const deletarCliente = id => {
    return Cliente.deleteOne({_id : id}).then( registro =>{
        if(registro.n == 0){            
            return false;
        }    
        return true
    });
       
};

module.exports = { cadastrarCliente, listarCliente, buscarCliente, editarCliente, deletarCliente};