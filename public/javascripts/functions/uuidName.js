var query = require('../database/dbquery.js');

function toName(uuid) {
    return new Promise(async function(resolve, reject) {
        var sql1 = "SELECT name, displayName FROM logins WHERE uuid='" + uuid + "';";
        var name = "";
        var results1 = await query(sql1);
        if(results1 <= 0) {
            resolve("");
        } else {
            name = results1[0].displayName;
            resolve(name);
        }
    });
}

function toUuid(name) {
    return new Promise(async function(resolve, reject) {
        var sql2 = "SELECT uuid FROM logins WHERE name='" + name.toLowerCase() + "';";
        var uuid = "";
        var results2 = await query(sql2);
        if(results2 <= 0) {
            resolve("");
        } else {
            uuid = results2[0].uuid;
            resolve(uuid);
        }
    });
}

module.exports = {
    toName,
    toUuid
}
