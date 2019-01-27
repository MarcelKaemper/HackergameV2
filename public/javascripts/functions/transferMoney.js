var query = require('../database/dbquery.js');

function transferMoney(req, callback){
	var currentMoney;
	var moneyToTransfer = req.body.amount;
	var transferTo = req.body.player;

	query("SELECT money FROM money where uuid='"+req.session.uuid+"';", function(results){
		currentMoney = results[0].money;
		if(moneyToTransfer <= currentMoney){
			console.log("In if");
			var sql = "SELECT uuid FROM logins WHERE name='"+transferTo+"';";
			query(sql, function(results){
				console.log(transferTo);
				console.log(results[0].uuid);
				var sql2 = "UPDATE money SET money=money+"+moneyToTransfer+" WHERE uuid='"+results[0].uuid+"';";
				query(sql2, function(results){
					var sql3 = "UPDATE money SET money=money-"+moneyToTransfer+" WHERE uuid='"+req.session.uuid+"';";
					query(sql3, function(results){
						callback();
					});
				});
			});
		
			
		}
	});
};

module.exports = transferMoney;
