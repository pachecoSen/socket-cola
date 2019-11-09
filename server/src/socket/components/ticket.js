"use strict";

const {red:error} = require( 'terminal-kit' ).terminal,
    {resolve} = require('path');

const path = require(resolve(__dirname,'./../../../config/path'));

const Ticket = require(resolve(path('clases'), 'ticket'));
const newTicket = new Ticket();

const logs = require(path('logs'));

module.exports = cliente =>{
    cliente.on('ultimoTicket', (msg, callback) => {
        try {
            const ticket = newTicket.ultimoTicket();
            console.log(ticket);
            callback({
                'est' : true,
                'msg' : ticket
            });
        } catch (err) {
            console.log(err);
            
            callback({ 'est' : false });
            logs('socket', err);
            error('socket >>> Fallo de comunicacion\n');
        }
    });

    cliente.on('sigTicket', (msg, callback) =>{
        try {
            const ticket = newTicket.siguiente();
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