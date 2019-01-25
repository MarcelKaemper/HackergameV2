var query = require('../database/dbquery.js');

function getOnlinePlayers(callback) {
    var players = [];
    var sql = "SELECT name, loggedIn FROM logins;";

    query(sql, function(results) {
        for(var i in results){
            players.push(results[i].name);
        }
        callback(players);
    });
}

module.exports = getOnlinePlayers;
