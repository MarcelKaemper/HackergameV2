var query = require('../../database/dbquery.js');

function checkIfCorrect(req, srvip, targetpw) {
    return new Promise(async function(resolve, reject) {
        var usruuid = req.session.uuid;
        var sql = "SELECT uuid, uuidOwner, password FROM server WHERE ip_address='" + srvip + "';";
        var results = await query(sql);
        if(results.length == 1 && results[0].uuidOwner == usruuid && results[0].password == targetpw) {
            resolve(true);
        } else {
            resolve(false);
        }
    });
}

module.exports = checkIfCorrect;
