var query = require('../../database/dbquery.js');
var changeMoney = require('../changeMoney.js');

function sellServer(req) {
    return new Promise(async function(resolve, reject) {
        var usruuid = req.session.uuid;
        var srvuuid = req.body.sellserver;

        var amount = 30000;
        var sql = "DELETE FROM server WHERE uuid='" + srvuuid + "';";
        
        await changeMoney(usruuid, amount, "give");
        await query(sql);

        resolve();
    });
}

module.exports = sellServer;
