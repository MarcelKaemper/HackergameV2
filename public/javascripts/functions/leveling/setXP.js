const query = require('../../database/dbquery.js');
const handleXP = require('./xpHandler.js');
const uuidName = require('../uuidName.js');

function setXP(uuid, amount, operation) {
	return new Promise(async function(resolve, reject) {
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
				resolve();
				break;
			case "take":
				sql = "SELECT xp FROM levels WHERE uuid='"+uuid+"';";
				xp = await query(sql);
				sql = "UPDATE levels SET xp=xp-"+amount+" WHERE uuid='"+uuid+"';";
				await query(sql);
				await handleXP(uuid, parseInt(xp[0].xp)-amount);
				resolve();
				break;
			case "set":	
				sql = "UPDATE levels SET xp="+amount+" WHERE uuid='"+uuid+"';";
				await query(sql);
				await handleXP(uuid, amount);
				resolve();
				break;
			case "show":	
				sql = "SELECT level, xp FROM levels WHERE uuid='"+uuid+"';";
				var results = await query(sql);
				var name = await uuidName.toName(uuid);
				var resarr = {};
				resarr["name"] = name;
				resarr["level"] = results[0].level;
				resarr["xp"] = results[0].xp;
				
				resolve(resarr);
				break;
			default:
				resolve();
				break;
		}
	});
}


module.exports = setXP;
