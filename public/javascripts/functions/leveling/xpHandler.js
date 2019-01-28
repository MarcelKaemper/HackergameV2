var query = require('../../database/dbquery.js');

//level = parameter
//faktor = 125
//level²*faktor

function handleXP(level,xp, callback){
	var level = level;
	var needed = (Math.pow(level+1,2)*125)-xp;

	while(needed < 0){
		level+=1;
		needed = (Math.pow(level,2)*125)-xp;
	}

	callback(needed, level-1);
};

module.exports = handleXP;
