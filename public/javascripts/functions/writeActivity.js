const query = require('../database/dbquery.js');

const writeActivity = (uuid) => {
	return new Promise(async(resolve, reject) => {
		var sql = "UPDATE lastactivity SET last_activity=CURRENT_TIMESTAMP where uuid='" + uuid + "';";
		await query(sql);
		resolve();
	});
}
module.exports = writeActivity;
