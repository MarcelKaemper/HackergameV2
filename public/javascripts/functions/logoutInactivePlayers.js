var query = require('../database/dbquery.js');
var moment = require('moment'); 

function timeBetweenLastActivity(loggedIn) {
	return new Promise(async function(resolve, reject) {
		if(loggedIn) {
			var sql = "SELECT * FROM lastActivity;";
			let results  = await query(sql)
			for(var i in results) {
				var loggedInStatus = await query("SELECT loggedIn FROM logins WHERE uuid='"+results[i].uuid+"';");
				if(loggedInStatus[0].loggedIn > 0){
					if(moment().diff(results[i].last_activity, "minutes")>=3) {
						console.log("Logging out "+results[i].uuid);
						sql = "UPDATE logins SET loggedIn=false WHERE uuid='"+results[i].uuid+"';";
						await query(sql);
					}
				}
			}
			resolve();
		} else {
			resolve();
		}
	});
}



module.exports = timeBetweenLastActivity;
