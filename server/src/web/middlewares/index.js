"use strict";

const {green:success, red:error} = require( 'terminal-kit' ).terminal,
    {resolve}= require('path');

const path = require(resolve(__dirname, './../../../config/path'));

const logs = require(path('logs'));

const middlewares = ['redirect'];

module.exports = app => middlewares.forEach(r => {
    try {
        require(`./${ r }`)(app);
        success(`middleware '${r}' loaded successfully \n`);
    } catch (err) {
        logs('path', err);
        error(`middleware '${r}' not loaded \n`);
    }
});