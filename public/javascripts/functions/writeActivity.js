var query = require('../database/dbquery.js');

async function writeActivity(uuid, callback){
	var sql = "UPDATE lastActivity SET last_activity=CURRENT_TIMESTAMP where uuid='"+uuid+"';";
	await query(sql);
	callback();
}
module.exports = writeActivity;
