var query = require('../../database/dbquery.js');

function getSrvHealth(srvuuid) {
    return new Promise(async function(resolve, reject) {
        var sql = "SELECT health FROM server WHERE uuid='" + srvuuid + "';";
        var results = await query(sql);
        resolve(results[0].health);
    });
}

module.exports = getSrvHealth;
