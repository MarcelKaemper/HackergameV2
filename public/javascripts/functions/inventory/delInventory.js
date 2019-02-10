var query = require('../../database/dbquery.js');
var loadInventory = require('./loadInventroy.js');

function delInventory(usruuid, itemuuid) {
    return new Promise(async function(resolve, reject) {
        var results = await loadInventory(usruuid);
        var resinv;
        var sql;

        var length = results.inventory.length;
        var counter = 0;

        if(length > 0) {
            while(counter < length) {
                if(results.inventory[counter].uuid == itemuuid) {
                    if(results.inventory[counter].count > 1) {
                        results.inventory[counter].count -= 1;
                        resinv = JSON.stringify(results);
                        sql = "UPDATE inventory SET inventoryData='" + resinv + "' WHERE uuid='" + usruuid + "';";
                        await query(sql);
                        break;
                    } else {
                        results.inventory.splice(counter, 1);
                        resinv = JSON.stringify(results);
                        sql = "UPDATE inventory SET inventoryData='" + resinv + "' WHERE uuid='" + usruuid + "';";
                        await query(sql);
                        break;
                    }
                }
                counter++;
            }
        }

        resolve();
    });
}

module.exports = delInventory;
