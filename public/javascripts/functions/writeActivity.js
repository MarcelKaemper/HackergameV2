const query = require('../database/dbquery.js');

function writeActivity(uuid) {
	return new Promise(async function(resolve, reject) {
		var sql = "UPDATE lastactivity SET last_activity=CURRENT_TIMESTAMP where uuid='"+uuid+"';";
		await query(sql);
		resolve();
	});
}
module.exports = writeActivity;
