const { Schema, model } = require('mongoose');

const tipoPessoa = Object.freeze({
    fisica : 1,
    juridica : 2
});

const ClienteSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    sobrenome : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    cpf: {
        type: String
    },
    cnpj: {
        type: String
    },
    tipo: {
        type : Number,
        enum: Object.values(tipoPessoa),
        required : true
    },
    razaoSocial : {
        type : String
    },
    ativo: {
        type: Boolean,
        required : true,
        default: true
    },
},
{
    timestamps: true
});

module.exports = model('Cliente', ClienteSchema)