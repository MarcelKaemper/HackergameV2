const checkIP = require('../checkIP.js');
const query = require('../../database/dbquery.js');

const cmdScan = (req, cmd, command) => {
    return new Promise(async(resolve, reject) => {
        var operation = command[1];
        var target = command[2];

        switch(operation) {
            case "ip":
                if(target != "" || target != undefined || target != null) {
                    var calla = await checkIP(target);
                    if(calla) {
                        if(target == req.session.ip) {
                            req.session.command_log += "You can't scan yourself!\n";
                            resolve();
                        } else {
                            var sql1 = "SELECT uuid, ip_address FROM userdata WHERE ip_address='" + target + "';";
                            var sql2 = "SELECT uuid, ip_address, money FROM bankaccounts WHERE ip_address='" + target + "';";
                            var sql3 = "SELECT uuid, ip_address FROM server WHERE ip_address='" + target + "';";
                            var results1 = await query(sql1);
                            var results2 = await query(sql2);
                            var results3 = await query(sql3);

                            if(results1.length == 1) {
                                var sql11 = "SELECT uuid, money FROM money WHERE uuid='" + results1[0].uuid + "';";
                                var results11 = await query(sql11);
                                var targetMoney1 = Math.floor(results11[0].money * 0.25);
                                req.session.command_log += "IP: " + target + "\n";
                                req.session.command_log += "Money: $" + targetMoney1 + "\n";
                                resolve();
                            } else if(results2.length == 1) {
                                var targetMoney2 = Math.floor(results2[0].money * 0.25);
                                req.session.command_log += "IP: " + target + "\n";
                                req.session.command_log += "Money: $" + targetMoney2 + "\n";
                                resolve();
                            } else if(results3.length == 1) {
                                req.session.command_log += "IP: " + target + "\n";
                                resolve();
                            } else {
                                req.session.command_log += "Target not found!\n";
                                resolve();
                            }
                        }
                    } else {
                        req.session.command_log += "Invalid ip address!\n";
                        resolve();
                    }
                } else {
                    req.session.command_log += "You need to specify a target!\n";
                    resolve();
                }
                break;
            case "network":
            default:
                req.session.command_log += "You need to specify a operation [ip, (network)]!\n";
                resolve();
                break;
        }
    });
}

module.exports = cmdScan;
