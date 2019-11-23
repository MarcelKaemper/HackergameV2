const query = require('../database/dbquery.js');

const getOnlinePlayers = () => {
    return new Promise(async(resolve, reject) => {
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
