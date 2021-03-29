const Item = require('../models/Item');
const Cliente = require('../models/Cliente');


const cadastrarItem = (idCliente, dados) => {
    console.log(idCliente);
    return Cliente.find({_id : idCliente}).then(data => {
        if (data.length == 0) {
            console.log('teste');
            return false;
        }        
        const item = new Item({ ...dados}); 
        item.save();
        return true;
    });
};


const listarItem = idCliente => {
    return Item.find({cliente : idCliente});
};

const buscarItem = (idCliente, id) => {
    return Item.find({_id : id, cliente: idCliente});
};

const editarItem = (idCliente, id, dados) => {
       
    return Item.find({_id : id}).then(data => {
        if (data.length == 0) {
            return false;
        }
        return Item.updateOne({ _id : id, cliente : idCliente}, { $set: dados }).then(registro => {
            if(registro.n == 0){          
                return false;
            } 
            return true;         
        });       
    });
};

const deletarItem = id => {
    return Item.deleteOne({_id : id}).then( registro =>{
        if(registro.n == 0){            
            return false;
        }    
        return true
    });
      
};


module.exports = { cadastrarItem, listarItem, buscarItem, editarItem , deletarItem};