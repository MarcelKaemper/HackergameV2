const query = require('../database/dbquery.js');

const checkAdmin = (uuid) => {
    return new Promise(async(resolve, reject) => {
        var sql = "SELECT uuid FROM admins WHERE uuid='" + uuid + "';";
        var results = await query(sql);
        if(results <= 0) {
            resolve(false);
        } else {
            resolve(true);
        }
    });
}

module.exports = checkAdmin;
