var query = require('../../database/dbquery.js');
var handleXP = require('./xpHandler.js');
var uuidName = require('../uuidName.js');

async function setXP(uuid, amount, operation, callback) {
	amount = parseInt(amount);
	var sql;
	var xp;

	switch(operation) {
		case "give":
			sql = "SELECT xp FROM levels WHERE uuid='"+uuid+"';";
			xp = await query(sql);
			sql = "UPDATE levels SET xp=xp+"+amount+" WHERE uuid='"+uuid+"';";
			await query(sql);
			await handleXP(uuid, parseInt(xp[0].xp)+amount);
			callback();
			break;
		case "take":
			sql = "SELECT xp FROM levels WHERE uuid='"+uuid+"';";
			xp = await query(sql);
			sql = "UPDATE levels SET xp=xp-"+amount+" WHERE uuid='"+uuid+"';";
			await query(sql);
			await handleXP(uuid, amount-parseInt(xp[0].xp));
			callback();
			break;
		case "set":	
			sql = "UPDATE levels SET xp="+amount+" WHERE uuid='"+uuid+"';";
			await query(sql);
			await handleXP(uuid, amount);
			callback();
			break;
		case "show":	
			sql = "SELECT level, xp FROM levels WHERE uuid='"+uuid+"';";
			var results = await query(sql);
			var name = await uuidName.toName(uuid);
			callback(results[0].level, results[0].xp, name);
			break;
		default:
			callback();
			break;
	}
}


module.exports = setXP;
