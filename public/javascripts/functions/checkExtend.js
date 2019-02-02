var query = require('../database/dbquery.js');

function IP(ipaddress) {
    return new Promise(async function(resolve, reject) {
        var sql1 = "SELECT ip_address FROM userdata WHERE ip_address='" + ipaddress + "';";
        var sql2 = "SELECT ip_address FROM bankAccounts WHERE ip_address='" + ipaddress + "';";

        var results1 = await query(sql1);
        var results2 = await query(sql2);
        if(results1 <= 0 || results2 <= 0) {
            resolve(false);
        } else {
            resolve(true);
        }
    });
}

function UUID(uuid) {
    return new Promise(async function(resolve, reject) {
        var sql1 = "SELECT uuid FROM userdata WHERE uuid='" + uuid + "';";
        var sql2 = "SELECT uuid FROM bankAccounts WHERE uuid='" + uuid + "';";

        var results1 = await query(sql1);
        var results2 = await query(sql2);
        if(results1 <= 0 || results2 <= 0) {
            resolve(false);
        } else {
            resolve(true);
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
