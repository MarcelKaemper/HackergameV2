var query = require('../database/dbquery.js');

function writeActivity(uuid, callback){
	var sql = "UPDATE lastActivity SET last_activity=CURRENT_TIMESTAMP where uuid='"+uuid+"';";
	query(sql, function(results){
		callback();
	});
}
module.exports = writeActivity;
