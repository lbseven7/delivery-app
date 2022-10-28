const express = require('express');
const { mainRouter } = require('../Router');

const app = express();

app.use(express.json());
app.use(mainRouter);
app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
