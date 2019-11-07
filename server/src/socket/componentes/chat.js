"use strict";

const {green:success, red:error} = require( 'terminal-kit' ).terminal;

module.exports = cliente =>{
    cliente.on('sendMsg', (msg, callback) =>{
        try {
            cliente.broadcast.emit('receive', msg);
            callback({ 'est' : true });
            success('socket >>> Mensaje recivido y enviado\n');
        } catch (err) {
            callback({ 'est' : false });
            error('socket >>> Fallo de comunicacion\n');
        }
    });
}