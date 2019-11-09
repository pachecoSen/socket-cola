"use strict";

const {resolve} = require('path');

const path = require(resolve(__dirname, './../../../config/path'));

module.exports = app => {
    app.get('/get/socket', (req, res) => res.status(301).redirect('/socket.io/socket.io.js'));
    app.get('/get/js/:file', (req, res) => res.download(resolve(path('js'), `./${req.params.file}.js`)));
    app.get('/get/css/:file', (req, res) => res.download(resolve(path('css'), `./${req.params.file}.css`)));
}