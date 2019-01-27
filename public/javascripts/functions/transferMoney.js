var query = require('../database/dbquery.js');
var changeMoney = require('./changeMoney.js');

function transferMoney(req, callback){
	var currentMoney;
	var moneyToTransfer = Math.abs(req.body.amount);
	var transferTo = req.body.player;

	query("SELECT money FROM money where uuid='"+req.session.uuid+"';", function(results){
		currentMoney = results[0].money;
		if(moneyToTransfer <= currentMoney){
			var sql = "SELECT uuid FROM logins WHERE name='"+transferTo+"';";
			query(sql, function(results){
				changeMoney(results[0].uuid, moneyToTransfer, "give", function(){
					changeMoney(req.session.uuid, moneyToTransfer, "take", function(){
						callback();
					});
				});
			});
		
			
		}
	});
};

module.exports = transferMoney;
