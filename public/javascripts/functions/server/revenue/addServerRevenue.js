const query = require('../../../database/dbquery.js');

const addServerRevenue = (srvuuid, newrevenue) => {
    return new Promise(async(resolve, reject) => {
        var sql = "UPDATE server SET revenue=revenue+" + parseInt(newrevenue) + " WHERE uuid='" + srvuuid + "';";
        await query(sql);

        resolve();
    });
}

module.exports = addServerRevenue;
