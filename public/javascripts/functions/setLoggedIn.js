const query = require('../database/dbquery.js');

const setLoggedIn = (li, uuid) => {
	return new Promise(async(resolve, reject) => {
		sql = "UPDATE logins SET loggedIn=" + li + " WHERE uuid='" + uuid + "';";

		await query(sql);
		resolve();
	});
}

module.exports = setLoggedIn;
