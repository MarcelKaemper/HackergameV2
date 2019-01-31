var query = require('../database/dbquery.js');

async function setLoggedIn(li, uuid, callback){
	sql = "UPDATE logins SET loggedIn="+li+" WHERE uuid='"+uuid+"';";

	var results = await query(sql);
	callback();
}


module.exports = setLoggedIn;
