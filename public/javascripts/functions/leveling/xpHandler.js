const setLevel = require('./setLevel.js');

//level = parameter
//faktor = 125
//level²*faktor = xp
//level = sqroot(xp/125)

const handleXP = (uuid, xp) => {
	return new Promise(async(resolve, reject) => {
		await setLevel(uuid, Math.floor(Math.sqrt(xp / 125)));
		resolve();
	});
}

module.exports = handleXP;
