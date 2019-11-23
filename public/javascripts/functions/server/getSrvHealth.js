const query = require('../../database/dbquery.js');

const getSrvHealth = (srvuuid) => {
    return new Promise(async(resolve, reject) => {
        var sql = "SELECT health FROM server WHERE uuid='" + srvuuid + "';";
        var results = await query(sql);
        resolve(results[0].health);
    });
}

module.exports = getSrvHealth;
