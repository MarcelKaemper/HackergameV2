var query = require('../../database/dbquery.js');
var handleXP = require('./xpHandler.js');

function addXP(uuid, amount, callback){
	var sql = "UPDATE levels SET xp=xp+'"+amount+"' WHERE uuid='"+uuid+"';";

	query(sql, function(results){
		query("SELECT level,xp FROM levels WHERE uuid='"+uuid+"';", function(results){
			handleXP(results[0].level, results[0].xp, function(needed, nextlvl){
				console.log("Needed for levelup: %d\nYou can reach level: %d", needed, nextlvl);
				callback();
			});
		});
	});
};


module.exports = addXP;
