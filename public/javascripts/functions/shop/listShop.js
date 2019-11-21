const query = require('../../database/dbquery.js');

function listShop() {
    return new Promise(async function(resolve, reject) {
        var sql = "SELECT * FROM shop;"
        var results = await query(sql);

        resolve(results);
    });
}

module.exports = listShop;
