var ws = require("./ws");
var fs = require('fs');

var server = ws.createServer(function(socket){
	socket.on("connect", function(resource){
		socket.write("conectou");	
	});
	
	socket.on("data", function (data) { 
	    console.log(data);
	    if(data == 1){acende();}
	    if(data == 0){apaga();}
	});
});

function acende(){
	fs.open('/dev/ttyUSB0', 'a', 666, function( e, id ) {
		fs.write( id, '1', null, null, null, function(){
			fs.close(id, function(){
				console.log('Alterou o arquivo');
		    });
		});
	});
}

function apaga(){
	fs.open('/dev/ttyUSB0', 'a', 666, function( e, id ) {
		fs.write( id, '0', null, null, null, function(){
			fs.close(id, function(){
				console.log('Alterou o arquivo');
		    });
		});
	});
}

server.listen(8080);