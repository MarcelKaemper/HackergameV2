var query = require('../../database/dbquery.js');

function getLevel(uuid) {
    return new Promise(async function(resolve, reject) {
        var sql = "SELECT level FROM levels WHERE uuid='" + uuid + "';";

        var results = await query(sql);
        resolve(results[0].level);
    });
}

module.exports = getLevel;
