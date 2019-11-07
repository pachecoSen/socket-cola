"use strict";

const {green:success, red:error} = require( 'terminal-kit' ).terminal;

const routes = ['redirect'];

module.exports = app => routes.forEach(r => {
    try {
        require(`./${ r }`)(app);
        success(`Route '${ r }' loaded successfully`);
    } catch (err) {
        error(`Route '${ r }' not loaded`);
    }
});