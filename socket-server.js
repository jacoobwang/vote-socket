var WebSocketServer = require('ws').Server;
var socketServer = new WebSocketServer({ port: 9001 });

//to store all connected clients
var clients = [];
var voteRs = [];

socketServer.on('connection', function(socket) {

	//if not the specified origin, disconnect the socket
	var origin = socket.upgradeReq.headers.origin;

	//add to clients when socket is connected
	clients.push(socket);

	//broadcast to clients when new message comes from one client
	socket.on('message', function(message) {
		var msg = '';
		if(message === "reset"){
			voteRs = [];
			msg = "success";
		}
		else{
			if(voteRs.length<4){
				voteRs.push(message);
			}
			console.log(voteRs);
			msg = voteRs.join("|");
		}
		clients.forEach(function(client) {
			//if (client === socket) {
				client.send(msg);
			//}
		});
	});

	//remove from clients when socket is offline or disconnected
	socket.on('close', function() {
		for (var i = 0; i < clients.length; i++) {
			var client = clients[i];
			if (client === socket) {
				clients.splice(i, 1);
			}
		}
	});
});

console.log('socketServer is listening on 9001...'); 