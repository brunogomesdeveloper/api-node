const Indicador = require('../models/Indicador');
const Cliente = require('../models/Cliente');


const cadastrarIndicador = (idCliente, dados) => {
    console.log(idCliente);
    return Cliente.find({_id : idCliente}).then(data => {
        if (data.length == 0) {
            return false;
        }        
        const indicador = new Indicador({ ...dados}); 
        indicador.save();
        return true;
    });
};

const listarIndicador = idCliente => {
    return Indicador.find({cliente : idCliente});
};

const buscarIndicador = (idCliente, id) => {
    return Indicador.find({_id : id, cliente: idCliente});
};

const editarIndicador = (idCliente, id, dados) => {
       
    return Indicador.find({_id : id}).then(data => {
        if (data.length == 0) {
            return false;
        }
        return Indicador.updateOne({ _id : id, cliente : idCliente}, { $set: dados }).then(registro => {
            if(registro.n == 0){          
                return false;
            } 
            return true;         
        });       
    });
};

const deletarIndicador = id => {
    return Indicador.deleteOne({_id : id}).then( registro =>{
        if(registro.n == 0){            
            return false;
        }    
        return true
    });
      
};




module.exports = { cadastrarIndicador, listarIndicador, buscarIndicador, editarIndicador, deletarIndicador };