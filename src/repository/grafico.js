const Grafico = require('../models/grafico');
const Item = require('../models/Item')
const Cliente = require('../models/Cliente')


const cadastrarGrafico = (idCliente, dados) => {
    
    return Cliente.find({_id : idCliente}).then(data => {
        if (data.length == 0) {
            console.log('teste');
            return false;
        }        
        const grafico = new Grafico({ ...dados}); 
        grafico.save();
        return true;
    });
};

const listarGrafico = idCliente => {
    return Grafico.find({cliente : idCliente});
};

const editarGrafico = (idCliente, id, dados) => {
       
    return Grafico.find({_id : id}).then(data => {
        if (data.length == 0) {
            return false;
        }
        return Grafico.updateOne({ _id : id, cliente : idCliente}, { $set: dados }).then(registro => {
            if(registro.n == 0){          
                return false;
            } 
            return true;         
        });       
    });
};


module.exports = {cadastrarGrafico, listarGrafico, editarGrafico};