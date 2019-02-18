var query = require('../../../database/dbquery.js');
var addServerRevenue = require('./addServerRevenue.js');
var changeMoney = require('../../changeMoney.js');
var drainSrvHealth = require('../drainSrvHealth.js');

function addRevenue() {
    return new Promise(async function(resolve, reject) {
        var sql = "SELECT * FROM server;";
        var results = await query(sql);
        var srvuuid;
        var itemuuid;
        var usruuid;
        var sql1;
        var resrevenue;
        var revenue;
        var checkexec;
        var sql2;
        var reshealth;
        var health;

        if(results.length > 0) {
            for(let i = 0; i < results.length; i++) {
                checkexec = results[i].executedSoftware;
                if(checkexec != "" && checkexec != null && checkexec != undefined) {
                    srvuuid = results[i].uuid;
                    itemuuid = results[i].executedSoftware;
                    usruuid = results[i].uuidOwner;
                    sql1 = "SELECT revenue FROM shop WHERE uuid='" + itemuuid + "';";
                    resrevenue = await query(sql1);
                    revenue = resrevenue[0].revenue;
                    sql2 = "SELECT health FROM server WHERE uuid='" + srvuuid + "';";
                    reshealth = await query(sql2);
                    health = reshealth[0].health;
                    if(health > 0) {
                        await changeMoney(usruuid, revenue, "give");
                        await addServerRevenue(srvuuid, revenue);
                        await drainSrvHealth(srvuuid, 1);
                    }
                }
            }
        }
        
        resolve();
    });
}

module.exports = addRevenue;
