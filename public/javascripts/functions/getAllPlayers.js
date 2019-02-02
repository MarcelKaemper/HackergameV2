var query = require ('../database/dbquery.js');
var checkAdmin = require ('../functions/checkAdmin.js');

function getAllPlayers(ownUuid) {
	return new Promise(async function(resolve, reject) {
		var results = await query("SELECT uuid, name, displayName FROM logins;");
		var players = [];
		for(var i in results) {
			if(results[i].uuid != ownUuid) {
				if(!await checkAdmin(results[i].uuid)) {
					players.push(results[i].displayName);
				}
			}
		}
		resolve(players);
	});
}

module.exports = getAllPlayers;
