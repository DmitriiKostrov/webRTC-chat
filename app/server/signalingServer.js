var WebSocketServer = require('ws').Server;
var messageHandler = require('./messageHandler');
var PORT_NUMBER = 8090; 
var wss = new WebSocketServer({ port: PORT_NUMBER });

wss.on('connection', function connection(ws, req) {
    console.log('connection from a client');
    //console.log("id:", req.headers['sec-websocket-key']);
    ws.on('message', function incoming(message) {
        var objMessage = JSON.parse(message);
        messageHandler(ws, objMessage);
    });
    ws.on('close', function (event) {
        messageHandler(ws, {type: 'close'});
    });
});

console.log("started signaling server on port" + PORT_NUMBER);