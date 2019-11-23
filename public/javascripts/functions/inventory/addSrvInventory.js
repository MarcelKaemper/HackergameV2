const query = require('../../database/dbquery.js');
const loadSrvInventory = require('./loadSrvInventory.js');

const addSrvInventory = (srvuuid, itemuuid) => {
    return new Promise(async(resolve, reject) => {
        var results = await loadSrvInventory(srvuuid);
        var resinv;
        var obj;
        var sql;

        var length = results.inventory.length;
        var counter = 0;

        if(length > 0) {
            while(counter <= length) {
                if(counter == length) {
                    obj = '{"uuid":"' + itemuuid  + '"}';
                    results.inventory[counter] = Object.assign(JSON.parse(obj), results.inventory[counter]);
                    resinv = JSON.stringify(results);
                    sql = "UPDATE server SET inventoryData='" + resinv + "' WHERE uuid='" + srvuuid + "';";
                    await query(sql);
                } else {
                    if(results.inventory[counter].uuid == itemuuid) {
                        break;
                    }
                }
                counter++;
            }
        } else {
            obj = '{"uuid":"' + itemuuid  + '"}';
            results.inventory[0] = Object.assign(JSON.parse(obj), results.inventory[0]);
            resinv = JSON.stringify(results);
            sql = "UPDATE server SET inventoryData='" + resinv + "' WHERE uuid='" + srvuuid + "';";
            await query(sql);
        }

        resolve();
    });
}

module.exports = addSrvInventory;
