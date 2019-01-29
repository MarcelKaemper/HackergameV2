var query = require('../../database/dbquery.js');
var handleXP = require('./xpHandler.js');

function setXP(uuid, amount, callback){
	uuid = uuid;
	var sql = "UPDATE levels SET xp='"+amount+"' WHERE uuid='"+uuid+"';";

	query(sql, function(results){
		query("SELECT level,xp FROM levels WHERE uuid='"+uuid+"';", function(results){
			handleXP(uuid, results[0].level, results[0].xp, function(){
				// console.log("Needed for levelup: %d\nYou can reach level: %d", needed, nextlvl);
				callback();
			});
		});
	});
};


module.exports = setXP;
