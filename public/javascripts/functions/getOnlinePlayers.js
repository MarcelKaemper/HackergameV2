const query = require('../database/dbquery.js');

function getOnlinePlayers() {
    return new Promise(async function(resolve, reject) {
        var players = [];
        var sql = "SELECT name, displayName, loggedIn FROM logins WHERE loggedIn=true;";

        var results = await query(sql); 
        for(var i in results){
            players.push(results[i].displayName);
        }
        resolve(players);
    });
}

module.exports = getOnlinePlayers;
