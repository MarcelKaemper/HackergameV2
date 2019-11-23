const query = require('../../database/dbquery.js');
const loadInventory = require('./loadInventroy.js');

const addInventory = (usruuid, itemuuid) => {
    return new Promise(async(resolve, reject) => {
        var results = await loadInventory(usruuid);
        var resinv;
        var obj;
        var sql;

        var length = results.inventory.length;
        var counter = 0;

        if(length > 0) {
            while(counter <= length) {
                if(counter == length) {
                    obj = '{"uuid":"' + itemuuid  + '","count":1}';
                    results.inventory[counter] = Object.assign(JSON.parse(obj), results.inventory[counter]);
                    resinv = JSON.stringify(results);
                    sql = "UPDATE inventory SET inventoryData='" + resinv + "' WHERE uuid='" + usruuid + "';";
                    await query(sql);
                } else {
                    if(results.inventory[counter].uuid == itemuuid) {
                        results.inventory[counter].count += 1;
                        resinv = JSON.stringify(results);
                        sql = "UPDATE inventory SET inventoryData='" + resinv + "' WHERE uuid='" + usruuid + "';";
                        await query(sql);
                        break;
                    }
                }
                counter++;
            }
        } else {
            obj = '{"uuid":"' + itemuuid  + '","count":1}';
            results.inventory[0] = Object.assign(JSON.parse(obj), results.inventory[0]);
            resinv = JSON.stringify(results);
            sql = "UPDATE inventory SET inventoryData='" + resinv + "' WHERE uuid='" + usruuid + "';";
            await query(sql);
        }

        resolve();
    });
}

module.exports = addInventory;
