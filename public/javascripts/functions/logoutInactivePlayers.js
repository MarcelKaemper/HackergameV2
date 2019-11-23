const query = require('../database/dbquery.js');
const moment = require('moment'); 

const timeBetweenLastActivity = (loggedIn) => {
	return new Promise(async(resolve, reject) => {
		if(loggedIn) {
			var sql = "SELECT * FROM lastactivity;";
			let results  = await query(sql)
			for(var i in results) {
				var loggedInStatus = await query("SELECT loggedIn FROM logins WHERE uuid='" + results[i].uuid + "';");
				if(loggedInStatus[0].loggedIn > 0){
					if(moment().diff(results[i].last_activity, "minutes") >= 10) {
						console.log("Logging out " + results[i].uuid);
						sql = "UPDATE logins SET loggedIn=false WHERE uuid='" + results[i].uuid + "';";
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
