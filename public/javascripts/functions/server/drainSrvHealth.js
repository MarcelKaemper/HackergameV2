const query = require('../../database/dbquery.js');
const getSrvHealth = require('./getSrvHealth.js');

const drainSrvHealth = (srvuuid, amount) => {
    return new Promise(async(resolve, reject) => {
        var rechealth = await getSrvHealth(srvuuid);
        if(rechealth >= amount) {
            var sql = "UPDATE server SET health=health-" + parseInt(amount) + " WHERE uuid='" + srvuuid + "';";
            await query(sql);
        }
        
        resolve();
    });
}

module.exports = drainSrvHealth;
