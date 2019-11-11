function loadIO(){
    if(typeof io === "function"){
        // eslint-disable-next-line no-undef
        const socket = io();
    
        socket.on('connect', function(){
            console.info('Conectado al servidor Socket');
        
            return false;
        });
    
        socket.on('disconnect', function(){
            console.warn('Desconectado del servidor Socket');
        
            return false;
        });
    
        socket.on('welcome', function(msg){
            console.info(msg);
            socket.emit('done', {
                'estatus' : true,
                'user' : 'Pacheco'
            }, function(res){
                if(true === res.est){
                    console.info("Comunicacion exitosa");

                    return false;
                }
        
                console.error('Error de comunicacion');
            });
        
            return false;
        });
    
        return false;
    }

    console.error("Funcion 'io' no encontrada");

    return false;
}

loadIO();