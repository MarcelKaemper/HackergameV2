var query = require('../database/dbquery.js');
var moment = require('moment'); 

function resetCashbonus() {
    return new Promise(async function(resolve, reject) {
        var results = await query("SELECT * FROM cashbonus");
    	for(var i in results) {
				if(moment().diff(results[i].lastClaim, "minutes")>=120) {
					sql = "UPDATE cashbonus SET claimed=false where uuid='"+results[i].uuid+"';";
                    await query(sql);
                };
        };
        resolve();
    });
}

module.exports = resetCashbonus;