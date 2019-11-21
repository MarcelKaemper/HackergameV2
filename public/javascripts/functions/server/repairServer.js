const query = require('../../database/dbquery.js');
const changeMoney = require('../changeMoney.js');

function repairServer(req) {
    return new Promise(async function(resolve, reject) {
        var usruuid = req.session.uuid;
        var srvuuid = req.body.repairserver;
        var repairprice = req.body.repairprice;

        if(req.session.money >= repairprice) {
            var sql = "UPDATE server SET health='100' WHERE uuid='" + srvuuid + "';";
            await query(sql);
            await changeMoney(usruuid, repairprice, "take");
            resolve(true);
        } else {
            resolve(false);
        }     
    });
}

module.exports = repairServer;
