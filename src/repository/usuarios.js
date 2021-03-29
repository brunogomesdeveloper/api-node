
const { gerarCredenciais} = require('../service/auth');
const Usuario = require('../models/Usuario');

const cadastrarUsuario = dadosUsuario => {
    return Usuario.find({ email: dadosUsuario.email }).then(data => {
        console.log("teste");
        if (data.length > 0) {
            return false;
        }

        const credenciais = gerarCredenciais(dadosUsuario.senha);
        const usuario = new Usuario({ ...dadosUsuario, ...credenciais });
        usuario.save();
        return true;
    });
};

const listarUsuario = () => {
    return Usuario.find();
};

const buscarUsuario = id => {
    return Usuario.findOne({_id : id});
};

const buscarUsuarioCompleto = id => {
    return Usuario.findOne({_id : id }).select('passwordResetToken').select('passwordResetExpires');
}




const deletarUsuario = id => {
    return Usuario.deleteOne({_id : id}).then( registro =>{
        if(registro.n == 0){            
            return false;
        }    
        return true
    });
       
};

const editarUsuario = (id, dados) => {
    
    return Usuario.find({_id : id}).then(data => {
        if (data.length == 0) {
            return false;
        }       
 
        console.log(dados);
       return  Usuario.updateOne({ _id : id}, { $set: dados }).then(registro => {
            if(registro.n == 0){          
                return false;
            } 
            console.log('foi');
            return true;         
        });  
    });
};

// const editarUsuario = (id,dados) => {
   
    
//     return Usuario.find({_id : id}).then(data => {
//         if (data.length == 0) {
//             return false;
//         }        
//         Usuario.updateOne({ _id : id}, { $set: dados });  
//         return true;      
//     });
// };



module.exports = { cadastrarUsuario, listarUsuario, buscarUsuario, deletarUsuario, editarUsuario , buscarUsuarioCompleto};
