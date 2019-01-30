var query = require('../database/dbquery.js');

function IP(ipaddress, callback) {
    var sql1 = "SELECT ip_address FROM userdata WHERE ip_address='" + ipaddress + "';";
    var sql2 = "SELECT ip_address FROM bankAccounts WHERE ip_address='" + ipaddress + "';";

    query(sql1, function(results1) {
        query(sql2, function(results2) {
            if(results1 <= 0 || results2 <= 0) {
                callback(false);
            } else {
                callback(true);
            }
        });
    });
}

function UUID(uuid, callback) {
    var sql1 = "SELECT uuid FROM userdata WHERE uuid='" + uuid + "';";
    var sql2 = "SELECT uuid FROM bankAccounts WHERE uuid='" + uuid + "';";

    query(sql1, function(results1) {
        query(sql2, function(results2) {
            if(results1 <= 0 || results2 <= 0) {
                callback(false);
            } else {
                callback(true);
            }
        });
    });
}

module.exports = {
    UUID,
    IP
};
