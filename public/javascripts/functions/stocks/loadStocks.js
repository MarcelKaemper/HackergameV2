const query = require('../../database/dbquery.js');

const loadStock = (uuid) => {
    return new Promise(async(resolve, reject) => {
        let results = await query("SELECT * FROM stocks WHERE uuid='"+uuid+"';");
        resolve(JSON.parse(results[0].stocks));
    });
}

module.exports = loadStock;
