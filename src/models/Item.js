const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    titulo: String,
    altura: String,
    largura: String,
    cor : String,
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Cliente'   
    },
    indicador: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Indicador'   
    },
    grafico: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Grafico'   
    },
},
{
    timestamps: true
});

module.exports = mongoose.model('Item', ItemSchema);