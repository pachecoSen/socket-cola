// eslint-disable-next-line no-unused-vars
function chat (socket){
    socket.emit('sendMsg',{
        'estatus' : true,
        'user' : 'Pacheco',
        'msg' : 'Hola a todos'
    }, function(res){
        console.log(res);
    });
    
    socket.on('receive', function(msg){
        console.log(msg);
    });

    return false;
}