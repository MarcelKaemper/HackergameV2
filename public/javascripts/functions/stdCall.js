const sessionReload = require('./loadSessionVars.js');
const writeActivity = require('./writeActivity.js');

const stdCall = (req) => {
	return new Promise(async(resolve, reject) => {
		await sessionReload(req);
		await writeActivity(req.session.uuid);
		resolve();
	});
}

module.exports = stdCall;
