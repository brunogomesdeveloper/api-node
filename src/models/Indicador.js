const mongoose = require('mongoose');

const IndicadorSchema = new mongoose.Schema({
    nome: String,
    tipo: String,
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Cliente'   
    },
},
{
    timestamps: true
});

module.exports = mongoose.model('Indicador', IndicadorSchema);