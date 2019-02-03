var cron = require('node-cron');
var resetCashbonus = require('./resetCashbonus.js');
var logoutInactive = require('./logoutInactivePlayers.js');

function cronjob() {
  cron.schedule("* * * * *", function() {
   resetCashbonus();
   logoutInactive(true);
  });
}

module.exports = cronjob;