var query = require ('../database/dbquery.js');

function getAllPlayers(ownUuid,callback){
	query("SELECT uuid, name FROM logins", function(results){
		var players = [];
		for(var i in results){
			if(results[i].uuid != ownUuid){
				players.push(results[i].name);
			}
		}
		callback(players);
	});
}

module.exports = getAllPlayers;
