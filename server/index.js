"use strict";

const { resolve } = require('path'),
    {green:success, red:error} = require( 'terminal-kit' ).terminal,
    cluster = require('cluster'),
	os = require('os');

const path = require(resolve(__dirname, '../server/config/path'));

const {port} = require(path('config')),
    server = require(path('server')),
    socket = require(path('socket'));

if(cluster.isMaster){
    for(let c = 0; c < os.cpus().length; c++)
        cluster.fork();
}
else{
    server.listen(port, (err) => {
        if (err) throw new Error(err);
    
        success(`\n\n\n\n\nServer started on port: ${ port }\n`);
        success(`Iniciando Socket...`);
        socket(server);
    });
}

cluster.on('exit', worker => {
	error(`Proceso ${worker.id}, Finalizo`);
	worker.fork();
});