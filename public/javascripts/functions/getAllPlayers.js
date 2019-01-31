var query = require ('../database/dbquery.js');

async function getAllPlayers(ownUuid,callback){
	var results = await query("SELECT uuid, name FROM logins;");
	var players = [];
	for(var i in results){
		if(results[i].uuid != ownUuid){
			players.push(results[i].name);
		}
	}
	callback(players);
}

module.exports = getAllPlayers;
