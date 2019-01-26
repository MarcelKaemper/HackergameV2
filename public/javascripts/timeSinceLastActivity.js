var query = require('./database/dbquery.js');
var moment = require('moment'); 

function timeBetweenLastActivity(){
	var sql = "SELECT * FROM lastActivity";
	var sqlDate = "2019-01-26 08:47:39";
	query(sql, function(results){
		for(var i in results){
			if(moment().diff(results[i].last_activity, "minutes")>3){
				console.log("Last activity more than 3 mins ago");	
				console.log("Logging out "+results[i].uuid);
				var sql2 = "UPDATE logins SET loggedIn=false where uuid='"+results[i].uuid+"';";
				query(sql2, function(results){

				});
			};
		};
	});
}



module.exports = timeBetweenLastActivity;
