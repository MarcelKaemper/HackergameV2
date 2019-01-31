var query = require('../database/dbquery.js');

async function changeMoney(uuid, amount, operation){
	var sql;
	
	return new Promise(async function(resolve, reject){
		if(operation == "give"){
			sql = "UPDATE money SET money=money+"+amount+" WHERE uuid='"+uuid+"';";
			await query(sql);
			resolve();
		}else if(operation == "take"){
			sql = "UPDATE money SET money=money-"+amount+" WHERE uuid='"+uuid+"';";
			await query(sql);
			resolve();
		}else if(operation == "set"){
			sql = "UPDATE money SET money="+amount+" WHERE uuid='"+uuid+"';";
			await query(sql);
			resolve();
		}else{
			reject();
		}
	});
};

module.exports = changeMoney;
