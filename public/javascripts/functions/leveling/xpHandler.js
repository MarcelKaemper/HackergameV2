var query = require('../../database/dbquery.js');
var addLevel = require('./addlevel.js');

//level = parameter
//faktor = 125
//level²*faktor

function handleXP(uuid,level,xp,callback){
	var level = level;
	var lvlups = 0;
	var needed = (Math.pow(level+1,2)*125)-xp;

	while(needed <= 0){
		level+=1;
		lvlups+=1;
		needed = (Math.pow(level,2)*125)-xp;
	}

	if(lvlups > 0){
		addLevel(uuid, lvlups-1, function(){
			callback();
		});
	}else{
		callback();
	}
};

module.exports = handleXP;
