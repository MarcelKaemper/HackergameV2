var query = require('../../database/dbquery.js');

function setLevel(uuid, amount) {
	return new Promise(async function(resolve, reject) {
		await query("UPDATE levels SET level="+amount+" WHERE uuid='"+uuid+"';");
		resolve();
	});
}

module.exports = setLevel;
