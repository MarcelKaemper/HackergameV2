var query = require('../database/dbquery.js');

function setLoggedIn(li, uuid, callback){
	sql = "UPDATE logins SET loggedIn="+li+" WHERE uuid='"+uuid+"';";

	query(sql, function(results){
		callback();
	});
}


module.exports = setLoggedIn;
