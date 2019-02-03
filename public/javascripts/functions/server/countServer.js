var query = require('../../database/dbquery.js');

function countServer(uuid) {
    return new Promise(async function(resolve, reject) {
        var sql = "SELECT * FROM server WHERE uuidOwner='" + uuid + "';";
        var results = await query(sql);
        var count = results.length;

        resolve(count);
    });
}

module.exports = countServer;
