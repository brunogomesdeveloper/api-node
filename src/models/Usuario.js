const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    nome: String,
    email: String,
    sobrenome: String,
    user: String,
    hash: String,
    salt: String,
    passwordResetToken:{
        type : String,
        select : false
    },
    passwordResetExpires:{
        type: Date,
        select: false
    },
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Cliente'   
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Usuario', UsuarioSchema);