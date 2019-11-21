const sessionReload = require('./loadSessionVars.js');
const writeActivity = require('./writeActivity.js');

async function stdCall(req) {
	return new Promise(async function(resolve, reject) {
		await sessionReload(req);
		await writeActivity(req.session.uuid);
		resolve();
	});
}

module.exports = stdCall;
