const toUuid = require('../uuidName.js');
const delUser = require('./delUser.js');
const setxp = require('../leveling/setXP.js');
const setMoney = require('../changeMoney.js');
const resetPassword = require('./resetPassword.js');

const adminHandler = (operation, username, additional) => {
	return new Promise(async(resolve, reject) => {
		var uuid = await toUuid.toUuid(username); 
		switch(operation) {
			case "delete":
				await delUser(uuid);
				break;
			case "setxp":
				await setxp(uuid, additional, "set");
				break;
			case "givexp":
				await setxp(uuid, additional, "give");
				break;
			case "takexp":
				await setxp(uuid, additional, "take");
				break;
			case "setmoney":
				await setMoney(uuid, additional, "set");
				break;
			case "takemoney":
				await setMoney(uuid, additional, "take");
				break;
			case "givemoney":
				await setMoney(uuid, additional, "give");
				break;
			case "resetpw":
				await resetPassword(uuid, additional);
				break;
			default:
				break;
		}
		resolve();
	});
}

module.exports = adminHandler;
