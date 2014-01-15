/**
 * Created by assimoes on 13-01-2014.
 */
var faye = require('faye');

exports.StartBayeux = StartBayeux;

function StartBayeux(server){

 // the bayeux clients need a central messaging server to communicate with, and the Salesforce Streaming API uses comet.
// so we mount one.
    var bayeux = new faye.NodeAdapter({mount: '/cometd', timeout: 60 });

//then we attach to it the http server
    bayeux.attach(server);
}


