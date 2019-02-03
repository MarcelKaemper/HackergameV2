var cron = require('node-cron');
var resetCashbonus = require('./resetCashbonus.js');
var logoutInactive = require('./logoutInactivePlayers.js');

function cronjob() {
  cron.schedule("* * * * *", function() {
   console.log("Resetting cash bonus!");
   resetCashbonus();
   console.log("Checking for inactive players");
   logoutInactive(true);
  });
}

module.exports = cronjob;