const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
    titulo: String,
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Cliente'   
    },
    itens: [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Item'
    }] 
},
{
    timestamps: true
});

module.exports = mongoose.model('Content', ContentSchema);