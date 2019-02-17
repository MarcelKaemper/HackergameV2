var query = require('../../database/dbquery.js');

function setSrvExecuted(srvuuid, itemuuid) {
    return new Promise(async function(resolve, reject) {
        var sql = "UPDATE server SET executedSoftware='" + itemuuid + "' WHERE uuid='" + srvuuid + "';";
        await query(sql);
        
        resolve();
    });
}

module.exports = setSrvExecuted;
