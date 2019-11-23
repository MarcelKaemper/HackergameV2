const query = require('../../database/dbquery.js');

const countServer = (uuid) => {
    return new Promise(async(resolve, reject) => {
        var sql = "SELECT * FROM server WHERE uuidOwner='" + uuid + "';";
        var results = await query(sql);
        var count = results.length;

        resolve(count);
    });
}

module.exports = countServer;
