var query = require('../../database/dbquery.js');
var toUuid = require('../uuidName.js');
var delUser = require('./delUser.js');


function adminHandler(operation, username){
	return new Promise(async function(resolve, reject){
		var uuid = await toUuid.toUuid(username); 
		switch(operation){
			case "Delete":
				await delUser(uuid);
				break;

			default:
				break;
		}
		resolve();
	});
}

module.exports = adminHandler;
