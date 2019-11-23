const query = require('../../database/dbquery.js');

const setLevel = (uuid, amount) => {
	return new Promise(async(resolve, reject) => {
		await query("UPDATE levels SET level=" + amount + " WHERE uuid='" + uuid + "';");
		resolve();
	});
}

module.exports = setLevel;
