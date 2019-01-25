function reload(req,read,callback){
	//If user logged in
	if(req.session.loggedIn){
		// Read money table and return results
		read("SELECT money FROM money WHERE id='"+req.session.userid+"';", function(results){
			// Set session
			req.session.money = results.money;
			//Read from levels table and return results
			read("SELECT level,xp FROM levels where id='"+req.session.userid+"';", function(results){
				// Set session
				req.session.level = results.level;
				req.session.xp = results.xp;
				// Continue
				callback();
			});
		});
	// Not logged in
	}else{
		// Continue
		callback();
	}
}

module.exports = reload;
