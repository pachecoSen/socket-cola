"use strict";

const {resolve} = require('path');

const rutas = [
    'bienvenida',
    'chat'
]

module.exports = cliente => rutas.forEach(s => require(resolve(__dirname, './', s))(cliente));