"use strict";

const socketIO = require('socket.io'),
    {green:success, blue:info} = require( 'terminal-kit' ).terminal,
    {resolve} = require('path');

module.exports = server => {
    success('... OK!\n\n')
    const io = socketIO(server);

    io.on('connect', cliente => {
        info('socket >>> Cliente conectado\n');
        
        cliente.emit('welcome', {
            'msg' : 'Bienvenido a la aplicacion'
        });

        ['bienvenida', 'chat'].forEach(s => require(resolve(__dirname, './componentes/', s))(cliente));
        
        cliente.on('disconnect', () => {
            info('socket>>> Cliente desconectado\n');
        });
    })

}