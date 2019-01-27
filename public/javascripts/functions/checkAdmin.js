var query = require('../database/dbquery.js');

function checkAdmin(uuid, callback) {
    var sql = "SELECT uuid FROM admins WHERE uuid='" + uuid + "';";
    query(sql, function(results){
        if(results <= 0) {
            callback(false);
        } else {
            callback(true);
        }
    });
}

module.exports = checkAdmin;
