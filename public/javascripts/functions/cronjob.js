var cron = require('node-cron');
var resetCashbonus = require('./resetCashbonus.js');
var logoutInactive = require('./logoutInactivePlayers.js');

function cronjob() {
  cron.schedule("* * * * *", function() {
   console.log("Resetting cash bonus!");
   resetCashbonus();
   console.log("Logging out Inactive players");
   logoutInactive(true);
  });
}

module.exports = cronjob;