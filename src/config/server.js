const express = require('express');
const cors = require('cors');
const app = express();

const { internalServer, notFound } = require('../middleware/errorHandler');
const routes = require('../routes');

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(internalServer);
app.use(notFound);

module.exports = app;