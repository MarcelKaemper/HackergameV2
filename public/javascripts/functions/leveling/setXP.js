var query = require('../../database/dbquery.js');
var handleXP = require('./xpHandler.js');

function setXP(uuid, amount, callback){
	var sql = "UPDATE levels SET xp='"+amount+"' WHERE uuid='"+uuid+"';";

	query(sql, function(results1){
		query("SELECT level,xp FROM levels WHERE uuid='"+uuid+"';", function(results2){
			handleXP(uuid, results2[0].level, results2[0].xp, function(){
				// console.log("Needed for levelup: %d\nYou can reach level: %d", needed, nextlvl);
				callback();
			});
		});
	});
};


module.exports = setXP;
