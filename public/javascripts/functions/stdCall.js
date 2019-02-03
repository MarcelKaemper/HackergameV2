var logoutInactive = require('./logoutInactivePlayers.js');
var sessionReload = require('./loadSessionVars.js');
var writeActivity = require('./writeActivity.js');
var resetCashbonus = require('./resetCashbonus.js');

async function stdCall(req) {
	return new Promise(async function(resolve, reject) {
		await sessionReload(req);
		await writeActivity(req.session.uuid);
		resolve();
	});
}

module.exports = stdCall;
