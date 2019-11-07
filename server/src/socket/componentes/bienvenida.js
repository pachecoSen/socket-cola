"use strict";

const {green:success, red:error} = require( 'terminal-kit' ).terminal;

module.exports = cliente => {
    cliente.on('done', (msg, callback) => {
        try {
            callback({ 'est' : true });
            false === msg.estatus ? error('socket >>> Fallo de comunicacion\n') : success('socket >>> Comunicacion exitosa\n');   
        } catch (err) {
            callback({ 'est' : false });
            error('socket >>> Fallo de comunicacion\n');
        }
    });
}