var request = require('request');

module.exports = function(nconf){
	'use strict';
	var channel = nconf.get('slack:channel');
	var token = nconf.get('slack:token');
	var slackHelper = {};

	slackHelper.postMsg = postMsg;
	slackHelper.postApplicant = postApplicant;

	function postMsg(msg){
		return request(token + '&channel=%23' + channel +'&text='+ msg +'&username=Sign-up%20Bot&icon_emoji=%3Abow%3A&pretty=1',function(err, res, body){
			if(err){
				console.log(err);
			} else {
				console.log('Sent to slack', body);
			}
		});
	}

	function postApplicant(app){
		postMsg(constructMsg(app));
	}

	function constructMsg(applicant){
		return '*' + applicant.fullName + '* just applied!' + (applicant.portfolio ?  ' ' + applicant.portfolio : '') + (applicant.github ?  ' ' + applicant.github : '') + '.';
	}

	return slackHelper;
};