var query = require('../../database/dbquery.js');
var toUuid = require('../uuidName.js');
var delUser = require('./delUser.js');
var setxp = require('../leveling/setXP.js');


function adminHandler(operation, username, additional){
	return new Promise(async function(resolve, reject){
		var uuid = await toUuid.toUuid(username); 
		switch(operation){
			case "delete":
				await delUser(uuid);
				break;
			case "setxp":
				await setxp(uuid, additional, "set");
				break;
			case "givexp":
				await setxp(uuid, additional, "give");
				break;
			case "takexp":
				await setxp(uuid, additional, "take");
				break;
			default:
				break;
		}
		resolve();
	});
}

module.exports = adminHandler;
