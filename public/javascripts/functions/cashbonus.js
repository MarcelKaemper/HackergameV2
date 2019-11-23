const query = require('../database/dbquery.js');
const addMoney = require('./changeMoney.js');
const setXP = require('./leveling/setXP.js');

const cashbonus = (uuid) => {
    return new Promise(async(resolve, reject) => {
        var claimed = await query("SELECT claimed FROM cashbonus WHERE uuid='" + uuid + "';");
        if(!claimed[0].claimed) {
            await query("UPDATE cashbonus SET claimed=true, lastClaim=CURRENT_TIMESTAMP where uuid='" + uuid + "';");
            await addMoney(uuid, 5000, "give");
            await setXP(uuid, 50, "give");
        }
        resolve();
    });
}

module.exports = cashbonus;
