var query = require('../../database/dbquery.js');
var getSrvHealth = require('./getSrvHealth.js');

function drainSrvHealth(srvuuid, amount) {
    return new Promise(async function(resolve, reject) {
        var rechealth = await getSrvHealth(srvuuid);
        if(rechealth >= amount) {
            var sql = "UPDATE server SET health=health-" + parseInt(amount) + " WHERE uuid='" + srvuuid + "';";
            await query(sql);
        }
        
        resolve();
    });
}

module.exports = drainSrvHealth;
