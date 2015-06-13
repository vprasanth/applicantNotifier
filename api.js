var express = require('express');

module.exports = function(cloudant, nconf, slackHelper){
	'use strict';

	var applicants = cloudant.db.use(nconf.get('collection'));
	var api = express.Router();

	api.post('/save', function(req, res){
		console.log(req.body);
		applicants.insert(req.body, function(err, body){
			if(err){
				console.log(err);
				res.send('error');
			} else {
				slackHelper.postApplicant(req.body);
				res.redirect('/thanks.html');
			}
		});
	});

	return api;
};