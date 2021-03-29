const mongoose = require('mongoose');


const tiposDeMenu = Object.freeze({
    grafico : 1,
    cadastro : 2
});

const MenuLateralSchema = new mongoose.Schema({
    nome: String,
    icone: String,
    posicao: Number,
    menuprincipal: Boolean,
    tipo: {
        type : Number,
        enum: Object.values(tiposDeMenu)
    },
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Cliente'   
    },
    menuLateralPai :{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'MenuLateral'    
    },
    content :{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Content'
    },
    routerlink : String
},
{
    timestamps: true
});

Object.assign(MenuLateralSchema.statics, {
    tiposDeMenu,
  });


module.exports = mongoose.model('MenuLateral', MenuLateralSchema);