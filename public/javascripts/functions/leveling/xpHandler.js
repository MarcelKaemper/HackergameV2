var query = require('../../database/dbquery.js');
var setLevel = require('./setLevel.js');

//level = parameter
//faktor = 125
//level²*faktor = xp
//level = sqroot(xp/125)

function handleXP(uuid,xp,callback){

	setLevel(uuid, Math.floor(Math.sqrt(xp/125)), function(){
		callback();
	});
};

module.exports = handleXP;
