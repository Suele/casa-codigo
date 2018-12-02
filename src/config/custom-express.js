require('marko/node-require').install();// para o node
require('marko/express');// para o express
const express = require('express');
const app = express();
const router = require('../app/router/router');// importação da rota.
router(app);

module.exports = app;