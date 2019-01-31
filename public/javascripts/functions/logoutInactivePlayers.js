var query = require('../database/dbquery.js');
var moment = require('moment'); 

async function timeBetweenLastActivity(loggedIn, callback){
	if(loggedIn){
		var sql = "SELECT * FROM lastActivity";
		let results  = await query(sql)
		for(var i in results){
			if(moment().diff(results[i].last_activity, "minutes")>=3){
				console.log("Last activity more than 3 mins ago");	
				console.log("Logging out "+results[i].uuid);
				sql = "UPDATE logins SET loggedIn=false where uuid='"+results[i].uuid+"';";
				await query(sql);
			};
		};
		callback();
	}else{
		callback();
	}
}



module.exports = timeBetweenLastActivity;
