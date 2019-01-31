var setLevel = require('./setLevel.js');

//level = parameter
//faktor = 125
//level²*faktor = xp
//level = sqroot(xp/125)

function handleXP(uuid, xp){
	return new Promise(async function(resolve, reject) {
		await setLevel(uuid, Math.floor(Math.sqrt(xp/125)));
		resolve();
	});
}

module.exports = handleXP;
