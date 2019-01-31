var checkIP = require('../checkIP.js');
var query = require('../../database/dbquery.js');
var checkAdmin = require('../checkAdmin.js');

async function cmdCheck(req, cmd, command, callback) {
    var callb = await checkAdmin(req.session.uuid);
    if (callb) {
        checkIP(command[1], async function (call) {
            if (call) {
                var sql = "SELECT uuid, ip_address FROM userdata WHERE ip_address='" + command[1] + "';";
                var results = await query(sql);
                   
                if (results <= 0) {
                    req.session.command_log += "Target not found!\n";
                    callback();
                } else {
                    //req.session.command_log += "Target found!\n";
                    var sql1 = "SELECT name FROM logins WHERE uuid='" + results[0].uuid + "';";
                    var results1 = await query(sql1);
                      
                    req.session.command_log += "Name: " + results1[0].name + "\n";
                    req.session.command_log += "IP: " + results[0].ip_address + "\n";
                    callback();
                }
            } else {
                req.session.command_log += "Invalid ip format!\n";
                callback();
            }
        });
    } else {
        req.session.command_log += "You are not an admin!\n";
        callback();
    }
}

module.exports = cmdCheck;
