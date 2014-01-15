var express = require('express');
var http = require('http');
var faye = require('faye');
var util = require('util');
var bayeux = require('./Bayeux');
var config = require('./config')
var routeconfig = require('./routeconfig');
var salesforce = require('./salesforce');
var app = express();
var server = http.createServer(app);

config.configureExpress(app,express);

// Attaches the bayeux to the http server.
bayeux.StartBayeux(server);


salesforce.Auth(function(oauthObject) {

    // we connect to the cometd endpoint
    var sfep = oauthObject.instance_url +'/cometd/29.0';
    console.log("Client created: "+ sfep);

    // Add a client to the bayeux server and start listening
    var client = new faye.Client(sfep);

    // Set the authorization header
    client.setHeader('Authorization', 'OAuth '+ oauthObject.access_token);

    // If the connection to the server breaks, restart it and re-authenticate
    client.bind('transport:down', function(uclient) {
        // gets the token again
        Authenticate(function(oauthObject) {
            // set header again
            uclient.setHeader('Authorization', 'OAuth '+ oauthObject.access_token);
        });
    });

    // subscribe to push topic

    client.subscribe(config.PUSH_TOPIC, function(message) {

        // Incoming notification. Let's log it to the console
        console.log("Received message: " + JSON.stringify(message));
        // Broadcast it to the Socket.io connected clients
        socket.emit('record-processed', JSON.stringify(message));
    });


    // handle subscription errors
    client.errback(function(error) {
      console.error("ERROR: " + error.message);
    });

});

// SETS UP OUR ROUTES AND DEFINES REST API METHODS
// CONNECT METHOD HAS A DEPENDENCY WITH SOCKET.IO, SO IM PASSING A REFERENCE TO IT.
// PROBABLY NOT THE BEST REFACTOR...
routeconfig.setupRoutes(app,socket);

//Cranks up express http server :)
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

//Here we're starting Socket.io. We pass in a http server reference, as per Socket.io documentation when working with ExpressJS 3.0
var io = require('socket.io').listen(server);

// we subscribe for the Connection event
var socket = io.sockets.on('connection', function (socket) {

});









