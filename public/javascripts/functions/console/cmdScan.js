var checkIP = require('../checkIP.js');
var query = require('../../database/dbquery.js');

function cmdScan(req, cmd, command, callback) {
    var operation = command[1];
    var target = command[2];

    switch(operation) {
        case "ip":
            if(target != "" || target != undefined || target != null) {
                checkIP(target, async function(calla) {
                    if(calla) {
                        if(target == req.session.ip) {
                            req.session.command_log += "You can't scan yourself!\n";
                            callback();
                        } else {
                            var sql1 = "SELECT uuid, ip_address FROM userdata WHERE ip_address='" + target + "';";
                            var sql2 = "SELECT uuid, ip_address, money FROM bankAccounts WHERE ip_address='" + target + "';";
                            var sql3 = "SELECT uuid, ip_address FROM server WHERE ip_address='" + target + "';";
                            var results1 = await query(sql1);
                            var results2 = await query(sql2);
                            var results3 = await query(sql3);
                            
                            console.log(results1.length);
                            console.log(results2.length);
                            console.log(results3.length);

                            if(results1.length == 1) {
                                var sql11 = "SELECT uuid, money FROM money WHERE uuid='" + results1[0].uuid + "';";
                                var results11 = await query(sql11);
                                var targetMoney1 = Math.floor(results11[0].money * 0.25);
                                req.session.command_log += "IP: " + target + "\n";
                                req.session.command_log += "Money: $" + targetMoney1 + "\n";
                                callback();
                            } else if(results2.length == 1) {
                                var targetMoney2 = Math.floor(results2[0].money * 0.25);
                                req.session.command_log += "IP: " + target + "\n";
                                req.session.command_log += "Money: $" + targetMoney2 + "\n";
                                callback();
                            } else if(results3.length == 1) {
                                req.session.command_log += "IP: " + target + "\n";
                                callback();
                            } else {
                                req.session.command_log += "Target not found!\n";
                                callback();
                            }
                        }
                    } else {
                        req.session.command_log += "Invalid ip address!\n";
                        callback();
                    }
                });
            } else {
                req.session.command_log += "You need to specify a target!\n";
                callback();
            }
            break;
        case "network":
        default:
            req.session.command_log += "You need to specify a operation [ip, (network)]!\n";
            callback();
            break;
    }
}

module.exports = cmdScan;
