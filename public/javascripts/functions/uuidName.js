var query = require('../database/dbquery.js');

function toName(uuid, callback) {
    var sql1 = "SELECT name FROM logins WHERE uuid='" + uuid + "';";
    var name = "";
    query(sql1, function(results1) {
        if(results1 <= 0) {
            callback("");
        } else {
            name = results1[0].name;
            callback(name);            
        }
    });
}

function toUuid(name, callback) {
    var sql2 = "SELECT uuid FROM logins WHERE name='" + name + "';";
    var uuid = "";
    query(sql2, function(results2) {
        if(results2 <= 0) {
            callback("");
        } else {
            uuid = results2[0].uuid;
            callback(uuid);
        }
    });
}

module.exports = {
    toName,
    toUuid
}
