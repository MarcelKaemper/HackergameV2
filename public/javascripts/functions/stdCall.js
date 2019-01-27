var logoutInactive = require('./logoutInactivePlayers.js');
var sessionReload = require('./loadSessionVars.js');
var writeActivity = require('./writeActivity.js');

function stdCall(req, callback){
	logoutInactive(req.session.loggedIn, function(){
		sessionReload(req, function(){
			writeActivity(req.session.uuid, function(){
				callback();
			});
		});

	});
}

module.exports = stdCall;
