const query = require('../../database/dbquery.js');

const setSrvExecuted = (srvuuid, itemuuid) => {
    return new Promise(async(resolve, reject) => {
        var sql = "UPDATE server SET executedSoftware='" + itemuuid + "' WHERE uuid='" + srvuuid + "';";
        await query(sql);
        
        resolve();
    });
}

module.exports = setSrvExecuted;
