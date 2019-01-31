var query = require ('../database/dbquery.js');

function getAllPlayers(ownUuid) {
	return new Promise(async function(resolve, reject) {
		var results = await query("SELECT uuid, name FROM logins;");
		var players = [];
		for(var i in results){
			if(results[i].uuid != ownUuid){
				players.push(results[i].name);
			}
		}
		resolve(players);
	});
}

module.exports = getAllPlayers;
