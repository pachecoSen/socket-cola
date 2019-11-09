"use strict";

const {resolve} = require('path'),
    {green:success, red:error} = require( 'terminal-kit' ).terminal;

const path = require(resolve(__dirname, './../../../config/path'));

const logs = require(path('logs'));

const componentes = ['done', 'ticket']

module.exports = cliente => componentes.forEach(s => {
    try {
        require(`./${s}`)(cliente);
        success(`Componente '${s}' loaded successfully \n`);
    } catch (err) {
        logs('path', err);
        error(`Componente '${s}' not loaded \n`);
    }
});