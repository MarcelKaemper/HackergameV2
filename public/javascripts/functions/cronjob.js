const cron = require('node-cron');
const resetCashbonus = require('./resetCashbonus.js');
const logoutInactive = require('./logoutInactivePlayers.js');
const addRevenue = require('./server/revenue/addRevenue.js');

const cronjob = () => {
	cron.schedule("* * * * *", () => {
		resetCashbonus();
		logoutInactive(true);
	});

	cron.schedule("00 * * * *", async() => {
		addRevenue();
		console.log("Added revenue");
	});
}

module.exports = cronjob;
