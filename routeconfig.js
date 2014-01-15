/**
 * Created by assimoes on 14-01-2014.
 */
var routes = require('./routes');
var user = require('./routes/user');

var faye = require('faye');
var config = require('./config');

exports.setupRoutes =  function setupRoutes(app,socket){
    app.get('/', routes.index);
    app.get('/users', user.list);
    // REST API, CREATES A CONNECT TO SALESFORCE RESOURCE
    app.get('/api/connect',function(req, res){

    });
}