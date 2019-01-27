var query = require('./database/dbquery.js');

function reload(req,callback){
	//If user logged in
	if(req.session.loggedIn){
		// Read money table and return results
		query("SELECT money FROM money WHERE id='"+req.session.userid+"';", function(results){
			// Set session
			req.session.money = results[0].money;
			//Read from levels table and return results
			query("SELECT level,xp FROM levels where uuid='"+req.session.uuid+"';", function(results){
				// Set session
				req.session.level = results[0].level;
				req.session.xp = results[0].xp;
				query("SELECT loggedIn FROM logins WHERE uuid='"+req.session.uuid+"';", function(results){
					if(results[0].loggedIn == false){
						req.session.loggedIn = false;
					}
					// Continue
					callback();
				});
			});
		});
	// Not logged in
	}else{
		// Continue
		callback();
	}
}

module.exports = reload;