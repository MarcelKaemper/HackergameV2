var query = require('../database/dbquery.js');

function toName(uuid, callback) {
    var sql = "SELECT name FROM logins WHERE uuid='" + uuid + "';";
    query(sql, function(results) {
        var name = results[0].name;
        callback(name);
    });
}

function toUuid(name, callback) {
    var sql = "SELECT uuid FROM logins WHERE name='" + name + "';";
    query(sql, function(results) {
        var uuid = results[0].uuid;
        callback(uuid);
    });
}

module.exports = {
    toName,
    toUuid
}
