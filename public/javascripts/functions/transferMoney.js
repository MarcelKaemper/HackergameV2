var query = require('../database/dbquery.js');
var changeMoney = require('./changeMoney.js');

function transferMoney(req) {
	return new Promise(function(resolve, reject) {
		var currentMoney;
		var moneyToTransfer = Math.abs(req.body.amount);
		var transferTo = req.body.player;

		let results = await query("SELECT money FROM money where uuid='"+req.session.uuid+"';");
		currentMoney = results[0].money;
		if(moneyToTransfer <= currentMoney){
			var sql = "SELECT uuid FROM logins WHERE name='"+transferTo+"';";
			let results = await query(sql);
			await changeMoney(results[0].uuid, moneyToTransfer, "give");
			await changeMoney(req.session.uuid, moneyToTransfer, "take");
			resolve();
		}
	});
};

module.exports = transferMoney;
