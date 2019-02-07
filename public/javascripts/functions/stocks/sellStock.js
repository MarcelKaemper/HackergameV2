var changeMoney = require('../changeMoney.js');
var loadStock = require('./loadStocks.js');
var query = require('../../database/dbquery.js');

const sellStock = (uuid, symbol, count, worth) => {
    return new Promise(async (resolve, reject) => {
        let stocks = await loadStock(uuid);
        delete stocks[symbol];

        changeMoney(uuid, worth, "give");
        await query("UPDATE stocks SET stocks='"+JSON.stringify(stocks)+"' WHERE uuid='"+uuid+"';");
        resolve();
    });

}

module.exports = sellStock;