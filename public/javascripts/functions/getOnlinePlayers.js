var query = require('../database/dbquery.js');

async function getOnlinePlayers(callback) {
    var players = [];
    var sql = "SELECT name, loggedIn FROM logins WHERE loggedIn=true;";

    var results = await query(sql); 
    for(var i in results){
	players.push(results[i].name);
    }
    callback(players);
}

module.exports = getOnlinePlayers;
