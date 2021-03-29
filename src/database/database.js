const mongoose = require('mongoose');
require('dotenv').config();

const connect = callback => {
    mongoose.promise = global.Promise;
    mongoose.connect(
        process.env.URI,
        { useNewUrlParser: true },
        
        callback 

    );
};

module.exports = { connect };
