"use strict";

const {green:success, red:error} = require( 'terminal-kit' ).terminal,
    {resolve}= require('path');

const path = require(resolve(__dirname, './../../../config/path'));

const logs = require(path('logs'));

const routes = ['redirect', 'ticket'];

module.exports = app => routes.forEach(r => {
    try {
        require(`./${r}`)(app);
        success(`Route '${ r }' loaded successfully \n`);
    } catch (err) {
        logs('path', err);
        error(`Route '${ r }' not loaded \n`);
    }
});