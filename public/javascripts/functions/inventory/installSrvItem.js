const query = require('../../database/dbquery.js');
const addServerRevenue = require('../server/revenue/addServerRevenue.js');
const delInventory = require('./delInventory.js');
const checkSrvItem = require('./checkSrvItem.js');
const addSrvInventory = require('./addSrvInventory.js');

function installSrvItem(req) {
    return new Promise(async function(resolve, reject) {
        var itemuuid = req.body.inventory;
        var srvuuid = req.body.useitem;
        var usruuid = req.session.uuid;
        var category = "server";
        var sql = "SELECT * FROM shop WHERE uuid='" + itemuuid + "';";

        if(itemuuid != "" && itemuuid != null && itemuuid != undefined) {
            var results = await query(sql);
            if(results.length > 0) {
                var itemcategory = results[0].category;
                var itemprice = results[0].itemPrice;
                var newrevenue = parseInt(itemprice * (-1));
                var checkitem = await checkSrvItem(srvuuid, itemuuid);

                if(itemcategory == category && !checkitem) {
                    await addServerRevenue(srvuuid, newrevenue);
                    await delInventory(usruuid, itemuuid);
                    await addSrvInventory(srvuuid, itemuuid);
                    resolve(true);
                } else {
                    resolve(false);
                }
            } else {
                resolve(false);
            }
        } else {
            resolve(false);
        }
    });
}

module.exports = installSrvItem;
