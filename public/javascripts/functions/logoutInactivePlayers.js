var query = require('./database/dbquery.js');
var moment = require('moment'); 

function timeBetweenLastActivity(loggedIn, callback){
	if(loggedIn){
		var sql = "SELECT * FROM lastActivity";
		query(sql, function(results){
			for(var i in results){
				if(moment().diff(results[i].last_activity, "minutes")>=3){
					console.log("Last activity more than 3 mins ago");	
					console.log("Logging out "+results[i].uuid);
					var sql2 = "UPDATE logins SET loggedIn=false where uuid='"+results[i].uuid+"';";
					query(sql2, function(results){
					});
				};
			};
			callback();
		});
	}else{
		callback();
	}
}



module.exports = timeBetweenLastActivity;
