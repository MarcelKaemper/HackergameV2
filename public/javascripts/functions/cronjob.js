var cron = require('node-cron');
var resetCashbonus = require('./resetCashbonus.js');
var logoutInactive = require('./logoutInactivePlayers.js');
var addRevenue = require('./server/revenue/addRevenue.js');

const cronjob = ()  => {
	cron.schedule("* * * * *", function() {
		resetCashbonus();
		logoutInactive(true);
	});

	cron.schedule("00 * * * *", async function() {
		addRevenue();
		console.log("Added revenue");
	});
}

module.exports = cronjob;
