// eslint-disable-next-line no-unused-vars
function newTicket (socket){
    socket.emit('ultimoTicket', null, function(res){
        if(true === res.est){
            document.getElementById('lblNuevoTicket').innerHTML = `Ultimo ticket es: ${res.msg}`;

            return false;
        }

        console.error('Ticket no recuperado');
    });

    document.getElementById('newToket').onclick = function(){
        socket.emit('sigTicket', null, function(res){
            if(true === res.est){
                console.log(res.msg);

                return false;
            }

            console.error('Ticket no recuperado');
        });   
    };

    return false;
}