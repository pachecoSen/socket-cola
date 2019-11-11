function loadNewTicket(){
    if(typeof io === "function"){
        // eslint-disable-next-line no-undef
        const socket = io();

        socket.on('ultimoTicket', function(res){
            if(true === res.est){
                document.getElementById('lblNuevoTicket').innerHTML = `Ultimo ticket es: ${res.msg.actual}`;
        
                return false;
            }
        
            console.error('Ticket no recuperado');
        });

        document.getElementById('newToket').onclick = function(){
            socket.emit('sigTicket', null, function(res){
                if(true === res.est){
                    document.getElementById('lblNuevoTicket').innerHTML = `Ultimo ticket es: ${res.msg}`;
    
                    return false;
                }
    
                console.error('Ticket no recuperado');
            });   
        };        
    }
}

loadNewTicket();