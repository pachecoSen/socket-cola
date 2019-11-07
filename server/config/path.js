"use strict";

const {resolve} = require('path');

const coleccionPath = {
    'config' : resolve(__dirname, './'),
    'server' : resolve(__dirname, './../src/web'),
    'socket' : resolve(__dirname, './../src/socket')
}

module.exports = path => {
    return coleccionPath[path];
}