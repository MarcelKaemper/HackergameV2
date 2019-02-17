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

function toSrvUuid(ipaddress) {
    return new Promise(async function(resolve, reject) {
        var sql3 = "SELECT uuid FROM server WHERE ip_address='" + ipaddress + "';";
        var uuid2 = "";
        var results3 = await query(sql3);
        if(results3 <= 0) {
            resolve("");
        } else {
            uuid2 = results3[0].uuid;
            resolve(uuid2);
        }
    });
}

function toSrvIP(uuid) {
    return new Promise(async function(resolve, reject) {
        var sql4 = "SELECT ip_address FROM server WHERE uuid='" + uuid + "';";
        var ipaddress = "";
        var results4 = await query(sql4);
        if(results4 <= 0) {
            resolve("");
        } else {
            ipaddress = results4[0].ip_address;
            resolve(ipaddress);
        }
    });
}

function toItemUuid(name) {
    return new Promise(async function(resolve, reject) {
        var sql5 = "SELECT uuid FROM shop WHERE itemName='" + name + "';";
        var uuid3 = "";
        var results5 = await query(sql5);
        if(results5 <= 0) {
            resolve("");
        } else {
            uuid3 = results5[0].uuid;
            resolve(uuid3);
        }
    });
}

function toItemName(uuid) {
    return new Promise(async function(resolve, reject) {
        var sql6 = "SELECT itemName FROM shop WHERE uuid='" + uuid + "';";
        var name2 = "";
        var results6 = await query(sql6);
        if(results6 <= 0) {
            resolve("");
        } else {
            name2 = results6[0].itemName;
            resolve(name2);
        }
    });
}

module.exports = {
    toName,
    toUuid,
    toSrvUuid,
    toSrvIP,
    toItemUuid,
    toItemName
}
