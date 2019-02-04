var query = require('../../database/dbquery.js');
var changeMoney = require('../changeMoney.js');

function repairServer(req) {
    return new Promise(async function(resolve, reject) {
        var usruuid = req.session.uuid;
        var srvuuid = req.body.repairserver;
        var repairprice = req.body.repairprice;

        var sql = "UPDATE server SET health='100' WHERE uuid='" + srvuuid + "';";
        await query(sql);
        await changeMoney(usruuid, repairprice, "take");
        
        resolve();
    });
}

module.exports = repairServer;
