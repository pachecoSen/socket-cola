"use strict";

const { resolve } = require('path'),
    {green:success} = require( 'terminal-kit' ).terminal;

const path = require(resolve(__dirname, '../server/config/path'));

const {port} = require(path('config')),
    server = require(path('server')),
    socket = require(path('socket'));

server.listen(port, (err) => {
    if (err) throw new Error(err);

    success(`\n\n\n\n\nServer started on port: ${ port }\n`);
    success(`Iniciando Socket...`);
    socket(server);
});