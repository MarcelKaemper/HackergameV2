const query = require('../../database/dbquery.js');

const loadSrvInventory = (srvuuid) => {
    return new Promise(async(resolve, reject) => {
        var sql = "SELECT * FROM server WHERE uuid='" + srvuuid + "';";
        var results = await query(sql);
        
        resolve(JSON.parse(results[0].inventoryData));
    });
}

module.exports = loadSrvInventory;
