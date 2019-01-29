var query = require('../../database/dbquery.js');
var handleXP = require('./xpHandler.js');
var uuidName = require('../uuidName.js');

function setXP(uuid, amount, operation, callback) {
	var sql;

	switch(operation) {
		case "give":
			sql = "UPDATE levels SET xp=xp+"+amount+" WHERE uuid='"+uuid+"';";
			query(sql, function(results) {
				handleXP(uuid, amount, function() {
					callback();
				});
			});
			break;
		case "take":
			sql = "UPDATE levels SET xp=xp-"+amount+" WHERE uuid='"+uuid+"';";
			query(sql, function(results) {
				handleXP(uuid, amount, function() {
					callback();
				});
			});
			break;
		case "set":	
			sql = "UPDATE levels SET xp="+amount+" WHERE uuid='"+uuid+"';";
			query(sql, function(results) {
				handleXP(uuid, amount, function() {
					callback();
				});
			});
			break;
		case "show":	
			sql = "SELECT level, xp FROM levels WHERE uuid='"+uuid+"';";
			query(sql, function(results) {
				uuidName.toName(results[0].uuid, function(name) {
					callback(results[0].level, results[0].xp, name);
				});
			});
			break;
		default:
			callback();
			break;
	};
}


module.exports = setXP;
