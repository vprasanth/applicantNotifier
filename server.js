var nconf = require('nconf');
nconf.use('file', { file: './config/global.json'});
nconf.load();
var express = require('express');
var bodyParser = require('body-parser');
var slackHelper = require('./slackHelper')(nconf);
var Cloudant = require('cloudant')(nconf.get('database'));
var app = express();
var api = require('./api')(Cloudant, nconf, slackHelper);
var port = 8080;

// set-up middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// set-up static locations
app.use(express.static('static'));
app.use(express.static('bower_components'));

// set-up routes
app.use('/api', api);

// start server
app.listen(port, 'localhost', function(){
	console.log('Server deets:', this.address());
});