var query = require('../../database/dbquery.js');

const getItemName = (table) => {
    return new Promise(async(resolve, reject) => {
        var newtable = table;
        var sql;
        var itemuuid;
        var results;
        
        for(let i = 0; i < table.inventory.length; i++) {
            itemuuid = table.inventory[i].uuid;
            sql = "SELECT uuid, itemName FROM shop WHERE uuid='" + itemuuid + "';";
            results = await query(sql);
            itemname = results[0].itemName;
            newtable.inventory[i]["name"] = itemname;
        }

        resolve(newtable);
    });
}

module.exports = getItemName;
