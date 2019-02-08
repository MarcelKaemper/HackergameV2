var query = require('../../database/dbquery.js');

function loadInventory(uuid) {
    return new Promise(async function(resolve, reject) {
        var sql = "SELECT * FROM inventory WHERE uuid='" + uuid + "';";
        var results = await query(sql);
        
        resolve(JSON.parse(results[0].inventoryData));
    });
}

module.exports = loadInventory;
