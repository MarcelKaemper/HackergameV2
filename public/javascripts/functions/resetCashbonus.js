const query = require('../database/dbquery.js');
const moment = require('moment'); 

const resetCashbonus = () => {
    return new Promise(async(resolve, reject) => {
        var results = await query("SELECT * FROM cashbonus");
    	for(var i in results) {
            if(moment().diff(results[i].lastClaim, "minutes") >= 120) {
                sql = "UPDATE cashbonus SET claimed=false where uuid='" + results[i].uuid + "';";
                await query(sql);
            };
        };
        resolve();
    });
}

module.exports = resetCashbonus;
