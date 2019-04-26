var query = require('../database/dbquery.js');

function writeRealIP(req, uuid, realip) {
    return new Promise(async function(resolve, reject) {
        var sql = "UPDATE logins SET updated_realip='" + realip + "' WHERE uuid='" + uuid + "';";
        await query(sql);
        resolve();
    });
}

module.exports = writeRealIP;
