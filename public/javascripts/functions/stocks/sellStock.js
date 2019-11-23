const changeMoney = require('../changeMoney.js');
const loadStock = require('./loadStocks.js');
const query = require('../../database/dbquery.js');

const sellStock = (uuid, symbol, count, worth) => {
    return new Promise(async (resolve, reject) => {
        let stocks = await loadStock(uuid);

        stocks[symbol].count -= count;
        stocks[symbol].price -= worth; 

        if(stocks[symbol].count <= 0) {
            delete stocks[symbol];
        }

        changeMoney(uuid, worth, "give");
        await query("UPDATE stocks SET stocks='"+JSON.stringify(stocks)+"' WHERE uuid='"+uuid+"';");
        resolve();
    });

}

module.exports = sellStock;
