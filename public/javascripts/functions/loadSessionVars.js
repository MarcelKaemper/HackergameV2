const query = require('../database/dbquery.js');
const neededXP = require('./leveling/xpForLvlup.js');
const checkAdmin = require('./checkAdmin.js');
const currentClan = require('./clans/getCurrentClan.js');

const reload = (req) => {
	return new Promise(async(resolve, reject) => {
		//If user logged in
		if(req.session.loggedIn) {
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
	
			var xpNextlvl = await neededXP(req.session.xp, req.session.level);
			req.session.neededXP = xpNextlvl;

            var results = await query("SELECT ip_address FROM userdata WHERE uuid='"+req.session.uuid+"';");
            req.session.ip = results[0].ip_address;	
                
			req.session.isAdmin = await checkAdmin(req.session.uuid);

			results = await query("SELECT loggedIn FROM logins WHERE uuid='"+req.session.uuid+"';");
			if(results[0].loggedIn == false){
				req.session.loggedIn = false;
			}
			req.session.clan = await currentClan(req.session.uuid);
			// Continue
			resolve();
		// Not logged in
		} else {
			// Continue
			resolve();
		}
	});
}

module.exports = reload;
