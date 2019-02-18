var query = require('../../database/dbquery.js');

function drainSrvHealth(srvuuid, amount) {
    return new Promise(async function(resolve, reject) {
        var sql = "UPDATE server SET health=health-" + parseInt(amount) + " WHERE uuid='" + srvuuid + "';";
        await query(sql);
        resolve();
    });
}

module.exports = drainSrvHealth;
