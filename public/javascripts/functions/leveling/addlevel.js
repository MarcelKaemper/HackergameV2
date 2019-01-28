var query = require('../../database/dbquery.js');

function addLevel(uuid, amount, callback){
	query("UPDATE levels SET level=level+"+amount+" WHERE uuid='"+uuid+"';",function(results){
		callback();
	});
}

module.exports = addLevel;
