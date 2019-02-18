var query = require('../../../database/dbquery.js');
var addServerRevenue = require('./addServerRevenue.js');
var changeMoney = require('../../changeMoney.js');

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
                    await changeMoney(usruuid, revenue, "give");
                    await addServerRevenue(srvuuid, revenue);
                }
            }
        }
        
        resolve();
    });
}

module.exports = addRevenue;
