/**
 * Created by assimoes on 13-01-2014.
 */
var nforce = require('nforce');
var config = require('./config');
var util = require('util');

// we set up a connection object with Salesforce. I'll be using the most recent API version: 29.0.
var sfdc = nforce.createConnection({
    clientId: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    redirectUri: config.CALLBACK_URL + '/oauth/_callback',
    apiVersion: 'v29.0',
    environment: config.ENVIRONMENT  //  production or sandbox
});


function Authenticate(cb) {

    sfdc.authenticate({ username: config.USERNAME, password: config.PASSWORD }, function(err, resp){
        if(err) {
            console.log('There was an error while attempting to connect to the organization: ' + err.message);
        } else {
            cb(resp);
        }
    });

}


exports.Auth = Authenticate;

