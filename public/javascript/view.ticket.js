function viewTicket(res){
    if(true === res.est){
        res.msg.oldFour.forEach(function(i, e){
            document.getElementById(`ima${e+1}`).style.display='none';
            document.getElementById(`lblTicket${e+1}`).innerHTML = `Ticket ${i.numero}`;
            document.getElementById(`lblEscritorio${e+1}`).innerHTML = `Escritorio ${i.escritorio}`;
        });

        return false;
    }

    console.error('Ticket no recuperado');
}

function loadViewTicket(){
    if(typeof io === "function"){
        // eslint-disable-next-line no-undef
        const socket = io();
        socket.on('oldFour', viewTicket);
        socket.on('oldFourLive', viewTicket);
    }
}

loadViewTicket();