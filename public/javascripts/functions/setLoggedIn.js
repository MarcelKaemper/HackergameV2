const query = require('../database/dbquery.js');

function setLoggedIn(li, uuid) {
	return new Promise(async function(resolve, reject) {
		sql = "UPDATE logins SET loggedIn="+li+" WHERE uuid='"+uuid+"';";

		await query(sql);
		resolve();
	});
}


module.exports = setLoggedIn;
