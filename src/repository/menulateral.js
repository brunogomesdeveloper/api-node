const MenuLateral = require('../models/MenuLateral');
const Cliente = require('../models/Cliente');


const cadastrarMenuLateral = (idCliente, dados) => {
    console.log(idCliente);
    return Cliente.find({_id : idCliente}).then(data => {
        if (data.length == 0) {
            return false;
        }        
        const menulateral = new MenuLateral({ ...dados}); 
        menulateral.save();
        return true;
    });
};

const listarMenuLateral = idCliente => {
    return MenuLateral.find({cliente : idCliente});
};

const buscarMenuLateral = (idCliente, id) => {
    return MenuLateral.find({_id : id, cliente: idCliente});
};

const editarMenuLateral = (idCliente, id, dados) => {
       
    return MenuLateral.find({_id : id}).then(data => {
        if (data.length == 0) {
            return false;
        }
        return MenuLateral.updateOne({ _id : id, cliente : idCliente}, { $set: dados }).then(registro => {
            if(registro.n == 0){          
                return false;
            } 
            return true;         
        });       
    });
};

const deletarMenuLateral = id => {
    return MenuLateral.deleteOne({_id : id}).then( registro =>{
        if(registro.n == 0){            
            return false;
        }    
        return true
    });
      
};


module.exports = { cadastrarMenuLateral, listarMenuLateral, buscarMenuLateral, editarMenuLateral, deletarMenuLateral };