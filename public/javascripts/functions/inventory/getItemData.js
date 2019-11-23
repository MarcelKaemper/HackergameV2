const query = require('../../database/dbquery.js');

const getItemData = (table) => {
    return new Promise(async(resolve, reject) => {
        var newtable = table;
        var sql;
        var itemuuid;
        var results;
        
        for(let i = 0; i < table.inventory.length; i++) {
            itemuuid = table.inventory[i].uuid;
            sql = "SELECT uuid, itemName, category FROM shop WHERE uuid='" + itemuuid + "';";
            results = await query(sql);
            itemname = results[0].itemName;
            itemcategory = results[0].category;
            newtable.inventory[i]["name"] = itemname;
            newtable.inventory[i]["category"] = itemcategory;
        }

        resolve(newtable);
    });
}

module.exports = getItemData;
