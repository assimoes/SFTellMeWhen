/**
 * Created by assimoes on 13-01-2014.
 */
var path = require('path');

exports.DEBUG = true;
exports.ENVIRONMENT = 'production';
exports.CALLBACK_URL = 'http://localhost:3002';
exports.PUSH_TOPIC = '/topic/AllAccounts';
exports.CLIENT_ID = '3MVG99qusVZJwhsme3nfWHEgb9OnFNRbEyNjtCgYglsiU920dnzNmWMF7crPO1WKazKmV9gcm3G5l0QhwsR_C';
exports.CLIENT_SECRET = '7779421201496211756';
exports.USERNAME = 'asvnsimoes@gmail.com';
exports.PASSWORD = 'seven123aTDSfnWp72dDNW1iAbbLIwhp';

exports.configureExpress = function(app,express){
    // all environments
    app.set('port', process.env.PORT || 3002);
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));

    // development only
    if ('development' == app.get('env')) {
        app.use(express.errorHandler());
    }
};