const Content = require('../models/Content');
const Cliente = require('../models/Cliente');


const cadastrarContent = (idCliente, dados) => {
    console.log(idCliente);
    return Cliente.find({_id : idCliente}).then(data => {
        if (data.length == 0) {
            return false;
        }        
        const content = new Content({ ...dados}); 
        content.save();
        return true;
    });
};

const listarContent = idCliente => {
    return Content.find({cliente : idCliente});
};

const buscarContent = (idCliente, id) => {
    return Content.find({_id : id, cliente: idCliente});
};

const buscarContentItens = (IdCliente, IdContent) => {
    return Content.findOne({cliente : IdCliente, _id : IdContent })
    .populate({ path: 'itens', populate: { path: 'indicador' }})
    .populate({ path: 'itens', populate: { path: 'grafico' }});
}

const deletarContent = id => {
    return Content.deleteOne({_id : id}).then( registro =>{
        if(registro.n == 0){            
            return false;
        }    
        return true;
    });
      
};

const editarContent = (idCliente, id, dados) => {
       
    return Content.find({_id : id}).then(data => {
        if (data.length == 0) {
            return false;
        }
        return Content.updateOne({ _id : id, cliente : idCliente}, { $set: dados }).then(registro => {
            if(registro.n == 0){          
                return false;
            } 
            return true;         
        });       
    });
};



module.exports = { cadastrarContent, listarContent, buscarContentItens, buscarContent , deletarContent, editarContent};