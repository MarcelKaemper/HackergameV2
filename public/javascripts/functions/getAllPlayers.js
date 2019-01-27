var query = require ('../database/dbquery.js');

function getAllPlayers(callback){
	query("SELECT uuid, name FROM logins", function(results){
		var players = [];
		for(var i in results){
			players.push(results[i].name);
		}
		callback(players);
	});
}

module.exports = getAllPlayers;
