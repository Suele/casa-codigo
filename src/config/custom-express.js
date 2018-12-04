require('marko/node-require').install();// para o node
require('marko/express');// para o express

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('../app/router/router');// importação da rota.

app.use(bodyParser.urlencoded({ extended:true }));

router(app);

module.exports = app;