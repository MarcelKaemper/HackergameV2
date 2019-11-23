const query = require ('../database/dbquery.js');

const getAllPlayers = (ownUuid, operator) => {
	return new Promise(async(resolve, reject) => {
		var results = await query("SELECT uuid, name, displayName FROM logins;");
		var players = [];
		for(var i in results) {
			switch(operator) {
				case "everyone":
					players.push(results[i].displayName);
					break;
				//Everyone but yourself
				case "everyoneButYou":
					if(results[i].uuid != ownUuid) {
						players.push(results[i].displayName);
					break;
				}
				default:
					break;
			}
		}
		resolve(players);
	});
}

module.exports = getAllPlayers;
