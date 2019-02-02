var logoutInactive = require('./logoutInactivePlayers.js');
var sessionReload = require('./loadSessionVars.js');
var writeActivity = require('./writeActivity.js');
var resetCashbonus = require('./resetCashbonus.js');

async function stdCall(req) {
	return new Promise(async function(resolve, reject) {
		await logoutInactive(req.session.loggedIn);
		await sessionReload(req);
		await writeActivity(req.session.uuid);
		await resetCashbonus();
		resolve();
	});
}

module.exports = stdCall;
