	var query = require('../../database/dbquery.js');
var handleXP = require('./xpHandler.js');

function setXP(uuid, amount, callback){
	var sql = "UPDATE levels SET xp="+amount+" WHERE uuid='"+uuid+"';";

	query(sql, function(results){
		handleXP(uuid, amount, function(){
			callback();
		});
	});
};


module.exports = setXP;
