var query = require('../database/dbquery.js');

function writeXP(uuid, amount, callback){
	var sql = "UPDATE levels SET xp='"+amount+"' WHERE uuid='"+uuid+"';";

	query(sql, function(results){
		callback();
	});
};


module.exports = writeXP;
