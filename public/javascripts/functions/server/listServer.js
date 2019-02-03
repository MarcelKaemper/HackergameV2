var query = require('../../database/dbquery.js');

function listServer(usruuid) {
    return new Promise(async function(resolve, reject) {
        var sql = "SELECT * FROM server WHERE uuidOwner='" + usruuid + "';";
        var results = await query(sql);

        resolve(results);
    });
}

module.exports = listServer;
