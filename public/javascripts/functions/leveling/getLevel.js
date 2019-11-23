const query = require('../../database/dbquery.js');

const getLevel = (uuid) => {
    return new Promise(async(resolve, reject) => {
        var sql = "SELECT level FROM levels WHERE uuid='" + uuid + "';";

        var results = await query(sql);
        resolve(results[0].level);
    });
}

module.exports = getLevel;
