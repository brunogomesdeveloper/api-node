const mongoose = require('mongoose');

const graficoSchema = new mongoose.Schema({
    type : String,
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Cliente'   
    },
    data :{
        labels :[String],
        
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Grafico', graficoSchema);