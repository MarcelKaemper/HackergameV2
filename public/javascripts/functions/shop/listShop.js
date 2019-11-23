const query = require('../../database/dbquery.js');

const listShop = () => {
    return new Promise(async(resolve, reject) => {
        var sql = "SELECT * FROM shop;"
        var results = await query(sql);

        resolve(results);
    });
}

module.exports = listShop;
