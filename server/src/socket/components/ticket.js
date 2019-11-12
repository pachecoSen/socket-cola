"use strict";

const {red:error} = require( 'terminal-kit' ).terminal,
    {resolve} = require('path'),
    isEmpty = require('is-empty');

const path = require(resolve(__dirname,'./../../../config/path'));

const ControlTicket = require(resolve(path('clases'), 'ticket'));
const controlTicket = new ControlTicket();

const logs = require(path('logs'));

module.exports = cliente =>{
    cliente.emit('ultimoTicket', {
        'est' : true,
        'msg' : {
            'actual': controlTicket.ultimoTicket(),
            'oldFour' : controlTicket.ultimosFour()
        }
    });

    cliente.emit('oldFour', {
        'est' : true,
        'msg' : {
            'oldFour' : controlTicket.ultimosFour()
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

    cliente.on('atender', (data, callback) => {
        try {
            if(isEmpty(data.escritorio)){
                callback({
                    'est' : true,
                    'msg' : {
                        'assignment' : false,
                        'txt' : 'Sin escritorio'
                    }
                });

                return false;    
            }

            const atender = controlTicket.atender(data.escritorio);
            if(false === atender){
                callback({
                    'est' : true,
                    'msg' : {
                        'assignment' : false,
                        'txt' : 'Sin tickets'
                    }
                });

                return false;
            }

            callback({
                'est' : true,
                'msg' : {
                    'assignment' : true,
                    'txt' : atender
                }
            });

            cliente.broadcast.emit('oldFourLive', {
                'est' : true,
                'msg' : {
                    'oldFour' : controlTicket.ultimosFour()
                }
            });
        } catch (err) {
            callback({ 'est' : false });
            logs('socket', err);
            error('socket >>> Fallo de comunicacion\n');
        }
    });
}