var query = require('../../database/dbquery.js');
var changeMoney = require('../changeMoney.js');

const buyStock = async(uuid, name, price, count) => {
    var ownedStocks = await query("SELECT stocks FROM stocks WHERE uuid='"+uuid+"';");
    ownedStocks= JSON.parse(ownedStocks[0].stocks);
    if(!ownedStocks.hasOwnProperty(name)){
        console.log(ownedStocks);
        ownedStocks = Object.assign(JSON.parse('{"'+name+'": {"price":'+price*count+',"count":'+count+'}}'), ownedStocks);
        console.log(ownedStocks);
        if(await changeMoney(uuid, price*count, "take")){
            await query("UPDATE stocks SET stocks='"+JSON.stringify(ownedStocks)+"' WHERE uuid='"+uuid+"';");
        }
    }else{
        ownedStocks[name].count += count;
        ownedStocks[name].price += count*price;
        if(await changeMoney(uuid, price*count, "take")){
            await query("UPDATE stocks SET stocks='"+JSON.stringify(ownedStocks)+"' WHERE uuid='"+uuid+"';");
        }
    }
}

module.exports = buyStock;