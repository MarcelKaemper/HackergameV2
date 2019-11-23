const query = require('../database/dbquery.js');
const changeMoney = require('./changeMoney.js');
const transferToBank = require('./transferToBank.js');

const transferMoney = (req) => {
	return new Promise(async(resolve, reject) => {
		var currentMoney;
		var moneyToTransfer = Math.abs(req.body.amount);
		var transferTo = req.body.player;
		var moneyToTransferAfter;

		let results = await query("SELECT money FROM money where uuid='" + req.session.uuid + "';");
		currentMoney = results[0].money;
		if(moneyToTransfer <= currentMoney) {
			var tax = moneyToTransfer * 0.05;
			moneyToTransferAfter = moneyToTransfer - tax;
			var sql = "SELECT uuid FROM logins WHERE name='" + transferTo.toLowerCase() + "';";
			let results = await query(sql);
			await changeMoney(results[0].uuid, moneyToTransferAfter, "give");
			await transferToBank(tax, "give");
			await changeMoney(req.session.uuid, moneyToTransfer, "take");
			resolve();
		}
	});
};

module.exports = transferMoney;
