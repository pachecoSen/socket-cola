"use strict";

const {red:error} = require( 'terminal-kit' ).terminal,
    {resolve} = require('path');

const path = require(resolve(__dirname,'./../../../config/path'));

const ControlTicket = require(resolve(path('clases'), 'ticket'));
const controlTicket = new ControlTicket();

const logs = require(path('logs'));

module.exports = cliente =>{
    cliente.emit('ultimoTicket', {
        'est' : true,
        'msg' : {
            'actual': controlTicket.ultimoTicket()
        }
    });

    cliente.on('sigTicket', (msg, callback) =>{
        try {
            const ticket = controlTicket.siguiente();
            callback({
                'est' : true,
                'msg' : ticket
            });
        } catch (err) {
            callback({ 'est' : false });
            logs('socket', err);
            error('socket >>> Fallo de comunicacion\n');
        }
    });
}