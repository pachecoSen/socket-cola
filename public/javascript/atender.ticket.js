function loadAtenderTicket(){
    if(typeof io === "function"){
        // eslint-disable-next-line no-undef
        const socket = io(),
            escritorio = new URL(window.location.href).searchParams.get('escritorio');

        if(!/^\d+$/.test(escritorio)){
            console.error('Sin Escritorio o valor no valido');
            
            return false;
        }

        document.getElementById('atender').onclick = function() {
            socket.emit('atender', {escritorio}, function(res) {
                if(true === res.est){
                    if(true === res.msg.assignment){
                        document.getElementById('txtEscritorio').innerHTML = res.msg.txt.escritorio;
                        document.getElementById('txtTicket').innerHTML = res.msg.txt.numero;

                        return false;
                    }
                    
                    $('#alertSnT').modal('show');
                    console.error(res.msg.txt);
    
                    return false;
                }
    
                console.error('Ticket no recuperado');
            })
        }
    }
}

loadAtenderTicket();