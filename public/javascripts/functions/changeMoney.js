var query = require('../database/dbquery.js');

function changeMoney(uuid, amount, operation) {
	var sql;
	
	return new Promise(async function(resolve, reject) {
		if(operation == "give") {
			sql = "UPDATE money SET money=money+"+amount+" WHERE uuid='"+uuid+"';";
			await query(sql);
			resolve();
		} else if(operation == "take") {
			let currentMoney = await query("SELECT money FROM money WHERE uuid='"+uuid+"';");
			if(currentMoney[0].money>amount){
				sql = "UPDATE money SET money=money-"+amount+" WHERE uuid='"+uuid+"';";
				await query(sql);
				//successful
				resolve(true);
			}else{
				// Not successful
				resolve(false);
			}
		 }else if(operation == "set") {
			sql = "UPDATE money SET money="+amount+" WHERE uuid='"+uuid+"';";
			await query(sql);
			resolve();
		} else {
			reject();
		}
	});
};

module.exports = changeMoney;
