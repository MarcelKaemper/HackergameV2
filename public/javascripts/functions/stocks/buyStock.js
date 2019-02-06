var query = require('../../database/dbquery.js');

const buyStock = async(uuid, name, price) => {
    var ownedStocks = await query("SELECT stocks FROM stocks WHERE uuid='"+uuid+"';");
    ownedStocks= JSON.parse(ownedStocks[0].stocks);
    if(!ownedStocks.hasOwnProperty(name)){
        console.log(ownedStocks);
        ownedStocks = Object.assign(JSON.parse('{"'+name+'": {"price":'+price+',"count":1}}'), ownedStocks);
        console.log(ownedStocks);
        await query("UPDATE stocks SET stocks='"+JSON.stringify(ownedStocks)+"' WHERE uuid='"+uuid+"';");
    }else{
        ownedStocks[name].count += 1;
        ownedStocks[name].price += price;
        await query("UPDATE stocks SET stocks='"+JSON.stringify(ownedStocks)+"' WHERE uuid='"+uuid+"';");
    }
}

module.exports = buyStock;