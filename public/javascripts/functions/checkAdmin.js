var query = require('../database/dbquery.js');

async function checkAdmin(uuid, callback) {
    var sql = "SELECT uuid FROM admins WHERE uuid='" + uuid + "';";
    var results = await query(sql);
    if(results <= 0) {
	callback(false);
    }else{
	callback(true);
    }
}

module.exports = checkAdmin;
