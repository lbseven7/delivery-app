const express = require('express');
const cors = require('cors');
const { mainRouter } = require('../Router');

const app = express();

app.use(express.static('public'));
app.use(cors());
app.use(express.json());
app.use(mainRouter);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
