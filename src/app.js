var app = require("./config/server")
require('dotenv').config();
const database = require('./database/database');




database.connect(err => {
    if (!err) {
        app.listen(process.env.PORT, process.env.HOST, () => {
            console.log(`ouvindo ao endereço ${ process.env.HOST} na porta ${process.env.PORT}`);
        });
    } else {
        console.log(err);
    }
});

module.exports = app;


