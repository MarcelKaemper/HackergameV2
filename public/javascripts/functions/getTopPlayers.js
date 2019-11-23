const query = require('../database/dbquery.js');

const getTopPlayers = () => {
    return new Promise(async(resolve, reject) => {
        var sql = "SELECT uuid, level FROM levels ORDER BY level DESC LIMIT 10;";
        var sql2;
        var results2;

        var results = await query(sql);

        for(let i = 0; i < results.length; i++) {
            sql2 = "SELECT displayName FROM logins WHERE uuid='" + results[i].uuid + "';";
            results2 = await query(sql2);
            results[i]["displayName"] = results2[0].displayName;
        }
        resolve(results);
    });
};

module.exports = getTopPlayers;
