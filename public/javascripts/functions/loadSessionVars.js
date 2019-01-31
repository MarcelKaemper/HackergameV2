var query = require('../database/dbquery.js');

async function reload(req,callback){
	//If user logged in
	if(req.session.loggedIn){
		var results;
		// Read money table and return results
		results = await query("SELECT money FROM money WHERE id='"+req.session.userid+"';");
		// Set session
		req.session.money = results[0].money;
		//Read from levels table and return results
		results = await query("SELECT level,xp FROM levels where uuid='"+req.session.uuid+"';");
		// Set session
		req.session.level = results[0].level;
		req.session.xp = results[0].xp;

		results = await query("SELECT loggedIn FROM logins WHERE uuid='"+req.session.uuid+"';");
		if(results[0].loggedIn == false){
			req.session.loggedIn = false;
		}
		// Continue
		callback();
	// Not logged in
	}else{
		// Continue
		callback();
	}
}

module.exports = reload;
