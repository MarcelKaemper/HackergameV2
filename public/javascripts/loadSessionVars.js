function reload(req,read,callback){
	if(req.session.loggedIn){
		read("SELECT money FROM money WHERE id='"+req.session.userid+"';", function(results){
			req.session.money = results.money;
			read("SELECT level,xp FROM levels where id='"+req.session.userid+"';", function(results){
				req.session.level = results.level;
				req.session.xp = results.xp;
				callback();
			});
		});
	}else{
		callback();
	}
}

module.exports = reload;
