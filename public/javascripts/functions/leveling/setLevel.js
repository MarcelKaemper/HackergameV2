var query = require('../../database/dbquery.js');

function setLevel(uuid, amount, callback){
	query("UPDATE levels SET level="+amount+" WHERE uuid='"+uuid+"';",function(results){
		callback();
	});
}

module.exports = setLevel;
