const query = require('../../database/dbquery.js');

function listServer(usruuid) {
    return new Promise(async function(resolve, reject) {
        var sql = "SELECT * FROM server WHERE uuidOwner='" + usruuid + "';";
        var results = await query(sql);
        var repairprice;

        for(let i = 0; i < results.length; i++) {
            repairprice = Math.floor(50000 * (1 - (results[i].health / 100)));
            results[i]["repairprice"] = repairprice;
        }

        resolve(results);
    });
}

module.exports = listServer;
