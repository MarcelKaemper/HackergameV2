const changeMoney = require('../changeMoney.js');
const delInventory = require('../inventory/delInventory.js');
const query = require('../../database/dbquery.js');

function sellShop(req) {
    return new Promise(async function(resolve, reject) {
        var usruuid = req.session.uuid;
        var itemuuid = req.body.sellitem;

        var sql = "SELECT itemPrice FROM shop WHERE uuid='" + itemuuid + "';";
        var results = await query(sql);
        var amount = Math.floor(results[0].itemPrice * 0.5);

        await changeMoney(usruuid, amount, "give");
        await delInventory(usruuid, itemuuid);
        resolve();
    });
}

module.exports = sellShop;
