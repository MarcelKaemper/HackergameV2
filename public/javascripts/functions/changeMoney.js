var query = require('../database/dbquery.js');

function changeMoney(uuid, amount, operation, callback){
	var sql;

	if(operation == "give"){
		sql = "UPDATE money SET money=money+"+amount+" WHERE uuid='"+uuid+"';";
		query(sql, function(){
			callback();
		});
	}else if(operation == "take"){
		sql = "UPDATE money SET money=money-"+amount+" WHERE uuid='"+uuid+"';";
		query(sql, function(){
			callback();
		});
	}else if(operation == "set"){
		sql = "UPDATE money SET money="+amount+" WHERE uuid='"+uuid+"';";
		query(sql, function(){
			callback();
		});
	}else{
		callback();
	}
};

module.exports = changeMoney;
