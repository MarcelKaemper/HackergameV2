const query = require('../database/dbquery.js');

function IP(ipaddress) {
    return new Promise(async function(resolve, reject) {
        var sql1 = "SELECT ip_address FROM userdata WHERE ip_address='" + ipaddress + "';";
        var sql2 = "SELECT ip_address FROM bankaccounts WHERE ip_address='" + ipaddress + "';";
        var sql3 = "SELECT ip_address FROM server WHERE ip_address='" + ipaddress + "';";

        var results1 = await query(sql1);
        var results2 = await query(sql2);
        var results3 = await query(sql3);
        if(results1.length >= 1 || results2.length >= 1 || results3.length >= 1) {
            resolve(true);
        } else {
            resolve(false);
        }
    });
}

function UUID(uuid) {
    return new Promise(async function(resolve, reject) {
        var sql1 = "SELECT uuid FROM userdata WHERE uuid='" + uuid + "';";
        var sql2 = "SELECT uuid FROM bankaccounts WHERE uuid='" + uuid + "';";
        var sql3 = "SELECT uuid FROM server WHERE uuid='" + uuid + "';";

        var results1 = await query(sql1);
        var results2 = await query(sql2);
        var results3 = await query(sql3);
        if(results1.length >= 1 || results2.length >= 1 || results3.length >= 1) {
            resolve(true);
        } else {
            resolve(false);
        }
    });
}

function Name(name) {
    return new Promise(async function(resolve, reject) {
        var sql1 = "SELECT uuid, name FROM logins WHERE name='" + name.toLowerCase() + "';";
        var results1 = await query(sql1);

        if(results1 <= 0) {
            resolve(false);
        } else {
            resolve(true);
        }
    });
}

function Mail(mail) {
    return new Promise(async function(resolve, reject) {
        var sql1 = "SELECT uuid, mail FROM logins WHERE mail='" + mail.toLowerCase() + "';";
        var results1 = await query(sql1);

        if(results1 <= 0) {
            resolve(false);
        } else {
            resolve(true);
        }
    });
}

module.exports = {
    UUID,
    IP,
    Name,
    Mail
};
